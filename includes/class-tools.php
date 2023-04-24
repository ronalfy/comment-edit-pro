<?php
/**
 * Helper fuctions for Tools.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options_Tools as Options_Tools;

/**
 * Class Tools
 */
class Tools {

	/**
	 * Class runner.
	 */
	public function run() {

		// Load integration scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Ajax handler for comment activity.
		add_action( 'wp_ajax_sce_save_comment_activity', array( $this, 'ajax_save_comment_activity' ) );
		add_action( 'wp_ajax_sce_get_comment_activity', array( $this, 'ajax_get_comment_activity' ) );

		// Ajax handlers for post type comment settings.
		add_action( 'wp_ajax_sce_save_post_type_comment_settings', array( $this, 'ajax_save_post_type_comment_settings' ) );
		add_action( 'wp_ajax_sce_get_post_type_comment_settings', array( $this, 'ajax_get_post_type_comment_settings' ) );

		// Get options for post type.
		add_action( 'wp', array( $this, 'adjust_post_type_comment_settings' ) );
	}

	/**
	 * Adjust comments for post type settings if available.
	 */
	public function adjust_post_type_comment_settings() {

		if ( ! is_singular() && ! is_page() ) {
			return;
		}

		// Get options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];

		// Get post type.
		$post_type = get_post_type();

		// If post type is not set, return.
		if ( ! $post_type ) {
			return;
		}

		// If post type is not set in settings, return.
		if ( ! isset( $post_type_settings[ $post_type ] ) ) {
			return;
		}

		// Get post type settings.
		$post_type_settings = $post_type_settings[ $post_type ];

		// If comments are set, set them.
		if ( isset( $post_type_settings['force_comments'] ) && 'default' !== $post_type_settings['force_comments'] ) {
			if ( 'closed' === $post_type_settings['force_comments'] ) {
				add_filter( 'comments_open', '__return_false', 9999 );
			} elseif ( 'open' === $post_type_settings['force_comments'] ) {
				add_filter( 'comments_open', '__return_true', 9999 );
			}
		}

		// If pingbacks are set, set them.
		if ( isset( $post_type_settings['force_pingbacks'] ) && 'default' !== $post_type_settings['force_pingbacks'] ) {
			if ( 'closed' === $post_type_settings['force_pingbacks'] ) {
				add_filter( 'pings_open', '__return_false', 9999 );
			} elseif ( 'open' === $post_type_settings['force_pingbacks'] ) {
				add_filter( 'pings_open', '__return_true', 9999 );
			}
		}

		// If comments are hidden, hide them.
		if ( isset( $post_type_settings['hide_comment_section'] ) && true === $post_type_settings['hide_comment_section'] ) {
			if ( ! is_admin() ) {
				add_filter( 'comments_array', '__return_empty_array', 9999 );
			}
		}
	}

	/**
	 * Retrieve Post Type Settings via Ajax.
	 */
	public function ajax_get_post_type_comment_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-tools-post-type-comment-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Retrieve options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];
		$public_post_types  = Functions::get_public_post_types();

		// Convert to return array.
		$json_array = array();
		foreach ( $public_post_types as $post_type => $post_type_attrs ) {
			$json_array[ $post_type ]          = isset( $post_type_settings[ $post_type ] ) ? $post_type_settings[ $post_type ] : array();
			$json_array[ $post_type ]['label'] = $post_type_attrs->label;
			$json_array[ $post_type ]['name']  = $post_type_attrs->name;
		}

		// Send response.
		wp_send_json_success(
			array(
				'postTypeSettings' => $json_array,
			)
		);
	}

	/**
	 * Save post type settings via Ajax.
	 */
	public function ajax_save_post_type_comment_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-tools-post-type-comment-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get post type settings and sanitize.
		$post_type_settings = Functions::sanitize_array_recursive( filter_input( INPUT_POST, 'postTypeSettings', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );

		Options_Tools::update_options( array( 'comment_post_type_settings' => $post_type_settings ) );

		// Send response.
		wp_send_json_success();
	}

	/**
	 * Retrieve comment activity options.
	 */
	public function ajax_get_comment_activity() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-tools-expiration' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$comment_activity_options = Options_Tools::get_options();

		// Convert keys to camelcase.
		$return_array = array();
		foreach ( $comment_activity_options as $key => $value ) {
			$return_array[ Functions::to_camelcase( $key ) ] = $value;
		}

		// Send response.
		wp_send_json_success( $return_array );
	}

	/**
	 * Retrieve comment activity options.
	 */
	public function ajax_save_comment_activity() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-tools-expiration' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$save_array                                       = array();
		$save_array['enable_comment_activity_expiration'] = filter_input( INPUT_POST, 'enableCommentActivityExpiration', FILTER_VALIDATE_BOOLEAN );
		$save_array['comment_activity_expiration']        = filter_input( INPUT_POST, 'commentActivityExpiration', FILTER_VALIDATE_INT );
		$save_array['comment_activity_post_types']        = Functions::sanitize_array_recursive( filter_input( INPUT_POST, 'commentActivityPostTypes', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$save_array['enable_comment_activity_per_post']   = filter_input( INPUT_POST, 'enableCommentActivityPerPost', FILTER_VALIDATE_BOOLEAN );

		Options_Tools::update_options( $save_array );

		// Send response.
		wp_send_json_success();
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab     = Functions::get_admin_tab();
		$current_sub_tab = Functions::get_admin_sub_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'tools' === $current_tab && ( 'comment-activity' === $current_sub_tab || null === $current_sub_tab ) ) {
			wp_enqueue_script(
				'sce-tools-comment-activity',
				Functions::get_plugin_url( 'dist/sce-tools-comment-activity.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-tools-comment-activity',
				'sceToolsCommentActivity',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-expiration' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-expiration' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
					'post_types' => Functions::get_public_post_types(),
				)
			);
		}
		if ( 'tools' === $current_tab && ( 'post-types' === $current_sub_tab ) ) {
			wp_enqueue_script(
				'sce-tools-post-type-comment-settings',
				Functions::get_plugin_url( 'dist/sce-tools-post-type-comment-settings.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-tools-post-type-comment-settings',
				'sceToolsPostTypeCommentSettings',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-post-type-comment-settings' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-post-type-comment-settings' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
					'post_types' => Functions::get_public_post_types(),
				)
			);
		}
	}
}
