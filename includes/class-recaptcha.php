<?php
/**
 * Helper fuctions for Mailchimp.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

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
	}

	/**
	 * Get recaptcha options.
	 */
	public function ajax_get_recaptcha_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options    = Options::get_options();
		$json_array = array(
			'recaptchaEnabled'               => (bool) $options['recaptcha_enabled'],
			'recaptchaSiteKey'               => $options['recaptcha_site_key'],
			'recaptchaSecretKey'             => $options['recaptcha_secret_key'],
			'recaptchaLoggedInUsersEnabled'  => $options['recaptcha_logged_in_users_enabled'],
			'recaptchaCommentFormId'         => $options['recaptcha_comment_form_id'],
			'recaptchaCommentSubmitButtonId' => $options['recaptcha_comment_submit_button_id'],
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
		if ( ! wp_verify_nonce( $nonce, 'sce-save-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$recaptcha_enabled                  = (bool) filter_input( INPUT_POST, 'recaptchaEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_site_key                 = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSiteKey', FILTER_DEFAULT ) );
		$recaptcha_secret_key               = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSecretKey', FILTER_DEFAULT ) );
		$recaptcha_logged_in_users_enabled  = (bool) filter_input( INPUT_POST, 'recaptchaLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_comment_form_id          = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentFormId', FILTER_DEFAULT ) );
		$recaptcha_comment_submit_button_id = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentSubmitButtonId', FILTER_DEFAULT ) );

		// Now let's save options.
		$options_to_save = array(
			'recaptcha_enabled'                  => $recaptcha_enabled,
			'recaptcha_site_key'                 => $recaptcha_site_key,
			'recaptcha_secret_key'               => $recaptcha_secret_key,
			'recaptcha_logged_in_users_enabled'  => $recaptcha_logged_in_users_enabled,
			'recaptcha_comment_form_id'          => $recaptcha_comment_form_id,
			'recaptcha_comment_submit_button_id' => $recaptcha_comment_submit_button_id,
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
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear options.
		Options::update_options(
			array(
				'recaptcha_enabled'                  => false,
				'recaptcha_site_key'                 => '',
				'recaptcha_secret_key'               => '',
				'recaptcha_logged_in_users_enabled'  => true,
				'recaptcha_comment_form_id'          => '#commentform',
				'recaptcha_comment_submit_button_id' => '#submit',
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Akismet options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);

	}
}
