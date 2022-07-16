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

		// Add avatar to comments field.
		add_filter( 'comment_form_default_fields', array( $this, 'add_avatar_comment_field' ) );
		add_filter( 'comment_form_defaults', array( $this, 'add_avatar_textarea_field' ), 100 );

		// Add an avatar script to preload images.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_styles' ) );

		// Load the pngs for use in the popover.
		add_action( 'wp_footer', array( $this, 'add_footer_html' ) );

		// When a new comment has been added.
		add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );
	}

	/**
	 * Add avatar scripts/styles.
	 */
	public function add_scripts_styles() {
		if ( comments_open() ) {
			wp_enqueue_script(
				'sce-avatars',
				Functions::get_plugin_url( 'dist/avatars.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);

			// Retrieve avatar URL slugs.
			$avatars = $this->get_avatar_filenames();

			// Get avatar data from filenames.
			$avatar_data = array();
			foreach ( $avatars as $avatar_filename ) {
				$avatar_url    = esc_url( Functions::get_plugin_url( '/images/avatars/' . $avatar_filename . '.png' ) );
				$avatar_data[] = array(
					'avatar_url' => $avatar_url,
					'avatar_key' => $avatar_filename,
				);
			}

			// Populate avatars with plugin folder/file location.
			foreach ( $avatars as &$avatar_file_name ) {
				$avatar_file_name = esc_url( Functions::get_plugin_url( '/images/avatars/' . $avatar_file_name . '.png' ) );
			}
			wp_localize_script(
				'sce-avatars',
				'sceAvatars',
				array( 'avatars' => $avatar_data )
			);

			wp_enqueue_style(
				'sce-avatars',
				Functions::get_plugin_url( 'dist/avatars-frontend.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}

	/**
	 * Add an avatar option below the comment textarea and above the submit button.
	 *
	 * @param array $defaults Array of defaults for the form field.
	 */
	public function add_avatar_textarea_field( $defaults ) {
		if ( ! is_user_logged_in() ) {
			return $defaults;
		}

		$avatar_array               = $this->get_avatar_comment_field_array();
		$avatar_markup              = $avatar_array['sce-avatar'] ?? '';
		$defaults['comment_field'] .= $avatar_markup;
		return $defaults + $avatar_array;
	}

	/**
	 * Add an avatar function to the comment field.
	 *
	 * @param array $comment_fields Comment fields to display.
	 *
	 * @return array updated comment fields.
	 */
	public function add_avatar_comment_field( $comment_fields ) {
				$avatar_field = $this->get_avatar_comment_field_array();
		return $avatar_field + $comment_fields;
	}

	/**
	 * Retrieve the HTML for the avatar wrapper on the front-end.
	 *
	 * @return array Return the avatar field as an array.
	 */
	private function get_avatar_comment_field_array() {
		// Todo - Read in saved avatar.
		$avatar_html  = $this->get_avatar_image_html( Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ) );
		$avatar_field = array(
			'sce-avatar' => '<section class="comment-form-sce-avatar"><div class="sce-avatar">' . $avatar_html . '</div><div class="sce-modal-exit"></div><div class="avatar-heading"><strong>Ronald Huereca</strong></div><input type="hidden" id="sce-comment-form-avatar" name="sce-comment-form-avatar" value="0" /></section><div id="sce-avatar-form-modal-wrapper"><div id="sce-avatar-form-modal"></div></div>',
		);
		return $avatar_field;
	}

	/**
	 * Retrieve an avatar based on past data.
	 *
	 * @param int $comment_id The comment ID to retrieve data from.
	 * @param int $user_id    The user ID to retrieve the avatar from.
	 *
	 * @return string Avatar HTML.
	 */
	private function get_avatar( $comment_id = 0, $user_id = null ) {
		$default_avatar = Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' );
		$avatar         = null;

		// Try to get the comment avatar from logged-in user data.
		if ( null !== $user_id ) {
			// Try to get stored avatar.
			$avatar_url = get_user_meta( $user_id, 'sce-avatar-location', true ); // Stored as relative path in DB (e.g., images/avatars/circle-flat-icons-mystery.png ).
			if ( $avatar_url ) {
				$avatar = Functions::get_plugin_url( 'images/avatars/' . $avatar_url . '.png' );
			}
		}

		// If avatar is still null, try to get from comment meta.
		if ( null === $avatar && 0 !== $comment_id ) {
			$comment_avatar_url = get_comment_meta( $comment_id, 'sce-avatar-location', true );
			if ( $comment_avatar_url ) {
				$avatar = Functions::get_plugin_url( 'images/avatars/' . $comment_avatar_url . '.png' );
			}
		}

		// If avatar is still null, return default.
		if ( null === $avatar ) {
			$avatar = $default_avatar;
		}

		// Return avatar html or blank if avatar is still null.
		if ( null !== $avatar ) {
			$avatar_html = $this->get_avatar_image_html( $avatar );
			return $avatar_html;
		}

		return '';
	}

	/**
	 * Return avatar image html.
	 *
	 * @param string $src    The full URL to the asset.
	 * @param int    $width  The width of the avatar (default 50px).
	 * @param int    $height The height of the avatar (default 50px).
	 *
	 * @return unescaped image HTML.
	 */
	private function get_avatar_image_html( $src, $width = 50, $height = 50 ) {
		/**
		 * Add ability to change width/height of image.
		 */
		$avatar_dimensions = apply_filters(
			'sce_avatar_size_args',
			array(
				'width'  => $width,
				'height' => $height,
			)
		);
		$classes           = array(
			'avatar',
			sprintf( 'avatar-%s', esc_attr( $width ) ),
			'photo',
		);

		$avatar_html = sprintf(
			'<img class="%s" src="%s" alt="Default Avatar" loading="lazy" width="%d" height="%d" />',
			esc_attr( implode( ' ', $classes ) ),
			esc_url( $src ),
			esc_attr( $avatar_dimensions['width'] ),
			esc_attr( $avatar_dimensions['height'] )
		);
		return $avatar_html;
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
		global $pagenow, $comment, $post;
		if ( 'options-discussion.php' === $pagenow ) {
			return $avatar; // Stop overriding gravatars on options-discussion page.
		}

		// Get user data.
		$user = null;
		if ( is_numeric( $id_or_email ) ) {
			$user = get_user_by( 'id', (int) $id_or_email );
		} elseif ( is_object( $id_or_email ) ) {
			$comment = $id_or_email;
			if ( empty( $comment->user_id ) ) {
				$user = get_user_by( 'id', $comment->user_id );
			} else {
				$user = get_user_by( 'email', $comment->comment_author_email );
			}
		} elseif ( is_string( $id_or_email ) ) {
			$user = get_user_by( 'email', $id_or_email );
		}

		// Now get the user ID if it exists.
		$user_id    = $user->ID ?? null;
		$comment_id = $comment->comment_ID ?? null;
		$avatar     = $this->get_avatar( $comment_id, $user_id );
		if ( ! empty( $avatar ) ) {
			return $avatar;
		}

		$default_avatar = $this->get_avatar_image_html( Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ) );
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
		$json = '["circle-flat-icons-01","circle-flat-icons-02","circle-flat-icons-03","circle-flat-icons-04","circle-flat-icons-05","circle-flat-icons-06","circle-flat-icons-07","circle-flat-icons-08","circle-flat-icons-09","circle-flat-icons-10","circle-flat-icons-11","circle-flat-icons-12","circle-flat-icons-13","circle-flat-icons-14","circle-flat-icons-15","circle-flat-icons-16","circle-flat-icons-17","circle-flat-icons-18","circle-flat-icons-19","circle-flat-icons-20","circle-flat-icons-21","circle-flat-icons-22","circle-flat-icons-23","circle-flat-icons-24","circle-flat-icons-25","circle-flat-icons-26","circle-flat-icons-27","circle-flat-icons-28","circle-flat-icons-29","circle-flat-icons-30","circle-flat-icons-31","circle-flat-icons-32","circle-flat-icons-33","circle-flat-icons-34","circle-flat-icons-35","circle-flat-icons-36","circle-flat-icons-37","circle-flat-icons-38","circle-flat-icons-39","circle-flat-icons-40","circle-flat-icons-41","circle-flat-icons-42","circle-flat-icons-43","circle-flat-icons-44","circle-flat-icons-45","circle-flat-icons-mystery"]';
		return json_decode( $json, true );
	}

	/**
	 * Output pngs to use for JS.
	 */
	public function add_footer_html() {
		// Images are populated using JS. See /src/js/avatars.js.
		?>
		<div id="sce-avatars" width="0" height="0" class="hidden" style="display: none;" aria-hidden="true"></div>
		<?php
	}

	/**
	 * Save avatar meta when a comment has been posted.
	 *
	 * @param int $comment_id Comment ID that has been submitted.
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$avatar = sanitize_text_field( filter_input( INPUT_POST, 'sce-comment-form-avatar', FILTER_DEFAULT ) );

		// An approved or moderated comment is okay. Spam, skip.
		if ( 'spam' !== $maybe_comment_approved ) {
			// Store as comment meta and user meta (if logged in).
			update_comment_meta( $comment_id, 'sce-avatar-location', $avatar );

			if ( is_user_logged_in() ) {
				global $current_user;
				update_user_meta( $current_user->ID, 'sce-avatar-location', $avatar );
			}
		}
	}
}
