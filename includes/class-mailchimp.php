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
 * Class Mailchimp
 */
class Mailchimp {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Avatar admin panel actions.
		 */

		// Save avatar settings in the admin.
		add_action( 'wp_ajax_sce_save_mailchimp_options', array( $this, 'ajax_save_mailchimp_options' ) );

		// Retrieve avatar settings in the admin.
		add_action( 'wp_ajax_sce_get_mailchimp_options', array( $this, 'ajax_get_mailchimp_options' ) );		
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_mailchimp_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();

		$json_array = array(
			'enableMailchimp'          => $options['enable_mailchimp'],
			'apiKey'          => $options['mailchimp_api_key'],
			'mailchimpServerPrefix' => $options['mailchimp_api_key_server_prefix'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save mailchimp options.
	 */
	public function ajax_save_mailchimp_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		$options_to_save = array(
			'enable_mailchimp'            => filter_input( INPUT_POST, 'enableMailchimp', FILTER_VALIDATE_BOOLEAN ),
			'mailchimp_api_key'        => sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) ),
		);

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		Options::update_options( $options_to_save );

		// Exit gracefully.
		wp_send_json_success( array() );
	}
}
