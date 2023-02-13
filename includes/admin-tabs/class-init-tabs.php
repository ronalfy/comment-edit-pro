<?php
/**
 * Initialize all the classes for tabs and sub-tabs.
 *
 * @package ultimate-auto-updates
 */

namespace CommentEditPro\Includes\Admin_Tabs;

/**
 * Init all the classes and sub-tabs.
 */
class Init_Tabs {
	/**
	 * Class runner.
	 */
	public function run() {
		new Comment_Editing();
		new Spam_Protection();
		new Avatars();
		new Mentions();
		// new Comment_Actions();
		new Integrations();
		new License();
		new Support();
	}
}
