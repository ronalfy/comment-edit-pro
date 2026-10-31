<?php
/**
 * Helper fuctions for Advanced admin settings.
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
 * Class Advanced
 */
class Advanced {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save advanced settings in the admin.
		add_action( 'wp_ajax_sce_save_advanced_options', array( $this, 'ajax_save_advanced_options' ) );

		// Retrieve advanced settings in the admin.
		add_action( 'wp_ajax_sce_get_advanced_options', array( $this, 'ajax_get_advanced_options' ) );

		// Load comment editing admin scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Get options and determine if comment editing is disabled or enabled.
		$options                     = Options::get_options();
		$are_comments_disabled       = (bool) $options['disable_all_comments'];
		$are_comments_hidden         = (bool) $options['hide_comment_section'];
		$is_spam_protection_disabled = (bool) $options['disable_all_spam_protection'];

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

		// Remove spam protection if necessary.
		if ( true === $is_spam_protection_disabled ) {
			add_filter( 'akismet_comment_check', '__return_false', 9999 ); // Don't check for spam with akismet.
			add_filter( 'pre_comment_approved', '__return_true', 9999 ); // Don't check for spam with wp core.
			add_filter( 'comment_moderation_text', '__return_true', 9999 ); // Don't check for spam with wp core.
			add_filter( 'comment_moderation_emails', '__return_true', 9999 ); // Don't check for spam with wp core.
			add_filter( 'option_comment_moderation', '__return_empty_string', 9999 ); // Don't check for spam with wp core.
			add_filter( 'option_blacklist_keys', '__return_empty_string', 9999 ); // Don't check for spam with wp core.
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
	public function ajax_get_advanced_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-advanced-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();

		$json_array = array(
			'disableAllComments'       => (bool) $options['disable_all_comments'],
			'disableAllSpamProtection' => (bool) $options['disable_all_spam_protection'],
			'hideCommentSection'       => (bool) $options['hide_comment_section'],
			'commentListClass'         => sanitize_text_field( $options['comment_list_class'] ),
			'commentsWrapperId'        => sanitize_text_field( $options['comments_wrapper_id'] ),
			'commentFormId'            => sanitize_text_field( $options['comment_form_id'] ),
			'commentSubmitId'          => sanitize_text_field( $options['comment_submit_id'] ),
			'commentRespondId'         => sanitize_text_field( $options['comment_respond_id'] ),
			'commentTextareaId'        => sanitize_text_field( $options['comment_textarea_id'] ),
			'selectorHelperEnabled'    => (bool) $options['selector_helper_enabled'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save comment editing options.
	 */
	public function ajax_save_advanced_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-advanced-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options                                = array();
		$options['disable_all_comments']        = (bool) filter_input( INPUT_POST, 'disableAllComments', FILTER_VALIDATE_BOOLEAN );
		$options['comment_list_class']          = sanitize_text_field( filter_input( INPUT_POST, 'commentListClass', FILTER_DEFAULT ) );
		$options['comments_wrapper_id']         = sanitize_text_field( filter_input( INPUT_POST, 'commentsWrapperId', FILTER_DEFAULT ) );
		$options['comment_form_id']             = sanitize_text_field( filter_input( INPUT_POST, 'commentFormId', FILTER_DEFAULT ) );
		$options['comment_submit_id']           = sanitize_text_field( filter_input( INPUT_POST, 'commentSubmitId', FILTER_DEFAULT ) );
		$options['comment_respond_id']          = sanitize_text_field( filter_input( INPUT_POST, 'commentRespondId', FILTER_DEFAULT ) );
		$options['comment_textarea_id']         = sanitize_text_field( filter_input( INPUT_POST, 'commentTextareaId', FILTER_DEFAULT ) );
		$options['disable_all_spam_protection'] = (bool) filter_input( INPUT_POST, 'disableAllSpamProtection', FILTER_VALIDATE_BOOLEAN );
		$options['hide_comment_section']        = (bool) filter_input( INPUT_POST, 'hideCommentSection', FILTER_VALIDATE_BOOLEAN );
		$options['selector_helper_enabled']     = (bool) filter_input( INPUT_POST, 'selectorHelperEnabled', FILTER_VALIDATE_BOOLEAN );
		// Save options.
		Options::update_options( $options );

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
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'advanced' === $current_tab ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-advanced.asset.php' );
			wp_enqueue_script(
				'sce-comment-advanced',
				Functions::get_plugin_url( 'build/sce-advanced.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			wp_localize_script(
				'sce-comment-advanced',
				'sceAdvanced',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-advanced-options' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-advanced-options' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}
}
