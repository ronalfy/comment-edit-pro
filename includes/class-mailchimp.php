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
 * Class Mailchimp
 */
class Mailchimp {

	/**
	 * Mailchimp API variable with <sp> (server prefix) for search/replace.
	 *
	 * @var string Mailchimp API variable.
	 */
	private $mailchimp_api = 'https://<sp>.api.mailchimp.com/3.0/';

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_mailchimp_options', array( $this, 'ajax_save_mailchimp_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_mailchimp_options', array( $this, 'ajax_get_mailchimp_options' ) );

		// Reset Mailchimp API key.
		add_action( 'wp_ajax_sce_reset_mailchimp_options', array( $this, 'ajax_reset_mailchimp_options' ) );

		// Add Mailchimp Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_mailchimp_checkbox' ), 100 );

		// Remove SCE Mailchimp filter.
		add_action( 'init', array( $this, 'remove_simple_comment_editing_mailchimp_filter' ), 100 );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );

		// Add frontend scripts and styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );
	}

	/**
	 * Remove SCE's Mailchimp option to prevent duplicate output.
	 */
	public function remove_simple_comment_editing_mailchimp_filter() {
		if ( class_exists( '\DLXPlugins\CommentEditLite\Simple_Comment_Editing' ) ) {
			$sce = \DLXPlugins\CommentEditLite\Simple_Comment_Editing::get_instance();
			remove_filter( 'comment_form_defaults', array( $sce, 'add_mailchimp_checkbox' ), 100 );
		}
	}

	/**
	 * Send Mailchimp when a comment has been posted.
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
		$list    = $options['mailchimp_selected_list'] ?? '';
		if ( empty( $list ) ) {
			return false;
		}

		// Format API url for a server prefix..
		$mailchimp_api_url = str_replace(
			'<sp>',
			$options['mailchimp_api_key_server_prefix'],
			$this->mailchimp_api
		);

		$commenter_name    = $comment->comment_author;
		$mailchimp_api_key = $options['mailchimp_api_key'];

		$endpoint = $mailchimp_api_url . 'lists/' . $list . '/members/';

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $mailchimp_api_key,
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
		add_comment_meta( $comment_id, 'sce_mailchimp_id', $response_array['id'] );
		return true;
	}

	/**
	 * Add an mailchimp option below the comment textarea and above the submit button.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_mailchimp_checkbox( $comment_fields ) {
		$options           = Options::get_options();
		$mailchimp_enabled = (bool) $options['enable_mailchimp'];

		// Chceck to see if Mailchimp is enabled.
		if ( ! $mailchimp_enabled || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = (bool) $options['mailchimp_checkbox_enabled'];
		$mailchimp_html                  = array(
			'sce-mailchimp' => sprintf(
				'<section class="comment-form-sce-mailchimp"><label><input type="checkbox" name="sce-mailchimp-signup" %s /> %s</label></section>',
				checked( $checked_by_default, true, false ),
				esc_html( $options['mailchimp_signup_label'] )
			),
		);
		$comment_fields['submit_button'] = $mailchimp_html['sce-mailchimp'] . $comment_fields['submit_button'];
		return $comment_fields;
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_mailchimp_options() {
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
			$lists = get_site_option( 'sce_mailchimp_lists', array() );
		} else {
			$lists = get_option( 'sce_mailchimp_lists', array() );
		}

		$json_array = array(
			'enableMailchimp'       => (bool) $options['enable_mailchimp'],
			'apiKey'                => $options['mailchimp_api_key'],
			'mailchimpServerPrefix' => $options['mailchimp_api_key_server_prefix'],
			'mailchimpLists'        => $lists,
			'selectedList'          => $options['mailchimp_selected_list'],
			'signUpLabel'           => $options['mailchimp_signup_label'],
			'checkboxEnabled'       => (bool) $options['mailchimp_checkbox_enabled'],
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
				'mailchimp_checkbox_enabled'      => false,
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

	/**
	 * Add frontend scripts/styles.
	 */
	public function add_frontend_scripts_styles() {
		// Determine if comments are open.
		if ( comments_open() ) {
			$options = Options::get_options();
			$mailchimp_enabled = (bool) $options['enable_mailchimp'];
			if ( ! $mailchimp_enabled ) {
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
