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

		$options = Options::get_options();
		if ( ! (bool) $options['slack_enabled'] ) {
			return;
		}
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );
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

	/**
	 * Send commenter subscriber email.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$options = Options::get_options();
		if ( ! (bool) $options['slack_enabled'] ) {
			return;
		}

		// Check if moderated comment.
		$moderated_comments_enabled = (bool) $options['slack_moderation_enabled'];
		if ( 0 === $maybe_comment_approved && ! $moderated_comments_enabled ) {
			return;
		}

		// Check for webhook.
		$webhook_url = $options['slack_webhook_url'];
		if ( empty( $webhook_url ) ) {
			return;
		}

		// Check for spam.
		if ( 'spam' === $maybe_comment_approved ) {
			return;
		}

		// Get comment.
		$comment = get_comment( $comment_id );
		if ( ! $comment ) {
			return;
		}

		// Get comment vars.
		$comment_author       = $comment->comment_author;
		$comment_author_email = $comment->comment_author_email;
		$comment_author_url   = $comment->comment_author_url;
		$post_id              = $comment->comment_post_ID;
		$post_title           = get_the_title( $post_id );

		// Get avatar for commenter.
		$avatar = get_avatar_url( $comment_author_email, 32 );

		// Get comment text.
		$comment_content = esc_textarea( $comment->comment_content );

		// Comment action links.
		$approve_link   = add_query_arg(
			array(
				'_wpnonce' => wp_create_nonce( 'approve-comment_' . $comment_id ),
			),
			admin_url( 'comment.php?action=approvecomment&c=' . $comment_id )
		);
		$unapprove_link = add_query_arg(
			array(
				'_wpnonce' => wp_create_nonce( 'approve-comment_' . $comment_id ), /* both approve and unapprove use the same nonce */
			),
			admin_url( 'comment.php?action=unapprovecomment&c=' . $comment_id )
		);
		$spam_link      = add_query_arg(
			array(
				'_wpnonce' => wp_create_nonce( 'delete-comment_' . $comment_id ), /* spam uses the delete nonce */
			),
			admin_url( 'comment.php?action=spamcomment&c=' . $comment_id )
		);

		// Begin message.
		$message_array = array(
			'text'   => esc_html(
				sprintf(
					/* translators: %s: Comment author name. */
					__( 'There is a new comment by %1$s on %2$s', 'comment-edit-pro' ),
					esc_html( $comment_author ),
					wp_kses_post( $post_title )
				)
			),
			'blocks' => array(
				array(
					'type'     => 'section',
					'block_id' => 'section1',
					'text'     => array(
						'type' => 'mrkdwn',
						'text' => sprintf(
							/* translators: %s: Comment author name. */
								__( '*There is a <%1$s|new comment> by %2$s on <%4$s|%3$s>*', 'comment-edit-pro' ),
							esc_url( get_comment_link( $comment ) ),
							esc_html( $comment_author ),
							wp_kses_post( $post_title ),
							esc_url( get_permalink( $post_id ) )
						),
					),
					// 'accessory' => array(
					// 'type'      => 'image',
					// 'image_url' => esc_url( $avatar ),
					// 'alt_text'  => esc_html( $comment_author ),
					// ),
				),
				array(
					'type' => 'header',
					'text' => array(
						'type' => 'plain_text',
						'text' => esc_html__( 'Comment Details', 'comment-edit-pro' ),
					),
				),
				array(
					'type' => 'divider',
				),
				array(
					'type'   => 'section',
					'fields' => array(
						array(
							'type' => 'mrkdwn',
							'text' => __( '*Commenter:*', 'comment-edit-pro' ) . ' ' . esc_html( $comment_author ) . "\n\n",
						),
						array(
							'type' => 'mrkdwn',
							'text' => __( '*Email Address:*', 'comment-edit-pro' ) . ' ' . '<' . esc_url( 'mailto:' . $comment_author_email ) . '|' . esc_html( $comment_author_email ) . '>' . "\n\n",
						),
						array(
							'type' => 'mrkdwn',
							'text' => __( '*URL:*', 'comment-edit-pro' ) . ' ' . ( ! empty( $comment_author_url ) ? esc_url( $comment_author_url ) : __( 'None', 'comment-edit-pro' ) ) . "\n",
						),
					),
				),
				array(
					'type' => 'divider',
				),
				array(
					'type' => 'header',
					'text' => array(
						'type' => 'plain_text',
						'text' => esc_html__( 'Comment', 'comment-edit-pro' ),
					),
				),
				array(
					'type' => 'section',
					'text' => array(
						'type' => 'mrkdwn',
						'text' => $comment_content,
					),
				),
				array(
					'type' => 'divider',
				),
				array(
					'type'     => 'actions',
					'elements' => array(
						array(
							'type'      => 'button',
							'text'      => array(
								'type'  => 'plain_text',
								'text'  => esc_html__( 'Approve', 'comment-edit-pro' ),
								'emoji' => true,
							),
							'style'     => 'primary',
							'value'     => 'approve',
							'action_id' => 'approval',
							'url'       => esc_url_raw( $approve_link ),
						),
						array(
							'type'      => 'button',
							'text'      => array(
								'type'  => 'plain_text',
								'text'  => esc_html__( 'Unapprove', 'comment-edit-pro' ),
								'emoji' => true,
							),
							'value'     => 'unapprove',
							'action_id' => 'unapprove',
							'url'       => esc_url_raw( $unapprove_link ),
						),
						array(
							'type'      => 'button',
							'text'      => array(
								'type'  => 'plain_text',
								'text'  => esc_html__( 'Mark as Spam', 'comment-edit-pro' ),
								'emoji' => true,
							),
							'style'     => 'danger',
							'value'     => 'spam',
							'action_id' => 'spam',
							'url'       => esc_url_raw( $spam_link ),
						),

					),
				),
			),
		);

		$json = wp_json_encode( $message_array );

		$response = wp_remote_post(
			esc_url( $webhook_url ),
			array(
				'body'    => $json,
				'headers' => array( 'Content-Type' => 'application/json; charset=utf-8' ),
			)
		);
		return;
	}
}
