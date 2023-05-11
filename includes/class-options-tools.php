<?php // phpcs:ignore
/**
 * Register SCE Tools Options and defaults.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class that updates and stores the options for tools.
 */
class Options_Tools {

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
		if ( Functions::is_multisite() ) {
			update_site_option( 'sce_options_tools', $options );
		} else {
			update_option( 'sce_options_tools', $options );
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
			$options = get_site_option( 'sce_options_tools', array() );
		} else {
			$options = get_option( 'sce_options_tools', array() );
		}

		$defaults      = self::get_defaults();
		$options       = array_replace_recursive( $defaults, $options );
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
	public static function get_defaults() {
		$defaults = array(
			'enable_comment_activity_expiration'           => false,
			'comment_activity_expiration'                  => 14, /* days */
			'comment_activity_post_types'                  => array( 'post' => array( 'checked' => true ) ),
			'enable_comment_activity_per_post'             => false,
			'enable_shortcut_approved'                     => true,
			'enable_shortcut_unapproved'                   => true,
			'enable_shortcut_spam'                         => true,
			'enable_shortcut_trash'                        => true,
			'enable_shortcut_count_bubble'                 => true,
			'enable_core_comment_dropdown'                 => true,
			'enable_comment_dropdown'                      => true,
			'enable_comment_dropdown_approved'             => true,
			'enable_comment_dropdown_unapproved'           => true,
			'enable_comment_dropdown_spam'                 => true,
			'enable_comment_dropdown_trash'                => true,
			'enable_comment_dropdown_open_close_comments'  => true,
			'enable_comment_dropdown_delete_post_comments' => true,
			'enable_comment_dropdown_show_hide_comments'   => true,
		);

		// Add post type arguments to defaults.
		$post_types = Functions::get_public_post_types();
		foreach ( $post_types as $post_type ) {
			$defaults['comment_post_type_settings'][ $post_type->name ] = array(
				'hide_comment_section'       => false,
				'enable_discussions_default' => false,
				'force_comments'             => 'default',
				'force_pingbacks'            => 'default',
			);
		}
		return $defaults;
	}

}
