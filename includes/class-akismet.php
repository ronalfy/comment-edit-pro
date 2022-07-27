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
 * Class Akismet
 */
class Akismet {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Akismet admin panel actions.
		 */

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_akismet_options', array( $this, 'ajax_get_akismet_options' ) );
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_akismet_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$akismet_api_key_valid = false;
		if ( class_exists( 'Akismet' ) ) {
			$akismet_api_key = \Akismet::get_api_key();
			if ( $akismet_api_key ) {
				$akismet_api_key_valid = true;
			}
		}

		$options    = Options::get_options();
		$json_array = array(
			'akismetActive'              => $options['akismet_active'],
			'akismetEnabled'             => $options['akismet_enabled'],
			'akismetEditCommentsEnabled' => $options['akismet_edit_comments_enabled'],
			'akismetApiValid'            => $akismet_api_key_valid,
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save mailchimp options.
	 */
	public function ajax_save_mailchimp_options() {
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
		$mailchimp_enabled          = filter_input( INPUT_POST, 'enableMailchimp', FILTER_VALIDATE_BOOLEAN );
		$api_token                  = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$api_server_prefix          = sanitize_text_field( filter_input( INPUT_POST, 'mailchimpServerPrefix', FILTER_DEFAULT ) );
		$selected_list              = sanitize_text_field( filter_input( INPUT_POST, 'selectedList', FILTER_DEFAULT ) );
		$mailchimp_checkbox_enabled = filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
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
	 * Reset Mailchimp Options.
	 */
	public function ajax_reset_mailchimp_options() {
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
}
