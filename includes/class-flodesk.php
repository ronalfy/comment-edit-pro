<?php
/**
 * Helper fuctions for ConvertKit.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions;
use CommentEditPro\Includes\Options;

/**
 * Class Flodesk
 */
class Flodesk {

	/**
	 * Flodesk API variable endpoint.
	 *
	 * @var string Flodesk API variable.
	 */
	private $flodesk_api = 'https://api.flodesk.com/v1';

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Flodesk admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_flodesk_options', array( $this, 'ajax_save_flodesk_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_flodesk_options', array( $this, 'ajax_get_flodesk_options' ) );

		// Refresh or Initialize Flodesk credentials.
		add_action( 'wp_ajax_sce_refresh_flodesk_connection', array( $this, 'ajax_refresh_flodesk_connection' ) );

		// Refresh segments for a Flodesk account.
		add_action( 'wp_ajax_sce_refresh_flodesk_segments', array( $this, 'ajax_refresh_flodesk_segments' ) );

		// Refresh custom fields for a ConvertKit account.
		add_action( 'wp_ajax_sce_refresh_flodesk_custom_fields', array( $this, 'ajax_refresh_flodesk_custom_fields' ) );

		// Add a custom field to ConvertKit account.
		add_action( 'wp_ajax_sce_add_flodesk_custom_field', array( $this, 'ajax_add_flodesk_custom_field' ) );

		// Add Flodesk Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_flodesk_checkbox' ), 100 );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );

		// Add frontend scripts and styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );

		// Add ConvertKit localized nonces.
		add_filter( 'sce_integrations_localized_vars', array( $this, 'add_flodesk_localized_vars' ) );

		// Add Comment Meta Box for convertkit status.
		add_action( 'admin_init', array( $this, 'add_comment_meta_box' ) );
	}

	/**
	 * Return if Flodesk is active and valid.
	 *
	 * @return bool true if active, false if not.
	 */
	private function is_flodesk_enabled_and_valid() {
		$options = Options::get_options();

		// Make sure convertkit is enabled and valid.
		if ( ! (bool) $options['enable_flodesk'] || ! (bool) $options['flodesk_api_valid'] ) {
			return false;
		}

		return true;
	}

	/**
	 * Add a comment meta box for convertkit status displays.
	 */
	public function add_comment_meta_box() {
		if ( $this->is_flodesk_enabled_and_valid() ) {
			add_meta_box(
				'sce-flodesk',
				__( 'Comment Flodesk History', 'comment-edit-pro' ),
				array( $this, 'output_flodesk_comment_meta' ),
				'comment',
				'normal'
			);
		}
	}

	/**
	 * Send Flodesk when a comment has been posted.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$signup_enabled = (bool) filter_input( INPUT_POST, 'sce-flodesk-signup', FILTER_VALIDATE_BOOLEAN );

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

		// Get options.
		$options = Options::get_options();

		// Make sure flodesk is enabled and valid.
		if ( ! (bool) $options['enable_flodesk'] || ! (bool) $options['flodesk_api_valid'] ) {
			return false;
		}

		// Get API and secret.
		$api_key = $options['flodesk_api_key'];

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
			'Content-Type'  => 'application/json',
		);

		// Get any tags.
		$segments = array();
		$segments = get_option( 'sce_flodesk_segments', array() );

		// Get selected segments.
		$selected_segments = array();
		foreach ( $segments as $segment ) {
			if ( isset( $segment['selected'] ) && (bool) $segment['selected'] ) {
				$selected_segments[] = $segment['value'];
			}
		}

		// Get any custom fields.
		$custom_fields = array();
		$custom_fields = get_option( 'sce_flodesk_custom_fields', array() );

		// Map custom fields to value.
		$selected_custom_fields = array();
		foreach ( $custom_fields as $index => $custom_field ) {
			if ( 'none' !== $custom_field['field'] ) {
				$custom_field_value     = '';
				$custom_field_raw_value = $custom_field['field'];
				if ( 'custom' === $custom_field_raw_value ) {
					$custom_field_value = $custom_field['field_value'];
				} else {
					$custom_field_value = $this->map_request_header( $custom_field_raw_value, $comment );
				}
				$selected_custom_fields[ $custom_field['value'] ] = $custom_field_value;
			}
		}

		// Get comment meta with flodesk data.
		$comment_meta = get_comment_meta( $comment_id, 'sce_flodesk_data', true );
		if ( ! is_array( $comment_meta ) ) {
			$comment_meta = array();
		}

		// Get comment.
		$comment = get_comment( $comment_id );

		// Get API Endpoint.
		$api_endpoint = $this->flodesk_api . '/subscribers';

		// Build body.
		$http_args['body'] = wp_json_encode(
			array(
				'email'         => $email,
				'first_name'    => $comment->comment_author,
				'custom_fields' => $selected_custom_fields,
				'segment_ids'   => $selected_segments,
				'optin_ip'      => $comment->comment_author_IP,
				'double_optin'  => (bool) $options['flodesk_double_optin_enabled'],
			)
		);

		// Make API call.
		$response = wp_remote_post( $api_endpoint, $http_args );

		// Check for errors.
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return false;
		} else {
			// Get response body.
			$response_body = wp_remote_retrieve_body( $response );
			$response_body = json_decode( $response_body, true );

			$this->add_flodesk_comment_meta( $comment_id, $response );
		}
		return true;
	}

	/**
	 * Add a new Custom Field to Flodesk.
	 */
	public function ajax_add_flodesk_custom_field() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-add-flodesk-custom-field' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options = Options::get_options();
		$api_key = sanitize_text_field( $options['flodesk_api_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
			'Content-Type'  => 'application/json',
		);
		$http_args['body']    = wp_json_encode(
			array(
				'label' => sanitize_text_field( filter_input( INPUT_POST, 'label', FILTER_DEFAULT ) ),
			)
		);

		// Get endpoints.
		$custom_fields_api_endpoint = esc_url_raw( $this->flodesk_api . '/custom-fields' );

		// Add custom field.
		$custom_fields_api_response = wp_remote_post( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not communicate with Flodesk.', 'comment-edit-pro' ) ) );
		}
		$custom_fields_api_response_code = wp_remote_retrieve_response_code( $custom_fields_api_response );
		if ( 200 !== $custom_fields_api_response_code && 201 !== $custom_fields_api_response_code ) {
			wp_send_json_error( array( 'message' => __( 'Could not add Custom Field to Flodesk.', 'comment-edit-pro' ) ) );
		}

		// Retrieve all custom fields.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		$custom_fields_api_endpoint = esc_url_raw( $this->flodesk_api . '/custom-fields/all' );
		$custom_fields_api_response = wp_remote_get( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Custom Fields from ConvertKit.', 'comment-edit-pro' ) ) );
		}

		// Get tags as an option.
		$existing_custom_fields = (array) get_option( 'sce_flodesk_custom_fields', array() );

		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$custom_fields                 = $custom_fields_raw;
		$sanitized_custom_field_values = array();
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['label'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);

			// Add in the field map.
			if ( ! empty( $existing_custom_fields ) ) {
				foreach ( $existing_custom_fields as $existing_custom_field ) {
					if ( $existing_custom_field['value'] !== $sanitized_custom_field_values[ $index ]['value'] ) {
						continue;
					}
					$sanitized_custom_field_values[ $index ]['field']        = $existing_custom_field['field'] ?? 'none';
					$sanitized_custom_field_values[ $index ]['field_custom'] = $existing_custom_field['field_custom'] ?? '';
				}
			}
		}

		// Save custom fields as an option.
		update_option( 'sce_flodesk_custom_fields', $sanitized_custom_field_values );

		// Return tags.
		wp_send_json_success(
			array(
				'customFields' => $sanitized_custom_field_values,
				'apiValid'     => true,
			)
		);
	}

	/**
	 * Add ConvertKit comment meta.
	 *
	 * @param int             $comment_id The Comment ID.
	 * @param WP_Error|Object $response The response object.
	 */
	private function add_flodesk_comment_meta( $comment_id, $response ) {
		$comment_meta = get_comment_meta( $comment_id, 'sce_flodesk_data', true );
		if ( ! is_array( $comment_meta ) ) {
			$comment_meta = array();
		}

		if ( is_wp_error( $response ) ) {
			// Log error.
			$comment_meta[] = array(
				'success'     => false,
				'error'       => $response->get_error_message(),
				'status_code' => false,
			);
		} elseif ( null === $response ) {
			// Log error.
			$comment_meta[] = array(
				'success'     => false,
				'error'       => __( 'No response received.', 'comment-edit-pro' ),
				'status_code' => false,
			);
		} else {
			// Get status code.
			$status_code = wp_remote_retrieve_response_code( $response );
			if ( 200 === $status_code ) {
				$comment_meta[] = array(
					'success'     => true,
					'error'       => false,
					'status_code' => $status_code,
				);
			} else {
				$error_comment_meta = array(
					'success'     => false,
					'status_code' => $status_code,
				);
				// Try to get error code from webhook.
				$response_body = wp_remote_retrieve_body( $response );
				$response_body = json_decode( $response_body, true );
				if ( is_array( $response_body ) && isset( $response_body['error'] ) ) {
					if ( isset( $response_body['error']['message'] ) ) {
						$error_comment_meta['error'] = $response_body['error']['message'];
					}
				} elseif ( is_array( $response_body ) && isset( $response_body['message'] ) ) {
					$error_comment_meta['error'] = $response_body['message'];
				} else {
					$error_comment_meta['error'] = $status_code;
				}
			}
		}

		update_comment_meta( $comment_id, 'sce_flodesk_data', $comment_meta );
	}

	/**
	 * Map a request header to a comment value.
	 *
	 * @param string     $request_key Request key to retrieve the value for.
	 * @param WP_Comment $comment     The comment object.
	 */
	private function map_request_header( $request_key, $comment ) {
		switch ( $request_key ) {
			case 'commenter_name':
				return $comment->comment_author;
			case 'commenter_email':
				return $comment->comment_author_email;
			case 'commenter_website':
				return $comment->comment_author_url;
			case 'comment_content':
				return $comment->comment_content;
			case 'comment_id':
				return $comment->comment_ID;
			case 'comment_parent_id':
				return $comment->comment_parent;
			case 'comment_post_id':
				return $comment->comment_post_ID;
			case 'comment_post_title':
				return get_the_title( $comment->comment_post_ID );
			case 'comment_post_url':
				return get_permalink( $comment->comment_post_ID );
			case 'comment_author_ip':
				return $comment->comment_author_IP;
			case 'comment_author_user_agent':
				return $comment->comment_agent;
			case 'comment_date':
				return $comment->comment_date;
			case 'comment_date_gmt':
				return $comment->comment_date_gmt;
			case 'comment_approved':
				return $comment->comment_approved;
			case 'comment_type':
				return $comment->comment_type;
			default:
				return '';
		}
	}

	/**
	 * Add an mailchimp option below the comment textarea and above the submit button.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_flodesk_checkbox( $comment_fields ) {
		$options = Options::get_options();

		// Check to see if ConvertKit is enabled. Skip if can moderate.
		if ( ! $this->is_flodesk_enabled_and_valid() || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = (bool) $options['flodesk_checkbox_enabled'];
		$flodesk_html                    = array(
			'sce-flodesk' => sprintf(
				'<section class="comment-form-sce-flodesk"><label><input type="checkbox" name="sce-flodesk-signup" %s /> %s</label></section>',
				checked( $checked_by_default, true, false ),
				esc_html( $options['flodesk_signup_label'] )
			),
		);
		$comment_fields['submit_button'] = $flodesk_html['sce-flodesk'] . $comment_fields['submit_button'];
		return $comment_fields;
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_flodesk_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-flodesk-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Refresh Flodesk API data if needed once per week.
		$refresh_transient = get_transient( 'sce_flodesk_refresh' );
		if ( ! $refresh_transient ) {
			$options = Options::get_options();

			// Get the API key credentials.
			$api_valid       = (bool) $options['flodesk_api_valid'];
			$flodesk_enabled = (bool) $options['enable_flodesk'];

			// If API key is valid, get the keys.
			if ( $api_valid && $flodesk_enabled ) {
				$api_key        = $options['flodesk_api_key'];
				$api_secret_key = $options['flodesk_secret_key'];
				$this->connect_to_api_return_fresh_data( $api_key, $api_secret_key );
				exit;
			}
		}

		// Retrieve Flodesk options for return.
		$json_array = $this->get_flodesk_values_for_return();

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Return the options for Convertkit for return.
	 */
	private function get_flodesk_values_for_return() {
		$force   = true;
		$options = Options::get_options( $force );
		$segments      = get_option( 'sce_flodesk_segments', array() );
		$custom_fields = get_option( 'sce_flodesk_custom_fields', array() );

		$json_array = array(
			'enableFlodesk'             => (bool) $options['enable_flodesk'],
			'apiValid'                  => (bool) $options['flodesk_api_valid'],
			'apiKey'                    => $options['flodesk_api_key'],
			'signUpLabel'               => $options['flodesk_signup_label'],
			'checkboxEnabled'           => (bool) $options['flodesk_checkbox_enabled'],
			'segments'                  => $segments,
			'customFields'              => $custom_fields,
			'selectedForm'              => $options['flodesk_selected_form'],
			'flodeskDoubleOptinEnabled' => (bool) $options['flodesk_double_optin_enabled'],
		);
		return $json_array;
	}

	/**
	 * Clears out the ConvertKit Options and resets to defaults.
	 */
	private function reset_flodesk_credentials() {
		$options_to_save = array(
			'enable_flodesk'           => false,
			'flodesk_api_key'          => '',
			'flodesk_secret_key'       => '',
			'flodesk_signup_label'     => __( 'Please subscribe to our newsletter', 'comment-edit-pro' ),
			'flodesk_checkbox_enabled' => false,
			'flodesk_api_valid'        => false,
		);
		delete_option( 'sce_flodesk_forms' );
		delete_option( 'sce_flodesk_tags' );
		delete_option( 'sce_flodesk_custom_fields' );

		Options::update_options( $options_to_save );
	}

	/**
	 * Save Flodesk options.
	 */
	public function ajax_save_flodesk_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-flodesk-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get enabled status.
		$flodesk_enabled = (bool) filter_input( INPUT_POST, 'enableFlodesk', FILTER_VALIDATE_BOOLEAN );

		// If convertkit is disabled, let's clear out some keys.
		if ( ! $flodesk_enabled ) {
			$this->reset_flodesk_credentials();

			// Return new options.
			$json_array = $this->get_flodesk_values_for_return();
			wp_send_json_success(
				$json_array
			);
			exit;
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get post vars.
		$api_key                      = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$flodesk_checkbox_enabled     = (bool) filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$signup_label                 = sanitize_text_field( filter_input( INPUT_POST, 'signUpLabel', FILTER_DEFAULT ) );
		$segments                     = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'segments', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$custom_fields                = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'customFields', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$flodesk_double_optin_enabled = (bool) filter_input( INPUT_POST, 'flodeskDoubleOptinEnabled', FILTER_VALIDATE_BOOLEAN );

		// Now let's save options.
		$options_to_save = array(
			'enable_flodesk'               => $flodesk_enabled,
			'flodesk_api_key'              => $api_key,
			'flodesk_signup_label'         => $signup_label,
			'flodesk_checkbox_enabled'     => $flodesk_checkbox_enabled,
			'flodesk_api_valid'            => true,
			'flodesk_double_optin_enabled' => $flodesk_double_optin_enabled,
		);
		Options::update_options( $options_to_save );

		// Save forms, tags, custom fields.
		update_option( 'sce_flodesk_segments', $segments );
		update_option( 'sce_flodesk_custom_fields', $custom_fields );

		// Return saved form fields.
		$json_array = $this->get_flodesk_values_for_return();
		wp_send_json_success( $json_array );
		exit;
	}

	/**
	 * Update ConvertKit API data periodically.
	 *
	 * @param string $api_key    API key.
	 *
	 * @return void JSON errors|success if any.
	 */
	private function connect_to_api_return_fresh_data( $api_key ) {
		$options = Options::get_options( true );
		// Now let's set aside some options to save.
		$options_to_save = array(
			'enable_flodesk'  => (bool) $options['enable_flodesk'],
			'flodesk_api_key' => $api_key,
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get endpoints.
		$subscribers_api_url   = esc_url_raw( $this->flodesk_api . '/subscribers' );
		$segments_api_url      = esc_url_raw( $this->flodesk_api . '/segments' );
		$custom_fields_api_url = esc_url_raw( $this->flodesk_api . '/custom-fields/all' );

		// Check Account.
		$account_http_args = $http_args;

		// Try to get subscribers. If this fails, we know the API key is invalid.
		$subscribers_api_resonse = wp_remote_get( $subscribers_api_url, $account_http_args );
		if ( is_wp_error( $subscribers_api_resonse ) || 200 !== wp_remote_retrieve_response_code( $subscribers_api_resonse ) ) {
			$options_to_save['flodesk_api_valid'] = false;
			Options::update_options( $options_to_save );
			wp_send_json_error( array( 'message' => __( 'Could not connect to Flodesk.', 'comment-edit-pro' ) ) );
		}

		// Make API call.
		$segments_api_response      = wp_remote_get( $segments_api_url, $http_args );
		$custom_fields_api_response = wp_remote_get( $custom_fields_api_url, $http_args );

		if ( is_wp_error( $segments_api_response ) || 200 !== wp_remote_retrieve_response_code( $segments_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Flodesk Segments.', 'comment-edit-pro' ) ) );
		}
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Flodesk custom fields.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$segments                      = json_decode( wp_remote_retrieve_body( $segments_api_response ), true );
		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$segments                      = $segments['data'] ?? array();
		$custom_fields                 = $custom_fields_raw ?? array();
		$sanitized_segment_values      = array();
		$sanitized_custom_field_values = array();
		foreach ( $segments as $index => $values ) {
			$sanitized_segment_values[ $index ] = array(
				'label' => sanitize_text_field( $segments[ $index ]['name'] ),
				'value' => sanitize_text_field( $segments[ $index ]['id'] ),
			);
		}
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['label'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);
		}

		// Save list in option.
		update_option( 'sce_flodesk_segments', $sanitized_segment_values );
		update_option( 'sce_flodesk_custom_fields', $sanitized_custom_field_values );

		// Save options.
		$options_to_save['flodesk_api_valid'] = true;
		Options::update_options( $options_to_save );

		// Save transient for refresh.
		set_transient( 'sce_flodesk_refresh', true, WEEK_IN_SECONDS );

		// Return saved form fields.
		$json_array = $this->get_flodesk_values_for_return();
		wp_send_json_success( $json_array );
	}

	/**
	 * Refresh or initialize ConvertKit connection.
	 */
	public function ajax_refresh_flodesk_connection() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-flodesk-connection' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear old options.
		$this->reset_flodesk_credentials();

		// Nonce passed, let's get post vars.
		$flodesk_enabled = (bool) filter_input( INPUT_POST, 'enableFlodesk', FILTER_VALIDATE_BOOLEAN );
		$api_key         = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );

		// If convertkit enabled, update options with convert kit enabled.
		if ( $flodesk_enabled ) {
			$options_to_save['enable_flodesk'] = true;
			Options::update_options( $options_to_save );
		}

		// Get API data. Expect a json return exit if credentials are bad.
		$this->connect_to_api_return_fresh_data( $api_key );

		// We shouldn't make it this far, but exit just in case.
		exit;
	}

	/**
	 * Refresh ConvertKit Tags.
	 */
	public function ajax_refresh_flodesk_segments() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-flodesk-segments' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options = Options::get_options();
		$api_key = sanitize_text_field( $options['flodesk_api_key'] );
		// Get tags as an option.
		$existing_segments = (array) get_option( 'sce_convertkit_segments', array() );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get endpoints.
		$segments_api_endoint = esc_url_raw( $this->flodesk_api . '/segments' );

		$segments_api_response = wp_remote_get( $segments_api_endoint, $http_args );
		if ( is_wp_error( $segments_api_response ) || 200 !== wp_remote_retrieve_response_code( $segments_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve tags from ConvertKit.', 'comment-edit-pro' ) ) );
		}

		$segments_raw              = json_decode( wp_remote_retrieve_body( $segments_api_response ), true );
		$segments                  = $segments_raw['data'];
		$sanitized_segments_values = array();
		foreach ( $segments as $index => $values ) {
			$sanitized_segments_values[ $index ] = array(
				'label' => sanitize_text_field( $segments[ $index ]['name'] ),
				'value' => sanitize_text_field( $segments[ $index ]['id'] ),
			);

			// Check if tag is selected (saved).
			if ( ! empty( $existing_segments ) ) {
				foreach ( $existing_segments as $existing_segment ) {
					if ( $existing_segment['value'] !== $sanitized_segments_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_segment['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_segments_values[ $index ]['selected'] = true;
					} else {
						$sanitized_segments_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		update_option( 'sce_convertkit_segments', $sanitized_segments_values );

		// Return tags.
		wp_send_json_success(
			array(
				'tags'     => $sanitized_segments_values,
				'apiValid' => true,
			)
		);
	}

	/**
	 * Refresh ConvertKit Custom Fields.
	 */
	public function ajax_refresh_flodesk_custom_fields() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-flodesk-custom-fields' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options = Options::get_options();
		$api_key = sanitize_text_field( $options['flodesk_api_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Basic ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'api_key' => $api_key,
		);

		// Get endpoints.
		$custom_fields_api_endpoint = esc_url_raw( $this->flodesk_api . '/custom-fields/all' );

		$custom_fields_api_response = wp_remote_get( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve tags from Flodesk.', 'comment-edit-pro' ) ) );
		}

		// Get custom fields as an option.
		$existing_custom_fields = (array) get_option( 'sce_flodesk_custom_fields', array() );

		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$custom_fields                 = $custom_fields_raw;
		$sanitized_custom_field_values = array();
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['label'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);

			// Add in the field map.
			if ( ! empty( $existing_custom_fields ) ) {
				foreach ( $existing_custom_fields as $existing_custom_field ) {
					if ( $existing_custom_field['value'] !== $sanitized_custom_field_values[ $index ]['value'] ) {
						continue;
					}
					$sanitized_custom_field_values[ $index ]['field']        = $existing_custom_field['field'] ?? 'none';
					$sanitized_custom_field_values[ $index ]['field_custom'] = $existing_custom_field['field_custom'] ?? '';
				}
			}
		}

		// Save custom fields as an option.
		update_option( 'sce_flodesk_custom_fields', $sanitized_custom_field_values );

		// Return tags.
		wp_send_json_success(
			array(
				'customFields' => $sanitized_custom_field_values,
				'apiValid'     => true,
			)
		);
	}

	/**
	 * Ajax helper for determining if Flodesk connection is valid.
	 */
	private function output_connection_json_errors() {
		$options            = Options::get_options();
		$convertkit_enabled = (bool) $options['enable_flodesk'];
		$api_key            = sanitize_text_field( $options['flodesk_api_key'] );
		$api_valid          = (bool) $options['flodesk_api_valid'];

		if ( ! $convertkit_enabled ) {
			wp_send_json_error(
				array(
					'message' => __( 'Flodesk is not enabled.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_valid ) {
			wp_send_json_error(
				array(
					'message' => __( 'Flodesk API is not valid. Please refresh your connection.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_key ) {
			wp_send_json_error(
				array(
					'message' => __( 'Flodesk API credentials are not valid. Please refresh your connection.', 'comment-edit-pro' ),
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
			$options         = Options::get_options();
			$flodesk_enabled = (bool) $options['enable_flodesk'];
			if ( ! $flodesk_enabled ) {
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
	public function add_flodesk_localized_vars( $vars ) {
		$convertkit_vars = array(
			'flodesk_save_nonce'                  => wp_create_nonce( 'sce-save-flodesk-options' ),
			'flodesk_refresh_nonce'               => wp_create_nonce( 'sce-refresh-flodesk-connection' ),
			'flodesk_get_nonce'                   => wp_create_nonce( 'sce-retrieve-flodesk-options' ),
			'flodesk_reset_nonce'                 => wp_create_nonce( 'sce-reset-flodesk-options' ),
			'flodesk_refresh_segments_nonce'      => wp_create_nonce( 'sce-refresh-flodesk-segments' ),
			'flodesk_refresh_custom_fields_nonce' => wp_create_nonce( 'sce-refresh-flodesk-custom-fields' ),
			'flodesk_add_segments_nonce'          => wp_create_nonce( 'sce-add-flodesk-segments' ),
			'flodesk_add_custom_field_nonce'      => wp_create_nonce( 'sce-add-flodesk-custom-field' ),
		);
		return array_merge( $vars, $convertkit_vars );
	}

	/**
	 * Output ConvertKit status for a commment.
	 *
	 * @param WP_Comment $comment The comment object.
	 */
	public function output_flodesk_comment_meta( $comment ) {
		$comment_meta = get_comment_meta( $comment->comment_ID, 'sce_flodesk_data', true );
		if ( ! $comment_meta ) {
			?>
			<p><?php esc_html_e( 'No Flodesk events have been sent for this comment.', 'comment-edit-pro' ); ?></p>
			<?php
			return;
		}

		?>
			<table class="widefat striped">
				<thead>
					<tr>
						<th scope="col"><?php esc_html_e( 'Success', 'comment-edit-pro' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Status Code', 'comment-edit-pro' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Error Message', 'comment-edit-pro' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php
					foreach ( $comment_meta as $index => $flodesk_data ) :
						?>
						<tr>
							<td>
								<?php
								if ( isset( $flodesk_data['success'] ) ) {
									if ( $flodesk_data['success'] ) {
										esc_html_e( 'Yes', 'comment-edit-pro' );
									} else {
										esc_html_e( 'No', 'comment-edit-pro' );
									}
								} else {
									esc_html_e( 'Unknown', 'comment-edit-pro' );
								}
								?>
							</td>
							<td>
								<?php
								if ( isset( $flodesk_data['status_code'] ) ) {
									echo esc_html( $flodesk_data['status_code'] );
								} else {
									esc_html_e( 'Unknown', 'comment-edit-pro' );
								}
								?>
							</td>
							<td>
								<?php
								if ( isset( $flodesk_data['error'] ) && $flodesk_data['error'] ) {
									if ( is_string( $flodesk_data['error'] ) ) {
										echo esc_html( $flodesk_data['error'] );
									} else {
										esc_html_e( 'Unknown error', 'comment-edit-pro' );
									}
								} else {
									esc_html_e( 'No known errors', 'comment-edit-pro' );
								}
								?>
							</td>
						</tr>
						<?php
						endforeach;
					?>
				</tbody>
				<tfoot>
					<tr>
						<th scope="col"><?php esc_html_e( 'Success', 'comment-edit-pro' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Status Code', 'comment-edit-pro' ); ?></th>
						<th scope="col"><?php esc_html_e( 'Error Message', 'comment-edit-pro' ); ?></th>
					</tr>
				</tfoot>
			</table>
			<?php
	}
}
