<?php
/**
 * Helper fuctions for Tools.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Tools
 */
class Tools {

	/**
	 * Class runner.
	 */
	public function run() {

		// Load integration scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'tools' === $current_tab ) {
			wp_enqueue_script(
				'sce-tools',
				Functions::get_plugin_url( 'dist/sce-tools-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-tools',
				'sceTools',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-options' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-options' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}
}
