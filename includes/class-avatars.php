<?php
/**
 * Helper fuctions.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Avatars
 */
class Avatars {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Avatar admin panel actions.
		 */

		// Save avatar settings in the admin.
		add_action( 'wp_ajax_sce_save_avatar_options', array( $this, 'ajax_save_avatar_options' ) );

		// Save gravatar settings in the admin.
		add_action( 'wp_ajax_sce_save_gravatar_options', array( $this, 'ajax_save_gravatar_options' ) );

		// Retrieve avatar settings in the admin.
		add_action( 'wp_ajax_sce_get_avatar_options', array( $this, 'ajax_get_avatar_options' ) );

		// Retrieve avatar settings in the admin.
		add_action( 'wp_ajax_sce_get_gravatar_options', array( $this, 'ajax_get_gravatar_options' ) );

		// Load Avatar scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );
		// Load Avatar scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_avatar_scripts_styles' ) );

		// Load the pngs for use in the popover.
		add_action( 'admin_footer', array( $this, 'add_footer_html' ) );

		// Get plugin options.
		$options = Options::get_options();

		// Check if avatars are enabled.
		$enable_avatars = (bool) $options['enable_avatars'] ?? false;

		// Perform actions if gravatar protection is enabled.
		$enable_gravatar_protection = (bool) $options['enable_gravatar_protection'] ?? false;

		$can_enqueue = false;
		if ( $enable_gravatar_protection && ! $enable_avatars ) { // Don't run if comment avatars are enabled.
			$can_enqueue = true;
			// Add Gravatar Protection Checkbox.
			add_filter( 'comment_form_defaults', array( $this, 'add_gravatar_protection_checkbox' ), 100 );

			// When a new comment has been added.
			add_action( 'comment_post', array( $this, 'comment_posted_gravatar_protection' ), 100, 2 );

			// When the commenters avatar is being outputted.
			add_filter( 'pre_get_avatar', array( $this, 'pre_avatar_override_gravatar_protection' ), 10, 3 );
		}
		// Perform actions if comment avatars are enabled.
		if ( $enable_avatars ) {
			$can_enqueue = true;
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

			// Save avatar via ajax.
			add_action( 'wp_ajax_sce_save_user_avatar', array( $this, 'ajax_save_user_avatar' ) );
			add_action( 'wp_ajax_nopriv_sce_save_user_avatar', array( $this, 'ajax_save_user_avatar' ) );
		}

		if ( $can_enqueue ) {
			// Add frontend scripts and styles.
			add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );
		}
	}

	/**
	 * Add an mailchimp option below the comment textarea and above the submit button.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_gravatar_protection_checkbox( $comment_fields ) {
		$options            = Options::get_options();
		$gravity_protection = (bool) $options['enable_gravatar_protection'];

		// Chceck to see if Gravatar Protection is enabled.
		if ( ! $gravity_protection || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		$gravatar_html                   = array(
			'sce-gravatar-protection' => sprintf(
				'<section class="comment-form-sce-gravatar-protection"><label><input type="checkbox" name="sce-gravatar-protection" %s /> %s</label></section>',
				'',
				esc_html( $options['gravatar_protection_text'] )
			),
		);
		$comment_fields['submit_button'] = $gravatar_html['sce-gravatar-protection'] . $comment_fields['submit_button'];
		return $comment_fields;
	}

	/**
	 * Pass go for if a user can change an avatar.
	 *
	 * @return bool true to change an avatar, false to not.
	 */
	private function can_change_avatar() {

		// Shortcut. If user can moderate comments, user can change avatars.
		if ( current_user_can( 'moderate_comments' ) ) {
			return true;
		}

		$options                  = Options::get_options();
		$avatars_enabled          = $options['enable_avatars'] ?? false;
		$enable_avatars_logged_in = $options['enable_avatars_logged_in'] ?? false;
		$enable_avatars_anonymous = $options['enable_avatars_anonymous'] ?? false;

		// If avatars are not enabled, user cannot edit/change avatars.
		if ( ! $avatars_enabled ) {
			return false;
		}

		// If anonymous, and avatars not enabled for anonymous.
		if ( ! is_user_logged_in() && ! $enable_avatars_anonymous ) {
			return false;
		}

		// If logged in and logged in avatars is off.
		if ( is_user_logged_in() && ! $enable_avatars_logged_in ) {
			if ( ! current_user_can( 'moderate_comments' ) ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Load scripts and styles to change avatars in discussion area.
	 */
	public function add_admin_avatar_scripts_styles() {
		global $pagenow;
		if ( 'edit-comments.php' !== $pagenow ) {
			return;
		}
		$this->add_avatar_scripts_frontend_backend();
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		$options = Options::get_options();
		if ( 'avatars' === $current_tab ) {
			wp_enqueue_script(
				'sce-avatars',
				Functions::get_plugin_url( 'dist/avatars-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-avatars',
				'sceAvatars',
				array(
					'preview_avatar'  => Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ),
					'save_nonce'      => wp_create_nonce( 'sce-save-avatar-options' ),
					'get_nonce'       => wp_create_nonce( 'sce-retrieve-avatar-options' ),
					'ajaxurl'         => esc_url( admin_url( 'admin-ajax.php' ) ),
					'avatars_enabled' => (bool) $options['enable_avatars'],
				)
			);
		}
	}

	/**
	 * Save a user's avatar via Ajax.
	 */
	public function ajax_save_user_avatar() {
		$nonce      = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$user_id    = absint( filter_input( INPUT_POST, 'user_id', FILTER_VALIDATE_INT ) );
		$comment_id = absint( filter_input( INPUT_POST, 'comment_id', FILTER_VALIDATE_INT ) );
		$post_id    = absint( filter_input( INPUT_POST, 'post_id', FILTER_VALIDATE_INT ) );
		$key        = sanitize_text_field( filter_input( INPUT_POST, 'key', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-edit-avatar-' . $comment_id . $post_id ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get the current comment.
		$comment = get_comment( $comment_id );

		// Get user ID.
		global $current_user;
		$current_user_id = $current_user->ID ?? false;

		// Now check if person can edit comment.
		$can_edit = false;
		if ( current_user_can( 'moderate_comments' ) ) {
			$can_edit = true;
		} else {
			// Now check if the user is the comment author (begin conditional hell).
			if ( $current_user_id === $user_id ) {
				if ( $comment && $comment->user_id === $current_user_id ) {
					$can_edit = true;
				}
			}
		}

		// One last try for editing privs.
		if ( ! $can_edit ) {
			$sce      = \Simple_Comment_Editing::get_instance();
			$can_edit = $sce->can_edit( $comment_id, $post_id );
		}

		// If person can't edit, exit.
		if ( ! $can_edit ) {
			wp_send_json_error(
				array(
					'message' => __( 'Can not edit comment', 'comment-edit-pro' ),
				)
			);
		}

		$comment_user_id = absint( $comment->user_id );

		// Assume person can edit now. Let's check if we're saving comment meta or user meta.
		if ( $comment_user_id === $current_user_id && 0 !== $current_user_id ) {
			update_user_meta( $current_user_id, 'sce-avatar-location', $key );

			// Get comments for user on the page so we can update all the avatars at once.
			if ( current_user_can( 'moderate_comments' ) ) {
				$comment_args = array(
					'post_id' => $post_id,
					'user_id' => $current_user_id,
					'status'  => 1,
					'fields'  => 'ids',
				);
				$comments     = new \WP_Comment_Query( $comment_args ); // This gets an object with property comments.
				$comment_ids  = $comments->comments ?? array();
				wp_send_json_success( $comment_ids );
			}
		} else {
			// This is not our comment.
			update_comment_meta( $comment_id, 'sce-avatar-location', $key );
		}

		// Exit gracefully.
		wp_send_json_success( array() );
	}

	/**
	 * Get avatar options.
	 */
	public function ajax_get_avatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$avatar_options = Options::get_options();

		$json_array = array(
			'enableAvatars'          => $avatar_options['enable_avatars'],
			'avatarSize'             => $avatar_options['avatar_size'],
			'enableAvatarsLoggedIn'  => $avatar_options['enable_avatars_logged_in'],
			'enableAvatarsAnonymous' => $avatar_options['enable_avatars_anonymous'],
			'chooseAvatarText'       => $avatar_options['choose_avatar_text'],
			'enableCustomAvatarSize' => $avatar_options['enable_custom_avatar_size'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Get Gravatar options.
	 */
	public function ajax_get_gravatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$avatar_options = Options::get_options();

		$json_array = array(
			'enableGravatarProtection' => $avatar_options['enable_gravatar_protection'],
			'gravatarProtectionText'   => $avatar_options['gravatar_protection_text'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save avatar options.
	 */
	public function ajax_save_avatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		$options_to_save = array(
			'enable_avatars'            => filter_input( INPUT_POST, 'enableAvatars', FILTER_VALIDATE_BOOLEAN ),
			'avatar_size'               => absint( filter_input( INPUT_POST, 'avatarSize', FILTER_VALIDATE_INT ) ),
			'enable_avatars_logged_in'  => filter_input( INPUT_POST, 'enableAvatarsLoggedIn', FILTER_VALIDATE_BOOLEAN ),
			'enable_custom_avatar_size' => filter_input( INPUT_POST, 'enableCustomAvatarSize', FILTER_VALIDATE_BOOLEAN ),
			'choose_avatar_text'        => sanitize_text_field( filter_input( INPUT_POST, 'chooseAvatarText', FILTER_DEFAULT ) ),
		);

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		Options::update_options( $options_to_save );

		// Exit gracefully.
		wp_send_json_success( array() );
	}

	/**
	 * Save gravatar options.
	 */
	public function ajax_save_gravatar_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		$options_to_save = array(
			'enable_gravatar_protection' => filter_input( INPUT_POST, 'enableGravatarProtection', FILTER_VALIDATE_BOOLEAN ),
			'gravatar_protection_text'   => sanitize_text_field( filter_input( INPUT_POST, 'gravatarProtectionText', FILTER_DEFAULT ) ),
		);

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-avatar-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		Options::update_options( $options_to_save );

		// Exit gracefully.
		wp_send_json_success( array() );
	}

	/**
	 * Loads the avatar scripts needed for the front-end and back-end.
	 */
	private function add_avatar_scripts_frontend_backend() {
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
			array(
				'avatars' => $avatar_data,
				'ajaxurl' => esc_url( admin_url( 'admin-ajax.php' ) ),
			)
		);

		wp_enqueue_style(
			'sce-avatars',
			Functions::get_plugin_url( 'dist/avatars-frontend.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Add avatar scripts/styles.
	 */
	public function add_scripts_styles() {
		if ( comments_open() ) {
			$this->add_avatar_scripts_frontend_backend();
		}
	}

	/**
	 * Add an avatar option below the comment textarea and above the submit button.
	 *
	 * @param array $defaults Array of defaults for the form field.
	 */
	public function add_avatar_textarea_field( $defaults ) {
		if ( ! $this->can_change_avatar() ) {
			return $defaults;
		}
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
		if ( ! $this->can_change_avatar() ) {
			return $comment_fields;
		}
		$avatar_field = $this->get_avatar_comment_field_array();
		return $avatar_field + $comment_fields;
	}

	/**
	 * Retrieve the HTML for the avatar wrapper on the front-end.
	 *
	 * @return array Return the avatar field as an array.
	 */
	private function get_avatar_comment_field_array() {

		$avatar_html    = $this->get_avatar_image_html( Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ) );
		$current_avatar = false;
		if ( is_user_logged_in() ) {
			global $current_user;
			$user_id    = $current_user->ID;
			$avatar_url = get_user_meta( $user_id, 'sce-avatar-location', true );
			if ( $avatar_url ) {
				$avatar_html    = $this->get_avatar_image_html( Functions::get_plugin_url( 'images/avatars/' . $avatar_url . '.png' ) );
				$current_avatar = $avatar_url;
			}
		}

		// Get nicename/nickname if logged in.
		if ( is_user_logged_in() ) {
			global $current_user;
			$user_nickname = $current_user->data->display_name ?? '';
		} else {
			$user_nickname = __( 'Choose an Avatar', 'comment-edit-pro' );
		}
		$avatar_field = array(
			'sce-avatar' => '<section class="comment-form-sce-avatar"><div class="sce-avatar">' . $avatar_html . '</div><div class="sce-modal-exit"></div><div class="avatar-heading"><strong>' . esc_html( $user_nickname ) . '</strong></div><input type="hidden" id="sce-comment-form-avatar" name="sce-comment-form-avatar" value="' . ( $current_avatar ? esc_attr( $current_avatar ) : '' ) . '" /></section><div id="sce-avatar-form-modal-wrapper"><div id="sce-avatar-form-modal"></div></div>',
		);
		return $avatar_field;
	}

	/**
	 * Retrieve an avatar based on past data.
	 *
	 * @param int $comment_id The comment ID to retrieve data from.
	 * @param int $user_id    The user ID to retrieve the avatar from.
	 * @param int $size       The size of the avatar.
	 *
	 * @return string Avatar HTML.
	 */
	private function get_avatar( $comment_id = 0, $user_id = null, $size = 90 ) {
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
		if ( null === $avatar ) {
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
			$avatar_html = $this->get_avatar_image_html( $avatar, $comment_id, $user_id, $size );
			return $avatar_html;
		}

		return '';
	}

	/**
	 * Return avatar image html.
	 *
	 * @param string $src        The full URL to the asset.
	 * @param int    $comment_id Comment ID for the comment.
	 * @param int    $user_id    User ID for the comment.
	 * @param int    $size       The ideal width/height of the avatar.
	 *
	 * @return unescaped image HTML.
	 */
	private function get_avatar_image_html( $src, $comment_id = 0, $user_id = 0, $size = 0 ) {
		global $post, $comment;
		$options = Options::get_options();

		// If no size, try to pull from options.
		if ( 0 === $size ) {
			$maybe_size = $options['avatar_size'] ?? 0;
			if ( $maybe_size ) {
				$size = $maybe_size;
			}
		}

		// If size still isn't set, set a default.
		if ( 0 === $size || ! is_int( $size ) ) {
			$size = 90;
		}

		// Now see if we're overriding avatar size options.
		$custom_avatar_size = $options['enable_custom_avatar_size'] ?? false;
		if ( $custom_avatar_size ) {
			$custom_size = $options['avatar_size'] ?? false;
			if ( $custom_size ) {
				// Check for admin and if in comment loop.
				if ( ! is_admin() && is_a( $comment, 'WP_Comment' ) ) {
					$size = $custom_size;
				}
			}
		}

		/**
		 * Filter: sce_avatar_size
		 *
		 * @param int $size (for both width/height).
		 */
		$width  = apply_filters( 'sce_avatar_size', $size );
		$height = apply_filters( 'sce_avatar_size', $size );

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

		// See if user can edit comment.
		$sce      = \Simple_Comment_Editing::get_instance();
		$post_id  = $post->ID ?? 0;
		$can_edit = false;
		if ( $comment_id && $post_id ) {
			// See if current user can moderate comments (yes to editing).
			if ( current_user_can( 'moderate_comments' ) ) {
				$can_edit = true;
			}

			// Check to see if the user is the comment author.
			if ( ! $can_edit ) {
				// Check to see if the current user is the comment author.
				global $current_user;
				$user_id         = $current_user->ID ?? 0;
				$comment_user_id = $comment->user_id ?? 0;
				if ( is_user_logged_in() && $user_id === $comment_user_id && 0 !== $user_id ) {
					$can_edit = true;
				}
			}

			// Can edit is still false. Check cookie values.
			if ( ! $can_edit ) {
				$can_edit = $sce->can_edit( $comment_id, $post_id );
			}
		}

		// Build JS if user can edit.
		$can_edit_js = '';
		if ( $can_edit ) {
			$nonce_field = wp_create_nonce( 'sce-edit-avatar-' . $comment_id . $post_id );
			$can_edit_js = sprintf(
				'onClick="window.sce_avatars( event, %d, %d, %d, \'%s\' );"',
				esc_js( $comment_id ),
				esc_js( $user_id ),
				esc_js( $post_id ),
				esc_js( $nonce_field )
			);
		}

		$classes = array(
			'avatar',
			sprintf( 'avatar-%s', esc_attr( $width ) ),
			'photo',
			'sce-custom-avatar',
			'sce-popover-comment-id-' . $comment_id,
		);

		if ( $can_edit ) {
			if ( is_user_logged_in() ) {
				$classes[] = 'sce-can-edit';
			} else {
				if ( $can_edit && true === $options['enable_avatars_anonymous'] ) {
					$classes[] = 'sce-can-edit';
				}
			}
		}

		if ( ! $this->can_change_avatar() ) {
			$avatar_html = sprintf(
				'<img class="%s" src="%s" alt="Default Avatar" loading="lazy" width="%d" height="%d" />',
				esc_attr( implode( ' ', $classes ) ),
				esc_url( $src ),
				esc_attr( $avatar_dimensions['width'] ),
				esc_attr( $avatar_dimensions['height'] ),
			);
			return $avatar_html;
		}

		/**
		 * Filter: sce_avatar_classes
		 *
		 * @param array $classes Array of classes for the Avatar output.
		 */
		$classes = apply_filters( 'sce_avatar_classes', $classes );

		$avatar_html = sprintf(
			'<img class="%s" src="%s" alt="Default Avatar" loading="lazy" width="%d" height="%d" %s />',
			esc_attr( implode( ' ', $classes ) ),
			esc_url( $src ),
			esc_attr( $avatar_dimensions['width'] ),
			esc_attr( $avatar_dimensions['height'] ),
			$can_edit_js
		);
		$return_html = '<a href="#" class="sce-avatar-select" aria-label="' . esc_attr__( 'Choose an Avatar', 'comment-edit-pro' ) . '" onClick="window.sce_avatars_stop_propagation( event );">' . $avatar_html . '</a>';
		if ( is_admin() ) {
			return $avatar_html;
		}
		return $return_html;
	}

	/**
	 * Return gravatar privacy image html.
	 *
	 * @param string $src        The full URL to the asset.
	 * @param int    $comment_id Comment ID for the comment.
	 * @param int    $size       The ideal width/height of the avatar.
	 *
	 * @return unescaped image HTML.
	 */
	private function get_gravatar_privacy_image_html( $src, $comment_id = 0, $size = 0 ) {
		global $post, $comment;
		$options = Options::get_options();

		// If size still isn't set, set a default.
		if ( 0 === $size || ! is_int( $size ) ) {
			$size = 90;
		}

		/**
		 * Filter: sce_gravatar_protection_size
		 *
		 * @param int $size (for both width/height).
		 */
		$width  = apply_filters( 'sce_gravatar_protection_size', $size );
		$height = apply_filters( 'sce_gravatar_protection_size', $size );

		/**
		 * Add ability to change width/height of image.
		 */
		$avatar_dimensions = apply_filters(
			'sce_gravatar_protection_size_args',
			array(
				'width'  => $width,
				'height' => $height,
			)
		);

		$classes = array(
			'avatar',
			sprintf( 'avatar-%s', esc_attr( $width ) ),
			'photo',
			'sce-custom-avatar',
			'sce-gravatar-protection-avatar',
		);

		/**
		 * Filter: sce_gravatar_protection_classes
		 *
		 * @param array $classes Array of classes for the Avatar output.
		 */
		$classes = apply_filters( 'sce_gravatar_protection_classes', $classes );

		$avatar_html = sprintf(
			'<img class="%s" src="%s" alt="Default Avatar" loading="lazy" width="%d" height="%d" />',
			esc_attr( implode( ' ', $classes ) ),
			esc_url( $src ),
			esc_attr( $avatar_dimensions['width'] ),
			esc_attr( $avatar_dimensions['height'] ),
		);

		if ( is_admin() ) {
			return $avatar_html;
		}
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
		$user       = null;
		$comment_id = 0;
		if ( is_a( $id_or_email, 'WP_Comment' ) ) {
			$comment_id = $id_or_email->comment_ID;
			$user       = get_user_by( 'id', $id_or_email->user_id );
		} elseif ( is_numeric( $id_or_email ) ) {
			$user = get_user_by( 'id', (int) $id_or_email );
		} elseif ( is_email( $id_or_email ) ) {
			$user = get_user_by( 'email', $id_or_email );
		};

		// Now get the user ID if it exists.
		$user_id = $user->ID ?? null;
		$avatar  = $this->get_avatar( $comment_id, $user_id, $size );
		if ( ! empty( $avatar ) ) {
			return $avatar;
		}

		$default_avatar = $this->get_avatar_image_html( Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ), $comment_id, $user_id, $size );
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
	 * Overrides an gravatar with a mystery image if the user has opted out from Gravatar.
	 *
	 * @param string|null $avatar_html HTML for the user's avatar. Default null.
	 * @param mixed       $id_or_email The avatar to retrieve. Accepts a user_id, Gravatar MD5 hash,
	 *                                 user email, WP_User object, WP_Post object, or WP_Comment object.
	 * @param array       $args        Arguments passed to get_avatar_url(), after processing.
	 *
	 * @return string|null Avatar HTML.
	 **/
	public function pre_avatar_override_gravatar_protection( $avatar_html, $id_or_email, $args ) {
		global $comment;
		$comment_id = 0;
		if ( is_a( $comment, 'WP_Comment' ) ) {
			$comment_id = $comment->comment_ID;
		} elseif ( is_a( $id_or_email, 'WP_Comment' ) ) {
			$comment_id = $id_or_email->comment_ID;
		}

		// Return if not in context of a comment.
		if ( 0 === $comment_id ) {
			return $avatar_html;
		}

		// Get size.
		$size = $args['size'] ?? 64;

		// Get comment meta for gravatar protection.
		$is_gravatar_protected = (bool) get_comment_meta( $comment_id, 'sce-gravatar-protection', true );
		if ( $is_gravatar_protected ) {
			$avatar_html = $this->get_gravatar_privacy_image_html( Functions::get_plugin_url( 'images/avatars/circle-flat-icons-mystery.png' ), $comment_id, $size );
		}

		// Nothing to see here. Return.
		return $avatar_html;
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
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
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

	/**
	 * Save gravatar protection meta when a comment has been posted.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted_gravatar_protection( $comment_id, $maybe_comment_approved ) {
		$gravatar_protection_enabled = (bool) filter_input( INPUT_POST, 'sce-gravatar-protection', FILTER_VALIDATE_BOOLEAN );

		// An approved or moderated comment is okay. Spam, skip.
		if ( 'spam' !== $maybe_comment_approved && $gravatar_protection_enabled ) {
			// Store as comment meta.
			update_comment_meta( $comment_id, 'sce-gravatar-protection', true );
		}
	}

	/**
	 * Add frontend scripts/styles.
	 */
	public function add_frontend_scripts_styles() {
		// Determine if comments are open.
		if ( comments_open() ) {
			// Enqueue frontend styles.
			wp_enqueue_style(
				'sce-frontend',
				Functions::get_plugin_url( 'dist/sce-frontend.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}
}
