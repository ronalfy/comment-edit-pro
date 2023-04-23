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
		$current_tab     = Functions::get_admin_tab();
		$current_sub_tab = Functions::get_admin_sub_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'tools' === $current_tab && 'comment-activity' === $current_sub_tab ) {
			wp_enqueue_script(
				'sce-tools-comment-activity',
				Functions::get_plugin_url( 'dist/sce-tools-comment-activity.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-tools-comment-activity',
				'sceToolsCommentActivity',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-expiration' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-expiration' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
					'post_types' => Functions::get_public_post_types(),
				)
			);
		}
	}
}
