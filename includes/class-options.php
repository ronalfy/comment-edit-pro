<?php // phpcs:ignore
/**
 * Register SCE Options and defaults.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions;

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
	 * @var array
	 */
	protected static $options = false;

	/**
	 * Array holding the network options.
	 *
	 * @var array
	 */
	protected static $network_options = false;

	/**
	 * Update options via sanitization
	 *
	 * @since 1.0.0
	 * @access public
	 * @param array $options array of options to save.
	 * @return array
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
				case 'allow_front_end_moderation_menu':
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
				case 'turnstile_enabled':
				case 'turnstile_logged_in_users_enabled':
				case 'enable_comment_editing':
				case 'enable_avatar_gravatar_fallback':
				case 'enable_convertkit':
				case 'convertkit_api_valid':
				case 'enable_flodesk':
				case 'flodesk_api_valid':
				case 'enable_mailerlite':
				case 'mailerlite_api_valid':
				case 'mailerlite_classic_api_valid':
				case 'mailerlite_classic_enabled':
				case 'flodesk_double_optin_enabled':
				case 'enable_avatars_anonymous_remember':
				case 'akismet_skip_pingbacks':
				case 'akismet_skip_has_gravatar':
				case 'disable_all_comments':
				case 'disable_all_spam_protection':
				case 'hide_comment_section':
				case 'comment_url_field_enabled':
				case 'comment_strip_urls':
				case 'selector_helper_enabled':
				case 'require_login_for_editing':
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
					if ( is_array( $option ) ) {
						$option = Functions::sanitize_array_recursive( $option );
					} else {
						$option = sanitize_text_field( $options[ $key ] );
					}
					break;
			}
		}
		$options = wp_parse_args( $options, $current_options );
		update_option( 'sce_options', $options );
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
		$options = get_option( 'sce_options', array() );

		$defaults      = self::get_defaults();
		$options       = wp_parse_args( $options, $defaults );
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
	public static function get_network_options( $force = false ) {
		if ( is_array( self::$network_options ) && ! $force ) {
			return self::$network_options;
		}
		$options = get_site_option( 'sce_options_network', array() );

		$defaults              = self::get_network_defaults();
		$options               = wp_parse_args( $options, $defaults );
		self::$network_options = $options;
		return $options;
	}

	/**
	 * Update network options via sanitization
	 *
	 * @access public
	 * @param array $options array of options to save.
	 * @return array
	 */
	public static function update_network_options( $options ) {
		$force           = true;
		$current_options = self::get_network_options( $force );
		foreach ( $options as $key => &$option ) {
			switch ( $key ) {
				case 'disable_all_comments':
				case 'hide_comment_section':
				case 'enable_network_wide_slack':
				case 'slack_moderation_enabled':
				case 'slack_edit_comments_enabled':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					break;
				case 'slack_webhook_url':
					$option = esc_url( $option );
					break;
				default:
					if ( is_array( $option ) ) {
						$option = Functions::sanitize_array_recursive( $option );
					} else {
						$option = sanitize_text_field( $options[ $key ] );
					}
					break;
			}
		}
		$options = wp_parse_args( $options, $current_options );
		update_site_option( 'sce_options_network', $options );
		self::$network_options = $options;
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
	public static function get_defaults() {
		$defaults = array(
			'enable_comment_editing'            => true,
			'timer'                             => 5,
			'loading_image'                     => Functions::get_plugin_url( 'images/loading.gif' ),
			'allow_delete'                      => true,
			'delete_only'                       => false,
			'button_theme'                      => 'default',
			'show_icons'                        => false,
			'click_to_edit_text'                => 'Click to Edit',
			'show_timer'                        => true,
			'save_text'                         => 'Save',
			'cancel_text'                       => 'Cancel',
			'delete_text'                       => 'Delete',
			'custom_class'                      => '',
			'allow_delete_confirmation'         => true,
			'allow_edit_notification'           => false,
			'edit_notification_to'              => Functions::is_multisite() ? get_site_option( 'admin_email' ) : get_option(
				'admin_email'
			),
			'edit_notification_from'            => Functions::is_multisite() ? get_site_option( 'admin_email' ) : get_option(
				'admin_email'
			),
			/* Translators: %s is the site name a user has left a comment on */
			'edit_notification_subject'         => sprintf( 'A user has edited a comment on %s', Functions::is_multisite() ? get_site_option( 'site_name' ) : get_option( 'blogname' ) ),
			'edit_text'                         => 'Click to Edit',
			'confirm_delete'                    => 'Do you want to delete this comment?',
			'comment_deleted'                   => 'Your comment has been removed.',
			'comment_deleted_error'             => 'Your comment could not be deleted',
			'comment_empty_error'               => 'Your comment appears to be empty.',
			'require_comment_length'            => false,
			'min_comment_length'                => 50,
			'require_comment_length_max'        => false,
			'max_comment_length'                => 2000,
			'allow_comment_logging'             => false,
			'show_stop_timer'                   => false,
			'stop_timer_text'                   => 'Cancel Timer',
			'timer_appearance'                  => 'words',
			'require_login_for_editing'         => false,
			'allow_unlimited_editing'           => false,
			'allow_front_end_character_limit'   => false,
			'allow_front_end_editing'           => true,
			'allow_front_end_moderation_menu'   => true,
			'front_end_moderation_menu_theme'   => 'default',
			'enable_avatars'                    => false,
			'avatar_size'                       => 90,
			'enable_avatars_logged_in'          => true,
			'enable_avatars_anonymous'          => true,
			'enable_avatars_anonymous_remember' => true,
			'enable_custom_avatar_size'         => false,
			'enable_avatar_gravatar_fallback'   => false,
			'choose_avatar_text'                => 'Choose an Avatar',
			'enable_gravatar_protection'        => false,
			'gravatar_protection_text'          => 'Prevent my avatar from showing next to my comment',
			'enable_mailchimp'                  => false,
			'mailchimp_api_key'                 => '',
			'mailchimp_api_key_valid'           => false,
			'mailchimp_api_key_server_prefix'   => '',
			'mailchimp_lists'                   => array(),
			'mailchimp_selected_list'           => '',
			'mailchimp_signup_label'            => 'Sign Up for Updates',
			'mailchimp_checkbox_enabled'        => false,
			'akismet_active'                    => class_exists( 'Akismet' ),
			'akismet_enabled'                   => true,
			'akismet_logged_in_users_enabled'   => true,
			'akismet_edit_comments_enabled'     => true,
			'akismet_api_valid'                 => false,
			'akismet_skip_pingbacks'            => false,
			'akismet_skip_has_gravatar'         => false,
			'recaptcha_enterprise_enabled'      => false,
			'recaptcha_project_id'              => '',
			'recaptcha_api_key'                 => '',
			'recaptcha_site_key'                => '',
			'recaptcha_logged_in_users_enabled' => true,
			'recaptcha_score_threshold'         => 0.5,
			'mentions_enabled'                  => false,
			'mentions_emails_enabled'           => true,
			'mentions_emails_from_name'         => get_bloginfo( 'name' ),
			'mentions_emails_from_email'        => get_bloginfo( 'admin_email' ),
			'mentions_signup_label'             => 'Receive an email when someone mentions you in a comment.',
			'mentions_checkbox_enabled'         => false,
			'mentions_comment_textarea_id'      => 'comment',
			'slack_enabled'                     => false,
			'slack_webhook_url'                 => '',
			'slack_moderation_enabled'          => false,
			'slack_edit_comments_enabled'       => false,
			'turnstile_enabled'                 => false,
			'turnstile_sitekey'                 => '',
			'turnstile_secret'                  => '',
			'turnstile_theme'                   => 'auto',
			'turnstile_language'                => 'auto',
			'turnstile_widget_size'             => 'normal',
			'turnstile_logged_in_users_enabled' => true,
			'enable_convertkit'                 => false,
			'convertkit_api_key'                => '',
			'convertkit_secret_key'             => '',
			'convertkit_form_or_tag'            => 'tag',
			'convertkit_signup_label'           => 'Please subscribe to our newsletter',
			'convertkit_checkbox_enabled'       => false,
			'convertkit_api_valid'              => false,
			'convertkit_selected_form'          => 0,
			'enable_flodesk'                    => false,
			'flodesk_api_key'                   => '',
			'flodesk_api_valid'                 => false,
			'flodesk_form_id'                   => '',
			'flodesk_signup_label'              => 'Please subscribe to our newsletter',
			'flodesk_checkbox_enabled'          => false,
			'flodesk_double_optin_enabled'      => false,
			'enable_mailerlite'                 => false,
			'enable_mailerlite_classic'         => false,
			'mailerlite_api_key'                => '',
			'mailerlite_api_valid'              => false,
			'mailerlite_signup_label'           => 'Please subscribe to our newsletter',
			'mailerlite_checkbox_enabled'       => false,
			'mailerlite_double_optin_enabled'   => true,
			'mailerlite_classic_api_key'        => '',
			'mailerlite_classic_api_valid'      => false,
			'delete_behavior_users'             => 'trash', // trash|delete.
			'delete_behavior_moderators'        => 'trash', // trash|delete.
			'spam_behavior_moderators'          => 'spam', // delete|spam.
			'disable_all_comments'              => false, // Will disable all comments period if true.
			'disable_all_spam_protection'       => false, // Will disable all spam protection if true.
			'hide_comment_section'              => false, // Will hide the comment section if true.
			'comment_list_class'                => 'comment-list',
			'comments_wrapper_id'               => 'comments',
			'comment_form_id'                   => 'commentform',
			'comment_submit_id'                 => 'submit',
			'comment_respond_id'                => 'respond',
			'comment_textarea_id'               => 'comment',
			'comment_url_field_enabled'         => true,
			'comment_strip_urls'                => false,
			'submit_button_label'               => '',
			'comment_reply_label'               => '',
			'selector_helper_enabled'           => true,

		);
		return $defaults;
	}

	/**
	 * Get defaults for network options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array default network options
	 */
	public static function get_network_defaults() {
		$defaults = array(
			'disable_all_comments'                => false,
			'hide_comment_section'                => false,
			'enable_network_wide_slack'           => false,
			'slack_webhook_url'                   => '',
			'slack_moderation_enabled'            => false,
			'slack_edit_comments_enabled'         => false,
			'timer'                               => 5,
			'timer_override'                      => false,
			'unlimited_editing'                   => false,
			'delete_behavior'                     => 'default', /* can be trash, delete, default */
			'spam_behavior'                       => 'default', /* can be spam, delete, default */
			'override_comment_notification_email' => false,
			'comment_notification_email'          => '',
		);
		return $defaults;
	}
}
