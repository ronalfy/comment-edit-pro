<?php
/**
 * Helper fuctions for MailerLite.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions;
use CommentEditPro\Includes\Options;

/**
 * Class MailerLite
 */
class MailerLite {

	/**
	 * MailerLite API variable endpoint.
	 *
	 * @var string MailerLite API variable.
	 */
	private $mailerlite_api = 'https://connect.mailerlite.com/api';

	/**
	 * MailerLite Classic API variable endpoint.
	 *
	 * @var string MailerLite Classic API variable.
	 */
	private $mailerlite_classic_api = 'https://api.mailerlite.com/api/v2';

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * MailerLite admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_mailerlite_options', array( $this, 'ajax_save_mailerlite_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_mailerlite_options', array( $this, 'ajax_get_mailerlite_options' ) );

		// Refresh or Initialize MailerLite credentials.
		add_action( 'wp_ajax_sce_refresh_mailerlite_connection', array( $this, 'ajax_refresh_mailerlite_connection' ) );

		// Add a tag to MailerLite account.
		add_action( 'wp_ajax_sce_add_mailerlite_group', array( $this, 'ajax_add_mailerlite_group' ) );

		// Add a tag to MailerLite account.
		add_action( 'wp_ajax_sce_add_mailerlite_classic_group', array( $this, 'ajax_add_mailerlite_classic_group' ) );

		// Add a custom field to MailerLite account.
		add_action( 'wp_ajax_sce_add_mailerlite_custom_field', array( $this, 'ajax_add_mailerlite_custom_field' ) );

		// Refresh tags for a MailerLite account.
		add_action( 'wp_ajax_sce_refresh_mailerlite_groups', array( $this, 'ajax_refresh_mailerlite_groups' ) );

		// Refresh tags for a MailerLite account.
		add_action( 'wp_ajax_sce_refresh_mailerlite_classic_groups', array( $this, 'ajax_refresh_mailerlite_classic_groups' ) );

		// Refresh custom fields for a MailerLite account.
		add_action( 'wp_ajax_sce_refresh_mailerlite_custom_fields', array( $this, 'ajax_refresh_mailerlite_custom_fields' ) );

		// Refresh classic custom fields for a MailerLite account.
		add_action( 'wp_ajax_sce_refresh_mailerlite_classic_custom_fields', array( $this, 'ajax_refresh_mailerlite_classic_custom_fields' ) );

		// Add MailerLite Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_mailerlite_checkbox' ), 100 );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );

		// Add frontend scripts and styles.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );

		// Add MailerLite localized nonces.
		add_filter( 'sce_integrations_localized_vars', array( $this, 'add_mailerlite_localized_vars' ) );

		// Add Comment Meta Box for convertkit status.
		add_action( 'admin_init', array( $this, 'add_comment_meta_box' ) );
	}

	/**
	 * Return if MailerLite is active and valid.
	 *
	 * @return bool true if active, false if not.
	 */
	private function is_mailerlite_enabled_and_valid() {
		$options = Options::get_options();

		// Make sure convertkit is enabled and valid.
		if ( ! (bool) $options['enable_mailerlite'] || ! (bool) $options['mailerlite_api_valid'] ) {
			return false;
		}

		return true;
	}

	/**
	 * Add a comment meta box for convertkit status displays.
	 */
	public function add_comment_meta_box() {
		if ( $this->is_mailerlite_enabled_and_valid() ) {
			add_meta_box(
				'sce-convertkit',
				__( 'Comment MailerLite History', 'comment-edit-pro' ),
				array( $this, 'output_mailerlite_comment_meta' ),
				'comment',
				'normal'
			);
		}
	}

	/**
	 * Get the MailerLite Groups.
	 *
	 * Note: have to use CURL here because wp_remote_get was getting blocked by Cloudflare.
	 *
	 * @param string $api_key The MailerLite API key.
	 *
	 * @return array|WP_Error The MailerLite groups.
	 */
	private function get_mailerlite_groups( $api_key ) {
		$curl = curl_init();

		curl_setopt_array(
			$curl,
			array(
				CURLOPT_URL            => esc_url_raw( $this->mailerlite_api . '/groups' ),
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING       => '',
				CURLOPT_MAXREDIRS      => 10,
				CURLOPT_TIMEOUT        => 30,
				CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST  => 'GET',
				CURLOPT_HTTPHEADER     => array(
					'Authorization: Bearer ' . $api_key,
				),
			)
		);

		$response = curl_exec( $curl );
		$err      = curl_error( $curl );

		curl_close( $curl );

		if ( $err ) {
			return new \WP_Error( 'curl_error', $err );
		}

		return json_decode( $response, true );
	}

	/**
	 * Add to a Mailerlite group.
	 *
	 * Note: have to use CURL here because wp_remote_post was getting blocked by Cloudflare.
	 *
	 * @param string $api_key The MailerLite API key.
	 * @param string $group_name The MailerLite group name.
	 *
	 * @return array|WP_Error The MailerLite groups.
	 */
	private function add_group_via_api( $api_key, $group_name ) {
		$curl = curl_init();

		curl_setopt_array(
			$curl,
			array(
				CURLOPT_URL            => esc_url_raw( $this->mailerlite_api . '/groups' ),
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING       => '',
				CURLOPT_MAXREDIRS      => 10,
				CURLOPT_TIMEOUT        => 30,
				CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST  => 'POST',
				CURLOPT_HTTPHEADER     => array(
					'Authorization: Bearer ' . $api_key,
				),
				CURLOPT_POSTFIELDS     => array(
					'name' => $group_name,
				),
			)
		);

		$response = curl_exec( $curl );
		$err      = curl_error( $curl );

		curl_close( $curl );

		if ( $err ) {
			return new \WP_Error( 'curl_error', $err );
		}

		return json_decode( $response, true );
	}

	/**
	 * Send MailerLite when a comment has been posted.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$signup_enabled = (bool) filter_input( INPUT_POST, 'sce-mailerlite-signup', FILTER_VALIDATE_BOOLEAN );

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

		// Make sure convertkit is enabled and valid.
		if ( ! (bool) $options['enable_mailerlite'] || ! (bool) $options['mailerlite_api_valid'] ) {
			return false;
		}

		// Get API and secret.
		$api_key = $options['mailerlite_api_key'];

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get any groups.
		$groups = array();
		if ( Functions::is_multisite() ) {
			$groups = get_site_option( 'sce_mailerlite_groups', array() );
		} else {
			$groups = get_option( 'sce_mailerlite_groups', array() );
		}

		// Get selected groups.
		$selected_group_ids = array();
		foreach ( $groups as $group ) {
			if ( isset( $group['selected'] ) && (bool) $group['selected'] ) {
				$selected_group_ids[] = sanitize_text_field( $group['value'] );
			}
		}

		// Get any custom fields.
		$custom_fields = array();
		if ( Functions::is_multisite() ) {
			$custom_fields = get_site_option( 'sce_mailerlite_custom_fields', array() );
		} else {
			$custom_fields = get_option( 'sce_mailerlite_custom_fields', array() );
		}

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

		// Get comment meta with convertkit data.
		$comment_meta = get_comment_meta( $comment_id, 'sce_mailerlite_data', true );
		if ( ! is_array( $comment_meta ) ) {
			$comment_meta = array();
		}

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get comment.
		$comment = get_comment( $comment_id );

		// Get API Endpoint.
		$api_endpoint = $this->mailerlite_api . '/subscribers';

		// Format subscription data.
		$subscriber_args = array(
			'email'      => $comment->comment_author_email,
			'fields'     => $selected_custom_fields,
			'groups'     => $selected_group_ids,
			'ip_address' => $comment->comment_author_IP,
		);

		if ( ! (bool) $options['mailerlite_double_optin_enabled'] ) {
			$subscriber_args['status'] = 'active';
			/* format date into: yyyy-MM-dd HH:mm:ss */
			$subscriber_args['subscribed_at'] = gmdate( 'Y-m-d H:i:s', strtotime( $comment->comment_date ) );
			$subscriber_args['optin_ip']      = $comment->comment_author_IP;
			$subscriber_args['opted_in_at']   = gmdate( 'Y-m-d H:i:s', strtotime( $comment->comment_date ) );
		}
		$http_args['body'] = $subscriber_args;

		$response = wp_remote_post(
			$api_endpoint,
			$http_args
		);
		$this->add_mailerlite_comment_meta( $comment_id, $response );

		return true;
	}

	/**
	 * Add MailerLite comment meta.
	 *
	 * @param int             $comment_id The Comment ID.
	 * @param WP_Error|Object $response The response object.
	 */
	private function add_mailerlite_comment_meta( $comment_id, $response ) {
		$comment_meta = get_comment_meta( $comment_id, 'sce_mailerlite_data', true );
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
			if ( 200 === $status_code || 201 === $status_code ) {
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

		update_comment_meta( $comment_id, 'sce_mailerlite_data', $comment_meta );
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
	public function add_mailerlite_checkbox( $comment_fields ) {
		$options = Options::get_options();

		// Check to see if MailerLite is enabled. Skip if can moderate.
		if ( ! $this->is_mailerlite_enabled_and_valid() || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = (bool) $options['mailerlite_checkbox_enabled'];
		$mailerlite_html                 = array(
			'sce-mailerlite' => sprintf(
				'<section class="comment-form-sce-mailerlite"><label><input type="checkbox" name="sce-mailerlite-signup" %s /> %s</label></section>',
				checked( $checked_by_default, true, false ),
				esc_html( $options['mailerlite_signup_label'] )
			),
		);
		$comment_fields['submit_button'] = $mailerlite_html['sce-mailerlite'] . $comment_fields['submit_button'];
		return $comment_fields;
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_mailerlite_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-mailerlite-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Refresh MailerLite API data if needed once per day.
		$refresh_transient = get_transient( 'sce_mailerlite_refresh' );
		if ( ! $refresh_transient ) {
			$options = Options::get_options();

			// Get the API key credentials.
			$classic_enabled    = (bool) $options['enable_mailerlite_classic'];
			$classic_api_valid  = (bool) $options['mailerlite_classic_api_valid'];
			$api_valid          = (bool) $options['mailerlite_api_valid'];
			$mailerlite_enabled = (bool) $options['enable_mailerlite'];

			// If modern API key is valid, get the keys.
			if ( $api_valid && $mailerlite_enabled && ! $classic_enabled ) {
				$api_key = $options['mailerlite_api_key'];
				$this->connect_to_api_return_fresh_data( $api_key );
				exit;
			}
			if ( $classic_api_valid && $mailerlite_enabled && $classic_enabled ) {
				$classic_api_key = $options['mailerlite_classic_api_key'];
				$this->connect_to_classic_api_return_fresh_data( $classic_api_key );
				exit;
			}
		}

		// Retrieve MailerLite options for return.
		$json_array = $this->get_mailerlite_options_for_return();

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Return the options for Convertkit for return.
	 */
	private function get_mailerlite_options_for_return() {
		$force   = true;
		$options = Options::get_options( $force );
		if ( Functions::is_multisite() ) {
			$groups = get_site_option( 'sce_mailerlite_groups', array() );
			$fields = get_site_option( 'sce_mailerlite_fields', array() );
		} else {
			$groups = get_option( 'sce_mailerlite_groups', array() );
			$fields = get_option( 'sce_mailerlite_custom_fields', array() );
		}
		// Get classic groups and fields.
		if ( Functions::is_multisite() ) {
			$classic_groups = get_site_option( 'sce_mailerlite_classic_groups', array() );
			$classic_fields = get_site_option( 'sce_mailerlite_classic_custom_fields', array() );
		} else {
			$classic_groups = get_option( 'sce_mailerlite_classic_groups', array() );
			$classic_fields = get_option( 'sce_mailerlite_classic_custom_fields', array() );
		}

		$json_array = array(
			'enableMailerlite'        => (bool) $options['enable_mailerlite'],
			'apiValid'                => (bool) $options['mailerlite_api_valid'],
			'classicApiValid'         => (bool) $options['mailerlite_classic_api_valid'],
			'enableMailerliteClassic' => (bool) $options['enable_mailerlite_classic'],
			'apiKey'                  => $options['mailerlite_api_key'],
			'classicApiKey'           => $options['mailerlite_classic_api_key'],
			'signUpLabel'             => $options['mailerlite_signup_label'],
			'checkboxEnabled'         => (bool) $options['mailerlite_checkbox_enabled'],
			'groups'                  => $groups,
			'customFields'            => $fields,
			'classicGroups'           => $classic_groups,
			'classicFields'           => $classic_fields,
			'doubleOptinEnabled'      => (bool) $options['mailerlite_double_optin_enabled'],
		);
		return $json_array;
	}

	/**
	 * Clears out the MailerLite Options and resets to defaults.
	 */
	private function reset_mailerlite_credentials() {
		$options_to_save = array(
			'enable_mailerlite'               => false,
			'mailerlite_api_key'              => '',
			'mailerlite_signup_label'         => __( 'Please subscribe to our newsletter', 'comment-edit-pro' ),
			'mailerlite_checkbox_enabled'     => false,
			'mailerlite_api_valid'            => false,
			'mailerlite_double_optin_enabled' => true,
			'enable_mailerlite_classic'       => false,
			'mailerlite_classic_api_key'      => '',
			'mailerlite_classic_api_valid'    => false,
		);
		if ( Functions::is_multisite() ) {
			delete_site_option( 'sce_mailerlite_groups' );
			delete_site_option( 'sce_mailerlite_custom_fields' );
			delete_site_option( 'sce_mailerlite_classic_groups' );
			delete_site_option( 'sce_mailerlite_classic_custom_fields' );
		} else {
			delete_option( 'sce_mailerlite_groups' );
			delete_option( 'sce_mailerlite_custom_fields' );
			delete_option( 'sce_mailerlite_classic_groups' );
			delete_option( 'sce_mailerlite_classic_custom_fields' );
		}

		Options::update_options( $options_to_save );
	}

	/**
	 * Save MailerLite options.
	 */
	public function ajax_save_mailerlite_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-mailerlite-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get enabled status.
		$mailerlite_enabled = (bool) filter_input( INPUT_POST, 'enableMailerlite', FILTER_VALIDATE_BOOLEAN );

		// If mailerlite is disabled, let's clear out some keys.
		if ( ! $mailerlite_enabled ) {
			$this->reset_mailerlite_credentials();

			// Return new options.
			$json_array = $this->get_mailerlite_options_for_return();
			wp_send_json_success(
				$json_array
			);
			exit;
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get post vars.
		$api_key                     = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$classic_api_key             = sanitize_text_field( filter_input( INPUT_POST, 'classicApiKey', FILTER_DEFAULT ) );
		$enable_mailerlite_classic   = (bool) filter_input( INPUT_POST, 'enableMailerliteClassic', FILTER_VALIDATE_BOOLEAN );
		$mailerlite_checkbox_enabled = (bool) filter_input( INPUT_POST, 'checkboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$signup_label                = sanitize_text_field( filter_input( INPUT_POST, 'signUpLabel', FILTER_DEFAULT ) );
		$double_optin_enabled        = (bool) filter_input( INPUT_POST, 'doubleOptinEnabled', FILTER_VALIDATE_BOOLEAN );
		$groups                      = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'groups', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$classic_groups              = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'classicGroups', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$custom_fields               = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'customFields', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$classic_custom_fields       = Functions::sanitize_array_recursive( (array) filter_input( INPUT_POST, 'classicCustomFields', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );

		// Now let's save options.
		$options_to_save = array(
			'enable_mailerlite'               => $mailerlite_enabled,
			'enable_mailerlite_classic'       => $enable_mailerlite_classic,
			'mailerlite_api_key'              => $api_key,
			'mailerlite_classic_api_key'      => $classic_api_key,
			'mailerlite_signup_label'         => $signup_label,
			'mailerlite_checkbox_enabled'     => $mailerlite_checkbox_enabled,
			'mailerlite_api_valid'            => true,
			'mailerlite_double_optin_enabled' => $double_optin_enabled,
		);
		Options::update_options( $options_to_save );

		// Save forms, tags, custom fields.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_groups', $groups );
			update_site_option( 'sce_mailerlite_classic_groups', $classic_groups );
			update_site_option( 'sce_mailerlite_custom_fields', $custom_fields );
			update_site_option( 'sce_mailerlite_classic_custom_fields', $classic_custom_fields );
		} else {
			update_option( 'sce_mailerlite_groups', $groups );
			update_option( 'sce_mailerlite_classic_groups', $classic_groups );
			update_option( 'sce_mailerlite_custom_fields', $custom_fields );
			update_option( 'sce_mailerlite_classic_custom_fields', $classic_custom_fields );
		}

		// Return saved form fields.
		$json_array = $this->get_mailerlite_options_for_return();
		wp_send_json_success( $json_array );
		exit;
	}

	/**
	 * Update MailerLite API data periodically.
	 *
	 * @param string $api_key    API key.
	 *
	 * @return void JSON errors|success if any.
	 */
	private function connect_to_api_return_fresh_data( $api_key ) {
		$options = Options::get_options( true );
		// Now let's set aside some options to save.
		$options_to_save = array(
			'enable_mailerlite'  => (bool) $options['enable_mailerlite'],
			'mailerlite_api_key' => $api_key,
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
		);

		// Get endpoints.
		$fields_api_url = esc_url_raw( $this->mailerlite_api . '/fields' );

		// Make API call.
		$group_api_response  = $this->get_mailerlite_groups( $api_key );
		$fields_api_response = wp_remote_get( $fields_api_url, $http_args );

		if ( is_wp_error( $group_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite groups.', 'comment-edit-pro' ) ) );
		}
		if ( is_wp_error( $fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite fields.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$groups_raw             = $group_api_response;
		$fields_raw             = json_decode( wp_remote_retrieve_body( $fields_api_response ), true );
		$group_fields           = $groups_raw['data'] ?? array();
		$custom_fields          = $fields_raw['data'] ?? array();
		$sanitized_group_values = array();
		$sanitized_field_values = array();
		foreach ( $group_fields as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $group_fields[ $index ]['name'] ),
				'value' => sanitize_text_field( $group_fields[ $index ]['id'] ),
			);
		}
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['name'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['id'] ),
				'key'   => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);
		}

		// Save list in option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_groups', $sanitized_group_values );
			update_site_option( 'sce_mailerlite_custom_fields', $sanitized_field_values );
		} else {
			update_option( 'sce_mailerlite_groups', $sanitized_group_values );
			update_option( 'sce_mailerlite_custom_fields', $sanitized_field_values );
		}

		// Save options.
		$options_to_save['mailerlite_api_valid'] = true;
		Options::update_options( $options_to_save );

		// Save transient for refresh.
		set_transient( 'sce_mailerlite_refresh', true, DAY_IN_SECONDS );

		// Return saved form fields.
		$json_array = $this->get_mailerlite_options_for_return();
		wp_send_json_success( $json_array );
	}

	/**
	 * Update MailerLite API data periodically.
	 *
	 * @param string $api_key    API key.
	 *
	 * @return void JSON errors|success if any.
	 */
	private function connect_to_classic_api_return_fresh_data( $api_key ) {
		$options = Options::get_options( true );
		// Now let's set aside some options to save.
		$options_to_save = array(
			'enable_mailerlite'          => (bool) $options['enable_mailerlite'],
			'mailerlite_classic_api_key' => $api_key,
		);

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization'       => 'Bearer ' . $api_key,
			'X-MailerLite-ApiKey' => $api_key,
			'Content-Type'        => 'application/json',
			'Accept'              => 'application/json',
		);

		// Get endpoints.
		$groups_api_url = esc_url_raw( $this->mailerlite_classic_api . '/groups' );
		$fields_api_url = esc_url_raw( $this->mailerlite_classic_api . '/fields' );

		// Make API call.
		$group_api_response  = wp_remote_get( $groups_api_url, $http_args );
		$fields_api_response = wp_remote_get( $fields_api_url, $http_args );

		if ( is_wp_error( $group_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite groups.', 'comment-edit-pro' ) ) );
		}
		if ( is_wp_error( $fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite fields.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$groups_raw             = json_decode( wp_remote_retrieve_body( $group_api_response ), true );
		$fields_raw             = json_decode( wp_remote_retrieve_body( $fields_api_response ), true );
		$group_fields           = $groups_raw ?? array();
		$custom_fields          = $fields_raw ?? array();
		$sanitized_group_values = array();
		$sanitized_field_values = array();
		foreach ( $group_fields as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $group_fields[ $index ]['name'] ),
				'value' => sanitize_text_field( $group_fields[ $index ]['id'] ),
			);
		}
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['title'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['id'] ),
				'key'   => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);
		}

		// Save list in option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
			update_site_option( 'sce_mailerlite_classic_custom_fields', $sanitized_field_values );
		} else {
			update_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
			update_option( 'sce_mailerlite_classic_custom_fields', $sanitized_field_values );
		}

		// Save options.
		$options_to_save['mailerlite_classic_api_valid'] = true;
		Options::update_options( $options_to_save );

		// Save transient for refresh.
		set_transient( 'sce_mailerlite_refresh', true, DAY_IN_SECONDS );

		// Return saved form fields.
		$json_array = $this->get_mailerlite_options_for_return();
		wp_send_json_success( $json_array );
	}

	/**
	 * Refresh or initialize MailerLite connection.
	 */
	public function ajax_refresh_mailerlite_connection() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-connection' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear old options.
		$this->reset_mailerlite_credentials();

		// Nonce passed, let's get post vars.
		$mailerlite_enabled        = (bool) filter_input( INPUT_POST, 'enableMailerlite', FILTER_VALIDATE_BOOLEAN );
		$api_key                   = sanitize_text_field( filter_input( INPUT_POST, 'apiKey', FILTER_DEFAULT ) );
		$classic_api_key           = sanitize_text_field( filter_input( INPUT_POST, 'classicApiKey', FILTER_DEFAULT ) );
		$enable_mailerlite_classic = (bool) filter_input( INPUT_POST, 'enableMailerliteClassic', FILTER_VALIDATE_BOOLEAN );

		// If mailerlite enabled, update options with MailerLite enabled.
		if ( $mailerlite_enabled ) {
			$options_to_save['enable_mailerlite'] = true;
			Options::update_options( $options_to_save );
		}

		if ( ! $enable_mailerlite_classic ) {
			// Get API data. Expect a json return exit if credentials are bad.
			$this->connect_to_api_return_fresh_data( $api_key );
		} else {
			// Get API data. Expect a json return exit if credentials are bad.
			$this->connect_to_classic_api_return_fresh_data( $classic_api_key );
		}

		// We shouldn't make it this far, but exit just in case.
		exit;
	}

	/**
	 * Refresh MailerLite Groups.
	 */
	public function ajax_refresh_mailerlite_groups() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-groups' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_api_key'] );
		// Get Groups as an option.
		if ( Functions::is_multisite() ) {
			$existing_groups = (array) get_site_option( 'sce_mailerlite_groups', array() );
		} else {
			$existing_groups = (array) get_option( 'sce_mailerlite_groups', array() );
		}

		$groups_api_response = $this->get_mailerlite_groups( $api_key );

		if ( is_wp_error( $groups_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Groups from MailerLite.', 'comment-edit-pro' ) ) );
		}

		$groups                 = $groups_api_response['data'];
		$sanitized_group_values = array();
		foreach ( $groups as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $groups[ $index ]['name'] ),
				'value' => sanitize_text_field( $groups[ $index ]['id'] ),
			);

			// Check if group is selected (saved).
			if ( ! empty( $existing_groups ) ) {
				foreach ( $existing_groups as $existing_group ) {
					if ( $existing_group['value'] !== $sanitized_group_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_group['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_group_values[ $index ]['selected'] = true;
					} else {
						$sanitized_group_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_groups', $sanitized_group_values );
		} else {
			update_option( 'sce_mailerlite_groups', $sanitized_group_values );
		}

		// Return groups.
		wp_send_json_success(
			array(
				'groups'   => $sanitized_group_values,
				'apiValid' => true,
			)
		);
	}

	/**
	 * Refresh MailerLite Groups.
	 */
	public function ajax_refresh_mailerlite_classic_groups() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-groups' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_classic_api_key'] );

		$http_args['headers'] = array(
			'Authorization'       => 'Bearer ' . $api_key,
			'X-MailerLite-ApiKey' => $api_key,
			'Content-Type'        => 'application/json',
			'Accept'              => 'application/json',
		);

		// Get endpoints.
		$groups_api_url = esc_url_raw( $this->mailerlite_classic_api . '/groups' );

		// Make API call.
		$group_api_response = wp_remote_get( $groups_api_url, $http_args );

		if ( is_wp_error( $group_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite groups.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$groups_raw = json_decode( wp_remote_retrieve_body( $group_api_response ), true );
		// Get Groups as an option.
		if ( Functions::is_multisite() ) {
			$existing_groups = (array) get_site_option( 'sce_mailerlite_classic_groups', array() );
		} else {
			$existing_groups = (array) get_option( 'sce_mailerlite_classic_groups', array() );
		}

		$groups                 = $groups_raw;
		$sanitized_group_values = array();
		foreach ( $groups as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $groups[ $index ]['name'] ),
				'value' => sanitize_text_field( $groups[ $index ]['id'] ),
			);

			// Check if group is selected (saved).
			if ( ! empty( $existing_groups ) ) {
				foreach ( $existing_groups as $existing_group ) {
					if ( $existing_group['value'] !== $sanitized_group_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_group['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_group_values[ $index ]['selected'] = true;
					} else {
						$sanitized_group_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
		} else {
			update_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
		}

		// Return groups.
		wp_send_json_success(
			array(
				'classicGroups'   => $sanitized_group_values,
				'classicApiValid' => true,
			)
		);
	}

	/**
	 * Refresh MailerLite Forms.
	 */
	public function ajax_refresh_mailerlite_forms() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-forms' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Return any errors.
		$this->output_connection_json_errors();

		// Nonce passed, let's get saved vars.
		$options        = Options::get_options();
		$api_key        = sanitize_text_field( $options['mailerlite_api_key'] );
		$api_secret_key = sanitize_text_field( $options['mailerlite_secret_key'] );
		// Get tags as an option.
		if ( Functions::is_multisite() ) {
			$existing_forms = (array) get_site_option( 'sce_mailerlite_forms', array() );
		} else {
			$existing_forms = (array) get_option( 'sce_mailerlite_forms', array() );
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
		$forms_api_endpoint = esc_url_raw( $this->mailerlite_api . '/forms' );

		$forms_api_response = wp_remote_get( $forms_api_endpoint, $http_args );
		if ( is_wp_error( $forms_api_response ) || 200 !== wp_remote_retrieve_response_code( $forms_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve forms from MailerLite.', 'comment-edit-pro' ) ) );
		}

		$groups_raw            = json_decode( wp_remote_retrieve_body( $forms_api_response ), true );
		$forms                 = $groups_raw['forms'];
		$sanitized_form_values = array();
		foreach ( $forms as $index => $values ) {
			$sanitized_form_values[ $index ] = array(
				'label' => sanitize_text_field( $forms[ $index ]['name'] ),
				'value' => sanitize_text_field( $forms[ $index ]['id'] ),
			);

			// Check if tag is selected (saved).
			if ( ! empty( $existing_forms ) ) {
				foreach ( $existing_forms as $existing_form ) {
					if ( $existing_form['value'] !== $sanitized_form_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_form['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_form_values[ $index ]['selected'] = true;
					} else {
						$sanitized_form_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_forms', $sanitized_form_values );
		} else {
			update_option( 'sce_mailerlite_forms', $sanitized_form_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'forms'    => $sanitized_form_values,
				'apiValid' => true,
			)
		);
	}

	/**
	 * Refresh MailerLite Custom Fields.
	 */
	public function ajax_refresh_mailerlite_custom_fields() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-custom-fields' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_api_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);

		// Get endpoints.
		$custom_fields_api_endpoint = esc_url_raw( $this->mailerlite_api . '/fields' );

		$custom_fields_api_response = wp_remote_get( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Custom Fields from MailerLite.', 'comment-edit-pro' ) ) );
		}

		// Get custom fields as an option.
		if ( Functions::is_multisite() ) {
			$existing_custom_fields = (array) get_site_option( 'sce_mailerlite_custom_fields', array() );
		} else {
			$existing_custom_fields = (array) get_option( 'sce_mailerlite_custom_fields', array() );
		}

		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$custom_fields                 = $custom_fields_raw['data'];
		$sanitized_custom_field_values = array();
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['name'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['key'] ),
				'id'    => sanitize_text_field( $custom_fields[ $index ]['id'] ),
			);

			// Add in the field map.
			if ( ! empty( $existing_custom_fields ) ) {
				foreach ( $existing_custom_fields as $existing_custom_field ) {
					if ( $existing_custom_field['id'] !== $sanitized_custom_field_values[ $index ]['id'] ) {
						continue;
					}
					$sanitized_custom_field_values[ $index ]['field']        = $existing_custom_field['field'] ?? 'none';
					$sanitized_custom_field_values[ $index ]['field_custom'] = $existing_custom_field['field_custom'] ?? '';
				}
			}
		}

		// Save custom fields as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_custom_fields', $sanitized_custom_field_values );
		} else {
			update_option( 'sce_mailerlite_custom_fields', $sanitized_custom_field_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'customFields' => $sanitized_custom_field_values,
				'apiValid'     => true,
			)
		);
	}

	/**
	 * Refresh MailerLite Custom Fields.
	 */
	public function ajax_refresh_mailerlite_classic_custom_fields() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-refresh-mailerlite-custom-fields' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_classic_api_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization'       => 'Bearer ' . $api_key,
			'X-MailerLite-ApiKey' => $api_key,
			'Content-Type'        => 'application/json',
			'Accept'              => 'application/json',
		);

		// Get endpoints.
		$custom_fields_api_endpoint = esc_url_raw( $this->mailerlite_classic_api . '/fields' );

		$custom_fields_api_response = wp_remote_get( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Custom Fields from MailerLite.', 'comment-edit-pro' ) ) );
		}

		// Get custom fields as an option.
		if ( Functions::is_multisite() ) {
			$existing_custom_fields = (array) get_site_option( 'sce_mailerlite_classic_custom_fields', array() );
		} else {
			$existing_custom_fields = (array) get_option( 'sce_mailerlite_classic_custom_fields', array() );
		}

		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$custom_fields                 = $custom_fields_raw;
		$sanitized_custom_field_values = array();
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['title'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['id'] ),
				'id'    => sanitize_text_field( $custom_fields[ $index ]['key'] ),
			);

			// Add in the field map.
			if ( ! empty( $existing_custom_fields ) ) {
				foreach ( $existing_custom_fields as $existing_custom_field ) {
					if ( $existing_custom_field['id'] !== $sanitized_custom_field_values[ $index ]['id'] ) {
						continue;
					}
					$sanitized_custom_field_values[ $index ]['field']        = $existing_custom_field['field'] ?? 'none';
					$sanitized_custom_field_values[ $index ]['field_custom'] = $existing_custom_field['field_custom'] ?? '';
				}
			}
		}

		// Save custom fields as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_classic_custom_fields', $sanitized_custom_field_values );
		} else {
			update_option( 'sce_mailerlite_classic_custom_fields', $sanitized_custom_field_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'classicCustomFields' => $sanitized_custom_field_values,
				'classicApiValid'     => true,
			)
		);
	}


	/**
	 * Add a new Group to MailerLite.
	 */
	public function ajax_add_mailerlite_group() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$label = sanitize_text_field( filter_input( INPUT_POST, 'label', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-add-mailerlite-group' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_api_key'] );

		$groups_api_response = $this->add_group_via_api( $api_key, $label );
		if ( is_wp_error( $groups_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not communicate with MailerLite.', 'comment-edit-pro' ) ) );
		}

		// Group has been created. Let's get the new Group ID.
		$group_body     = $groups_api_response['data'];
		$added_group_id = $group_body['id'];

		// Get groups again.
		$groups_api_response = $this->get_mailerlite_groups( $api_key );
		if ( is_wp_error( $groups_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Groups from MailerLite.', 'comment-edit-pro' ) ) );
		}

		// Get Groups as an option.
		if ( Functions::is_multisite() ) {
			$existing_groups = (array) get_site_option( 'sce_mailerlite_groups', array() );
		} else {
			$existing_groups = (array) get_option( 'sce_mailerlite_groups', array() );
		}

		$groups                 = $groups_api_response['data'];
		$sanitized_group_values = array();
		foreach ( $groups as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $groups[ $index ]['name'] ),
				'value' => sanitize_text_field( $groups[ $index ]['id'] ),
			);

			// Select the Group tag.
			if ( $added_group_id === $groups[ $index ]['id'] ) {
				$sanitized_group_values[ $index ]['selected'] = true;
				continue;
			}

			// Check if Group is selected (saved).
			if ( ! empty( $existing_groups ) ) {
				foreach ( $existing_groups as $existing_group ) {
					if ( $existing_group['value'] !== $sanitized_group_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_group['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_group_values[ $index ]['selected'] = true;
					} else {
						$sanitized_group_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_groups', $sanitized_group_values );
		} else {
			update_option( 'sce_mailerlite_groups', $sanitized_group_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'groups'   => $sanitized_group_values,
				'apiValid' => true,
			)
		);
	}

	/**
	 * Add a new Classic Group to MailerLite.
	 */
	public function ajax_add_mailerlite_classic_group() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$label = sanitize_text_field( filter_input( INPUT_POST, 'label', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-add-mailerlite-group' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_classic_api_key'] );

		$http_args['headers'] = array(
			'Authorization'       => 'Bearer ' . $api_key,
			'X-MailerLite-ApiKey' => $api_key,
			'Content-Type'        => 'application/json',
			'Accept'              => 'application/json',
		);

		// Get endpoints.
		$groups_api_url = esc_url_raw( $this->mailerlite_classic_api . '/groups' );

		// Create group.
		$groups_api_response = wp_remote_post(
			$groups_api_url,
			array(
				'headers' => $http_args['headers'],
				'body'    => wp_json_encode( array( 'name' => $label ) ),
			)
		);

		if ( is_wp_error( $groups_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not add group to MailerLite.', 'comment-edit-pro' ) ) );
		}

		$added_group_id = json_decode( wp_remote_retrieve_body( $groups_api_response ), true )['id'];

		// All is good, now get the groups again.

		// Make API call.
		$group_api_response = wp_remote_get( $groups_api_url, $http_args );

		if ( is_wp_error( $group_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve MailerLite groups.', 'comment-edit-pro' ) ) );
		}

		// Now format response from JSON.
		$groups_raw = json_decode( wp_remote_retrieve_body( $group_api_response ), true );

		// Get Groups as an option.
		if ( Functions::is_multisite() ) {
			$existing_groups = (array) get_site_option( 'sce_mailerlite_classic_groups', array() );
		} else {
			$existing_groups = (array) get_option( 'sce_mailerlite_classic_groups', array() );
		}

		$groups                 = $groups_raw;
		$sanitized_group_values = array();
		foreach ( $groups as $index => $values ) {
			$sanitized_group_values[ $index ] = array(
				'label' => sanitize_text_field( $groups[ $index ]['name'] ),
				'value' => sanitize_text_field( $groups[ $index ]['id'] ),
			);

			// Select the Group tag.
			if ( $added_group_id === $groups[ $index ]['id'] ) {
				$sanitized_group_values[ $index ]['selected'] = true;
				continue;
			}

			// Check if Group is selected (saved).
			if ( ! empty( $existing_groups ) ) {
				foreach ( $existing_groups as $existing_group ) {
					if ( $existing_group['value'] !== $sanitized_group_values[ $index ]['value'] ) {
						continue;
					}
					$selected_value = (bool) $existing_group['selected'] ?? false;
					if ( true === $selected_value ) {
						$sanitized_group_values[ $index ]['selected'] = true;
					} else {
						$sanitized_group_values[ $index ]['selected'] = false;
					}
				}
			}
		}

		// Save tags as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
		} else {
			update_option( 'sce_mailerlite_classic_groups', $sanitized_group_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'classicGroups'   => $sanitized_group_values,
				'classicApiValid' => true,
			)
		);
	}

	/**
	 * Add a new Custom Field to MailerLite.
	 */
	public function ajax_add_mailerlite_custom_field() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-add-mailerlite-custom-field' ) || ! current_user_can( 'manage_options' ) ) {
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
		$api_key = sanitize_text_field( $options['mailerlite_api_key'] );

		// Start building up HTTP args.
		$http_args            = array();
		$http_args['headers'] = array(
			'Authorization' => 'Bearer ' . $api_key,
			'Accept'        => 'application/json;ver=1.0',
		);
		$http_args['body']    = array(
			'name' => sanitize_text_field( filter_input( INPUT_POST, 'label', FILTER_DEFAULT ) ),
			'type' => 'text',
		);

		// Get endpoints.
		$custom_fields_api_endpoint = esc_url_raw( $this->mailerlite_api . '/fields' );

		// Make Credentials/Account check Call.
		$custom_fields_api_response = wp_remote_post( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not communicate with MailerLite.', 'comment-edit-pro' ) ) );
		}
		$custom_fields_api_response_code = wp_remote_retrieve_response_code( $custom_fields_api_response );

		if ( ( 201 !== $custom_fields_api_response_code && 200 !== $custom_fields_api_response_code ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Custom Fields from MailerLite.', 'comment-edit-pro' ) ) );
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

		$custom_fields_api_response = wp_remote_get( $custom_fields_api_endpoint, $http_args );
		if ( is_wp_error( $custom_fields_api_response ) || 200 !== wp_remote_retrieve_response_code( $custom_fields_api_response ) ) {
			wp_send_json_error( array( 'message' => __( 'Could not retrieve Custom Fields from MailerLite.', 'comment-edit-pro' ) ) );
		}

		// Get tags as an option.
		if ( Functions::is_multisite() ) {
			$existing_custom_fields = (array) get_site_option( 'sce_mailerlite_custom_fields', array() );
		} else {
			$existing_custom_fields = (array) get_option( 'sce_mailerlite_custom_fields', array() );
		}

		$custom_fields_raw             = json_decode( wp_remote_retrieve_body( $custom_fields_api_response ), true );
		$custom_fields                 = $custom_fields_raw['data'];
		$sanitized_custom_field_values = array();
		foreach ( $custom_fields as $index => $values ) {
			$sanitized_custom_field_values[ $index ] = array(
				'label' => sanitize_text_field( $custom_fields[ $index ]['name'] ),
				'value' => sanitize_text_field( $custom_fields[ $index ]['key'] ),
				'id'    => absint( $custom_fields[ $index ]['id'] ),
			);

			// Add in the field map.
			if ( ! empty( $existing_custom_fields ) ) {
				foreach ( $existing_custom_fields as $existing_custom_field ) {
					$existing_custom_field_id = absint( $existing_custom_field['id'] );
					if ( $existing_custom_field_id !== $sanitized_custom_field_values[ $index ]['id'] ) {
						continue;
					}
					$sanitized_custom_field_values[ $index ]['field']        = $existing_custom_field['field'] ?? 'none';
					$sanitized_custom_field_values[ $index ]['field_custom'] = $existing_custom_field['field_custom'] ?? '';
				}
			}
		}

		// Save custom fields as an option.
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_mailerlite_custom_fields', $sanitized_custom_field_values );
		} else {
			update_option( 'sce_mailerlite_custom_fields', $sanitized_custom_field_values );
		}

		// Return tags.
		wp_send_json_success(
			array(
				'customFields' => $sanitized_custom_field_values,
				'apiValid'     => true,
			)
		);
	}

	/**
	 * Ajax helper for determining if MailerLite connection is valid.
	 */
	private function output_connection_json_errors() {
		$options            = Options::get_options();
		$mailerlite_enabled = (bool) $options['enable_mailerlite'];
		$api_key            = sanitize_text_field( $options['mailerlite_api_key'] );
		$classic_api_key    = sanitize_text_field( $options['mailerlite_classic_api_key'] );
		$api_valid          = (bool) $options['mailerlite_api_valid'];
		$classic_api_valid  = (bool) $options['mailerlite_classic_api_valid'];

		if ( ! $mailerlite_enabled ) {
			wp_send_json_error(
				array(
					'message' => __( 'MailerLite is not enabled.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_valid && ! $classic_api_valid ) {
			wp_send_json_error(
				array(
					'message' => __( 'MailerLite API is not valid. Please refresh your connection.', 'comment-edit-pro' ),
				)
			);
		}

		if ( ! $api_key && ! $classic_api_key ) {
			wp_send_json_error(
				array(
					'message' => __( 'MailerLite API credentials are not valid. Please refresh your connection.', 'comment-edit-pro' ),
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
			$mailerlite_enabled = (bool) $options['enable_mailerlite'];
			if ( ! $mailerlite_enabled ) {
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
	public function add_mailerlite_localized_vars( $vars ) {
		$mailerlite_vars = array(
			'ml_save_nonce'                  => wp_create_nonce( 'sce-save-mailerlite-options' ),
			'ml_refresh_nonce'               => wp_create_nonce( 'sce-refresh-mailerlite-connection' ),
			'ml_get_nonce'                   => wp_create_nonce( 'sce-retrieve-mailerlite-options' ),
			'ml_reset_nonce'                 => wp_create_nonce( 'sce-reset-mailerlite-options' ),
			'ml_refresh_groups_nonce'        => wp_create_nonce( 'sce-refresh-mailerlite-groups' ),
			'ml_refresh_custom_fields_nonce' => wp_create_nonce( 'sce-refresh-mailerlite-custom-fields' ),
			'ml_add_group_nonce'             => wp_create_nonce( 'sce-add-mailerlite-group' ),
			'ml_add_custom_field_nonce'      => wp_create_nonce( 'sce-add-mailerlite-custom-field' ),
		);
		return array_merge( $vars, $mailerlite_vars );
	}

	/**
	 * Output MailerLite status for a commment.
	 *
	 * @param WP_Comment $comment The comment object.
	 */
	public function output_mailerlite_comment_meta( $comment ) {
		$comment_meta = get_comment_meta( $comment->comment_ID, 'sce_mailerlite_data', true );
		if ( ! $comment_meta ) {
			?>
			<p><?php esc_html_e( 'No MailerLite events have been sent for this comment.', 'comment-edit-pro' ); ?></p>
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
					foreach ( $comment_meta as $index => $mailerlite_data ) :
						?>
						<tr>
							<td>
								<?php
								if ( isset( $mailerlite_data['success'] ) ) {
									if ( $mailerlite_data['success'] ) {
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
								if ( isset( $mailerlite_data['status_code'] ) ) {
									echo esc_html( $mailerlite_data['status_code'] );
								} else {
									esc_html_e( 'Unknown', 'comment-edit-pro' );
								}
								?>
							</td>
							<td>
								<?php
								if ( isset( $mailerlite_data['error'] ) && $mailerlite_data['error'] ) {
									if ( is_string( $mailerlite_data['error'] ) ) {
										echo esc_html( $mailerlite_data['error'] );
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
