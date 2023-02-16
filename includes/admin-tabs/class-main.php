<?php
/**
 * Output main SCE tab.
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
class Main {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'comment_edit_pro_admin_tabs', array( $this, 'add_main_tab' ), 1, 1 );
		add_filter( 'comment_edit_pro_admin_sub_tabs', array( $this, 'add_main_main_sub_tab' ), 1, 3 );
		add_filter( 'comment_edit_pro_output_main', array( $this, 'output_main_content' ), 1, 3 );
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
			'get'    => 'main',
			'action' => 'comment_edit_pro_output_main',
			'url'    => Functions::get_settings_url( 'main' ),
			'label'  => _x( 'Main', 'Tab label as Main', 'ultimate-auto-updates' ),
			'icon'   => 'home-heart',
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
		if ( 'main' === $tab ) {
			if ( empty( $sub_tab ) || 'main' === $sub_tab ) {
				$options = Options::get_options();
				?>
				<div class="sce-admin-panel-area">
					<div class="sce-panel-row">
						<h2><?php esc_html_e( 'Welcome to Comment Edit Pro', 'comment-edit-pro' ); ?></h2>
						<p><?php esc_html_e( 'Comment Edit Pro is a powerful comment plugin that allows you to edit comments, add avatars, mentions, spam protection, and several useful integrations.', 'comment-edit-pro' ); ?></p>
						<?php
						if ( 'valid' === $options['license_valid'] ) {
							?>
							<div class="sce-admin__notice sce-admin__notice-type--success sce-admin__notice-appearance--block">
								<p class="components-notice"><?php esc_html_e( 'Thank you for supporting Comment Edit Pro. Your license key is active and you are receiving updates and support.', 'comment-edit-pro' ); ?></p>
							</div>
							<?php
						} else {
							?>
							<div class="sce-admin__notice sce-admin__notice-type--warning sce-admin__notice-appearance--block">
								<div class="components-notice">
									<p><?php esc_html_e( 'Please enter a license key to receive updates and support for Comment Edit Pro.', 'comment-edit-pro' ); ?></p>
									<p><a href="<?php echo esc_url( Functions::get_settings_url( 'license' ) ); ?>"><?php esc_html_e( 'View License Settings', 'comment-edit-pro' ); ?></a></p>
								</div>
							</div>
							<?php
						}
						?>
					</div>
				</div>
				<div class="sce-admin-panel-cards">
					<div class="sce-admin-panel-card">
						<div class="sce-admin-panel-card-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'images/admin/avatars.jpg' ) ); ?>" alt="<?php esc_html_e( 'Screenshot of Comment Avatars', 'comment-edit-pro' ); ?>" />
						</div>
						<div class="sce-admin-panel-card-body">
							<h3><?php esc_html_e( 'Comment Avatars', 'comment-edit-pro' ); ?></h3>
							<p><?php esc_html_e( 'Comment Avatars are a great way to give your commenters some personality. With this colorful and diverse set of avatars, you will find it a fun way to boost interaction.', 'comment-edit-pro' ); ?></p>
						</div>
						<div class="sce-admin-panel-card-footer">
							<a href="<?php echo esc_url( Functions::get_settings_url( 'avatars' ) ); ?>"><?php esc_html_e( 'View Avatar Settings', 'comment-edit-pro' ); ?></a>
						</div>
					</div>
					<div class="sce-admin-panel-card">
						<div class="sce-admin-panel-card-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'images/admin/slack.jpg' ) ); ?>" alt="<?php esc_html_e( 'Screenshot of a Slack Notification', 'comment-edit-pro' ); ?>" />
						</div>
						<div class="sce-admin-panel-card-body">
							<h3><?php esc_html_e( 'Slack Integration', 'comment-edit-pro' ); ?></h3>
							<p><?php esc_html_e( 'Keep track of your comments by receiving a Slack notification when users leave a comment.', 'comment-edit-pro' ); ?></p>
						</div>
						<div class="sce-admin-panel-card-footer">
							<a href="<?php echo esc_url( Functions::get_settings_url( 'integrations' ) ); ?>"><?php esc_html_e( 'View Integration Settings', 'comment-edit-pro' ); ?></a>
						</div>
					</div>
					<div class="sce-admin-panel-card">
						<div class="sce-admin-panel-card-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'images/admin/turnstile.jpg' ) ); ?>" alt="<?php esc_html_e( 'Screenshot of a Cloudflare Turnstile', 'comment-edit-pro' ); ?>" />
						</div>
						<div class="sce-admin-panel-card-body">
							<h3><?php esc_html_e( 'Cloudflare Turnstile', 'comment-edit-pro' ); ?></h3>
							<p><?php esc_html_e( 'An alternative form of a Captcha, Turnstile provides extra protection from bots and malicious users.', 'comment-edit-pro' ); ?></p>
						</div>
						<div class="sce-admin-panel-card-footer">
							<a href="<?php echo esc_url( Functions::get_settings_url( 'spam-protection' ) ); ?>"><?php esc_html_e( 'View Spam Protection Settings', 'comment-edit-pro' ); ?></a>
						</div>
					</div>
					<div class="sce-admin-panel-card">
						<div class="sce-admin-panel-card-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'images/admin/mentions.jpg' ) ); ?>" alt="<?php esc_html_e( 'Screenshot of a Mentions feature', 'comment-edit-pro' ); ?>" />
						</div>
						<div class="sce-admin-panel-card-body">
							<h3><?php esc_html_e( '@ Mentions', 'comment-edit-pro' ); ?></h3>
							<p><?php esc_html_e( 'Allow your commenters to interact with eachother through mentions. Users can also choose to be notified when they are mentioned', 'comment-edit-pro' ); ?></p>
						</div>
						<div class="sce-admin-panel-card-footer">
							<a href="<?php echo esc_url( Functions::get_settings_url( 'mentions' ) ); ?>"><?php esc_html_e( 'View Mention Settings', 'comment-edit-pro' ); ?></a>
						</div>
					</div>
				</div>
				<?php
			}
		}
	}
}
