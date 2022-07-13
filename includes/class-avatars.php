<?php
/**
 * Helper fuctions.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

/**
 * Class functions
 */
class Avatars {

	/**
	 * Class runner.
	 */
	public function run() {
		// User Avatar override.
		add_filter( 'get_avatar', array( $this, 'avatar_override' ), 10, 6 );
		add_filter( 'pre_get_avatar_data', array( $this, 'pre_avatar_override' ), 10, 2 );
	}

	/**
	 * Override an Avatar with a User Profile Picture.
	 *
	 * Overrides an avatar with a profile image
	 *
	 * @param string $avatar SRC to the avatar.
	 * @param mixed  $id_or_email The ID or email address.
	 * @param int    $size Size of the image.
	 * @param string $default URL to the default image.
	 * @param string $alt Alternative text.
	 * @param array  $args Misc. args for the avatar.
	 *
	 * @return string Avatar.
	 */
	public function avatar_override( $avatar, $id_or_email, $size, $default, $alt, $args = array() ) {
		global $pagenow;
		if ( 'options-discussion.php' === $pagenow ) {
			return $avatar; // Stop overriding gravatars on options-discussion page.
		}

		$default_avatar = Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' );
		$classes        = array(
			'avatar',
			sprintf( 'avatar-%s', esc_attr( $size ) ),
			'photo',
			'sce-avatar',
		);
		if ( isset( $args['class'] ) ) {
			if ( is_array( $args['class'] ) ) {
				$classes = array_merge( $classes, $args['class'] );
			} else {
				$args['class'] = explode( ' ', $args['class'] );
				$classes       = array_merge( $classes, $args['class'] );
			}
		}

		// Get custom filter classes.
		$classes = (array) apply_filters( 'sce_avatar_classes', $classes );

		// Todo - Create option for this.
		$avatar_size_args = array(
			'width'  => 50,
			'height' => 50,
		);
		/**
		 * Add ability to change width/height of image.
		 */
		$avatar_dimensions = apply_filters( 'sce_avatar_size_args', $avatar_size_args );

		$default_avatar = sprintf(
			'<img class="%s" src="%s" alt="Default Avatar" loading="lazy" width="%d" height="%d" />',
			esc_attr( implode( ' ', $classes ) ),
			esc_url( $default_avatar ),
			esc_attr( $avatar_dimensions['width'] ),
			esc_attr( $avatar_dimensions['height'] )
		);
		// Get user data.
		if ( is_numeric( $id_or_email ) ) {
			$user = get_user_by( 'id', (int) $id_or_email );
		} elseif ( is_object( $id_or_email ) ) {
			$comment = $id_or_email;
			if ( empty( $comment->user_id ) ) {
				$user = get_user_by( 'id', $comment->user_id );
			} else {
				$user = get_user_by( 'email', $comment->comment_author_email );
			}
			if ( ! $user ) {
				return $default_avatar;
			}
		} elseif ( is_string( $id_or_email ) ) {
			$user = get_user_by( 'email', $id_or_email );
		} else {
			return $default_avatar;
		}

		if ( ! $user ) {
			$avatar = $default_avatar;
		}
		// $user_id = $user->ID;

		// // Determine if user has an avatar override.
		// $avatar_override = get_user_option( 'metronet_avatar_override', $user_id );
		// if ( ! $avatar_override || 'on' !== $avatar_override ) {
		// return $avatar;
		// }

		// Build classes array based on passed in args, else set defaults - see get_avatar in /wp-includes/pluggable.php.

		// // Determine if the user has a profile image.
		// $custom_avatar = mt_profile_img(
		// $user_id,
		// array(
		// 'size' => array( $size, $size ),
		// 'attr' => array(
		// 'alt'   => $alt,
		// 'class' => implode( ' ', $classes ),
		// ),
		// 'echo' => false,
		// )
		// );

		if ( ! $default_avatar ) {
			return $avatar;
		}

		return $default_avatar;
	}

	/**
	 * Overrides an avatar with a profile image
	 *
	 * @param array $args Arguments to determine the avatar dimensions.
	 * @param mixed $id_or_email The ID or email address.
	 *
	 * @return array $args Overridden URL or default if none can be found
	 **/
	public function pre_avatar_override( $args, $id_or_email ) {

		$default_avatar = Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' );

		// Get user data.
		if ( is_numeric( $id_or_email ) ) {
			$user = get_user_by( 'id', (int) $id_or_email );
		} elseif ( is_object( $id_or_email ) ) {
			$comment = $id_or_email;
			if ( empty( $comment->user_id ) ) {
				$user = get_user_by( 'id', $comment->user_id );
			} else {
				$user = get_user_by( 'email', $comment->comment_author_email );
			}
			if ( ! $user ) {
				$args['url'] = $default_avatar;
				return $args;
			}
		} elseif ( is_string( $id_or_email ) ) {
			$user = get_user_by( 'email', $id_or_email );
		} else {
			$args['url'] = $default_avatar;
		}
		if ( ! $user ) {
			$args['url'] = $default_avatar;
		}
		return $args;
	}

	/**
	 * Retrieve a list of avatar filenames for the avatars functionality.
	 * Decided to use pngs vs SVGs as pngs were significantly lighter.
	 *
	 * @return array List of filenames.
	 */
	public static function get_avatar_filenames() {
		// Original file can be found im /images/avatars.
		$json = '["circle-flat-icons-01","circle-flat-icons-02","circle-flat-icons-03","circle-flat-icons-04","circle-flat-icons-05","circle-flat-icons-06","circle-flat-icons-07","circle-flat-icons-08","circle-flat-icons-09","circle-flat-icons-10","circle-flat-icons-11","circle-flat-icons-12","circle-flat-icons-13","circle-flat-icons-14","circle-flat-icons-15","circle-flat-icons-16","circle-flat-icons-17","circle-flat-icons-18","circle-flat-icons-19","circle-flat-icons-20","circle-flat-icons-21","circle-flat-icons-22","circle-flat-icons-23","circle-flat-icons-24","circle-flat-icons-25","circle-flat-icons-26","circle-flat-icons-27","circle-flat-icons-28","circle-flat-icons-29","circle-flat-icons-30","circle-flat-icons-31","circle-flat-icons-32","circle-flat-icons-33","circle-flat-icons-34","circle-flat-icons-35","circle-flat-icons-36","circle-flat-icons-37","circle-flat-icons-38","circle-flat-icons-39","circle-flat-icons-40","circle-flat-icons-41","circle-flat-icons-42","circle-flat-icons-43","circle-flat-icons-44","circle-flat-icons-45"]';
		return json_decode( $json );
	}
}
