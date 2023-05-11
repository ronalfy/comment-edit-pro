<?php
/**
 * Helper fuctions for Comment Shortcuts.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Comment_Shortcuts
 */
class Comment_Shortcuts {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Comment Shortcuts admin panel actions.
		 */

		// Initialize the admin menus.
		add_action( 'admin_menu', array( $this, 'add_admin_menus' ), 5 );

		// Redirect based on admin query params. Use init for action priority.
		add_action( 'init', array( $this, 'redirect_to_comments_tab' ), 5 );

		// Add an admin body class for the comment status.
		add_filter( 'admin_body_class', array( $this, 'add_admin_comment_status_body_class' ) );

		// Add comment menu styling to the admin depending on comment status.
		add_action( 'admin_head', array( $this, 'add_admin_comment_status_menu_style' ) );

		// Add admin bar menu styling to the admin.
		add_action( 'admin_head', array( $this, 'add_admin_bar_menu_style' ) );
		add_action( 'wp_head', array( $this, 'add_admin_bar_menu_style' ) );

		// Add shortcuts to comments admin bar menu item if enabled.
		add_action( 'admin_bar_menu', array( $this, 'add_admin_bar_comment_shortcuts_backend' ), 100 );
		add_action( 'admin_bar_menu', array( $this, 'add_admin_bar_comment_shortcuts_frontend' ), 100 );
	}

	/**
	 * Add admin bar styling in the admin for comment bubbles.
	 */
	public function add_admin_bar_menu_style() {
		// If not admin, make sure we're on a post or page.
		if ( ! is_admin() && ! is_singular() && ! is_page() ) {
			return;
		}

		// Warning, lots of core style overrides ahead.
		?>
		<style>
			.sce-admin-bar-comment-shortcuts .awaiting-mod {
					display: inline-block;
					vertical-align: middle;
					box-sizing: border-box;
					margin: 1px 0 -1px 2px !important; /* override core style */
					padding: 0 5px !important; /* override core style */
					min-width: 18px !important; /* override core style */
					height: 18px !important; /* override core style */
					border-radius: 9px !important; /* override core style */
					background-color: #d63638;
					color: #fff;
					font-size: 11px !important; /* override core style */
					line-height: 1.6 !important; /* override core style */
					text-align: center;
			}
		</style>
		<?php
	}

	/**
	 * Add admin menu items to the frontend of a site.
	 *
	 * @param WP_Admin_Bar $wp_admin_bar The admin bar object.
	 */
	public function add_admin_bar_comment_shortcuts_frontend( $wp_admin_bar ) {
		if ( is_admin() ) {
			return;
		}

		// Only load on singular and page types.
		if ( ! is_singular() && ! is_page() ) {
			return;
		}

		// If user doesn't have capabilities, don't show the menu.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}

		// Get options.
		$options = Options_Tools::get_options();

		// Get admin bar comment shortcuts.
		$maybe_comment_shortcuts_enabled = (bool) $options['enable_comment_dropdown'];
		if ( ! $maybe_comment_shortcuts_enabled ) {
			return;
		}
		$enable_comment_dropdown_open_close_comments  = (bool) $options['enable_comment_dropdown_open_close_comments'];
		$enable_comment_dropdown_delete_post_comments = (bool) $options['enable_comment_dropdown_delete_post_comments'];
		$enable_comment_dropdown_show_hide_comments   = (bool) $options['enable_comment_dropdown_show_hide_comments'];

		// If we're here, the comment admin bar menu item is enabled.
		// Get the comment node.
		$comment_node = $wp_admin_bar->get_node( 'comments' );

		// Bail if no comment node.
		if ( ! $comment_node ) {
			return;
		}

		// Get the post object.
		$post_id            = get_the_ID();
		$post               = get_post( $post_id );
		$post_comment_count = $post->comment_count;

		// Get comment shortcuts for the admin bar.
		$approved_shortcut = (bool) $options['enable_comment_dropdown_approved'];
		$pending_shortcut  = (bool) $options['enable_comment_dropdown_unapproved'];
		$spam_shortcut     = (bool) $options['enable_comment_dropdown_spam'];
		$trash_shortcut    = (bool) $options['enable_comment_dropdown_trash'];

		// Get comment count.
		$comment_counts = wp_count_comments();
		$approved_count = $comment_counts->approved;
		$pending_count  = $comment_counts->moderated;
		$spam_count     = $comment_counts->spam;
		$trash_count    = $comment_counts->trash;

		// Add group if shortcuts enabled.
		if ( $approved_shortcut || $pending_shortcut || $spam_shortcut || $trash_shortcut ) {
			$wp_admin_bar->add_group(
				array(
					'id'     => 'sce-comment-shortcuts',
					'parent' => 'comments',
				)
			);

			$wp_admin_bar->add_node(
				array(
					'id'     => 'sce-comment-shortcuts-label',
					'parent' => 'sce-comment-shortcuts',
					'title'  => '<span style="font-weight: 900;">' . __( 'Shortcuts', 'comment-edit-pro' ) . '</span>',
					'href'   => false,
				)
			);
		}

		// Add approved shortcut to the admin bar.
		if ( $approved_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-approved-shortcut',
					'title'  => __( 'View Approved', 'comment-edit-pro' ),
					'parent' => 'sce-comment-shortcuts',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=approved' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-approved',
					),
				)
			);
		}

		// Add pending shortcut with count to the admin bar.
		if ( $pending_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-pending-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Pending <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$pending_count
					),
					'parent' => 'sce-comment-shortcuts',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=moderated' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-pending',
					),
				)
			);
		}

		// Add spam shortcut with count to the admin bar.
		if ( $spam_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-spam-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Spam <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$spam_count
					),
					'parent' => 'sce-comment-shortcuts',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=spam' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-spam',
					),
				)
			);
		}

		// Add trash shortcut with count to the admin bar.
		if ( $trash_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-trash-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Trash <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$trash_count
					),
					'parent' => 'sce-comment-shortcuts',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=trash' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-trash',
					),
				)
			);
		}

		// Bail if no shortcuts are enabled.
		if ( ! $enable_comment_dropdown_open_close_comments && ! $enable_comment_dropdown_delete_post_comments && ! $enable_comment_dropdown_show_hide_comments ) {
			return;
		}

		// Add group node for advanced shortcuts.
		$wp_admin_bar->add_group(
			array(
				'id'     => 'sce-advanced-comment-shortcuts',
				'parent' => 'comments',
			)
		);

		$wp_admin_bar->add_node(
			array(
				'id'     => 'sce-advanced-comment-shortcuts-label',
				'parent' => 'sce-advanced-comment-shortcuts',
				'title'  => '<span style="font-weight: 900;">' . __( 'Advanced', 'comment-edit-pro' ) . '</span>',
				'href'   => false,
			)
		);

		// Add open/close comments item to the admin bar.
		if ( $enable_comment_dropdown_open_close_comments ) {
			// If comments are open, add close. If closed, add open.
			if ( comments_open() ) {
				$wp_admin_bar->add_node(
					array(
						'id'     => 'sce-open-close-comments',
						'parent' => 'sce-advanced-comment-shortcuts',
						'title'  => __( 'Close Comments', 'comment-edit-pro' ),
						'href'   => '#',
					)
				);
			} else {
				$wp_admin_bar->add_node(
					array(
						'id'     => 'sce-open-close-comments',
						'parent' => 'sce-advanced-comment-shortcuts',
						'title'  => __( 'Open Comments', 'comment-edit-pro' ),
						'href'   => '#',
					)
				);
			}
		}

		// Add show/hide comments item to the admin bar.
		if ( $enable_comment_dropdown_show_hide_comments ) {
			if ( $post_comment_count > 0 ) {
				$has_comments_hidden = (bool) get_post_meta( get_the_ID(), '_sce_comments_hidden', true );

				// If comments are hidden, show the show comments item.
				if ( $has_comments_hidden ) {
					$wp_admin_bar->add_node(
						array(
							'id'     => 'sce-show-hide-comments',
							'parent' => 'sce-advanced-comment-shortcuts',
							'title'  => __( 'Show Comments', 'comment-edit-pro' ),
							'href'   => '#',
						)
					);
				} else {
					$wp_admin_bar->add_node(
						array(
							'id'     => 'sce-show-hide-comments',
							'parent' => 'sce-advanced-comment-shortcuts',
							'title'  => __( 'Hide Comments', 'comment-edit-pro' ),
							'href'   => '#',
						)
					);
				}
			}
		}

		// Add delete post comments item to the admin bar.
		if ( $enable_comment_dropdown_delete_post_comments ) {
			// If post has comments, show delete comments.
			if ( $post_comment_count > 0 ) {
				$wp_admin_bar->add_node(
					array(
						'id'     => 'sce-delete-post-comments',
						'parent' => 'sce-advanced-comment-shortcuts',
						'title'  => __( 'Delete Post Comments', 'comment-edit-pro' ),
						'href'   => '#',
					)
				);
			}
		}
	}

	/**
	 * Add the admin bar shortcuts menu.
	 *
	 * @param WP_Admin_Bar $wp_admin_bar The admin bar object.
	 */
	public function add_admin_bar_comment_shortcuts_backend( $wp_admin_bar ) {
		// Bail if not admin.
		if ( ! is_admin() ) {
			return;
		}

		// Get options.
		$options = Options_Tools::get_options();

		// Get result if the comment admin bar menu item is disabled.
		$maybe_comment_bar_enabled = (bool) $options['enable_core_comment_dropdown'];
		if ( ! $maybe_comment_bar_enabled ) {
			// Remove the comment admin bar menu item.
			$wp_admin_bar->remove_node( 'comments' );

			// Bail early.
			return;
		}

		// Check if the shortcut dropdown is enabled. Bail if not.
		$maybe_comment_shortcuts_enabled = (bool) $options['enable_comment_dropdown'];
		if ( ! $maybe_comment_shortcuts_enabled ) {
			return;
		}

		// If we're here, the comment admin bar menu item is enabled.
		// Get the comment node.
		$comment_node = $wp_admin_bar->get_node( 'comments' );

		// Bail if no comment node.
		if ( ! $comment_node ) {
			return;
		}

		// Get comment shortcuts for the admin bar.
		$approved_shortcut = (bool) $options['enable_comment_dropdown_approved'];
		$pending_shortcut  = (bool) $options['enable_comment_dropdown_unapproved'];
		$spam_shortcut     = (bool) $options['enable_comment_dropdown_spam'];
		$trash_shortcut    = (bool) $options['enable_comment_dropdown_trash'];

		$comment_counts = wp_count_comments();
		$approved_count = $comment_counts->approved;
		$pending_count  = $comment_counts->moderated;
		$spam_count     = $comment_counts->spam;
		$trash_count    = $comment_counts->trash;

		// Add approved shortcut to the admin bar.
		if ( $approved_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-approved-shortcut',
					'title'  => __( 'View Approved', 'comment-edit-pro' ),
					'parent' => 'comments',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=approved' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-approved',
					),
				)
			);
		}

		// Add pending shortcut with count to the admin bar.
		if ( $pending_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-pending-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Pending <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$pending_count
					),
					'parent' => 'comments',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=moderated' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-pending',
					),
				)
			);
		}

		// Add spam shortcut with count to the admin bar.
		if ( $spam_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-spam-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Spam <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$spam_count
					),
					'parent' => 'comments',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=spam' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-spam',
					),
				)
			);
		}

		// Add trash shortcut with count to the admin bar.
		if ( $trash_shortcut ) {
			$wp_admin_bar->add_node(
				array(
					'id'     => 'comment-trash-shortcut',
					'title'  => sprintf(
						/* translators: %s: comment count */
						__( 'View Trash <span class="awaiting-mod">%s</span>', 'comment-edit-pro' ),
						$trash_count
					),
					'parent' => 'comments',
					'href'   => esc_url( admin_url( 'edit-comments.php?comment_status=trash' ) ),
					'meta'   => array(
						'class' => 'sce-admin-bar-comment-shortcuts sce-admin-bar-comment-shortcut-trash',
					),
				)
			);
		}

	}

	/**
	 * Add CSS to the admin header for the comment status in the top-level menu.
	 */
	public function add_admin_comment_status_menu_style() {
		// Make sure we're on the edit-comments.php screen, or bail.
		$screen = get_current_screen();
		if ( ! $screen || 'edit-comments' !== $screen->id ) {
			return;
		}
		?>
		<style>
			.comment-status-approved #adminmenu .wp-first-item.current,
			.comment-status-moderated #adminmenu .wp-first-item.current,
			.comment-status-spam #adminmenu .wp-first-item.current,
			.comment-status-trash #adminmenu .wp-first-item.current {
				font-weight: 400;
				color: #c3c4c7; /* core color */
				color: rgba(240, 246, 252, 0.7); /* core color with opacity */
			}
			.comment-status-approved #adminmenu .wp-first-item.current:hover,
			.comment-status-moderated #adminmenu .wp-first-item.current:hover,
			.comment-status-spam #adminmenu .wp-first-item.current:hover,
			.comment-status-trash #adminmenu .wp-first-item.current:hover {
				color: #72aee6; /* core color */
				font-weight: 400;
			}
			.comment-status-approved #adminmenu .comment-menu-item-approved,
			.comment-status-moderated #adminmenu .comment-menu-item-pending,
			.comment-status-spam #adminmenu .comment-menu-item-spam,
			.comment-status-trash #adminmenu .comment-menu-item-trash {
				font-weight: 600;
				color: #FFF;
			}
			.comment-status-approved #adminmenu a:has(.comment-menu-item-approved):hover,
			.comment-status-moderated #adminmenu a:has(.comment-menu-item-pending):hover,
			.comment-status-spam #adminmenu a:has(.comment-menu-item-spam):hover,
			.comment-status-trash #adminmenu a:has(.comment-menu-item-trash):hover {
				box-shadow: inset 4px 0 0 0 #FFF;
			}
		</style>
		<?php
	}

	/**
	 * Add a comment status to the body tag in the admin.
	 *
	 * @param string $classes String of body classes.
	 */
	public function add_admin_comment_status_body_class( $classes ) {
		// Make sure we're on the edit-comments.php screen, or bail.
		$screen = get_current_screen();
		if ( ! $screen || 'edit-comments' !== $screen->id ) {
			return $classes;
		}
		$comment_status = sanitize_text_field( filter_input( INPUT_GET, 'comment_status', FILTER_DEFAULT ) );
		if ( ! empty( $comment_status ) ) {
			$classes .= ' comment-status-' . $comment_status;
		}
		return $classes;
	}

	/**
	 * Add the admin menus.
	 */
	public function add_admin_menus() {
		$comment_counts = wp_count_comments();
		$approved_count = $comment_counts->approved;
		$pending_count  = $comment_counts->moderated;
		$spam_count     = $comment_counts->spam;
		$trash_count    = $comment_counts->trash;

		// Get menu titles with placeholders.
		$approved_title = __( '<span class="comment-menu-item-approved">Approved</span>', 'comment-edit-pro' );
		$pending_title  = sprintf(
			/* Translators: %s is the number of pending comments */
			_n( '<span class="comment-menu-item-pending">Pending</span> <span class="awaiting-mod">%s</span>', '<span class="comment-menu-item-pending">Pending</span> <span class="awaiting-mod">%s</span>', $pending_count, 'comment-edit-pro' ),
			number_format_i18n( $pending_count )
		);
		$spam_title = sprintf(
			/* Translators: %s is the number of spam comments */
			_n( '<span class="comment-menu-item-spam">Spam</span> <span class="awaiting-mod">%s</span>', '<span class="comment-menu-item-spam">Spam</span> <span class="awaiting-mod">%s</span>', $spam_count, 'comment-edit-pro' ),
			number_format_i18n( $spam_count )
		);
		$trash_title = sprintf(
			/* Translators: %s is the number of trashed comments */
			_n( '<span class="comment-menu-item-trash">Trash</span> <span class="awaiting-mod">%s</span>', '<span class="comment-menu-item-trash">Trash</span> <span class="awaiting-mod">%s</span>', $trash_count, 'comment-edit-pro' ),
			number_format_i18n( $trash_count )
		);

		// Get tools options.
		$options               = Options_Tools::get_options();
		$can_show_approved     = (bool) $options['enable_shortcut_approved'];
		$can_show_pending      = (bool) $options['enable_shortcut_unapproved'];
		$can_show_spam         = (bool) $options['enable_shortcut_spam'];
		$can_show_trash        = (bool) $options['enable_shortcut_trash'];
		$can_show_count_bubble = (bool) $options['enable_shortcut_count_bubble'];

		// If not showing count bubble, remove the count from the menu titles.
		if ( ! $can_show_count_bubble ) {
			$pending_title = __( '<span class="comment-menu-item-pending">Pending</span>', 'comment-edit-pro' );
			$spam_title    = __( '<span class="comment-menu-item-spam">Spam</span>', 'comment-edit-pro' );
			$trash_title   = __( '<span class="comment-menu-item-trash">Trash</span>', 'comment-edit-pro' );
		}

		// If shortcut for approved, add the menu.
		if ( $can_show_approved ) {
			add_submenu_page(
				'edit-comments.php',
				$approved_title,
				$approved_title,
				'manage_options',
				'comment-shortcuts&comment_status=approved&nonce=' . wp_create_nonce( 'comment-shortcuts-approved' ),
				array( $this, 'comment_page' )
			);
		}

		// If shortcut for pending, add the menu.
		if ( $can_show_pending ) {
			add_submenu_page(
				'edit-comments.php',
				$pending_title,
				$pending_title,
				'manage_options',
				'comment-shortcuts&comment_status=pending&nonce=' . wp_create_nonce( 'comment-shortcuts-pending' ),
				array( $this, 'comment_page' )
			);
		}

		// If shortcut for spam, add the menu.
		if ( $can_show_spam ) {
			add_submenu_page(
				'edit-comments.php',
				$spam_title,
				$spam_title,
				'manage_options',
				'comment-shortcuts&comment_status=spam&nonce=' . wp_create_nonce( 'comment-shortcuts-spam' ),
				array( $this, 'comment_page' )
			);
		}

		// If shortcut for trash, add the menu.
		if ( $can_show_trash ) {
			add_submenu_page(
				'edit-comments.php',
				$trash_title,
				$trash_title,
				'manage_options',
				'comment-shortcuts&comment_status=trash&nonce=' . wp_create_nonce( 'comment-shortcuts-trash' ),
				array( $this, 'comment_page' )
			);
		}
	}

	/**
	 * Comment page.
	 */
	public function comment_page() {
		// empty output.
	}

	/**
	 * Redirect to comments tab.
	 */
	public function redirect_to_comments_tab() {
		if ( ! is_admin() ) {
			return;
		}
		// Get the page param, and if comment-shortcuts, redirect based on comment_status $_GET var.
		$page = filter_input( INPUT_GET, 'page', FILTER_DEFAULT );

		if ( 'comment-shortcuts' === $page ) {
			// Get the comment_status param, and if approved, pending, spam, or trash, redirect to the comments tab.
			$comment_status = filter_input( INPUT_GET, 'comment_status', FILTER_DEFAULT );

			// Get nonce from GET var, and verify.
			$nonce          = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) );
			$nonce_verified = wp_verify_nonce( $nonce, 'comment-shortcuts-' . $comment_status );
			if ( ! $nonce_verified ) {
				return;
			}

			if ( 'approved' === $comment_status ) {
				wp_safe_redirect( admin_url( 'edit-comments.php?comment_status=approved' ) );
				exit;
			} elseif ( 'pending' === $comment_status ) {
				wp_safe_redirect( admin_url( 'edit-comments.php?comment_status=moderated' ) );
				exit;
			} elseif ( 'spam' === $comment_status ) {
				wp_safe_redirect( admin_url( 'edit-comments.php?comment_status=spam' ) );
				exit;
			} elseif ( 'trash' === $comment_status ) {
				wp_safe_redirect( admin_url( 'edit-comments.php?comment_status=trash' ) );
				exit;
			}
		}
	}
}
