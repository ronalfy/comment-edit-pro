<?php
/**
 * Helper fuctions for Tools.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options_Tools as Options_Tools;
use WP_Comment;

/**
 * Class Tools
 */
class Tools {

	/**
	 * Class runner.
	 */
	public function run() {

		// Load integration scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Ajax handler for comment activity.
		add_action( 'wp_ajax_sce_save_comment_activity', array( $this, 'ajax_save_comment_activity' ) );
		add_action( 'wp_ajax_sce_get_comment_activity', array( $this, 'ajax_get_comment_activity' ) );

		// Ajax handlers for post type comment settings.
		add_action( 'wp_ajax_sce_save_post_type_comment_settings', array( $this, 'ajax_save_post_type_comment_settings' ) );
		add_action( 'wp_ajax_sce_get_post_type_comment_settings', array( $this, 'ajax_get_post_type_comment_settings' ) );

		// Ajax handlers for the comment shortcut settings.
		add_action( 'wp_ajax_sce_save_comment_shortcut_settings', array( $this, 'ajax_save_comment_shortcut_settings' ) );
		add_action( 'wp_ajax_sce_get_comment_shortcut_settings', array( $this, 'ajax_get_comment_shortcut_settings' ) );

		// Get options for post type.
		add_action( 'wp', array( $this, 'adjust_post_type_comment_settings' ) ); // runs in the frontend.
		add_action( 'current_screen', array( $this, 'adjust_post_type_comment_settings' ) ); // runs in the admin.
		add_filter( 'comments_open', array( $this, 'maybe_open_comments' ), 100, 2 );
		add_filter( 'comments_array', array( $this, 'hide_post_type_comments_array' ), 9999, 2 );
		add_filter( 'comments_pre_query', array( $this, 'hide_post_type_comment_query' ), 10, 2 );
		add_filter( 'get_comments_number', array( $this, 'hide_post_type_comment_count' ), 10, 2 );

		// Modify existing post type args to support comments if enabled in post type comment settings.
		add_filter( 'register_post_type_args', array( $this, 'modify_post_type_args' ), 9999, 2 );

		// Force status for new items.
		add_filter( 'wp_insert_post_data', array( $this, 'force_comment_status' ), 9999, 2 );

		// Get comment activity options.
		$options                            = Options_Tools::get_options();
		$enable_comment_activity_expiration = (bool) $options['enable_comment_activity_expiration'];
		if ( $enable_comment_activity_expiration ) {
			// Add comment activity post meta.
			add_action( 'init', array( $this, 'register_comment_activity_meta_boxes' ) );
			add_action( 'add_meta_boxes', array( $this, 'register_non_block_comment_activity_meta_boxes' ) );

			// Enqueue the comment activity sidebar.
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_comment_activity_sidebar' ) );

			// Add comment activity post meta.
			add_action( 'save_post', array( $this, 'save_comment_activity_meta' ), 10 );

			// Add comment activity post meta when a comment is posted.
			add_action( 'wp_insert_comment', array( $this, 'update_post_activity_new_comment' ), 10, 2 );

			// Add comment activity to post when post is created.
			add_action( 'wp_insert_post', array( $this, 'update_post_activity_new_post' ), 10, 1 );

			// Close any comments that have expired.
			add_filter( 'comments_open', array( $this, 'close_expired_comments' ), 10, 2 );
		}
	}

	/**
	 * Close any expired comments.
	 *
	 * @param bool $open    Whether comments are open or not.
	 * @param int  $post_id The post ID.
	 */
	public function close_expired_comments( $open, $post_id ) {
		if ( $this->is_comment_activity_enabled_for_post_type( $post_id ) ) {
			$expiration_time = get_post_meta( $post_id, '_sce_expiration_timestamp', true );
			if ( $expiration_time ) {
				$now = time();
				if ( $now > $expiration_time ) {
					return false;
				}
			} else {
				// This means post meta is not set. So let's set it.
				$this->reset_post_comment_expiration( $post_id );
			}
		}
		return $open;
	}

	/**
	 * Update the activity meta when a new post is created.
	 *
	 * @param int $post_id The post ID.
	 */
	public function update_post_activity_new_post( $post_id ) {
		$this->reset_post_comment_expiration( $post_id );
	}

	/**
	 * Update post activity meta when there's a new comment.
	 *
	 * @param int        $comment_id Comment ID.
	 * @param WP_Comment $comment    Comment.
	 */
	public function update_post_activity_new_comment( $comment_id, $comment ) {
		$post_id = $comment->comment_post_ID;
		$this->reset_post_comment_expiration( $post_id );
	}

	/**
	 * Add custom field for comment activity expiration if enabled.
	 *
	 * @param int $post_id Post ID.
	 */
	public function save_comment_activity_meta( $post_id ) {
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( isset( $_POST['sce-comment-activity-days'] ) ) {
			$is_expiration_active = (bool) filter_input( INPUT_POST, 'sce-comment-activity-enabled', FILTER_DEFAULT );
			$expiration_days      = absint( filter_input( INPUT_POST, 'sce-comment-activity-days', FILTER_DEFAULT ) );
			$nonce                = filter_input( INPUT_POST, 'sce_comment_activity_nonce', FILTER_DEFAULT );

			if ( ! wp_verify_nonce( $nonce, 'sce_save_comment_activity' ) ) {
				return;
			}

			// Save post meta.
			update_post_meta( $post_id, '_sce_expiration_enabled', $is_expiration_active );
			update_post_meta( $post_id, '_sce_expiration_days', $expiration_days );
		}

		// Check to update comment activity.
		$this->reset_post_comment_expiration( $post_id );
	}

	/**
	 * Reset the post comment expiration post meta.
	 *
	 * @param int $post_id The post ID to reset.
	 */
	private function reset_post_comment_expiration( $post_id ) {
		// Get the activity expiration meta.
		$is_expiration_active = (bool) get_post_meta( $post_id, '_sce_expiration_enabled', true );
		if ( $is_expiration_active && $this->is_comment_activity_enabled_for_post_type( $post_id ) ) {
			// Get the expiration date.
			$days_without_activity = absint( get_post_meta( $post_id, '_sce_expiration_days', true ) );
			$expiration_time       = strtotime( '+' . $days_without_activity . ' days' );
			update_post_meta( $post_id, '_sce_expiration_timestamp', $expiration_time );
			return;
		}

		// Check to see if expiration is enabled globally for post type.
		if ( $this->is_comment_activity_enabled_for_post_type( $post_id ) ) {
			$options               = Options_Tools::get_options();
			$days_without_activity = $options['comment_activity_expiration']; // number in days.
			$expiration_time       = strtotime( '+' . $days_without_activity . ' days' );
			update_post_meta( $post_id, '_sce_expiration_timestamp', $expiration_time );
		}
	}

	/**
	 * Determine if comment activity is enabled for a post type.
	 *
	 * @param int $post_id The post ID to check.
	 *
	 * @return bool true if enabled, false if not.
	 */
	private function is_comment_activity_enabled_for_post_type( $post_id ) {
		// Check to see if expiration is enabled globally for post type.
		$post_type = get_post_type( $post_id );
		$options   = Options_Tools::get_options();

		// Check if comment activity is enabled.
		if ( ! (bool) $options['enable_comment_activity_expiration'] ) {
			return false;
		}
		if ( isset( $options['comment_activity_post_types'][ $post_type ]['checked'] ) ) {
			$maybe_checked = $options['comment_activity_post_types'][ $post_type ]['checked'];
			if ( true === $maybe_checked ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Enqueue comment activity sidebar for approved post types.
	 */
	public function enqueue_comment_activity_sidebar() {
		// Get options.
		$options = Options_Tools::get_options();

		// Get post types that comment activity is enabled for.
		$comment_activity_post_types = $options['comment_activity_post_types'];
		$enabled_post_types          = array();
		foreach ( $comment_activity_post_types as $post_type  => $maybe_checked ) {
			if ( isset( $comment_activity_post_types[ $post_type ]['checked'] ) && true === $comment_activity_post_types[ $post_type ]['checked'] ) {
				$enabled_post_types[] = $post_type;
			}
		}

		// Get current post type.
		$current_post_type = get_post_type();

		// Return if not enabled.
		if ( ! in_array( $current_post_type, $enabled_post_types, true ) ) {
			return;
		}

		$sidebar_deps = require_once Functions::get_plugin_dir( 'dist/sce-comment-activity-sidebar.asset.php' );
		wp_enqueue_script(
			'sce-comment-activity-sidebar',
			Functions::get_plugin_url( 'dist/sce-comment-activity-sidebar.js' ),
			$sidebar_deps['dependencies'],
			$sidebar_deps['version'],
			true
		);
	}

	/**
	 * Register comment activity meta boxes.
	 */
	public function register_comment_activity_meta_boxes() {
		// Get options.
		$options = Options_Tools::get_options();

		// Get post types that comment activity is enabled for.
		$comment_activity_post_types = $options['comment_activity_post_types'];
		$enabled_post_types          = array();
		foreach ( $comment_activity_post_types as $post_type  => $maybe_checked ) {
			if ( isset( $comment_activity_post_types[ $post_type ]['checked'] ) && true === $comment_activity_post_types[ $post_type ]['checked'] ) {
				$enabled_post_types[] = $post_type;
			}
		}

		// Enable meta box for enabled post types.
		foreach ( $enabled_post_types as $post_type ) {
			// Add new school meta boxes.
			register_post_meta(
				$post_type,
				'_sce_expiration_enabled',
				array(
					'sanitize_callback' => /* validate bool */ function ( $value ) {
						return (bool) $value;
					},
					'show_in_rest'      => true,
					'type'              => 'boolean',
					'auth_callback'     => function () {
						return current_user_can( 'edit_posts' );
					},
					'single'            => true,
					'default'           => false,
				)
			);
			register_post_meta(
				$post_type,
				'_sce_expiration_days',
				array(
					'sanitize_callback' => 'absint',
					'show_in_rest'      => true,
					'type'              => 'number',
					'auth_callback'     => function () {
						return current_user_can( 'edit_posts' );
					},
					'single'            => true,
					'default'           => 28,
				)
			);
		}
	}

	/**
	 * Register comment activity meta boxes for non-block editor.
	 */
	public function register_non_block_comment_activity_meta_boxes() {
		$options = Options_Tools::get_options();

		// Get post types that comment activity is enabled for.
		$comment_activity_post_types = $options['comment_activity_post_types'];
		$enabled_post_types          = array();
		foreach ( $comment_activity_post_types as $post_type  => $maybe_checked ) {
			if ( isset( $comment_activity_post_types[ $post_type ]['checked'] ) && true === $comment_activity_post_types[ $post_type ]['checked'] ) {
				$enabled_post_types[] = $post_type;
			}
		}

		// Enable meta box for enabled post types.
		foreach ( $enabled_post_types as $post_type ) {
			// Add old school (no gutenberg) meta boxes.
			$screen = get_current_screen();
			if ( $screen->is_block_editor() ) {
				continue;
			}
			add_meta_box(
				'sce-comment-activity',
				__( 'Comment Activity', 'comment-edit-pro' ),
				array( $this, 'render_comment_activity_meta_box' ),
				$post_type,
				'side',
				'low'
			);
		}
	}

	/**
	 * Render comment activity meta box.
	 *
	 * @param WP_Post $post The post object.
	 */
	public function render_comment_activity_meta_box( $post ) {
		$is_enabled      = (bool) get_post_meta( $post->ID, '_sce_expiration_enabled', true );
		$expiration_days = absint( get_post_meta( $post->ID, '_sce_expiration_days', true ) );

		wp_nonce_field( 'sce_save_comment_activity', 'sce_comment_activity_nonce' );
		?>
		<p>
			<label for="sce-comment-activity-enabled">
				<input type="checkbox" name="sce-comment-activity-enabled" id="sce-comment-activity-enabled" value="1" <?php checked( $is_enabled ); ?> />
				<?php esc_html_e( 'Enable comment activity expiration', 'comment-edit-pro' ); ?>
			</label>
		</p>
		<p>
			<label for="sce-comment-activity-days">
				<?php esc_html_e( 'Expire after', 'comment-edit-pro' ); ?>
				<input type="number" name="sce-comment-activity-days" id="sce-comment-activity-days" value="<?php echo esc_attr( $expiration_days ); ?>" min="1" max="365" />
				<?php esc_html_e( 'days', 'comment-edit-pro' ); ?>
			</label>
		<?php
	}

	/**
	 * Force comment and pingback status to open if post type supports it.
	 *
	 * @param array $data    Post data.
	 * @param array $postarr Post array.
	 *
	 * @return array $data Post data.
	 */
	public function force_comment_status( $data, $postarr ) {

		// Get options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];

		// If post type is not set in settings, return.
		if ( ! isset( $post_type_settings[ $data['post_type'] ] ) ) {
			return $data;
		}

		// Get post type settings.
		$post_type_settings = $post_type_settings[ $data['post_type'] ];

		// Check discussion settings and if they're on by default.
		if ( isset( $post_type_settings['enable_discussions_default'] ) && true === $post_type_settings['enable_discussions_default'] ) {
			$data['comment_status'] = 'open';
		}

		// If comments are set, set them.
		if ( isset( $post_type_settings['force_comments'] ) && 'default' !== $post_type_settings['force_comments'] ) {
			if ( 'closed' === $post_type_settings['force_comments'] ) {
				$data['comment_status'] = 'closed';
			} elseif ( 'open' === $post_type_settings['force_comments'] ) {
				$data['comment_status'] = 'open';
			}
		}

		// if pingbacks are set, set them.
		if ( isset( $post_type_settings['force_pingbacks'] ) && 'default' !== $post_type_settings['force_pingbacks'] ) {
			if ( 'closed' === $post_type_settings['force_pingbacks'] ) {
				$data['ping_status'] = 'closed';
			} elseif ( 'open' === $post_type_settings['force_pingbacks'] ) {
				$data['ping_status'] = 'open';
			}
		}

		return $data;
	}

	/**
	 * Add comment support to post types.
	 *
	 * @param array  $args      Post type args.
	 * @param string $post_type Post type.
	 *
	 * @return array $args Updated post type args.
	 */
	public function modify_post_type_args( $args, $post_type ) {

		// Get options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];

		// If post type is not set in settings, return.
		if ( ! isset( $post_type_settings[ $post_type ] ) ) {
			return $args;
		}

		// Get post type settings.
		$post_type_settings = $post_type_settings[ $post_type ];

		$supports = array();

		// If comments are set, set them.
		if ( isset( $post_type_settings['force_comments'] ) && 'default' !== $post_type_settings['force_comments'] ) {
			if ( 'closed' === $post_type_settings['force_comments'] ) {
				$supports[] = 'comments';
			} elseif ( 'open' === $post_type_settings['force_comments'] ) {
				$supports[] = 'comments';
			}
		}

		// if pingbacks are set, set them.
		if ( isset( $post_type_settings['force_pingbacks'] ) && 'default' !== $post_type_settings['force_pingbacks'] ) {
			if ( 'closed' === $post_type_settings['force_pingbacks'] ) {
				$supports[] = 'trackbacks';
			} elseif ( 'open' === $post_type_settings['force_pingbacks'] ) {
				$supports[] = 'trackbacks';
			}
		}

		// Set the supports argument.
		if ( ! isset( $args['supports'] ) && ! empty( $supports ) ) {
			$args['supports'] = array();
		}
		if ( ! empty( $supports ) ) {
			$args['supports'] = array_merge( $args['supports'], $supports );
		}

		return $args;
	}

	/**
	 * Maybe open comments if post type settings are set to force comments to open.
	 *
	 * @param bool $open Whether comments are open.
	 * @param int  $post_id The post ID.
	 *
	 * @return bool $open Whether comments are open.
	 */
	public function maybe_open_comments( $open, $post_id ) {
		// Get options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];

		// Get post type.
		$post_type = get_post_type( $post_id );

		// If post type is not set, return.
		if ( ! $post_type ) {
			return $open;
		}

		// If post type is not set in settings, return.
		if ( ! isset( $post_type_settings[ $post_type ] ) ) {
			return $open;
		}

		// Get post type settings.
		$post_type_settings = $post_type_settings[ $post_type ];

		// Hiding the comment section wins over Force Comments: Open.
		if ( $this->is_post_type_comment_section_hidden( $post_id ) ) {
			return false;
		}

		// If post meta is set, use it. This is set by the menu helper shortcuts and overrides the post type settings.
		$force_comments_state = get_post_meta( $post_id, '_sce_force_comments_state', true );
		if ( 'open' === $force_comments_state ) {
			return true;
		} elseif ( 'closed' === $force_comments_state ) {
			return false;
		}

		// If comments are set, set them.
		if ( isset( $post_type_settings['force_comments'] ) && 'default' !== $post_type_settings['force_comments'] ) {
			if ( 'closed' === $post_type_settings['force_comments'] ) {
				return false;
			} elseif ( 'open' === $post_type_settings['force_comments'] ) {
				return true;
			}
		}

		return $open;
	}

	/**
	 * Adjust comments for post type settings if available.
	 */
	public function adjust_post_type_comment_settings() {

		// Determine if we're editing a post in the admin.
		$screen              = function_exists( 'get_current_screen' ) ? get_current_screen() : false;
		$is_post_edit_screen = false;
		$post_id             = 0;
		if ( is_admin() && $screen && 'post' === $screen->base ) {
			$is_post_edit_screen = true;
			$post_id             = absint( filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT ) );
		} elseif ( is_singular() || is_page() ) {
			$post_id = get_the_ID();
		}

		if ( ! is_singular() && ! is_page() && ! $is_post_edit_screen ) {
			return;
		}

		// Get options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];

		// Get post type.
		$post_type = get_post_type( $post_id );

		// If post type is not set, return.
		if ( ! $post_type ) {
			return;
		}

		// If post type is not set in settings, return.
		if ( ! isset( $post_type_settings[ $post_type ] ) ) {
			return;
		}

		// Get post type settings.
		$post_type_settings = $post_type_settings[ $post_type ];

		// If comments are set, set them. Skip this when the comment section is hidden,
		// because that filter would force comments open again at priority 9999.
		$hide_comment_section = $this->is_post_type_comment_section_hidden( $post_id );
		if ( ! $hide_comment_section && isset( $post_type_settings['force_comments'] ) && 'default' !== $post_type_settings['force_comments'] ) {
			if ( 'closed' === $post_type_settings['force_comments'] ) {
				add_filter( 'comments_open', '__return_false', 9999 );
			} elseif ( 'open' === $post_type_settings['force_comments'] ) {
				add_filter( 'comments_open', '__return_true', 9999 );
			}

			// If post meta is set, use it. This is set by the menu helper shortcuts and overrides the post type settings.
			$force_comments_state = get_post_meta( $post_id, '_sce_force_comments_state', true );
			if ( 'open' === $force_comments_state ) {
				add_filter( 'comments_open', '__return_true', 9999 );
			} elseif ( 'closed' === $force_comments_state ) {
				add_filter( 'comments_open', '__return_false', 9999 );
			}
		}

		// If pingbacks are set, set them.
		if ( isset( $post_type_settings['force_pingbacks'] ) && 'default' !== $post_type_settings['force_pingbacks'] ) {
			if ( 'closed' === $post_type_settings['force_pingbacks'] ) {
				add_filter( 'pings_open', '__return_false', 9999 );
			} elseif ( 'open' === $post_type_settings['force_pingbacks'] ) {
				add_filter( 'pings_open', '__return_true', 9999 );
			}
		}

	}

	/**
	 * Whether this post type hides its front-end comment section.
	 *
	 * @param int $post_id Post ID.
	 * @return bool
	 */
	private function is_post_type_comment_section_hidden( $post_id ) {
		$post_id = absint( $post_id );
		if ( ! $post_id || is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return false;
		}

		$post_type = get_post_type( $post_id );
		if ( ! $post_type ) {
			return false;
		}

		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];
		if ( ! isset( $post_type_settings[ $post_type ]['hide_comment_section'] ) ) {
			return false;
		}

		return true === $post_type_settings[ $post_type ]['hide_comment_section'];
	}

	/**
	 * Remove comments for post types that hide the comment section.
	 *
	 * @param array $comments Comments.
	 * @param int   $post_id  Post ID.
	 * @return array
	 */
	public function hide_post_type_comments_array( $comments, $post_id ) {
		if ( $this->is_post_type_comment_section_hidden( $post_id ) ) {
			return array();
		}
		return $comments;
	}

	/**
	 * Remove block-theme comment queries for post types that hide the comment section.
	 *
	 * @param array|int|null    $comments Comment data, or null to run the normal query.
	 * @param \WP_Comment_Query $query    Comment query.
	 * @return array|int|null
	 */
	public function hide_post_type_comment_query( $comments, $query ) {
		$post_id = isset( $query->query_vars['post_id'] ) ? (int) $query->query_vars['post_id'] : 0;
		if ( ! $this->is_post_type_comment_section_hidden( $post_id ) ) {
			return $comments;
		}

		$query->found_comments = 0;
		$query->max_num_pages  = 0;
		if ( ! empty( $query->query_vars['count'] ) ) {
			return 0;
		}
		return array();
	}

	/**
	 * Zero the visible comment count when a post type hides its comment section.
	 *
	 * @param string|int $count   Comment count.
	 * @param int        $post_id Post ID.
	 * @return string|int
	 */
	public function hide_post_type_comment_count( $count, $post_id ) {
		if ( $this->is_post_type_comment_section_hidden( $post_id ) ) {
			return 0;
		}
		return $count;
	}

	/**
	 * Retrieve comment shortcut settings via Ajax.
	 */
	public function ajax_get_comment_shortcut_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-tools-comment-shortcut-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Retrieve options.
		$comment_options = Options_Tools::get_options();
		$return          = array(
			'enableShortcutApproved'                  => (bool) $comment_options['enable_shortcut_approved'],
			'enableShortcutUnapproved'                => (bool) $comment_options['enable_shortcut_unapproved'],
			'enableShortcutSpam'                      => (bool) $comment_options['enable_shortcut_spam'],
			'enableShortcutTrash'                     => (bool) $comment_options['enable_shortcut_trash'],
			'enableShortcutCountBubble'               => (bool) $comment_options['enable_shortcut_count_bubble'],
			'enableCoreCommentDropdown'               => (bool) $comment_options['enable_core_comment_dropdown'],
			'enableCommentDropdown'                   => (bool) $comment_options['enable_comment_dropdown'],
			'enableCommentDropdownApproved'           => (bool) $comment_options['enable_comment_dropdown_approved'],
			'enableCommentDropdownUnapproved'         => (bool) $comment_options['enable_comment_dropdown_unapproved'],
			'enableCommentDropdownSpam'               => (bool) $comment_options['enable_comment_dropdown_spam'],
			'enableCommentDropdownTrash'              => (bool) $comment_options['enable_comment_dropdown_trash'],
			'enableCommentDropdownOpenCloseComments'  => (bool) $comment_options['enable_comment_dropdown_open_close_comments'],
			'enableCommentDropdownDeletePostComments' => (bool) $comment_options['enable_comment_dropdown_delete_post_comments'],
			'enableCommentDropdownShowHideComments'   => (bool) $comment_options['enable_comment_dropdown_show_hide_comments'],
		);

		// Send response.
		wp_send_json_success( $return );
	}

	/**
	 * Save the shortcut settings via Ajax.
	 */
	public function ajax_save_comment_shortcut_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-tools-comment-shortcut-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Retrieve options.
		$comment_options = Options_Tools::get_options();

		// Update options. Filter all as bool.
		$comment_options['enable_shortcut_approved']                     = (bool) filter_input( INPUT_POST, 'enableShortcutApproved', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_shortcut_unapproved']                   = (bool) filter_input( INPUT_POST, 'enableShortcutUnapproved', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_shortcut_spam']                         = (bool) filter_input( INPUT_POST, 'enableShortcutSpam', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_shortcut_trash']                        = (bool) filter_input( INPUT_POST, 'enableShortcutTrash', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_shortcut_count_bubble']                 = (bool) filter_input( INPUT_POST, 'enableShortcutCountBubble', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_core_comment_dropdown']                 = (bool) filter_input( INPUT_POST, 'enableCoreCommentDropdown', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown']                      = (bool) filter_input( INPUT_POST, 'enableCommentDropdown', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_approved']             = (bool) filter_input( INPUT_POST, 'enableCommentDropdownApproved', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_unapproved']           = (bool) filter_input( INPUT_POST, 'enableCommentDropdownUnapproved', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_spam']                 = (bool) filter_input( INPUT_POST, 'enableCommentDropdownSpam', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_trash']                = (bool) filter_input( INPUT_POST, 'enableCommentDropdownTrash', FILTER_VALIDATE_BOOLEAN );
		$comment_optoions['enable_comment_dropdown_open_close_comments'] = (bool) filter_input( INPUT_POST, 'enableCommentDropdownOpenCloseComments', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_delete_post_comments'] = (bool) filter_input( INPUT_POST, 'enableCommentDropdownDeletePostComments', FILTER_VALIDATE_BOOLEAN );
		$comment_options['enable_comment_dropdown_show_hide_comments']   = (bool) filter_input( INPUT_POST, 'enableCommentDropdownShowHideComments', FILTER_VALIDATE_BOOLEAN );

		// Save options.
		Options_Tools::update_options( $comment_options );

		// Send response.
		wp_send_json_success();
	}

	/**
	 * Retrieve Post Type Settings via Ajax.
	 */
	public function ajax_get_post_type_comment_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-tools-post-type-comment-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Retrieve options.
		$comment_options    = Options_Tools::get_options();
		$post_type_settings = $comment_options['comment_post_type_settings'];
		$public_post_types  = Functions::get_public_post_types();

		// Convert to return array.
		$json_array = array();
		foreach ( $public_post_types as $post_type => $post_type_attrs ) {
			$json_array[ $post_type ]          = isset( $post_type_settings[ $post_type ] ) ? $post_type_settings[ $post_type ] : array();
			$json_array[ $post_type ]['label'] = $post_type_attrs->label;
			$json_array[ $post_type ]['name']  = $post_type_attrs->name;
		}

		// Send response.
		wp_send_json_success(
			array(
				'postTypeSettings' => $json_array,
			)
		);
	}

	/**
	 * Save post type settings via Ajax.
	 */
	public function ajax_save_post_type_comment_settings() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-tools-post-type-comment-settings' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Get post type settings and sanitize.
		$post_type_settings = Functions::sanitize_array_recursive( filter_input( INPUT_POST, 'postTypeSettings', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );

		Options_Tools::update_options( array( 'comment_post_type_settings' => $post_type_settings ) );

		// Send response.
		wp_send_json_success();
	}

	/**
	 * Retrieve comment activity options.
	 */
	public function ajax_get_comment_activity() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-tools-expiration' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$comment_activity_options = Options_Tools::get_options();

		// Convert keys to camelcase.
		$return_array = array();
		foreach ( $comment_activity_options as $key => $value ) {
			$return_array[ Functions::to_camelcase( $key ) ] = $value;
		}

		// Send response.
		wp_send_json_success( $return_array );
	}

	/**
	 * Retrieve comment activity options.
	 */
	public function ajax_save_comment_activity() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-tools-expiration' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$save_array                                       = array();
		$save_array['enable_comment_activity_expiration'] = filter_input( INPUT_POST, 'enableCommentActivityExpiration', FILTER_VALIDATE_BOOLEAN );
		$save_array['comment_activity_expiration']        = filter_input( INPUT_POST, 'commentActivityExpiration', FILTER_VALIDATE_INT );
		$save_array['comment_activity_post_types']        = Functions::sanitize_array_recursive( filter_input( INPUT_POST, 'commentActivityPostTypes', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ) );
		$save_array['enable_comment_activity_per_post']   = filter_input( INPUT_POST, 'enableCommentActivityPerPost', FILTER_VALIDATE_BOOLEAN );

		Options_Tools::update_options( $save_array );

		// Send response.
		wp_send_json_success();
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab     = Functions::get_admin_tab();
		$current_sub_tab = Functions::get_admin_sub_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'tools' === $current_tab && ( 'comment-activity' === $current_sub_tab ) ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-tools-comment-activity.asset.php' );
			wp_enqueue_script(
				'sce-tools-comment-activity',
				Functions::get_plugin_url( 'build/sce-tools-comment-activity.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			wp_localize_script(
				'sce-tools-comment-activity',
				'sceToolsCommentActivity',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-expiration' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-expiration' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
					'post_types' => Functions::get_public_post_types(),
				)
			);
		}
		if ( 'tools' === $current_tab && ( 'comment-shortcuts' === $current_sub_tab ) ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-comment-shortcuts-settings.asset.php' );
			wp_enqueue_script(
				'sce-tools-comment-shortcuts',
				Functions::get_plugin_url( 'build/sce-comment-shortcuts-settings.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			wp_localize_script(
				'sce-tools-comment-shortcuts',
				'sceToolsCommentShortcuts',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-comment-shortcut-settings' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-comment-shortcut-settings' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
		if ( 'tools' === $current_tab && ( 'post-types' === $current_sub_tab ) ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-tools-post-type-comment-settings.asset.php' );
			wp_enqueue_script(
				'sce-tools-post-type-comment-settings',
				Functions::get_plugin_url( 'build/sce-tools-post-type-comment-settings.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			wp_localize_script(
				'sce-tools-post-type-comment-settings',
				'sceToolsPostTypeCommentSettings',
				array(
					'save_nonce' => wp_create_nonce( 'sce-save-tools-post-type-comment-settings' ),
					'get_nonce'  => wp_create_nonce( 'sce-retrieve-tools-post-type-comment-settings' ),
					'ajaxurl'    => esc_url( admin_url( 'admin-ajax.php' ) ),
					'post_types' => Functions::get_public_post_types(),
				)
			);
		}
	}
}
