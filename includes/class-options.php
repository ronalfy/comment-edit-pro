<?php // phpcs:ignore
/**
 * Register SCE Options and defaults.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class that updates and stores the options.
 */
class Options {

	/**
	 * Array holding the options.
	 *
	 * @var [type]
	 */
	protected static $options = false;

	/**
	 * Update options via sanitization
	 *
	 * @since 1.0.0
	 * @access public
	 * @param array $options array of options to save.
	 * @return void
	 */
	public static function update_options( $options ) {
		$force           = true;
		$current_options = self::get_options( $force );
		foreach ( $options as $key => &$option ) {
			switch ( $key ) {
				case 'timer':
					$timer = absint( $options[ $key ] );
					if ( 0 === $timer ) {
						$timer = 5;
					}
					$option = $timer;
					break;
				case 'min_comment_length':
				case 'avatar_size':
				case 'max_comment_length':
					$option = absint( $options[ $key ] );
					break;
				case 'require_comment_length':
				case 'require_comment_length_max':
				case 'allow_delete_confirmation':
				case 'allow_delete':
				case 'delete_only':
				case 'show_timer':
				case 'allow_edit_notification':
				case 'show_icons':
				case 'show_stop_timer':
				case 'allow_unlimited_editing':
				case 'allow_front_end_character_limit':
				case 'allow_front_end_editing':
				case 'enable_avatars':
				case 'enable_avatars_logged_in':
				case 'enable_avatars_anonymous':
				case 'enable_mailchimp':
				case 'akismet_enabled':
				case 'akismet_edit_comments_enabled':
				case 'akismet_api_valid':
				case 'akismet_active':
				case 'akismet_logged_in_users_enabled':
				case 'mentions_emails_enabled':
				case 'mentions_checkbox_enabled':
				case 'enable_gravatar_protection':
				case 'slack_enabled':
				case 'slack_moderation_enabled':
				case 'slack_edit_comments_enabled':
				case 'license_activated':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					break;
				case 'mentions_enabled':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					if ( true === $option ) {
						Table_Mentions::create_table();
					} else {
						Table_Mentions::drop();
					}
					break;
				case 'allow_comment_logging':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					if ( true === $option ) {
						Table::create_table();
					} else {
						Table::drop();
					}
					break;
				case 'slack_webhook_url':
					$option = esc_url( $option );
					break;
				default:
					$option = sanitize_text_field( $options[ $key ] );
					break;
			}
		}
		$options = wp_parse_args( $options, $current_options );
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_options', $options );
		} else {
			update_option( 'sce_options', $options );
		}
		self::$options = $options;
		return $options;
	}

	/**
	 * Return a list of options.
	 *
	 * @param bool $force Whether to get options from cache or not.
	 *
	 * @return array Array of options.
	 */
	public static function get_options( $force = false ) {
		if ( is_array( self::$options ) && ! $force ) {
			return self::$options;
		}
		if ( Functions::is_multisite() ) {
			$options = get_site_option( 'sce_options', array() );
		} else {
			$options = get_option( 'sce_options', array() );
		}

		$defaults      = self::get_defaults();
		$options       = wp_parse_args( $options, $defaults );
		self::$options = $options;
		return $options;
	}

	/**
	 * Get defaults for SCE options
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array default options
	 */
	private static function get_defaults() {
		$defaults = array(
			'timer'                              => 5,
			'show_timer'                         => true,
			'loading_image'                      => \Simple_Comment_Editing::get_instance()->get_plugin_url( '/images/loading.gif' ),
			'allow_delete'                       => true,
			'delete_only'                        => false,
			'button_theme'                       => 'default',
			'show_icons'                         => false,
			'click_to_edit_text'                 => __( 'Click to Edit', 'comment-edit-pro' ),
			'show_timer'                         => true,
			'save_text'                          => __( 'Save', 'comment-edit-pro' ),
			'cancel_text'                        => __( 'Cancel', 'comment-edit-pro' ),
			'delete_text'                        => __( 'Delete', 'comment-edit-pro' ),
			'custom_class'                       => '',
			'allow_delete_confirmation'          => true,
			'allow_edit_notification'            => false,
			'edit_notification_to'               => Functions::is_multisite() ? get_site_option( 'admin_email' ) : get_option(
				'admin_email'
			),
			'edit_notification_from'             => Functions::is_multisite() ? get_site_option( 'admin_email' ) : get_option(
				'admin_email'
			),
			/* Translators: %s is the site name a user has left a comment on */
			'edit_notification_subject'          => sprintf( __( 'A user has edited a comment on %s', 'comment-edit-pro' ), Functions::is_multisite() ? get_site_option( 'site_name' ) : get_option( 'blogname' ) ),
			'edit_text'                          => __( 'Click to Edit', 'comment-edit-pro' ),
			'confirm_delete'                     => __( 'Do you want to delete this comment?', 'comment-edit-pro' ),
			'comment_deleted'                    => __( 'Your comment has been removed.', 'comment-edit-pro' ),
			'comment_deleted_error'              => __( 'Your comment could not be deleted', 'comment-edit-pro' ),
			'comment_empty_error'                => \Simple_Comment_Editing::get_instance()->errors->get_error_message( 'comment_empty' ),
			'require_comment_length'             => false,
			'min_comment_length'                 => 50,
			'require_comment_length_max'         => false,
			'max_comment_length'                 => 2000,
			'allow_comment_logging'              => false,
			'show_stop_timer'                    => false,
			'stop_timer_text'                    => __( 'Cancel Timer', 'comment-edit-pro' ),
			'timer_appearance'                   => 'words',
			'license_valid'                      => '',
			'license'                            => '',
			'license_activated'                  => false,
			'license_status'                     => '',
			'item_name'                          => '',
			'expires'                            => '',
			'license_limit'                      => '',
			'site_count'                         => '',
			'activations_left'                   => '',
			'beta'                               => false,
			'allow_unlimited_editing'            => false,
			'allow_front_end_character_limit'    => false,
			'allow_front_end_editing'            => false,
			'enable_avatars'                     => false,
			'avatar_size'                        => 90,
			'enable_avatars_logged_in'           => true,
			'enable_avatars_anonymous'           => true,
			'enable_custom_avatar_size'          => false,
			'choose_avatar_text'                 => __( 'Choose an Avatar', 'comment-edit-pro' ),
			'enable_gravatar_protection'         => false,
			'gravatar_protection_text'           => __( 'Prevent my avatar from showing next to my comment', 'comment-edit-pro' ),
			'enable_mailchimp'                   => false,
			'mailchimp_api_key'                  => '',
			'mailchimp_api_key_valid'            => false,
			'mailchimp_api_key_server_prefix'    => '',
			'mailchimp_lists'                    => array(),
			'mailchimp_selected_list'            => '',
			'mailchimp_signup_label'             => __( 'Sign Up for Updates', 'comment-edit-pro' ),
			'mailchimp_checkbox_enabled'         => false,
			'akismet_active'                     => class_exists( 'Akismet' ),
			'akismet_enabled'                    => true,
			'akismet_logged_in_users_enabled'    => true,
			'akismet_edit_comments_enabled'      => true,
			'akismet_api_valid'                  => false,
			'recaptcha_enabled'                  => false,
			'recaptcha_logged_in_users_enabled'  => true,
			'recaptcha_site_key'                 => '',
			'recaptcha_secret_key'               => '',
			'recaptcha_comment_form_id'          => 'commentform',
			'recaptcha_comment_submit_button_id' => 'submit',
			'recaptcha_score_threshold'          => 0.5,
			'mentions_enabled'                   => false,
			'mentions_emails_enabled'            => true,
			'mentions_emails_from_name'          => get_bloginfo( 'name' ),
			'mentions_emails_from_email'         => get_bloginfo( 'admin_email' ),
			'mentions_signup_label'              => esc_html__( 'Receive an email when someone mentions you in a comment.', 'comment-edit-pro' ),
			'mentions_checkbox_enabled'          => false,
			'mentions_comment_textarea_id'       => 'comment',
			'slack_enabled'                      => false,
			'slack_webhook_url'                  => '',
			'slack_moderation_enabled'           => false,
			'slack_edit_comments_enabled'        => false,
		);
		return $defaults;
	}

}
