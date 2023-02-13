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
		// 	return;
		// }

		// // Let's check that the secret and site key are set.
		// $site_key   = $options['turnstile_site_key'];
		// $secret_key = $options['turnstile_secret_key'];
		// if ( empty( $site_key ) || empty( $secret_key ) ) {
		// 	return;
		// }

		// // Recaptcha options are below. Let's see if we can exclude people from them.

		// // If user can moderate comments, no captcha.
		// if ( current_user_can( 'moderate_comments' ) ) {
		// 	return;
		// }

		// // If user is logged in and reCAPTCHA is disabled for logged-in users, exit.
		// if ( is_user_logged_in() && ! (bool) $options['turnstile_logged_in_users_enabled'] ) {
		// 	return;
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
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-turnstile-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options    = Options::get_options();
		// $json_array = array(
		// 	'recaptchaEnabled'               => (bool) $options['turnstile_enabled'],
		// 	'recaptchaSiteKey'               => $options['turnstile_site_key'],
		// 	'recaptchaSecretKey'             => $options['turnstile_secret_key'],
		// 	'recaptchaLoggedInUsersEnabled'  => (bool) $options['turnstile_logged_in_users_enabled'],
		// 	'recaptchaCommentFormId'         => $options['turnstile_comment_form_id'],
		// 	'recaptchaCommentSubmitButtonId' => $options['turnstile_comment_submit_button_id'],
		// 	'recaptchaScoreThreshold'        => (float) $options['turnstile_score_threshold'],
		// );

		// Exit gracefully.
		// wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_save_turnstile_options options.
	 */
	public function ajax_save_turnstile_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-turnstile-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		// $turnstile_enabled                  = (bool) filter_input( INPUT_POST, 'recaptchaEnabled', FILTER_VALIDATE_BOOLEAN );
		// $turnstile_site_key                 = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSiteKey', FILTER_DEFAULT ) );
		// $turnstile_secret_key               = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSecretKey', FILTER_DEFAULT ) );
		// $turnstile_logged_in_users_enabled  = (bool) filter_input( INPUT_POST, 'recaptchaLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN );
		// $turnstile_comment_form_id          = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentFormId', FILTER_DEFAULT ) );
		// $turnstile_comment_submit_button_id = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentSubmitButtonId', FILTER_DEFAULT ) );
		// $turnstile_score_threshold          = (float) filter_input( INPUT_POST, 'recaptchaScoreThreshold', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );

		// // Now let's save options.
		// $options_to_save = array(
		// 	'turnstile_enabled'                  => $turnstile_enabled,
		// 	'turnstile_site_key'                 => $turnstile_site_key,
		// 	'turnstile_secret_key'               => $turnstile_secret_key,
		// 	'turnstile_logged_in_users_enabled'  => $turnstile_logged_in_users_enabled,
		// 	'turnstile_comment_form_id'          => $turnstile_comment_form_id,
		// 	'turnstile_comment_submit_button_id' => $turnstile_comment_submit_button_id,
		// 	'turnstile_score_threshold'          => $turnstile_score_threshold,
		// );

		// Options::update_options( $options_to_save );

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
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-turnstile-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear options.
		// Options::update_options(
		// 	array(
		// 		'turnstile_enabled'                  => false,
		// 		'turnstile_site_key'                 => '',
		// 		'turnstile_secret_key'               => '',
		// 		'turnstile_logged_in_users_enabled'  => true,
		// 		'turnstile_comment_form_id'          => 'commentform',
		// 		'turnstile_comment_submit_button_id' => 'submit',
		// 		'turnstile_score_threshold'          => 0.5,
		// 	)
		// );

		wp_send_json_success(
			array(
				'message' => __( 'Recaptcha options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);

	}
}
