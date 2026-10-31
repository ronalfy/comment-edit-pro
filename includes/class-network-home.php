<?php
/**
 * Helper fuctions for Network Home admin settings.
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
 * Class Network Home
 */
class Network_Home {

	/**
	 * Class runner.
	 */
	public function run() {
		if ( ! Functions::is_multisite() ) {
			return;
		}

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save advanced settings in the admin.
		add_action( 'wp_ajax_sce_save_network_home_options', array( $this, 'ajax_save_network_home_options' ) );

		// Retrieve advanced settings in the admin.
		add_action( 'wp_ajax_sce_get_network_home_options', array( $this, 'ajax_get_network_home_options' ) );

		// Load comment editing admin scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Get options and determine if comment editing is disabled or enabled.
		$options               = Options::get_network_options();
		$are_comments_disabled = (bool) $options['disable_all_comments'];
		$are_comments_hidden   = (bool) $options['hide_comment_section'];

		// Disable comments if necessary.
		if ( true === $are_comments_disabled ) {
			add_filter( 'comments_open', '__return_false', 9999 );
			add_filter( 'pings_open', '__return_false', 9999 );
			add_filter( 'preprocess_comment', array( $this, 'disable_comments' ), 9999 );
			add_filter( 'xmlrpc_methods', array( $this, 'disable_xmlrpc_comments' ), 9999 );
			add_filter( 'rest_pre_insert_comment', '__return_null', 9999 );
		}

		// Hide comments if necessary.
		if ( true === $are_comments_hidden ) {
			if ( ! is_admin() ) {
				add_filter( 'comments_array', '__return_empty_array', 9999 );
			}
		}

		add_filter( 'sce_comment_time', array( $this, 'modify_timer' ), 15, 2 );
		add_filter( 'sce_unlimited_editing', array( $this, 'maybe_unlimited_editing' ), 15, 2 );
		add_filter( 'trashed_comment', array( $this, 'maybe_delete_comment' ), 15, 2 );
		add_filter( 'spammed_comment', array( $this, 'maybe_spam_and_delete_comment' ), 15, 2 );

		// Override comment notification email.
		add_filter( 'comment_notification_headers', array( $this, 'maybe_override_comment_notification_email' ), 15, 1 );
		add_filter( 'comment_moderation_headers', array( $this, 'maybe_override_comment_notification_email' ), 15, 1 );
	}

	/**
	 * Maybe override comment notification email.
	 *
	 * @param array $headers Comment notification headers.
	 */
	public function maybe_override_comment_notification_email( $headers ) {
		$options = Options::get_network_options();
		if ( isset( $options['override_comment_notification_email'] ) && true === (bool) $options['override_comment_notification_email'] ) {
			$override_email = $options['comment_notification_email'];
			if ( ! is_email( $override_email ) ) {
				return $headers;
			}
			$from_name  = 'Comment Edit Pro';
			$from_email = sanitize_email( $override_email );
			$reply_to   = sanitize_email( $override_email );
			$headers    = array(
				__( 'From:', 'comment-edit-pro' ) . ' ' . sanitize_text_field( $from_name ) . ' <' . sanitize_email( $from_email ) . '>',
				__( 'Reply-To:', 'comment-edit-pro' ) . ' ' . sanitize_email( $reply_to ),
				'Content-Type: text/html; charset=UTF-8',
			);
		}
		return $headers;
	}

	/**
	 * Maybe delete a comment permanently if admin setting is on.
	 *
	 * @param int        $comment_id The comment ID.
	 * @param WP_Comment $comment    The comment object.
	 */
	public function maybe_delete_comment( $comment_id, $comment ) {
		$options         = Options::get_network_options();
		$trash_or_delete = $options['delete_behavior'];
		if ( 'delete' === $trash_or_delete ) {
			wp_delete_comment( $comment_id, true );
		}
	}

	/**
	 * Maybe delete a comment permanently after spamming it if admin setting is on.
	 *
	 * @param int        $comment_id The comment ID.
	 * @param WP_Comment $comment    The comment object.
	 */
	public function maybe_spam_and_delete_comment( $comment_id, $comment ) {
		$options      = Options::get_network_options();
		$maybe_delete = $options['spam_behavior'];
		if ( 'delete' === $maybe_delete ) {
			wp_delete_comment( $comment_id, true );
		}
	}

	/**
	 * Maybe allow for unlimited editing.
	 *
	 * Maybe allow for unlimited editing.
	 *
	 * @since 1.0.6
	 * @access public
	 *
	 * @param bool   $unlimited Whether to allow unlimited comment editing.
	 * @param object $comment comment object.
	 *
	 * @return bool Whether to allow unlimited editing
	 */
	public function maybe_unlimited_editing( $unlimited, $comment ) {
		if ( ! is_user_logged_in() ) {
			return false;
		}
		$options = Options::get_network_options();
		if ( ! isset( $options['unlimited_editing'] ) ) {
			return false;
		}

		if ( isset( $options['unlimited_editing'] ) && true === (bool) $options['unlimited_editing'] ) {
			global $current_user;
			$user_id = absint( $current_user->ID );
			if ( absint( $comment->user_id ) === $user_id ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Modify the timer.
	 *
	 * @param int $timer Time in minutes to edit the comment.
	 * @return int New time in minutes
	 */
	public function modify_timer( $timer ) {
		$options        = Options::get_network_options();
		$override_timer = isset( $options['timer_override'] ) ? (bool) $options['timer_override'] : false;
		if ( true === $override_timer ) {
			$new_timer = isset( $options['timer'] ) ? $options['timer'] : false;
			if ( false === $new_timer ) {
				return $timer;
			}
			return $new_timer;
		}
		return $timer;
	}

	/**
	 * Disable XMLRPC comments.
	 *
	 * @param array $methods XMLRPC methods.
	 */
	public function disable_xmlrpc_comments( $methods ) {
		unset( $methods['wp.newComment'] );
		return $methods;
	}

	/**
	 * Disable comments.
	 *
	 * @param array $commentdata Comment data.
	 */
	public function disable_comments( $commentdata ) {
		wp_die( esc_html__( 'Comments are disabled.', 'comment-edit-pro' ) );
	}

	/**
	 * Get comment editing options.
	 */
	public function ajax_get_network_home_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-network-home-options' ) || ! current_user_can( 'manage_network' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_network_options();

		$json_array = array(
			'disableAllComments'               => (bool) $options['disable_all_comments'],
			'hideCommentSection'               => (bool) $options['hide_comment_section'],
			'enableNetworkWideSlack'           => (bool) $options['enable_network_wide_slack'],
			'slackWebhookUrl'                  => $options['slack_webhook_url'],
			'slackModerationEnabled'           => (bool) $options['slack_moderation_enabled'],
			'slackEditCommentsEnabled'         => (bool) $options['slack_edit_comments_enabled'],
			'timer'                            => $options['timer'],
			'timerOverride'                    => $options['timer_override'],
			'deleteBehavior'                   => $options['delete_behavior'],
			'spamBehavior'                     => $options['spam_behavior'],
			'overrideCommentNotificationEmail' => (bool) $options['override_comment_notification_email'],
			'commentNotificationEmail'         => $options['comment_notification_email'],
			'unlimitedEditing'                 => (bool) $options['unlimited_editing'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save comment editing options.
	 */
	public function ajax_save_network_home_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-network-home-options' ) || ! current_user_can( 'manage_network' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options                                        = array();
		$options['disable_all_comments']                = (bool) filter_input( INPUT_POST, 'disableAllComments', FILTER_VALIDATE_BOOLEAN );
		$options['hide_comment_section']                = (bool) filter_input( INPUT_POST, 'hideCommentSection', FILTER_VALIDATE_BOOLEAN );
		$options['enable_network_wide_slack']           = (bool) filter_input( INPUT_POST, 'enableNetworkWideSlack', FILTER_VALIDATE_BOOLEAN );
		$options['slack_webhook_url']                   = esc_url( filter_input( INPUT_POST, 'slackWebhookUrl', FILTER_VALIDATE_URL ) );
		$options['slack_moderation_enabled']            = (bool) filter_input( INPUT_POST, 'slackModerationEnabled', FILTER_VALIDATE_BOOLEAN );
		$options['slack_edit_comments_enabled']         = (bool) filter_input( INPUT_POST, 'slackEditCommentsEnabled', FILTER_VALIDATE_BOOLEAN );
		$options['timer']                               = absint( filter_input( INPUT_POST, 'timer', FILTER_DEFAULT ) );
		$options['timer_override']                      = (bool) filter_input( INPUT_POST, 'timerOverride', FILTER_VALIDATE_BOOLEAN );
		$options['delete_behavior']                     = sanitize_text_field( filter_input( INPUT_POST, 'deleteBehavior', FILTER_DEFAULT ) );
		$options['spam_behavior']                       = sanitize_text_field( filter_input( INPUT_POST, 'spamBehavior', FILTER_DEFAULT ) );
		$options['override_comment_notification_email'] = (bool) filter_input( INPUT_POST, 'overrideCommentNotificationEmail', FILTER_VALIDATE_BOOLEAN );
		$options['comment_notification_email']          = sanitize_text_field( filter_input( INPUT_POST, 'commentNotificationEmail', FILTER_DEFAULT ) );
		$options['unlimited_editing']                   = (bool) filter_input( INPUT_POST, 'unlimitedEditing', FILTER_VALIDATE_BOOLEAN );
		// Save options.
		Options::update_network_options( $options );

		// Return success.
		wp_send_json_success(
			array(
				'message' => __( 'Options saved.', 'comment-edit-pro' ),
			)
		);
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$screen = get_current_screen();
		$tab    = Functions::get_admin_tab();
		if ( 'settings_page_comment-edit-pro-network' !== $screen->id ) {
			return;
		}
		if ( null !== $tab && 'home' !== $tab ) {
			return;
		}
		$deps = require_once Functions::get_plugin_dir( 'build/sce-network-home.asset.php' );
		wp_enqueue_script(
			'sce-comment-network-home',
			Functions::get_plugin_url( 'build/sce-network-home.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
		wp_localize_script(
			'sce-comment-network-home',
			'sceNetworkHome',
			array(
				'save_nonce' => wp_create_nonce( 'sce-save-network-home-options' ),
				'get_nonce'  => wp_create_nonce( 'sce-retrieve-network-home-options' ),
				'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
			)
		);
	}
}
