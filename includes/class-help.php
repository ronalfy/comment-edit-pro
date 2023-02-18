<?php
/**
 * Provides help tabs in the top right of the admin screen.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Help
 */
class Help {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'current_screen', array( $this, 'add_help_tabs' ) ); // Run late so we can get the current screen object.
	}

	/**
	 * Run when admin init is triggered.
	 */
	public function add_help_tabs() {
		$screen        = get_current_screen();
		$settings_hook = $screen->id ?? '';
		if ( 'settings_page_comment-edit-pro' !== $settings_hook ) {
			return;
		}
		$tab = Functions::get_admin_tab();
		/**
		 * Fires when the help tab can be added.
		 *
		 * @param string $tab The current tab.
		 * @param string $settings_hook The current settings hook.
		 * @param object $screen The current screen object.
		 */
		do_action( 'sce_help_tab_' . $tab, $tab, $settings_hook, $screen );

		// Add help tabs conditionally.
		switch ( $tab ) {
			case 'appearance':
				$this->add_appearance_help_tab( $screen );
				break;
		}
	}

	/**
	 * Add appearance help tab.
	 *
	 * @param object $screen Screen object.
	 */
	private function add_appearance_help_tab( $screen ) {
		$show_hide_timer_html  = <<<EOD
		<h2>Show or Hide the Timer</h2>
		<p>By default, when leaving a comment, the timer is shown. However, if you don't want to display a timer at all, you can uncheck this option.</p>
		<p>Please visit the documentation for more information.</p>
		<a href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/appearance-settings#showing-or-hiding-the-timer" target="_blank" class="btn-primary" rel="noopener noreferrer">Documentation</a>
		EOD;
		$timer_appearance_html = <<<EOD
		<h2>Modify the Timer Appearance</h2>
		<p>By default, the timer will be in words, but you can make it more compact.</p>
		<p>Changing to compact will show numbers only in a countdown type fashion.</p>
		<a href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/appearance-settings#timer-appearance" target="_blank" class="btn-primary" rel="noopener noreferrer">Documentation</a>
		EOD;
		$button_theme_html     = <<<EOD
		<h2>Modify the Button Appearance</h2>
		<p>By default, the button appearance is fairly stale and will need to be styled.</p>
		<p>Adding a button theme will allow a friendly button appearance with no need to be styled further.</p>
		<p>There is a theme preview when clicking on the various themes.</p>
		<a href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/appearance-settings#themes" target="_blank" class="btn-primary" rel="noopener noreferrer">Documentation</a>
		EOD;
		$screen->add_help_tab(
			array(
				'id'      => 'sce-help-tab-timer-visibility',
				'title'   => __( 'Timer Visibility', 'comment-edit-pro' ),
				'content' => $show_hide_timer_html,
			)
		);
		$screen->add_help_tab(
			array(
				'id'      => 'sce-help-tab-timer-appearance',
				'title'   => __( 'Timer Appearance', 'comment-edit-pro' ),
				'content' => $timer_appearance_html,
			)
		);
		$screen->add_help_tab(
			array(
				'id'      => 'sce-help-tab-button-themes',
				'title'   => __( 'Button Themes', 'comment-edit-pro' ),
				'content' => $button_theme_html,
			)
		);
	}
}
