<?php
/**
 * Helper fuctions for ConvertKit.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class ConvertKit
 */
class ConvertKit {

	/**
	 * ConvertKit API variable endpoint.
	 *
	 * @var string ConvertKit API variable.
	 */
	private $convertkit_api = 'https://api.convertkit.com/v3/';

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * ConvertKit admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_convertkit_options', array( $this, 'ajax_save_convertkit_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_convertkit_options', array( $this, 'ajax_get_convertkit_options' ) );

		// Reset ConvertKit API key.
		add_action( 'wp_ajax_sce_reset_convertkit_options', array( $this, 'ajax_reset_convertkit_options' ) );

		// Add ConvertKit Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_convertkit_checkbox' ), 100 );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );

		// Add frontend scripts and styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );
	}

	/**
	 * Send ConvertKit when a comment has been posted.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$signup_enabled = (bool) filter_input( INPUT_POST, 'sce-mailchimp-signup', FILTER_VALIDATE_BOOLEAN );

		if ( $signup_enabled && 'spam' !== $maybe_comment_approved ) {
			// Get the comment.
			$comment         = get_comment( $comment_id );
			$commenter_email = $comment->comment_author_email;

			$subscriber_added = $this->add_subscriber( $comment_id, $commenter_email, $comment );
		}
	}

	/**
	 * Add a subscriber to mailchimp.
	 *
	 * @param int        $comment_id The comment ID.
	 * @param string     $email      The email address.
	 * @param WP_Comment $comment    The comment object.
	 */
	private function add_subscriber( $comment_id, $email, $comment ) {
		if ( ! is_email( $email ) ) {
			return false;
		}

		$options = Options::get_options();
		$list    = $options['convertkit_selected_list'] ?? '';
		if ( empty( $list ) ) {
			return false;
		}

		// Format API url for a server prefix..
		$convertkit_api_url = str_replace(
			'<sp>',
			$options['convertkit_api_key_server_prefix'],
			$this->convertkit_api
		);

		$commenter_name    = $comment->comment_author;
		$convertkit_api_key = $options['convertkit_api_key'];

		$endpoint = $convertkit_api_url . 'lists/' . $list . '/members/';

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $convertkit_api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = wp_json_encode(
			array(
				'email_address' => $email,
				'status'        => 'pending',
				'merge_fields'  => array(
					'FNAME' => $commenter_name,
				),
			)
		);
		$response             = wp_remote_post( esc_url_raw( $endpoint ), $http_args );
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			// Response code can be 400 if the member already exists.
			return false;
		}

		// Now format response from JSON.
		$response_array = json_decode( wp_remote_retrieve_body( $response ), true );
		// Save subscription ID to comment meta.
		add_comment_meta( $comment_id, 'sce_convertkit_id', $response_array['id'] );
		return true;
	}

	/**
	 * Add an mailchimp option below the comment textarea and above the submit button.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_convertkit_checkbox( $comment_fields ) {
		$options           = Options::get_options();
		$convertkit_enabled = (bool) $options['enable_convertkit'];

		// Chceck to see if ConvertKit is enabled.
		if ( ! $convertkit_enabled || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = (bool) $options['convertkit_checkbox_enabled'];
		$convertkit_html                  = array(
			'sce-mailchimp' => sprintf(
				'<section class="comment-form-sce-mailchimp"><label><input type="checkbox" name="sce-mailchimp-signup" %s /> %s</label></section>',
				checked( $checked_by_default, true, false ),
				esc_html( $options['convertkit_signup_label'] )
			),
		);
		$comment_fields['submit_button'] = $convertkit_html['sce-mailchimp'] . $comment_fields['submit_button'];
		return $comment_fields;
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_convertkit_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();
		$lists   = array();
		if ( Functions::is_multisite() ) {
			$lists = get_site_option( 'sce_convertkit_lists', array() );
		} else {
			$lists = get_option( 'sce_convertkit_lists', array() );
		}

		$json_array = array(
			'enableConvertKit'       => (bool) $options['enable_convertkit'],
			'apiKey'                => $options['convertkit_api_key'],
			'mailchimpServerPrefix' => $options['convertkit_api_key_server_prefix'],
			'mailchimpLists'        => $lists,
			'selectedList'          => $options['convertkit_selected_list'],
			'signUpLabel'           => $options['convertkit_signup_label'],
			'checkboxEnabled'       => (bool) $options['convertkit_checkbox_enabled'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save mailchimp options.
	 */
	public function ajax_save_convertkit_options() {
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
		$convertkit_enabled          = (bool) filter_input( INPUT_POST, 'enableConvertKit', FILTER_VALIDATE_BOOLEAN );
		$api_token                  = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$api_server_prefix          = sanitize_text_field( filter_input( INPUT_POST, 'mailchimpServerPrefix', FILTER_DEFAULT ) );
		$selected_list              = sanitize_text_field( filter_input( INPUT_POST, 'selectedList', FILTER_DEFAULT ) );
		$convertkit_checkbox_enabled = (bool) filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$signup_label               = sanitize_text_field( filter_input( INPUT_POST, 'signUpLabel', FILTER_DEFAULT ) );

		// If mailchimp is disabled, let's clear out some keys.
		if ( ! $convertkit_enabled ) {
			$options_to_save = array(
				'enable_convertkit'                => false,
				'convertkit_api_key'               => '',
				'convertkit_api_key_server_prefix' => '',
				'convertkit_selected_list'         => '',
				'convertkit_signup_label'          => __( 'Sign Up for Updates', 'comment-edit-pro' ),
				'convertkit_checkbox_enabled'      => true,
			);
			if ( Functions::is_multisite() ) {
				delete_site_option( 'sce_convertkit_lists' );
			} else {
				delete_option( 'sce_convertkit_lists' );
			}

			// todo: clear mailchimp lists option.

			Options::update_options( $options_to_save );
			wp_send_json_success( array( 'list' => false ) );
			exit;
		}

		// Now let's save options.
		$options_to_save = array(
			'enable_convertkit'                => $convertkit_enabled,
			'convertkit_api_key'               => $api_token,
			'convertkit_api_key_server_prefix' => $api_server_prefix,
			'convertkit_selected_list'         => $selected_list,
			'convertkit_signup_label'          => $signup_label,
			'convertkit_checkbox_enabled'      => $convertkit_checkbox_enabled,
		);
		Options::update_options( $options_to_save );

		// Let's check if mailchimp key has changed and if so, let's grab the list again.
		$needs_refresh = false;
		$options       = Options::get_options();
		if ( '' === $options['convertkit_selected_list'] ) {
			$needs_refresh = true;
		}

		// If we don't need to refresh the list, let's not do it.
		if ( ! $needs_refresh ) {
			// Exit gracefully.
			if ( Functions::is_multisite() ) {
				$convertkit_lists = get_site_option( 'sce_convertkit_lists', array() );
			} else {
				$convertkit_lists = get_option( 'sce_convertkit_lists', array() );
			}
			$options_to_save['lists'] = $convertkit_lists;
			wp_send_json_success( $options_to_save );
			exit;
		}

		// Format API url for a server prefix..
		$convertkit_api_url = str_replace(
			'<sp>',
			$api_server_prefix,
			$this->convertkit_api
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_token,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get lists endpoint.
		$lists_api_url = esc_url_raw( $convertkit_api_url . '/lists' );

		// Make API call.
		$response = wp_remote_get( $lists_api_url, $http_args );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not connect to ConvertKit.', 'comment-edit-pro' ) ) );
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
			update_site_option( 'sce_convertkit_lists', $sanitized_values );
		} else {
			update_option( 'sce_convertkit_lists', $sanitized_values );
		}

		// When no lists were found, return error.
		if ( empty( $sanitized_values ) ) {
			wp_send_json_error( array( 'message' => __( 'There are no ConvertKit lists that were found.', 'comment-edit-pro' ) ) );
			exit;
		}

		wp_send_json_success(
			array(
				'list'          => true,
				'lists'         => $sanitized_values,
				'selected_list' => $options['convertkit_selected_list'],
			)
		);
		exit;
	}

	/**
	 * Reset ConvertKit Options.
	 */
	public function ajax_reset_convertkit_options() {
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
			delete_site_option( 'sce_convertkit_lists' );
		} else {
			delete_option( 'sce_convertkit_lists' );
		}

		// Clear options.
		Options::update_options(
			array(
				'enable_convertkit'                => false,
				'convertkit_api_key'               => '',
				'convertkit_api_key_server_prefix' => '',
				'convertkit_selected_list'         => '',
				'convertkit_signup_label'          => __( 'Sign Up for Updates', 'comment-edit-pro' ),
				'convertkit_checkbox_enabled'      => false,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'ConvertKit options have been reset.', 'comment-edit-pro' ),
			)
		);

	}

	/**
	 * Add frontend scripts/styles.
	 */
	public function add_frontend_scripts_styles() {
		// Determine if comments are open.
		if ( comments_open() ) {
			$options = Options::get_options();
			$convertkit_enabled = (bool) $options['enable_convertkit'];
			if ( ! $convertkit_enabled ) {
				return;
			}

			// Enqueue frontend styles.
			wp_enqueue_style(
				'sce-frontend',
				Functions::get_plugin_url( 'dist/sce-frontend.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}
}
