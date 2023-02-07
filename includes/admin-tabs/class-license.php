<?php
/**
 * Output licenses tab.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes\Admin_Tabs;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Options as Options;
use CommentEditPro\Includes\Functions as Functions;

/**
 * Output the main tab and content.
 */
class License {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'comment_edit_pro_admin_tabs', array( $this, 'add_main_tab' ), 1, 9 );
		add_filter( 'comment_edit_pro_admin_sub_tabs', array( $this, 'add_main_main_sub_tab' ), 1, 3 );
		add_filter( 'comment_edit_pro_output_license', array( $this, 'output_main_content' ), 1, 3 );
	}

	/**
	 * Add the main tab and callback actions.
	 *
	 * @param array $tabs Array of tabs.
	 *
	 * @return array of tabs.
	 */
	public function add_main_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'license',
			'action' => 'comment_edit_pro_output_license',
			'url'    => Functions::get_settings_url( 'license' ),
			'label'  => _x( 'License', 'Tab label as License', 'ultimate-auto-updates' ),
			'icon'   => 'file-certificate',
		);
		return $tabs;
	}

	/**
	 * Add the main main tab and callback actions.
	 *
	 * @param array  $tabs        Array of tabs.
	 * @param string $current_tab The current tab selected.
	 * @param string $sub_tab     The current sub-tab selected.
	 *
	 * @return array of tabs.
	 */
	public function add_main_main_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'main' !== $current_tab ) {
			return $tabs;
		}
		return $tabs;
	}

	/**
	 * Begin Main routing for the various outputs.
	 *
	 * @param string $tab     Main tab.
	 * @param string $sub_tab Sub tab.
	 */
	public function output_main_content( $tab, $sub_tab = '' ) {
		if ( 'license' === $tab ) {
			if ( empty( $sub_tab ) || 'license' === $sub_tab ) {
				$license_message = '';
				if ( isset( $_POST['submit'] ) && isset( $_POST['options'] ) ) {
					check_admin_referer( 'save_sce_options' );
					$options = Options::get_options();
					$options = wp_parse_args( $_POST['options'], $options ); // phpcs:ignore
					Options::update_options( $options );

					// Check for valid license.
					$store_url  = 'https://dlxplugins.com';
					$api_params = array(
						'edd_action' => 'activate_license',
						'license'    => sanitize_text_field( $_POST['options']['license'] ), // phpcs:ignore
						'item_name'  => urlencode( 'Comment Edit Pro' ), // phpcs:ignore
						'url'        => home_url(),
					);
					// Call the custom API.
					$response = wp_remote_post(
						$store_url,
						array(
							'timeout'   => 15,
							'sslverify' => false,
							'body'      => $api_params,
						)
					);

					// make sure the response came back okay.
					if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

						if ( is_wp_error( $response ) ) {
							$license_message = $response->get_error_message();
						} else {
							$license_message = __( 'An error occurred, please try again.', 'comment-edit-pro' );
						}
					} else {

						$license_data = json_decode( wp_remote_retrieve_body( $response ) );

						if ( false === $license_data->success ) {
							delete_site_option( 'comment_edit_pro_license_status' );
							switch ( $license_data->error ) {

								case 'expired':
									$license_message = sprintf(
										/* translators: %s is a date of license expiration */
										__( 'Your license key expired on %s.', 'comment-edit-pro' ),
										date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) ) // phpcs:ignore
									);
									break;

								case 'disabled':
								case 'revoked':
									$license_message = __( 'Your license key has been disabled.', 'comment-edit-pro' );
									break;

								case 'missing':
									$license_message = __( 'Invalid license.', 'comment-edit-pro' );
									break;

								case 'invalid':
								case 'site_inactive':
									$license_message = __( 'Your license is not active for this URL.', 'comment-edit-pro' );
									break;

								case 'item_name_mismatch':
									/* Translators: %s is the plugin name. */
									$license_message = sprintf( __( 'This appears to be an invalid license key for %s.', 'comment-edit-pro' ), 'Comment Edit Pro' );
									break;

								case 'no_activations_left':
									$license_message = __( 'Your license key has reached its activation limit.', 'comment-edit-pro' );
									break;

								default:
									$license_message = __( 'An error occurred, please try again.', 'comment-edit-pro' );
									break;
							}
						}
						if ( empty( $license_message ) ) {
							update_site_option( 'comment_edit_pro_license_status', $license_data->license );
						}
					}
				}
				// Get options and defaults.
				$options = Options::get_options();
				?>
				<div class="sce-admin-panel-area">
					<div class="sce-panel-row">
						<div id="sce-tab-license"></div>
					</div>
				</div>
				<?php
			}
		}
	}
}
