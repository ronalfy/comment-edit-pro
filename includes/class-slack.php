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
 * Class Slack
 */
class Slack {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Akismet admin panel actions.
		 */

		// Retrieve Akismet settings in the admin.
		add_action( 'wp_ajax_sce_get_slack_options', array( $this, 'ajax_get_slack_options' ) );
		add_action( 'wp_ajax_sce_save_slack_options', array( $this, 'ajax_save_slack_options' ) );
		add_action( 'wp_ajax_sce_reset_slack_options', array( $this, 'ajax_reset_slack_options' ) );
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_slack_options() {
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
			'slackEnabled'             => (bool) $options['slack_enabled'],
			'slackWebhookUrl'          => $options['slack_webhook_url'],
			'slackModerationEnabled'   => (bool) $options['slack_moderation_enabled'],
			'slackEditCommentsEnabled' => (bool) $options['slack_edit_comments_enabled'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_get_slack_options options.
	 */
	public function ajax_save_slack_options() {
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
		$slack_enabled           = (bool) filter_input( INPUT_POST, 'slackEnabled', FILTER_VALIDATE_BOOLEAN );
		$slack_webhook_url       = esc_url( filter_input( INPUT_POST, 'slackWebhookUrl', FILTER_VALIDATE_URL ) );
		$moderation_enabled      = (bool) filter_input( INPUT_POST, 'slackModerationEnabled', FILTER_VALIDATE_BOOLEAN );
		$comment_editing_enabled = (bool) filter_input( INPUT_POST, 'slackEditCommentsEnabled', FILTER_VALIDATE_BOOLEAN );

		// Now let's save options.
		$options_to_save = array(
			'slack_enabled'               => $slack_enabled,
			'slack_webhook_url'           => $slack_webhook_url,
			'slack_moderation_enabled'    => $moderation_enabled,
			'slack_edit_comments_enabled' => $comment_editing_enabled,
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
	public function ajax_reset_slack_options() {
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
				'slack_enabled'               => false,
				'slack_webhook_url'           => '',
				'slack_moderation_enabled'    => false,
				'slack_edit_comments_enabled' => false,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Slack options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);

	}
}
