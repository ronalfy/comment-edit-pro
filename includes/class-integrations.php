<?php
/**
 * Helper fuctions for integrations.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Integrations
 */
class Integrations {

	/**
	 * Class runner.
	 */
	public function run() {

		// Init mailchimp.
		$mailchimp = new MailChimp();
		$mailchimp->run();

		// Init Slack.
		$slack = new Slack();
		$slack->run();

		// Init Convertkit.
		$convertkit = new ConvertKit();
		$convertkit->run();

		// Load integration scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		global $current_screen;
		if ( 'settings_page_comment-edit-pro' !== $current_screen->id ) {
			return;
		}
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'integrations' === $current_tab ) {
			wp_enqueue_script(
				'sce-integrations',
				Functions::get_plugin_url( 'dist/integrations-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			$localized_vars = array(
				'save_nonce' => wp_create_nonce( 'sce-save-integrations-options' ),
				'get_nonce'  => wp_create_nonce( 'sce-retrieve-integrations-options' ),
				'reset_nonce' => wp_create_nonce( 'sce-reset-integrations-options' ),
				'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
			);
			/**
			 * Filter the localized vars for the integrations admin script.
			 * Other integrations can add their own variables here.
			 *
			 * @param array $localized_vars The localized vars.
			 *
			 * @since 3.0.0
			 */
			$localized_vars = apply_filters( 'sce_integrations_localized_vars', $localized_vars );
			wp_localize_script(
				'sce-integrations',
				'sceIntegrations',
				$localized_vars
			);
		}
	}
}
