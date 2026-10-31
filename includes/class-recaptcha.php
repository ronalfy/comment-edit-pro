<?php
/**
 * Helper fuctions for Mailchimp.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Functions;
use CommentEditPro\Includes\Options;

/**
 * Class Recaptcha
 */
class Recaptcha {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Recaptcha admin panel actions.
		 */

		// Retrieve Recaptcha settings in the admin.
		add_action( 'wp_ajax_sce_get_recaptcha_options', array( $this, 'ajax_get_recaptcha_options' ) );
		add_action( 'wp_ajax_sce_save_recaptcha_options', array( $this, 'ajax_save_recaptcha_options' ) );
		add_action( 'wp_ajax_sce_reset_recaptcha_options', array( $this, 'ajax_reset_recaptcha_options' ) );

		$options = Options::get_options();

		// Let's check that reCAPTCHA is enabled.
		if ( ! (bool) $options['recaptcha_enterprise_enabled'] ) {
			return;
		}

		// Let's check that the secret and site key are set.
		$site_key   = sanitize_text_field( $options['recaptcha_site_key'] );
		$api_key    = sanitize_text_field( $options['recaptcha_api_key'] );
		$project_id = sanitize_text_field( $options['recaptcha_project_id'] );
		if ( empty( $site_key ) || empty( $api_key ) || empty( $project_id ) ) {
			return;
		}

		// Recaptcha options are below. Let's see if we can exclude people from them.

		// If user can moderate comments, no captcha.
		if ( current_user_can( 'moderate_comments' ) ) {
			return;
		}

		// If user is logged in and reCAPTCHA is disabled for logged-in users, exit.
		if ( is_user_logged_in() && ! (bool) $options['recaptcha_logged_in_users_enabled'] ) {
			return;
		}

		// Enqueue recaptcha assets on the front-end.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_recaptcha_scripts' ) );
		add_filter( 'script_loader_tag', array( $this, 'defer_scripts' ), 10, 2 );
		add_filter( 'comment_form_defaults', array( $this, 'add_recaptcha_css_class' ), 10, 1 );
		add_action( 'wp_print_footer_scripts', array( $this, 'print_recaptcha_scripts' ) );
		add_action( 'pre_comment_on_post', array( $this, 'verify_recaptcha' ), 10, 1 );
	}

		/**
		 * Verify the recaptcha response.
		 *
		 * @param int $comment_id The comment ID to check.
		 */
	public function verify_recaptcha( $comment_id ) {
		$options              = Options::get_options();
		$recaptcha_enabled    = (bool) $options['recaptcha_enterprise_enabled'];
		$recaptcha_project_id = sanitize_text_field( $options['recaptcha_project_id'] );
		$recaptcha_api_key    = sanitize_text_field( $options['recaptcha_api_key'] );
		$recaptcha_site_key   = sanitize_text_field( $options['recaptcha_site_key'] );
		$score_threshold      = (float) $options['recaptcha_score_threshold'];
		if ( ! $recaptcha_enabled || empty( $recaptcha_project_id ) || empty( $recaptcha_api_key ) || empty( $recaptcha_site_key ) ) {
			return;
		}
		$token = sanitize_text_field( filter_input( INPUT_POST, 'g-recaptcha-response-token', FILTER_DEFAULT ) );
		if ( ! $token ) {
			wp_die( esc_html__( 'Could not verify reCAPTCHA.', 'comment-edit-pro' ) );
		}
		// Now get token back from reCAPTCHA.
		$url      = 'https://recaptchaenterprise.googleapis.com/v1/projects/' . esc_attr( $recaptcha_project_id ) . '/assessments?key=' . esc_attr( $recaptcha_api_key );
		$data     = array(
			'event' => array(
				'token'          => $token,
				'expectedAction' => 'USER_ACTION',
				'siteKey'        => $recaptcha_site_key,
			),
		);
		$args     = array(
			'body'      => wp_json_encode( $data ),
			'method'    => 'POST',
			'sslverify' => true,
			'headers'   => array(
				'Content-Type' => 'application/json',
			),
		);
		$response = wp_remote_post( esc_url_raw( $url ), $args );
		if ( is_wp_error( $response ) ) {
			wp_die( esc_html__( 'Error validating reCAPTCHA token.', 'comment-edit-pro' ) );
		}
		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( isset( $body['tokenProperties']['valid'] ) && ! (bool) $body['tokenProperties']['valid'] ) {
			wp_die( esc_html__( 'reCAPTCHA security challenge has failed.', 'comment-edit-pro' ) );
		}

		// Now check the score with threshold.
		$recaptcha_score = isset( $body['riskAnalysis']['score'] ) ? (float) $body['riskAnalysis']['score'] : 0;
		if ( $recaptcha_score < $score_threshold ) {
			wp_die( esc_html__( 'reCAPTCHA 3 security challenge has failed.', 'comment-edit-pro' ) );
		}

		// all is well. Let the comment posting continue.
	}

	/**
	 * Add Google Recaptcha to the comment submit button.
	 *
	 * @param array $args Comment defaults.
	 */
	public function add_recaptcha_css_class( $args ) {
		$args['class_submit'] .= ' g-recaptcha';
		return $args;
	}

	/**
	 * Print recaptcha scripts to the front-end.
	 */
	public function print_recaptcha_scripts() {
		$options                            = Options::get_options();
		$comment_form_id                    = sanitize_text_field( $options['comment_form_id'] );
		$recaptcha_comment_submit_button_id = sanitize_text_field( $options['comment_submit_id'] );
		$recaptcha_site_key                 = sanitize_text_field( $options['recaptcha_site_key'] );
		if ( (bool) $options['recaptcha_enterprise_enabled'] && $comment_form_id ) {
			?>
			<script>
				const sceRecaptchaAppend = function() {
					var sceCommentSubmitButton = document.querySelector( '<?php echo esc_js( $recaptcha_comment_submit_button_id ); ?>' );
					if ( null !== sceCommentSubmitButton ) {
						// Change ID and name attribute of button. This is needed for comment submission.
						// eslint-disable-next-line no-undef
						if (
								typeof grecaptcha !== 'undefined'
							) {
								grecaptcha.enterprise.ready( function() {
									grecaptcha
										.enterprise.execute( '<?php echo esc_js( $recaptcha_site_key ); ?>', {
											action: 'submit',
										} )
										.then( function( token ) {
											let recaptchaForm = document.querySelector( '<?php echo esc_js( $comment_form_id ); ?>' );
											if ( null !== recaptchaForm ) {
												const recaptchaInput = document.createElement( 'input' );
												recaptchaInput.setAttribute( 'type', 'hidden' );
												recaptchaInput.setAttribute( 'name', 'g-recaptcha-response-token' );
												recaptchaInput.setAttribute( 'value', token );
												recaptchaForm.appendChild( recaptchaInput );
											}
										} );
								} );
						}
					}
				};
				window.addEventListener( 'DOMContentLoaded', function() {
					sceRecaptchaAppend();
				} );
				document.addEventListener( 'wpacAfterUpdateComments', () => {
					sceRecaptchaAppend();
				} );
			</script>
			<?php
		}
	}



	/**
	 * Defer the recaptcha scripts.
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 *
	 * @return string The script tag.
	 */
	public function defer_scripts( $tag, $handle ) {
		$scripts_to_defer = array(
			'sce-recaptcha',
		);
		if ( in_array( $handle, $scripts_to_defer, true ) ) {
			return str_replace( ' src', ' defer="defer" src', $tag );
		}
		return $tag;
	}

	/**
	 * Load recaptcha if enabled and comments are open.
	 */
	public function enqueue_recaptcha_scripts() {
		$options            = Options::get_options();
		$recaptcha_site_key = $options['recaptcha_site_key'] ?? '';

		if ( (bool) $options['recaptcha_enterprise_enabled'] && ! empty( $recaptcha_site_key ) ) {
			wp_enqueue_script(
				'sce-enterprise-recaptcha',
				esc_url_raw( 'https://www.google.com/recaptcha/enterprise.js?render=' . sanitize_text_field( $recaptcha_site_key ) ),
				array(),
				Functions::get_plugin_version(),
				true
			);
		}
	}

	/**
	 * Get recaptcha options.
	 */
	public function ajax_get_recaptcha_options() {
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
			'recaptchaEnterpriseEnabled'    => (bool) $options['recaptcha_enterprise_enabled'],
			'recaptchaProjectId'            => $options['recaptcha_project_id'],
			'recaptchaApiKey'               => $options['recaptcha_api_key'],
			'recaptchaSiteKey'              => $options['recaptcha_site_key'],
			'recaptchaLoggedInUsersEnabled' => (bool) $options['recaptcha_logged_in_users_enabled'],
			'recaptchaScoreThreshold'       => (float) $options['recaptcha_score_threshold'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_save_recaptcha_options options.
	 */
	public function ajax_save_recaptcha_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$recaptcha_enterprise_enabled      = (bool) filter_input( INPUT_POST, 'recaptchaEnterpriseEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_project_id              = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaProjectId', FILTER_DEFAULT ) );
		$recaptcha_api_key                 = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaApiKey', FILTER_DEFAULT ) );
		$recaptcha_site_key                = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSiteKey', FILTER_DEFAULT ) );
		$recaptcha_logged_in_users_enabled = (bool) filter_input( INPUT_POST, 'recaptchaLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_score_threshold         = (float) filter_input( INPUT_POST, 'recaptchaScoreThreshold', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );

		// Now let's save options.
		$options_to_save = array(
			'recaptcha_enterprise_enabled'      => $recaptcha_enterprise_enabled,
			'recaptcha_project_id'              => $recaptcha_project_id,
			'recaptcha_api_key'                 => $recaptcha_api_key,
			'recaptcha_site_key'                => $recaptcha_site_key,
			'recaptcha_logged_in_users_enabled' => $recaptcha_logged_in_users_enabled,
			'recaptcha_score_threshold'         => $recaptcha_score_threshold,
		);

		Options::update_options( $options_to_save );

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
	public function ajax_reset_recaptcha_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear options.
		Options::update_options(
			array(
				'recaptcha_enterprise_enabled'       => false,
				'recaptcha_project_id'               => '',
				'recaptcha_api_key'                  => '',
				'recaptcha_site_key'                 => '',
				'recaptcha_logged_in_users_enabled'  => true,
				'recaptcha_comment_submit_button_id' => 'submit',
				'recaptcha_score_threshold'          => 0.5,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Recaptcha options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);
	}
}
