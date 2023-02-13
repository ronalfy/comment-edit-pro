<?php
/**
 * Helper fuctions for Comment Editing admin settings.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Comment Editing
 */
class Comment_Editing {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_comment_editing_options', array( $this, 'ajax_save_comment_editing_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_comment_editing_options', array( $this, 'ajax_get_comment_editing_options' ) );

		// Reset Mailchimp API key.
		add_action( 'wp_ajax_sce_reset_comment_editing_options', array( $this, 'ajax_reset_comment_editing_options' ) );

		// Load comment editing admin scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );
	}

	/**
	 * Get comment editing options.
	 */
	public function ajax_get_comment_editing_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-comment-editing-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();

		$json_array = array(
			'timer'       => absint( $options['timer'] ),
			'enableCommentEditing' => (bool) $options['enable_comment_editing'],
			'allowCommentLogging' => (bool) $options['allow_comment_logging'],
			'allowFrontEndEditing' => (bool) $options['allow_front_end_editing'],
			'allowUnlimitedEditing' => (bool) $options['allow_unlimited_editing'],
			'showStopTimer' => (bool) $options['show_stop_timer'],
			'allowDelete' => (bool) $options['allow_delete'],
			'deleteOnly' => (bool) $options['delete_only'],
			'allowDeleteConfirmation' => (bool) $options['allow_delete_confirmation'],
			'allowEditNotification' => (bool) $options['allow_edit_notification'],
			'editNotificationTo' => sanitize_text_field( $options['edit_notification_to'] ),
			'editNotificationFrom' => sanitize_text_field( $options['edit_notification_from'] ),
			'editNotificationSubject' => sanitize_text_field( $options['edit_notification_subject'] ),
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save comment editing options.
	 */
	public function ajax_save_comment_editing_options() {
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
		$mailchimp_enabled          = (bool) filter_input( INPUT_POST, 'enableMailchimp', FILTER_VALIDATE_BOOLEAN );
		$api_token                  = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$api_server_prefix          = sanitize_text_field( filter_input( INPUT_POST, 'mailchimpServerPrefix', FILTER_DEFAULT ) );
		$selected_list              = sanitize_text_field( filter_input( INPUT_POST, 'selectedList', FILTER_DEFAULT ) );
		$mailchimp_checkbox_enabled = (bool) filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$signup_label               = sanitize_text_field( filter_input( INPUT_POST, 'signUpLabel', FILTER_DEFAULT ) );

		// If mailchimp is disabled, let's clear out some keys.
		if ( ! $mailchimp_enabled ) {
			$options_to_save = array(
				'enable_mailchimp'                => false,
				'mailchimp_api_key'               => '',
				'mailchimp_api_key_server_prefix' => '',
				'mailchimp_selected_list'         => '',
				'mailchimp_signup_label'          => __( 'Sign Up for Updates', 'comment-edit-pro' ),
				'mailchimp_checkbox_enabled'      => true,
			);
			if ( Functions::is_multisite() ) {
				delete_site_option( 'sce_mailchimp_lists' );
			} else {
				delete_option( 'sce_mailchimp_lists' );
			}

			// todo: clear mailchimp lists option.

			Options::update_options( $options_to_save );
			wp_send_json_success( array( 'list' => false ) );
			exit;
		}

		// Now let's save options.
		$options_to_save = array(
			'enable_mailchimp'                => $mailchimp_enabled,
			'mailchimp_api_key'               => $api_token,
			'mailchimp_api_key_server_prefix' => $api_server_prefix,
			'mailchimp_selected_list'         => $selected_list,
			'mailchimp_signup_label'          => $signup_label,
			'mailchimp_checkbox_enabled'      => $mailchimp_checkbox_enabled,
		);
		Options::update_options( $options_to_save );

		// Let's check if mailchimp key has changed and if so, let's grab the list again.
		$needs_refresh = false;
		$options       = Options::get_options();
		if ( '' === $options['mailchimp_selected_list'] ) {
			$needs_refresh = true;
		}

		// If we don't need to refresh the list, let's not do it.
		if ( ! $needs_refresh ) {
			// Exit gracefully.
			if ( Functions::is_multisite() ) {
				$mailchimp_lists = get_site_option( 'sce_mailchimp_lists', array() );
			} else {
				$mailchimp_lists = get_option( 'sce_mailchimp_lists', array() );
			}
			$options_to_save['lists'] = $mailchimp_lists;
			wp_send_json_success( $options_to_save );
			exit;
		}

		// Format API url for a server prefix..
		$mailchimp_api_url = str_replace(
			'<sp>',
			$api_server_prefix,
			$this->mailchimp_api
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_token,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get lists endpoint.
		$lists_api_url = esc_url_raw( $mailchimp_api_url . '/lists' );

		// Make API call.
		$response = wp_remote_get( $lists_api_url, $http_args );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not connect to Mailchimp.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$lists_raw        = json_decode( wp_remote_retrieve_body( $response ), true );
		$lists            = $lists_raw['lists'] ?? array();
		$sanitized_values = array();
		foreach ( $lists as $index => $values ) {
			$sanitized_values[ $index ] = array(
				'label' => sanitize_text_field( $lists[ $index ]['name'] ),
				'value' => sanitize_text_field( $lists[ $index ]['id'] ),
			);
		}

		// Save list in option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailchimp_lists', $sanitized_values );
		} else {
			update_option( 'sce_mailchimp_lists', $sanitized_values );
		}

		// When no lists were found, return error.
		if ( empty( $sanitized_values ) ) {
			wp_send_json_error( array( 'message' => __( 'There are no Mailchimp lists that were found.', 'comment-edit-pro' ) ) );
			exit;
		}

		wp_send_json_success(
			array(
				'list'          => true,
				'lists'         => $sanitized_values,
				'selected_list' => $options['mailchimp_selected_list'],
			)
		);
		exit;
	}

	/**
	 * Reset Comment Editing Options.
	 */
	public function ajax_reset_comment_editing_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Remove list options.
		if ( Functions::is_multisite() ) {
			delete_site_option( 'sce_mailchimp_lists' );
		} else {
			delete_option( 'sce_mailchimp_lists' );
		}

		// Clear options.
		Options::update_options(
			array(
				'enable_mailchimp'                => false,
				'mailchimp_api_key'               => '',
				'mailchimp_api_key_server_prefix' => '',
				'mailchimp_selected_list'         => '',
				'mailchimp_signup_label'          => __( 'Sign Up for Updates', 'comment-edit-pro' ),
				'mailchimp_checkbox_enabled'      => false,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Mailchimp options have been reset.', 'comment-edit-pro' ),
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
		if ( 'comment-editing' === $current_tab ) {
			wp_enqueue_script(
				'sce-comment-editing',
				Functions::get_plugin_url( 'dist/sce-comment-editing.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-comment-editing',
				'sceCommentEditing',
				array(
					'save_nonce'  => wp_create_nonce( 'sce-save-comment-editing-options' ),
					'get_nonce'   => wp_create_nonce( 'sce-retrieve-comment-editing-options' ),
					'reset_nonce' => wp_create_nonce( 'sce-reset-comment-editing-options' ),
					'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}
}
