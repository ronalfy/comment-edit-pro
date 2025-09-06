<?php
/**
 * Initialize all the classes for tabs and sub-tabs.
 *
 * @package ultimate-auto-updates
 */

namespace CommentEditPro\Includes\Admin_Tabs;

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
			new License();
			new Mentions();
			new Spam_Protection();
			new Tools();
			new Webhooks();
			new Support();
		}
		if ( Functions::is_multisite( true ) ) {
			new Network_Home();
			new Network_License();
		}
	}
}
