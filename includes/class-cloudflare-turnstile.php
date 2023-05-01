<?php
/**
 * Helper fuctions for Cloudflare Turnstile.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Cloudflare_Turnstile
 */
class Cloudflare_Turnstile {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Turnstile admin panel actions.
		 */

		// Retrieve Recaptcha settings in the admin.
		add_action( 'wp_ajax_sce_get_turnstile_options', array( $this, 'ajax_get_turnstile_options' ) );
		add_action( 'wp_ajax_sce_save_turnstile_options', array( $this, 'ajax_save_turnstile_options' ) );
		add_action( 'wp_ajax_sce_reset_turnstile_options', array( $this, 'ajax_reset_turnstile_options' ) );

		// Initializes comment actions.
		add_action( 'wp', array( $this, 'action_wp' ) );

		// Verify the token when there's a new comment.
		add_action( 'pre_comment_on_post', array( $this, 'verify_turnstile_token' ), 10, 1 );
	}

	/**
	 * Perform actions on the `wp` action.
	 */
	public function action_wp() {
		if ( ! comments_open() ) {
			return;
		}
		// If user can moderate comments, no captcha.
		if ( current_user_can( 'moderate_comments' ) ) {
			return;
		}

		$options = Options::get_options();
		// If user is logged in and Turnstile is disabled for logged-in users, exit.
		if ( is_user_logged_in() && ! (bool) $options['turnstile_logged_in_users_enabled'] ) {
			return;
		}

		// If Turnstile is enabled, add the Turnstile actions/filters.
		if ( true === (bool) $options['turnstile_enabled'] ) {

			// Enqueue the turnstile scripts.
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_turnstile_scripts' ) );
			add_filter( 'script_loader_tag', array( $this, 'defer_scripts' ), 10, 3 );

			// Add the turnstile widget container.
			add_filter( 'comment_form_defaults', array( $this, 'add_cloudflare_widget_container' ), 10, 1 );
		}
	}

	/**
	 * Verify the turnstile token.
	 *
	 * @param int $comment_id The comment ID to check.
	 */
	public function verify_turnstile_token( $comment_id ) {
		$options = Options::get_options();
		if ( ! (bool) $options['turnstile_enabled'] ) {
			return;
		}
		if ( current_user_can( 'moderate_comments' ) ) {
			return;
		}
		$token = sanitize_text_field( filter_input( INPUT_POST, 'cf-turnstile-response', FILTER_DEFAULT ) );
		if ( ! $token ) {
			wp_die( esc_html__( 'Could not verify Cloudflare Turnstile token.', 'comment-edit-pro' ) );
		}
		$secret_key = $options['turnstile_secret'];
		$url        = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
		$data       = array(
			'secret'   => $secret_key,
			'response' => $token,
		);
		$args       = array(
			'body'      => $data,
			'method'    => 'POST',
			'sslverify' => true,
		);
		$response   = wp_remote_post( esc_url( $url ), $args );
		if ( is_wp_error( $response ) ) {
			wp_die( esc_html__( 'Cloudflare Turnstile could not be verified.', 'comment-edit-pro' ) );
		}
		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! $body['success'] ) {
			wp_die( esc_html__( 'Cloudflare Turnstile security challenge has failed.', 'comment-edit-pro' ) );
		}

		// Now silently exit as all is well now.
	}

	/**
	 * Add an empty div so Cloudflare Turnstile can target it.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_cloudflare_widget_container( $comment_fields ) {
		$turnstile                       = array(
			'sce-turnstile' => '<div id="sce-turnstile"></div>',
		);
		$comment_fields['submit_button'] = $turnstile['sce-turnstile'] . $comment_fields['submit_button'];
		return $comment_fields;
	}



	/**
	 * Defer the recaptcha scripts.
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @param string $src    The script source.
	 *
	 * @return string The script tag.
	 */
	public function defer_scripts( $tag, $handle, $src ) {
		$scripts_to_defer = array(
			'sce-turnstile',
		);
		if ( in_array( $handle, $scripts_to_defer, true ) ) {
			return str_replace( ' src', ' defer="defer" src', $tag );
		}
		return $tag;
	}

	/**
	 * Load Turnstile if enabled and comments are open.
	 */
	public function enqueue_turnstile_scripts() {
		$options = Options::get_options();

		if ( (bool) $options['turnstile_enabled'] ) {
			// Load Turnstile local JS.
			wp_enqueue_script(
				'sce-turnstile-local',
				Functions::get_plugin_url( '/dist/sce-cloudflare-turnstile.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_enqueue_script(
				'sce-turnstile',
				esc_url_raw( 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=sceInitTurnstile' ),
				array( 'sce-turnstile-local' ),
				Functions::get_plugin_version(),
				true
			);

			// Add localized vars.
			wp_localize_script(
				'sce-turnstile-local',
				'sceTurnstileLocal',
				array(
					'sitekey'  => sanitize_text_field( $options['turnstile_sitekey'] ),
					'theme'    => sanitize_text_field( $options['turnstile_theme'] ),
					'language' => sanitize_text_field( $options['turnstile_language'] ),
					'size'     => sanitize_text_field( $options['turnstile_widget_size'] ),
				)
			);
		}
	}

	/**
	 * Get recaptcha options.
	 */
	public function ajax_get_turnstile_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options    = Options::get_options();
		$json_array = array(
			'turnstileEnabled'              => (bool) $options['turnstile_enabled'],
			'turnstileSitekey'              => sanitize_text_field( $options['turnstile_sitekey'] ),
			'turnstileSecret'               => sanitize_text_field( $options['turnstile_secret'] ),
			'turnstileTheme'                => sanitize_text_field( $options['turnstile_theme'] ),
			'turnstileLanguage'             => sanitize_text_field( $options['turnstile_language'] ),
			'turnstileWidgetSize'           => sanitize_text_field( $options['turnstile_widget_size'] ),
			'turnstileLoggedInUsersEnabled' => (bool) $options['turnstile_logged_in_users_enabled'],
		);
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_save_turnstile_options options.
	 */
	public function ajax_save_turnstile_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();
		$options = array(
			'turnstile_enabled'                 => (bool) filter_input( INPUT_POST, 'turnstileEnabled', FILTER_VALIDATE_BOOLEAN ),
			'turnstile_sitekey'                 => sanitize_text_field( filter_input( INPUT_POST, 'turnstileSitekey', FILTER_DEFAULT ) ),
			'turnstile_secret'                  => sanitize_text_field( filter_input( INPUT_POST, 'turnstileSecret', FILTER_DEFAULT ) ),
			'turnstile_theme'                   => sanitize_text_field( filter_input( INPUT_POST, 'turnstileTheme', FILTER_DEFAULT ) ),
			'turnstile_language'                => sanitize_text_field( filter_input( INPUT_POST, 'turnstileLanguage', FILTER_DEFAULT ) ),
			'turnstile_widget_size'             => sanitize_text_field( filter_input( INPUT_POST, 'turnstileWidgetSize', FILTER_DEFAULT ) ),
			'turnstile_logged_in_users_enabled' => (bool) filter_input( INPUT_POST, 'turnstileLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN ),
		);

		Options::update_options( $options );
		wp_send_json_success(
			array(
				'message' => __( 'Options saved.', 'comment-edit-pro' ),
			)
		);
		exit;
	}

	/**
	 * Reset Mailchimp Options.
	 */
	public function ajax_reset_turnstile_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$defaults = Options::get_defaults();

		// Populate defaults.
		$return = array(
			'turnstileEnabled'              => (bool) $defaults['turnstile_enabled'],
			'turnstileSitekey'              => sanitize_text_field( $defaults['turnstile_sitekey'] ),
			'turnstileSecret'               => sanitize_text_field( $defaults['turnstile_secret'] ),
			'turnstileTheme'                => sanitize_text_field( $defaults['turnstile_theme'] ),
			'turnstileLanguage'             => sanitize_text_field( $defaults['turnstile_language'] ),
			'turnstileWidgetSize'           => sanitize_text_field( $defaults['turnstile_widget_size'] ),
			'turnstileLoggedInUsersEnabled' => (bool) $defaults['turnstile_logged_in_users_enabled'],
		);

		// Go through return defaults and format into options.
		$options_to_save = array();
		foreach ( $return as $key => $value ) {
			$options_to_save[ Functions::to_underlines( $key ) ] = $value;
		}
		Options::update_options( $options_to_save );

		wp_send_json_success( $return );

	}
}
