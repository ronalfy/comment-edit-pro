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

		// Save a single webhook in the admin.
		add_action( 'wp_ajax_sce_save_webhook', array( $this, 'ajax_save_webhook' ) );

		// Deletes a single webhook in the admin.
		add_action( 'wp_ajax_sce_delete_webhook', array( $this, 'ajax_delete_webhook' ) );

		// Retrieve a single webhook settings in the admin.
		add_action( 'wp_ajax_sce_retrieve_webhook', array( $this, 'ajax_retrieve_webhook' ) );

		// Retrieve existing webhooks settings in the admin.
		add_action( 'wp_ajax_sce_get_webhooks', array( $this, 'ajax_get_webhooks' ) );

		// Disable a webhook.
		add_action( 'wp_ajax_sce_disable_webhook', array( $this, 'ajax_disable_webhook' ) );

		// Enable a webhook.
		add_action( 'wp_ajax_sce_enable_webhook', array( $this, 'ajax_enable_webhook' ) );

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
					'save_nonce'        => wp_create_nonce( 'sce-save-webhook' ),
					'get_nonce'         => wp_create_nonce( 'sce-retrieve-webhooks' ),
					'get_webhook_nonce' => wp_create_nonce( 'sce-retrieve-webhook' ),
					'ajaxurl'           => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);

			// Add styles.
			wp_enqueue_script(
				'sce-webhooks-css',
				Functions::get_plugin_url( 'dist/sce-webhooks-admin-css.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}

	/**
	 * Deletes a webhook via Ajax.
	 */
	public function ajax_delete_webhook() {
		$nonce      = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$webhook_id = absint( filter_input( INPUT_POST, 'id', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-delete-webhook-' . $webhook_id ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get webhook.
		$webhook = get_post( $webhook_id );
		if ( ! $webhook ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not find webhook.', 'comment-edit-pro' ),
				)
			);
		}

		// Delete webhook.
		//wp_delete_post( $webhook_id, true );

		// Exit gracefully.
		wp_send_json_success(
			array(
				'id' => $webhook_id,
			)
		);
	}

	/**
	 * Disable a webhook via Ajax.
	 */
	public function ajax_disable_webhook() {
		$nonce      = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$webhook_id = absint( filter_input( INPUT_POST, 'id', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-disable-webhook-' . $webhook_id ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get webhook.
		$webhook = get_post( $webhook_id );
		if ( ! $webhook ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not find webhook.', 'comment-edit-pro' ),
				)
			);
		}

		// Update enabled post meta.
		update_post_meta( $webhook_id, 'enabled', false );

		// Exit gracefully.
		wp_send_json_success();
	}

	/**
	 * Enable a webhook via Ajax.
	 */
	public function ajax_enable_webhook() {
		 $nonce     = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$webhook_id = absint( filter_input( INPUT_POST, 'id', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-enable-webhook-' . $webhook_id ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get webhook.
		$webhook = get_post( $webhook_id );
		if ( ! $webhook ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not find webhook.', 'comment-edit-pro' ),
				)
			);
		}

		// Update enabled post meta.
		update_post_meta( $webhook_id, 'enabled', true );

		// Exit gracefully.
		wp_send_json_success();
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

		$query_args = array(
			'post_type'        => 'sce_webhooks',
			'posts_per_page'   => 100,
			'post_status'      => 'publish',
			'suppress_filters' => true,
		);
		$webhooks   = get_posts( $query_args );

		// Get webhooks for return.
		$webhooks_array = array();
		foreach ( $webhooks as $webhook ) {
			$webhook_id       = $webhook->ID;
			$webhook_url      = esc_url_raw( $webhook->post_content );
			$webhook_enabled  = (bool) get_post_meta( $webhook_id, 'enabled', true );
			$webhook_to_add   = array(
				'id'            => $webhook_id,
				'name'          => sanitize_text_field( stripslashes_deep( $webhook->post_title ) ),
				'enabled'       => $webhook_enabled,
				'url'           => $webhook_url,
				'edit_nonce'    => wp_create_nonce( 'sce-edit-webhook-' . $webhook_id ),
				'delete_nonce'  => wp_create_nonce( 'sce-delete-webhook-' . $webhook_id ),
				'disable_nonce' => wp_create_nonce( 'sce-disable-webhook-' . $webhook_id ),
				'enable_nonce'  => wp_create_nonce( 'sce-enable-webhook-' . $webhook_id ),
			);
			$webhooks_array[] = $webhook_to_add;
		}

		$return = array(
			'webhooks' => $webhooks_array,
		);

		// Exit gracefully.
		wp_send_json_success( $return );
	}

	/**
	 * Get single webhook or create and return new webhook.
	 */
	public function ajax_retrieve_webhook() {
		$nonce      = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$webhook_id = absint( filter_input( INPUT_POST, 'webhook_id', FILTER_DEFAULT ) );

		// If webhook_id is 0, then verify nonce for creating a new webhook.
		if ( 0 === $webhook_id ) {
			if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-webhook' ) || ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					array(
						'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
					)
				);
			}
		} else {
			// Security.
			if ( ! wp_verify_nonce( $nonce, 'sce-edit-webhook-' . $webhook_id ) || ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					array(
						'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
					)
				);
			}
		}

		// If webhook_id is 0, then create a new webhook.
		if ( 0 === $webhook_id ) {
			// Get existing drafts and remove them.
			$query_args = array(
				'post_type'        => 'sce_webhooks',
				'posts_per_page'   => 100,
				'post_status'      => 'draft',
				'suppress_filters' => true,
			);
			$webhooks   = get_posts( $query_args );
			foreach ( $webhooks as $webhook ) {
				wp_delete_post( $webhook->ID, true );
			}

			$webhook_id = wp_insert_post(
				array(
					'post_type'   => 'sce_webhooks',
					'post_status' => 'draft',
				)
			);

			// Set some defaults.
			update_post_meta( $webhook_id, 'enabled', true );
			update_post_meta( $webhook_id, 'send_approved', true );

			// Format data for return.
			$webhook = get_post( $webhook_id );

			// Send json response.
			wp_send_json_success(
				array(
					'webhook'    => $webhook,
					'webhook_id' => $webhook_id,
					'nonce'      => wp_create_nonce( 'sce-save-webhook-' . $webhook_id ),
				)
			);
			exit;
		}

		// Get the webhook.
		$webhook = get_post( $webhook_id );
		if ( ! $webhook ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not retrieve webhook.', 'comment-edit-pro' ),
				)
			);
		}

		$request_headers = get_post_meta( $webhook_id, 'request_headers', true );
		if ( ! $request_headers ) {
			$request_headers = array();
		} else {
			$request_headers = json_decode( wp_json_encode( $request_headers ) );
		}

		$request_body = get_post_meta( $webhook_id, 'request_body', true );
		if ( ! $request_body ) {
			$request_body = array();
		} else {
			$request_body = json_decode( wp_json_encode( $request_body ) );
		}

		// Format data for return.
		$json_return = array(
			'name'                 => sanitize_text_field( stripslashes_deep( $webhook->post_title ) ),
			'webhookEnabled'       => (bool) get_post_meta( $webhook_id, 'enabled', true ),
			'webhookUrl'           => sanitize_text_field( $webhook->post_content ),
			'requestMethod'        => sanitize_text_field( get_post_meta( $webhook_id, 'request_method', true ) ),
			'requestFormat'        => sanitize_text_field( get_post_meta( $webhook_id, 'request_format', true ) ),
			'requestHeaders'       => $request_headers,
			'requestBody'          => $request_body,
			'sendApprovedComments' => (bool) get_post_meta( $webhook_id, 'send_approved', true ),
			'sendPendingComments'  => (bool) get_post_meta( $webhook_id, 'send_pending', true ),
			'sendSpamComments'     => (bool) get_post_meta( $webhook_id, 'send_spam', true ),
			'sendDeletedComments'  => (bool) get_post_meta( $webhook_id, 'send_deleted', true ),
			'sendEditedComments'   => (bool) get_post_meta( $webhook_id, 'send_edited', true ),
		);

		// Send json response.
		wp_send_json_success(
			array(
				'form'       => $json_return,
				'webhook'    => $webhook,
				'webhook_id' => $webhook_id,
				'nonce'      => wp_create_nonce( 'sce-save-webhook-' . $webhook_id ),
			)
		);
	}

	/**
	 * Save New Webhook.
	 */
	public function ajax_save_webhook() {
		$nonce      = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$webhook_id = absint( filter_input( INPUT_POST, 'webhook_id', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-webhook-' . $webhook_id ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get the webhook name.
		$webhook_name = sanitize_text_field( filter_input( INPUT_POST, 'name', FILTER_DEFAULT ) );

		// Get webhook enabled status.
		$webhook_enabled = filter_input( INPUT_POST, 'webhookEnabled', FILTER_VALIDATE_BOOLEAN );

		// Get the webhook URL.
		$webhook_url = esc_url_raw( filter_input( INPUT_POST, 'webhookUrl', FILTER_DEFAULT ) );

		// Get request method.
		$request_method = sanitize_text_field( filter_input( INPUT_POST, 'requestMethod', FILTER_DEFAULT ) );

		// Get request format.
		$request_format = sanitize_text_field( filter_input( INPUT_POST, 'requestFormat', FILTER_DEFAULT ) );

		// Get request headers.
		$request_headers = filter_input( INPUT_POST, 'requestHeaders', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		// Get request body.
		$request_body = filter_input( INPUT_POST, 'requestBody', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		// Get triggers.
		$send_approved = filter_input( INPUT_POST, 'sendApprovedComments', FILTER_VALIDATE_BOOLEAN );
		$send_pending  = filter_input( INPUT_POST, 'sendPendingComments', FILTER_VALIDATE_BOOLEAN );
		$send_spam     = filter_input( INPUT_POST, 'sendSpamComments', FILTER_VALIDATE_BOOLEAN );
		$send_deleted  = filter_input( INPUT_POST, 'sendDeletedComments', FILTER_VALIDATE_BOOLEAN );
		$send_edited   = filter_input( INPUT_POST, 'sendEditedComments', FILTER_VALIDATE_BOOLEAN );

		// Get webhook post.
		$webhook = get_post( $webhook_id );
		if ( ! $webhook ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not retrieve webhook.', 'comment-edit-pro' ),
				)
			);
		}

		// Update webhook post.
		$webhook->post_title   = $webhook_name;
		$webhook->post_content = $webhook_url;
		$webhook->post_status  = $webhook_enabled ? 'publish' : 'draft';
		wp_update_post( $webhook );

		// Update webhook meta.
		update_post_meta( $webhook_id, 'enabled', $webhook_enabled );
		update_post_meta( $webhook_id, 'request_method', $request_method );
		update_post_meta( $webhook_id, 'request_format', $request_format );
		update_post_meta( $webhook_id, 'request_headers', $request_headers );
		update_post_meta( $webhook_id, 'request_body', $request_body );
		update_post_meta( $webhook_id, 'send_approved', $send_approved );
		update_post_meta( $webhook_id, 'send_pending', $send_pending );
		update_post_meta( $webhook_id, 'send_spam', $send_spam );
		update_post_meta( $webhook_id, 'send_deleted', $send_deleted );
		update_post_meta( $webhook_id, 'send_edited', $send_edited );

		// Create nonces for return.
		$edit_nonce    = wp_create_nonce( 'sce-edit-webhook-' . $webhook_id );
		$delete_nonce  = wp_create_nonce( 'sce-delete-webhook-' . $webhook_id );
		$disable_nonce = wp_create_nonce( 'sce-disable-webhook-' . $webhook_id );
		$enable_nonce  = wp_create_nonce( 'sce-enable-webhook-' . $webhook_id );

		// Exit gracefully.
		wp_send_json_success(
			array(
				'name'          => $webhook_name,
				'enabled'       => $webhook_enabled,
				'url'           => $webhook_url,
				'id'            => $webhook_id,
				'edit_nonce'    => $edit_nonce,
				'delete_nonce'  => $delete_nonce,
				'disable_nonce' => $disable_nonce,
				'enable_nonce'  => $enable_nonce,
			)
		);
	}
}
