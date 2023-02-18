<?php
/**
 * Helper fuctions for Webhooks tab.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Webhooks
 */
class Webhooks {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Avatar admin panel actions.
		 */

		// Save avatar settings in the admin.
		add_action( 'wp_ajax_sce_save_avatar_options', array( $this, 'ajax_save_avatar_options' ) );

		// Save gravatar settings in the admin.
		add_action( 'wp_ajax_sce_save_gravatar_options', array( $this, 'ajax_save_gravatar_options' ) );

		// Retrieve avatar settings in the admin.
		add_action( 'wp_ajax_sce_get_webhooks', array( $this, 'ajax_get_webhooks' ) );

		// Retrieve avatar settings in the admin.
		add_action( 'wp_ajax_sce_get_gravatar_options', array( $this, 'ajax_get_gravatar_options' ) );

		// Init webhook post type.
		add_action( 'init', array( $this, 'register_post_type_init' ) );

		// Init tab JS.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );
	}

	/**
	 * Register the Webhooks post type.
	 */
	public function register_post_type_init() {
		// Register post types.
		$post_type_args = array(
			'public'             => false,
			'publicly_queryable' => false,
			'show_ui'            => false,
			'show_in_menu'       => false,
			'query_var'          => false,
			'rewrite'            => false,
			'has_archive'        => false,
			'hierarchical'       => false,
			'supports'           => false,
		);

		/**
		 * Allow other plugins to modify the post type creation arguments.
		 *
		 * @since 3.0.0
		 *
		 * @param array $post_type_args Post type arguments prior to registering the post type.
		 */
		$post_type_args = apply_filters( 'sce_webhook_post_type_args', $post_type_args );
		register_post_type(
			'sce_webhooks',
			$post_type_args
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
		$options = Options::get_options();
		if ( 'webhooks' === $current_tab ) {
			wp_enqueue_script(
				'sce-webhooks',
				Functions::get_plugin_url( 'dist/sce-webhooks-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-webhooks',
				'sceWebhooks',
				array(
					'save_nonce'      => wp_create_nonce( 'sce-save-webhook' ),
					'get_nonce'       => wp_create_nonce( 'sce-retrieve-webhooks' ),
					'ajaxurl'         => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}

	/**
	 * Get avatar options.
	 */
	public function ajax_get_webhooks() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-webhooks' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$avatar_options = Options::get_options();

		$query_args = array(
			'post_type' => 'sce_webhooks',
			'posts_per_page' => 100,
			'post_status' => 'publish',
			'suppress_filters' => true,
		);
		$webhooks = get_posts( $query_args );

		$return = array(
			'webhooks' => $webhooks,
		);

		// Exit gracefully.
		wp_send_json_success( $return );
	}

	/**
	 * Get Gravatar options.
	 */
	public function ajax_get_gravatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$avatar_options = Options::get_options();

		$json_array = array(
			'enableGravatarProtection' => $avatar_options['enable_gravatar_protection'],
			'gravatarProtectionText'   => $avatar_options['gravatar_protection_text'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_save_avatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		$options_to_save = array(
			'enable_avatars'            => filter_input( INPUT_POST, 'enableAvatars', FILTER_VALIDATE_BOOLEAN ),
			'avatar_size'               => absint( filter_input( INPUT_POST, 'avatarSize', FILTER_VALIDATE_INT ) ),
			'enable_avatars_logged_in'  => filter_input( INPUT_POST, 'enableAvatarsLoggedIn', FILTER_VALIDATE_BOOLEAN ),
			'enable_custom_avatar_size' => filter_input( INPUT_POST, 'enableCustomAvatarSize', FILTER_VALIDATE_BOOLEAN ),
			'choose_avatar_text'        => sanitize_text_field( filter_input( INPUT_POST, 'chooseAvatarText', FILTER_DEFAULT ) ),
		);

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
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

	/**
	 * Save gravatar options.
	 */
	public function ajax_save_gravatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		$options_to_save = array(
			'enable_gravatar_protection' => filter_input( INPUT_POST, 'enableGravatarProtection', FILTER_VALIDATE_BOOLEAN ),
			'gravatar_protection_text'   => sanitize_text_field( filter_input( INPUT_POST, 'gravatarProtectionText', FILTER_DEFAULT ) ),
		);

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
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
