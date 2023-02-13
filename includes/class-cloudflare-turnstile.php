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

		$options = Options::get_options();

		// Let's check that reCAPTCHA is enabled.
		// if ( ! (bool) $options['turnstile_enabled'] ) {
		// return;
		// }

		// // Let's check that the secret and site key are set.
		// $site_key   = $options['turnstile_site_key'];
		// $secret_key = $options['turnstile_secret_key'];
		// if ( empty( $site_key ) || empty( $secret_key ) ) {
		// return;
		// }

		// // Recaptcha options are below. Let's see if we can exclude people from them.

		// // If user can moderate comments, no captcha.
		// if ( current_user_can( 'moderate_comments' ) ) {
		// return;
		// }

		// // If user is logged in and reCAPTCHA is disabled for logged-in users, exit.
		// if ( is_user_logged_in() && ! (bool) $options['turnstile_logged_in_users_enabled'] ) {
		// return;
		// }

		// // Enqueue recaptcha assets on the front-end.
		// add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_turnstile_scripts' ) );
		// add_filter( 'script_loader_tag', array( $this, 'defer_scripts' ), 10, 3 );
		// add_filter( 'comment_form_submit_button', array( $this, 'modify_comment_submit_button' ), 10, 2 );
		// add_filter( 'comment_form_defaults', array( $this, 'add_turnstile_css_class' ), 10, 1 );
		// add_action( 'wp_print_footer_scripts', array( $this, 'print_turnstile_scripts' ) );
		// add_action( 'pre_comment_on_post', array( $this, 'verify_recaptcha' ), 10, 1 );
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
			'turnstileEnabled'    => (bool) $options['turnstile_enabled'],
			'turnstileSitekey'    => sanitize_text_field( $options['turnstile_sitekey'] ),
			'turnstileSecret'     => sanitize_text_field( $options['turnstile_secret'] ),
			'turnstileTheme'      => sanitize_text_field( $options['turnstile_theme'] ),
			'turnstileLanguage'   => sanitize_text_field( $options['turnstile_language'] ),
			'turnstileWidgetSize' => sanitize_text_field( $options['turnstile_widget_size'] ),
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
			'turnstile_enabled'     => (bool) filter_input( INPUT_POST, 'turnstileEnabled', FILTER_VALIDATE_BOOLEAN ),
			'turnstile_sitekey'     => sanitize_text_field( filter_input( INPUT_POST, 'turnstileSitekey', FILTER_DEFAULT ) ),
			'turnstile_secret'      => sanitize_text_field( filter_input( INPUT_POST, 'turnstileSecret', FILTER_DEFAULT ) ),
			'turnstile_theme'       => sanitize_text_field( filter_input( INPUT_POST, 'turnstileTheme', FILTER_DEFAULT ) ),
			'turnstile_language'    => sanitize_text_field( filter_input( INPUT_POST, 'turnstileLanguage', FILTER_DEFAULT ) ),
			'turnstile_widget_size' => sanitize_text_field( filter_input( INPUT_POST, 'turnstileWidgetSize', FILTER_DEFAULT ) ),
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
			'turnstileEnabled'    => (bool) $defaults['turnstile_enabled'],
			'turnstileSitekey'    => sanitize_text_field( $defaults['turnstile_sitekey'] ),
			'turnstileSecret'     => sanitize_text_field( $defaults['turnstile_secret'] ),
			'turnstileTheme'      => sanitize_text_field( $defaults['turnstile_theme'] ),
			'turnstileLanguage'   => sanitize_text_field( $defaults['turnstile_language'] ),
			'turnstileWidgetSize' => sanitize_text_field( $defaults['turnstile_widget_size'] ),
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
