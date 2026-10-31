<?php
/**
 * Initialize all the classes for tabs and sub-tabs.
 *
 * @package ultimate-auto-updates
 */

namespace CommentEditPro\Includes\Admin_Tabs;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Functions;

/**
 * Init all the classes and sub-tabs.
 */
class Init_Tabs {
	/**
	 * Class runner.
	 */
	public function run() {
		if ( ! Functions::is_multisite( true ) ) {
			new Main();
			new Advanced();
			new Avatars();
			new Comment_Editing();
			new Comment_Form();
			new Integrations();
			new Mentions();
			new Spam_Protection();
			new Tools();
			new Webhooks();
		}
		if ( Functions::is_multisite( true ) ) {
			new Network_Home();
		}
	}
}
