<?php
/**
 * Helper fuctions for Mailchimp.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

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

		// Retrieve Akismet settings in the admin.
		add_action( 'wp_ajax_sce_get_akismet_options', array( $this, 'ajax_get_akismet_options' ) );
		add_action( 'wp_ajax_sce_save_akismet_options', array( $this, 'ajax_save_akismet_options' ) );
		add_action( 'wp_ajax_sce_reset_akismet_options', array( $this, 'ajax_reset_akismet_options' ) );

		// Check to see if Akismet options are on.
		add_filter( 'akismet_get_api_key', array( $this, 'maybe_disable_akismet_api_key' ), 10, 1 );

		$options = Options::get_options();

		// First check to see if Akismet is enabled/disabled for comments.
		if ( ! (bool) $options['akismet_enabled'] ) {
			// Disable Akismet comment checks.
			remove_action( 'wp_insert_comment', array( 'Akismet', 'auto_check_update_meta' ), 10, 2 );
			remove_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 1 );
			remove_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 1 );
		}

		// Move priority of Akismet comment check to 2.
		if ( class_exists( 'Akismet' ) ) {
			remove_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 1 );
			remove_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 1 );

			// Re-add filters to later priority.
			add_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 2, 1 );
			add_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 2, 1 );

			// Add our filters to check for pingback check.
			add_filter( 'preprocess_comment', array( $this, 'maybe_skip_akismet_pingback_check' ), 1, 1 );
			add_filter( 'rest_pre_insert_comment', array( $this, 'maybe_skip_akismet_pingback_check' ), 1, 1 );

			// Check if comment can be skipped with avatar check.
			if ( (bool) $options['akismet_skip_has_gravatar'] ) {
				add_filter( 'preprocess_comment', array( $this, 'maybe_skip_akismet_gravatar_check' ), 1, 1 );
				add_filter( 'rest_pre_insert_comment', array( $this, 'maybe_skip_akismet_gravatar_check' ), 1, 1 );
			}
		}
	}

	/**
	 * Check to see if commenter has a gravatar.
	 *
	 * @param string $email Email address.
	 *
	 * @return bool true if gravatar exists, false if not.
	 */
	private static function has_gravatar( $email ) {
		$hash     = md5( strtolower( trim( $email ) ) );
		$uri      = esc_url_raw( 'https://www.gravatar.com/avatar/' . $hash . '?d=404' );
		$response = wp_remote_get( $uri );
		if ( 200 === wp_remote_retrieve_response_code( $response ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Check to see if Akismet is enabled for pingbacks.
	 *
	 * @param array $commentdata The comment data.
	 *
	 * @return array $commentdata The comment data.
	 */
	public function maybe_skip_akismet_pingback_check( $commentdata ) {
		$options = Options::get_options();
		if ( (bool) $options['akismet_skip_pingbacks'] ) {
			if ( 'pingback' === $commentdata['comment_type'] ) {
				remove_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 2, 1 );
				remove_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 2, 1 );
				return $commentdata;
			}
		}
		// Re-add in filter for future use.
		if ( class_exists( 'Akismet' ) ) {
			add_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 2, 1 );
			add_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 2, 1 );
		}
		return $commentdata;
	}

	/**
	 * Check to see if Akismet is enabled for gravatar'd comments.
	 *
	 * @param array $commentdata The comment data.
	 *
	 * @return array $commentdata The comment data.
	 */
	public function maybe_skip_akismet_gravatar_check( $commentdata ) {
		if ( $this->has_gravatar( $commentdata['comment_author_email'] ) ) {
			remove_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 2, 1 );
			remove_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 2, 1 );
			return $commentdata;
		}
		// Re-add in filter for future use.
		if ( class_exists( 'Akismet' ) ) {
			add_filter( 'preprocess_comment', array( 'Akismet', 'auto_check_comment' ), 2, 1 );
			add_filter( 'rest_pre_insert_comment', array( 'Akismet', 'rest_auto_check_comment' ), 2, 1 );
		}
		return $commentdata;
	}

	/**
	 * Get akismet options and return empty string if disabled.
	 *
	 * @param string $api_key The Akismet API Key.
	 *
	 * @return string Empty string if Akismet is disabled.
	 */
	public function maybe_disable_akismet_api_key( $api_key ) {
		$options = Options::get_options();
		// If we're in the admin section, just return the key.
		if ( is_admin() ) {
			return $api_key;
		}

		// Now check to see if logged-in users can be excluded.
		if ( is_user_logged_in() ) {
			if ( ! (bool) $options['akismet_logged_in_users_enabled'] ) {
				return '';
			}
		}

		// Now check if anonymous and are in the middle of saving an edit.
		if ( ! is_user_logged_in() && defined( 'DOING_SCE' ) && DOING_SCE ) {
			if ( ! (bool) $options['akismet_edit_comments_enabled'] ) {
				return '';
			}
		}

		return $api_key;
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_get_akismet_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
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
			'akismetActive'               => class_exists( 'Akismet' ),
			'akismetEnabled'              => (bool) $options['akismet_enabled'],
			'akismetEditCommentsEnabled'  => (bool) $options['akismet_edit_comments_enabled'],
			'akismetApiValid'             => $akismet_api_key_valid,
			'akismetLoggedInUsersEnabled' => (bool) $options['akismet_logged_in_users_enabled'],
			'akismetSkipPingbacks'        => (bool) $options['akismet_skip_pingbacks'],
			'akismetSkipHasGravatar'      => (bool) $options['akismet_skip_has_gravatar'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_get_akismet_options options.
	 */
	public function ajax_save_akismet_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$akismet_enabled                 = (bool) filter_input( INPUT_POST, 'akismetEnabled', FILTER_VALIDATE_BOOLEAN );
		$akismet_edit_comments_enabled   = (bool) filter_input( INPUT_POST, 'akismetEditCommentsEnabled', FILTER_VALIDATE_BOOLEAN );
		$akismet_logged_in_users_enabled = (bool) filter_input( INPUT_POST, 'akismetLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN );
		$akismet_skip_pingbacks          = (bool) filter_input( INPUT_POST, 'akismetSkipPingbacks', FILTER_VALIDATE_BOOLEAN );
		$akismet_skip_has_gravatar       = (bool) filter_input( INPUT_POST, 'akismetSkipHasGravatar', FILTER_VALIDATE_BOOLEAN );

		// Now let's save options.
		$options_to_save = array(
			'akismet_enabled'                 => $akismet_enabled,
			'akismet_edit_comments_enabled'   => $akismet_edit_comments_enabled,
			'akismet_logged_in_users_enabled' => $akismet_logged_in_users_enabled,
			'akismet_skip_pingbacks'          => $akismet_skip_pingbacks,
			'akismet_skip_has_gravatar'       => $akismet_skip_has_gravatar,
		);
		Options::update_options( $options_to_save );

		wp_send_json_success(
			array(
				'message' => __( 'Options saved.', 'comment-edit-pro' ),
			)
		);
		exit;
	}

	/**
	 * Reset Mailchimp Options.
	 */
	public function ajax_reset_akismet_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-spam-protection-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear options.
		Options::update_options(
			array(
				'akismet_enabled'                 => true,
				'akismet_edit_comments_enabled'   => true,
				'akismet_api_valid'               => false,
				'akismet_logged_in_users_enabled' => true,
				'akismet_skip_pingbacks'          => false,
				'akismet_skip_has_gravatar'       => false,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Akismet options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);

	}
}
