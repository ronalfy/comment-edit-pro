<?php
/**
 * Helper fuctions for Spam Protection tab.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Spam_Protection
 */
class Spam_Protection {

	/**
	 * Class runner.
	 */
	public function run() {

		// Init akismet.
		$akismet = new Akismet();
		$akismet->run();

		// Init recaptcha.
		$recaptcha = new Recaptcha();
		$recaptcha->run();

		// Init cloudflare turnstile.
		$cloudflare_turnstile = new Cloudflare_Turnstile();
		$cloudflare_turnstile->run();

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
		if ( 'spam-protection' === $current_tab ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-spam-protection.asset.php' );
			wp_enqueue_script(
				'sce-spam-protection',
				Functions::get_plugin_url( 'build/sce-spam-protection.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			wp_localize_script(
				'sce-spam-protection',
				'sceSpamProtection',
				array(
					'save_nonce'  => wp_create_nonce( 'sce-save-spam-protection-options' ),
					'get_nonce'   => wp_create_nonce( 'sce-retrieve-spam-protection-options' ),
					'reset_nonce' => wp_create_nonce( 'sce-reset-spam-protection-options' ),
					'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}
}
