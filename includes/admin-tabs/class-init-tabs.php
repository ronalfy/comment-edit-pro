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
		new Main();
		new Advanced();
		new Avatars();
		new Character_Control();
		new Comment_Editing();
		new Integrations();
		new License();
		new Mentions();
		new Spam_Protection();
		new Tools();
		new Webhooks();
		new Support();
	}
}
