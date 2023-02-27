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
	private $convertkit_api = 'https://api.convertkit.com/v3';

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

		// Refresh or Initialize ConvertKit credentials.
		add_action( 'wp_ajax_sce_refresh_convertkit_connection', array( $this, 'ajax_refresh_convertkit_connection' ) );

		// Add a tag to ConvertKit account.
		add_action( 'wp_ajax_sce_add_convertkit_tag', array( $this, 'ajax_add_convertkit_tag' ) );

		// Add a tag to ConvertKit account.
		add_action( 'wp_ajax_sce_refresh_convertkit_tags', array( $this, 'ajax_refresh_convertkit_tags' ) );

		// Reset ConvertKit API key.
		add_action( 'wp_ajax_sce_reset_convertkit_options', array( $this, 'ajax_reset_convertkit_options' ) );

		// Add ConvertKit Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_convertkit_checkbox' ), 100 );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );

		// Add frontend scripts and styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );

		// Add ConvertKit localized nonces.
		add_filter( 'sce_integrations_localized_vars', array( $this, 'add_convertkit_localized_vars' ) );
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

		$commenter_name     = $comment->comment_author;
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
		$options            = Options::get_options();
		$convertkit_enabled = (bool) $options['enable_convertkit'];

		// Chceck to see if ConvertKit is enabled.
		if ( ! $convertkit_enabled || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = (bool) $options['convertkit_checkbox_enabled'];
		$convertkit_html                 = array(
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
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-convertkit-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();
		if ( Functions::is_multisite() ) {
			$forms = get_site_option( 'sce_convertkit_forms', array() );
			$tags  = get_site_option( 'sce_convertkit_tags', array() );
		} else {
			$forms = get_option( 'sce_convertkit_forms', array() );
			$tags  = get_option( 'sce_convertkit_tags', array() );
		}

		$json_array = array(
			'enableConvertKit' => (bool) $options['enable_convertkit'],
			'apiValid'         => (bool) $options['convertkit_api_valid'],
			'apiKey'           => $options['convertkit_api_key'],
			'secretKey'        => $options['convertkit_secret_key'],
			'signUpLabel'      => $options['convertkit_signup_label'],
			'checkboxEnabled'  => (bool) $options['convertkit_checkbox_enabled'],
			'formOrTag'        => $options['convertkit_form_or_tag'],
			'forms'            => $forms,
			'tags'             => $tags,
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ConvertKit options.
	 */
	public function ajax_save_convertkit_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-convertkit-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$convertkit_enabled          = (bool) filter_input( INPUT_POST, 'enableConvertKit', FILTER_VALIDATE_BOOLEAN );
		$api_key                     = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$api_secret_key              = sanitize_text_field( filter_input( INPUT_POST, 'secretKey', FILTER_DEFAULT ) );
		$convertkit_checkbox_enabled = (bool) filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$signup_label                = sanitize_text_field( filter_input( INPUT_POST, 'signUpLabel', FILTER_DEFAULT ) );
		$form_or_tag                 = sanitize_text_field( filter_input( INPUT_POST, 'formOrTag', FILTER_DEFAULT ) );
		$selected_form               = absint( filter_input( INPUT_POST, 'selectedForm', FILTER_DEFAULT ) );
		$selected_tags               = array_map( 'absint', filter_input( INPUT_POST, 'selectedTags', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		// Check that form or tag is set.
		if ( empty( $form_or_tag ) ) {
			$form_or_tag = 'tag';
		}

		// If convertkit is disabled, let's clear out some keys.
		if ( ! $convertkit_enabled ) {
			$options_to_save = array(
				'enable_convertkit'           => false,
				'convertkit_api_key'          => '',
				'convertkit_secret_key'       => '',
				'convertkit_signup_label'     => __( 'Sign Up for Updates', 'comment-edit-pro' ),
				'convertkit_checkbox_enabled' => false,
				'convertkit_selected_form'    => 0,
				'convertkit_selected_tags'    => array(),
				'convertkit_form_or_tag'      => 'tag',
			);
			if ( Functions::is_multisite() ) {
				delete_site_option( 'sce_convertkit_forms' );
				delete_site_option( 'sce_convertkit_tags' );
			} else {
				delete_option( 'sce_convertkit_forms' );
				delete_option( 'sce_convertkit_tags' );
			}

			Options::update_options( $options_to_save );
			wp_send_json_success(
				array(
					'forms' => array(),
					'tags'  => array(),
				)
			);
			exit;
		}

		// Now let's save options.
		$options_to_save = array(
			'enable_convertkit'           => $convertkit_enabled,
			'convertkit_api_key'          => $api_key,
			'convertkit_secret_key'       => $api_secret_key,
			'convertkit_signup_label'     => $signup_label,
			'convertkit_checkbox_enabled' => $convertkit_checkbox_enabled,
			'convertkit_form_or_tag'      => $form_or_tag,
			'convertkit_selected_form'    => $selected_form,
			'convertkit_selected_tags'    => $selected_tags,
		);
		Options::update_options( $options_to_save );

		// Let's check if convertkit key has changed and if so, let's grab the list again.
		$needs_refresh = false;
		$options       = Options::get_options();
		if ( '' === $options['convertkit_selected_form'] && empty( $options['convertkit_selected_tags'] ) ) {
			$needs_refresh = true;
		}

		// If we don't need to refresh the list, let's not do it.
		if ( ! $needs_refresh ) {
			// Exit gracefully.
			if ( Functions::is_multisite() ) {
				$convertkit_forms = get_site_option( 'sce_convertkit_forms', array() );
				$convertkit_tags  = get_site_option( 'sce_convertkit_tags', array() );
			} else {
				$convertkit_forms = get_option( 'sce_convertkit_forms', array() );
				$convertkit_tags  = get_option( 'sce_convertkit_tags', array() );
			}
			$options_to_save['forms'] = $convertkit_forms;
			$options_to_save['tags']  = $convertkit_tags;
			wp_send_json_success( $options_to_save );
			exit;
		}

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key' => $api_key,
		);

		// Get forms endpoint.
		$forms_api_url = esc_url_raw( $this->convertkit_api . '/forms' );
		$tags_api_url  = esc_url_raw( $this->convertkit_api . '/tags' );

		// Make API call.
		$forms_api_response = wp_remote_get( $forms_api_url, $http_args );
		$tags_api_response  = wp_remote_get( $tags_api_url, $http_args );

		if ( is_wp_error( $forms_api_response ) || 200 !== wp_remote_retrieve_response_code( $forms_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not connect to ConvertKit.', 'comment-edit-pro' ) ) );
		}
		if ( is_wp_error( $tags_api_response ) || 200 !== wp_remote_retrieve_response_code( $tags_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not connect to ConvertKit.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$forms_raw             = json_decode( wp_remote_retrieve_body( $forms_api_response ), true );
		$tags_raw              = json_decode( wp_remote_retrieve_body( $forms_api_response ), true );
		$forms                 = $forms_raw['forms'] ?? array();
		$tags                  = $tags_raw['tags'] ?? array();
		$sanitized_form_values = array();
		$sanitized_tag_values  = array();
		foreach ( $forms as $index => $values ) {
			$sanitized_form_values[ $index ] = array(
				'label' => sanitize_text_field( $forms[ $index ]['name'] ),
				'value' => sanitize_text_field( $forms[ $index ]['id'] ),
			);
		}
		foreach ( $tags as $index => $values ) {
			$sanitized_tag_values[ $index ] = array(
				'label' => sanitize_text_field( $forms[ $index ]['name'] ),
				'value' => sanitize_text_field( $forms[ $index ]['id'] ),
			);
		}

		// Save list in option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_convertkit_forms', $sanitized_form_values );
			update_site_option( 'sce_convertkit_tags', $sanitized_tag_values );
		} else {
			update_option( 'sce_convertkit_forms', $sanitized_form_values );
			update_option( 'sce_convertkit_tags', $sanitized_tag_values );
		}

		// When no forms were found, return error. Tags can be empty.
		if ( empty( $sanitized_form_values ) && 'form' === $form_or_tag ) {
			wp_send_json_error( array( 'message' => __( 'There are no ConvertKit forms that were found.', 'comment-edit-pro' ) ) );
			exit;
		}

		wp_send_json_success(
			array(
				'forms'         => $sanitized_form_values,
				'tags'          => $sanitized_tag_values,
				'selected_form' => $selected_form,
				'selected_tags' => $selected_tags,
			)
		);
		exit;
	}

	/**
	 * Refresh or initialize ConvertKit connection.
	 */
	public function ajax_refresh_convertkit_connection() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-convertkit-connection' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$convertkit_enabled = (bool) filter_input( INPUT_POST, 'enableConvertKit', FILTER_VALIDATE_BOOLEAN );
		$api_key            = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$api_secret_key     = sanitize_text_field( filter_input( INPUT_POST, 'secretKey', FILTER_DEFAULT ) );

		// Now let's set aside some options to save.
		$options_to_save = array(
			'enable_convertkit'     => $convertkit_enabled,
			'convertkit_api_key'    => $api_key,
			'convertkit_secret_key' => $api_secret_key,
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key' => $api_key,
		);

		// Get endpoints.
		$forms_api_url   = esc_url_raw( $this->convertkit_api . '/forms' );
		$tags_api_url    = esc_url_raw( $this->convertkit_api . '/tags' );
		$account_api_url = esc_url_raw( $this->convertkit_api . '/account' );

		// Check Account.
		$account_http_args                       = $http_args;
		$account_http_args['body']['api_secret'] = $api_secret_key;

		// Make Credentials/Account check Call.
		$account_api_response = wp_remote_get( $account_api_url, $account_http_args );
		if ( is_wp_error( $account_api_response ) || 200 !== wp_remote_retrieve_response_code( $account_api_response ) ) {
			$options_to_save['convertkit_api_valid'] = false;
			Options::update_options( $options_to_save );
			wp_send_json_error( array( 'message' => __( 'Could not connect to ConvertKit.', 'comment-edit-pro' ) ) );
		}

		// Make API call.
		$forms_api_response = wp_remote_get( $forms_api_url, $http_args );
		$tags_api_response  = wp_remote_get( $tags_api_url, $http_args );

		if ( is_wp_error( $forms_api_response ) || 200 !== wp_remote_retrieve_response_code( $forms_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve ConvertKit forms.', 'comment-edit-pro' ) ) );
		}
		if ( is_wp_error( $tags_api_response ) || 200 !== wp_remote_retrieve_response_code( $tags_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve ConvertKit tags.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$forms_raw             = json_decode( wp_remote_retrieve_body( $forms_api_response ), true );
		$tags_raw              = json_decode( wp_remote_retrieve_body( $forms_api_response ), true );
		$forms                 = $forms_raw['forms'] ?? array();
		$tags                  = $tags_raw['tags'] ?? array();
		$sanitized_form_values = array();
		$sanitized_tag_values  = array();
		foreach ( $forms as $index => $values ) {
			$sanitized_form_values[ $index ] = array(
				'label' => sanitize_text_field( $forms[ $index ]['name'] ),
				'value' => sanitize_text_field( $forms[ $index ]['id'] ),
			);
		}
		foreach ( $tags as $index => $values ) {
			$sanitized_tag_values[ $index ] = array(
				'label' => sanitize_text_field( $forms[ $index ]['name'] ),
				'value' => sanitize_text_field( $forms[ $index ]['id'] ),
			);
		}

		// Save list in option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_convertkit_forms', $sanitized_form_values );
			update_site_option( 'sce_convertkit_tags', $sanitized_tag_values );
		} else {
			update_option( 'sce_convertkit_forms', $sanitized_form_values );
			update_option( 'sce_convertkit_tags', $sanitized_tag_values );
		}

		// Save options.
		$options_to_save['convertkit_api_valid'] = true;
		Options::update_options( $options_to_save );

		wp_send_json_success(
			array(
				'forms'    => $sanitized_form_values,
				'tags'     => $sanitized_tag_values,
				'apiValid' => true,
			)
		);
		exit;
	}

	/**
	 * Refresh ConvertKit Tags.
	 */
	public function ajax_refresh_convertkit_tags() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-convertkit-tags' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options            = Options::get_options();
		$api_key            = sanitize_text_field( $options['convertkit_api_key'] );
		$api_secret_key     = sanitize_text_field( $options['convertkit_secret_key'] );
		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			$existing_tags =  filter_var( get_site_option( 'sce_convertkit_tags', array() ), FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
		} else {
			$existing_tags = filter_var( get_option( 'sce_convertkit_tags', array() ), FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
		}

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key'    => $api_key,
			'api_secret' => $api_secret_key,
		);

		// Get endpoints.
		$tags_api_endpoint = esc_url_raw( $this->convertkit_api . '/tags' );

		$tags_api_response = wp_remote_get( $tags_api_endpoint, $http_args );
		if ( is_wp_error( $tags_api_response ) || 200 !== wp_remote_retrieve_response_code( $tags_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve tags from ConvertKit.', 'comment-edit-pro' ) ) );
		}

		$tags_raw = json_decode( wp_remote_retrieve_body( $tags_api_response ), true );
		$tags     = $tags_raw['tags'];
		foreach ( $tags as $index => $values ) {
			$sanitized_tag_values[ $index ] = array(
				'label' => sanitize_text_field( $tags[ $index ]['name'] ),
				'value' => sanitize_text_field( $tags[ $index ]['id'] ),
			);

			// Check if tag is selected (saved).
			if ( ! empty( $existing_tags ) ) {
				foreach ( $existing_tags as $existing_tag ) {
					$selected_value = (bool) $existing_tag['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_tag_values[ $index ]['selected'] = true;
					} else {
						$sanitized_tag_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_convertkit_tags', $sanitized_tag_values );
		} else {
			update_option( 'sce_convertkit_tags', $sanitized_tag_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'tags'     => $sanitized_tag_values,
				'apiValid' => true,
			)
		);
	}

	/**
	 * Add a new Tag to ConvertKit.
	 */
	public function ajax_add_convertkit_tag() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-add-convertkit-tag' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options            = Options::get_options();
		$api_key            = sanitize_text_field( $options['convertkit_api_key'] );
		$api_secret_key     = sanitize_text_field( $options['convertkit_secret_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key'    => $api_key,
			'api_secret' => $api_secret_key,
		);

		// Get endpoints.
		$tags_api_endpoint = esc_url_raw( $this->convertkit_api . '/tags' );

		// Make Credentials/Account check Call.
		$tags_api_response = wp_remote_get( $tags_api_endpoint, $http_args );
		if ( is_wp_error( $tags_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not communicate with ConvertKit.', 'comment-edit-pro' ) ) );
		}
		$tags_api_response_code = wp_remote_retrieve_response_code( $tags_api_response );

		// Pretty sure this is a duplication error.
		if ( 422 === $tags_api_response_code ) {
			$tags_api_response_body = json_decode( wp_remote_retrieve_body( $tags_api_response ), true );
			$tag_error = $tags_api_response_body['error'];
			if ( 'Unprocessable Entity' === $tag_error ) {
				wp_send_json_error( array( 'message' => __( 'Tag already exists.', 'comment-edit-pro' ) ) );
			}
		}

		if ( 429 === $tags_api_response_code ) {
			$tags_api_response_body = json_decode( wp_remote_retrieve_body( $tags_api_response ), true );
			$tag_error = $tags_api_response_body['error'];
			wp_send_json_error( array( 'message' => __( 'API Rate limits have been exceeded.', 'comment-edit-pro' ) ) );
		}

		if ( ( 201 !== $tags_api_response_code && 200 !== $tags_api_response_code ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve tags from ConvertKit.', 'comment-edit-pro' ) ) );
		}

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key'    => $api_key,
			'api_secret' => $api_secret_key,
		);

		$tags_api_response = wp_remote_get( $tags_api_endpoint, $http_args );
		if ( is_wp_error( $tags_api_response ) || 200 !== wp_remote_retrieve_response_code( $tags_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve tags from ConvertKit.', 'comment-edit-pro' ) ) );
		}

		$tags_raw = json_decode( wp_remote_retrieve_body( $tags_api_response ), true );
		$tags     = $tags_raw['tags'];
		foreach ( $tags as $index => $values ) {
			$sanitized_tag_values[ $index ] = array(
				'label' => sanitize_text_field( $tags[ $index ]['name'] ),
				'value' => sanitize_text_field( $tags[ $index ]['id'] ),
			);
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_convertkit_tags', $sanitized_tag_values );
		} else {
			update_option( 'sce_convertkit_tags', $sanitized_tag_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'tags'     => $sanitized_tag_values,
				'apiValid' => true,
			)
		);
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
	 * Ajax helper for determining if ConvertKit connection is valid.
	 */
	private function output_connection_json_errors() {
		$options            = Options::get_options();
		$convertkit_enabled = (bool) $options['enable_convertkit'];
		$api_key            = sanitize_text_field( $options['convertkit_api_key'] );
		$api_secret_key     = sanitize_text_field( $options['convertkit_secret_key'] );
		$api_valid          = (bool) $options['convertkit_api_valid'];

		if ( ! $convertkit_enabled ) {
			wp_send_json_error(
				array(
					'message' => __( 'ConvertKit is not enabled.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_valid ) {
			wp_send_json_error(
				array(
					'message' => __( 'ConvertKit API is not valid. Please refresh your connection.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_key || ! $api_secret_key ) {
			wp_send_json_error(
				array(
					'message' => __( 'ConvertKit API credentials are not valid. Please refresh your connection.', 'comment-edit-pro' ),
				)
			);
		}
	}

	/**
	 * Add frontend scripts/styles.
	 */
	public function add_frontend_scripts_styles() {
		// Determine if comments are open.
		if ( comments_open() ) {
			$options            = Options::get_options();
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

	/**
	 * Callback for adding localized vars to integration settings.
	 *
	 * @param array $vars Associative array of key/value pairs.
	 */
	public function add_convertkit_localized_vars( $vars ) {
		$convertkit_vars = array(
			'ck_save_nonce'               => wp_create_nonce( 'sce-save-convertkit-options' ),
			'ck_refresh_nonce'            => wp_create_nonce( 'sce-refresh-convertkit-connection' ),
			'ck_get_nonce'                => wp_create_nonce( 'sce-retrieve-convertkit-options' ),
			'ck_reset_nonce'              => wp_create_nonce( 'sce-reset-convertkit-options' ),
			'ck_refresh_tags_nonce' => wp_create_nonce( 'sce-refresh-convertkit-tags' ),
			'ck_refresh_forms_nonce' => wp_create_nonce( 'sce-refresh-convertkit-forms' ),
			'ck_refresh_custom_fields_nonce' => wp_create_nonce( 'sce-refresh-convertkit-custom-fields' ),
			'ck_add_tag_nonce'            => wp_create_nonce( 'sce-add-convertkit-tag' ),
		);
		return array_merge( $vars, $convertkit_vars );
	}
}
