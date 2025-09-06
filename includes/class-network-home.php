<?php
/**
 * Helper fuctions for Network Home admin settings.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

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
			'disableAllComments'     => (bool) $options['disable_all_comments'],
			'hideCommentSection'     => (bool) $options['hide_comment_section'],
			'enableNetworkWideSlack' => (bool) $options['enable_network_wide_slack'],
			'slackWebhookUrl'        => $options['slack_webhook_url'],
			'slackModerationEnabled' => (bool) $options['slack_moderation_enabled'],
			'slackEditCommentsEnabled' => (bool) $options['slack_edit_comments_enabled'],
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

		$options                                = array();
		$options['disable_all_comments']        = (bool) filter_input( INPUT_POST, 'disableAllComments', FILTER_VALIDATE_BOOLEAN );
		$options['hide_comment_section']        = (bool) filter_input( INPUT_POST, 'hideCommentSection', FILTER_VALIDATE_BOOLEAN );
		$options['enable_network_wide_slack']   = (bool) filter_input( INPUT_POST, 'enableNetworkWideSlack', FILTER_VALIDATE_BOOLEAN );
		$options['slack_webhook_url']           = esc_url( filter_input( INPUT_POST, 'slackWebhookUrl', FILTER_VALIDATE_URL ) );
		$options['slack_moderation_enabled']    = (bool) filter_input( INPUT_POST, 'slackModerationEnabled', FILTER_VALIDATE_BOOLEAN );
		$options['slack_edit_comments_enabled'] = (bool) filter_input( INPUT_POST, 'slackEditCommentsEnabled', FILTER_VALIDATE_BOOLEAN );
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
		if ( 'settings_page_comment-edit-pro-network' !== $screen->id ) {
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
