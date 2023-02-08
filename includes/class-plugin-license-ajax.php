<?php
/**
 * Perform License Ajax actions.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Plugin_License as License_Helper;

/**
 * Class Plugin_License_Ajax.
 */
class Plugin_License_Ajax {
	/**
	 * Constructor.
	 */
	public function run() {

		// For retrieving/validating/revoking plugin license.
		add_action( 'wp_ajax_sce_retrieve_admin_license_core', array( static::class, 'ajax_retrieve_license_core' ) );
		add_action( 'wp_ajax_sce_save_admin_license_core', array( static::class, 'ajax_save_license_core' ) );
		add_action( 'wp_ajax_sce_save_revoke_license_core', array( static::class, 'ajax_revoke_license_core' ) );
		add_action( 'wp_ajax_sce_save_beta_option', array( static::class, 'ajax_save_beta_option' ) );
	}

	/**
	 * Retrieve any saved license data (labeled core in case there are additional add-ons).
	 */
	public static function ajax_retrieve_license_core() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-retrieve-license-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}
		$license_helper = new License_Helper();
		$response       = $license_helper->perform_action( 'check_license', '', true );

		if ( $response['license_errors'] ) {
			wp_send_json_error( $response );
		}

		$options          = Options::get_options();
		$response['beta'] = (bool) $options['beta'];

		wp_send_json_success( $response );
	}

	/**
	 * Save license data (labeled core in case there are additional add-ons).
	 */
	public static function ajax_save_license_core() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-save-license-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$license_key    = sanitize_text_field( filter_input( INPUT_POST, 'license_key', FILTER_DEFAULT ) );
		$license_helper = new License_Helper();
		$response       = $license_helper->perform_action( 'activate_license', $license_key, true );

		if ( $response['license_errors'] ) {
			$license_helper->set_activated_status( false );
			wp_send_json_error( $response );
		}

		if ( 'valid' === $response['license'] ) {
			$license_helper->set_activated_status( true );
			$response['license_valid']     = true;
			$response['license_activated'] = true;
		} else {
			$license_helper->set_activated_status( false );
			$response['license_valid']     = false;
			$response['license_activated'] = false;
		}
		$response['sceLicense'] = $license_key;

		wp_send_json_success( $response );
	}

	/**
	 * Revoke license data (labeled core in case there are additional add-ons).
	 */
	public static function ajax_revoke_license_core() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-license-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$license_helper = new License_Helper();
		$response       = $license_helper->perform_action( 'deactivate_license' );

		if ( ! $response['license_errors'] ) {
			$license_helper->set_activated_status( false );
			wp_send_json_success( $response );
		}

		wp_send_json_error( array() );
	}

	/**
	 * Save whether the licensee is opted in to betas.
	 */
	public static function ajax_save_beta_option() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-save-license-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$beta    = (bool) filter_input( INPUT_POST, 'beta', FILTER_VALIDATE_BOOLEAN );
		$options = Options::get_options();
		if ( $beta ) {
			$options['beta'] = true;
		} else {
			$options['beta'] = false;
		}
		Options::update_options( $options );

		wp_send_json_success( $options );
	}
}
