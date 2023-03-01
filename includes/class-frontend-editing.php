<?php
/**
 * Register SCE Options for front-end editing.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Options as Options;
use CommentEditPro\Includes\Functions as Functions;

/**
 * Main class for front-end editing.
 */
class Frontend_Editing {

	/**
	 * Class Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'setup_ajax_calls' ) );
		add_action( 'init', array( $this, 'setup_comment_filters' ) );
	}

	/**
	 * Set up front-end editing filters.
	 */
	public function setup_comment_filters() {
		$options                        = Options::get_options();
		$allow_frontend_editing         = filter_var( $options['allow_front_end_editing'], FILTER_VALIDATE_BOOLEAN );
		$allow_frontend_moderation_menu = filter_var( $options['allow_front_end_moderation_menu'], FILTER_VALIDATE_BOOLEAN );
		/* Begin Filters */
		if ( ! is_feed() && ! defined( 'DOING_SCE' ) && ( $allow_frontend_editing || $allow_frontend_moderation_menu ) && current_user_can( 'moderate_comments' ) ) {
			if ( current_user_can( 'moderate_comments' ) ) {
				add_filter( 'comment_excerpt', array( $this, 'add_edit_interface' ), 1000, 2 );
				add_filter( 'comment_text', array( $this, 'add_edit_interface' ), 1000, 2 );
				add_filter( 'thesis_comment_text', array( $this, 'add_edit_interface' ), 1000, 2 );
				add_filter( 'sce_can_edit', '__return_false' );

				// Only modify edit link if frontend editing is enabled.
				if ( $allow_frontend_editing ) {
					add_filter( 'edit_comment_link', array( $this, 'modify_edit_link' ), 10, 3 );
				}

				// Add SVG icons in footer if moderation menu is enabled.
				if ( $allow_frontend_moderation_menu ) {
					add_action( 'wp_footer', array( $this, 'add_svg_icons' ) );
				}

				// Common actions/Ajax.
				add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_and_styles' ) );
				add_action( 'wp_ajax_comment_edit_pro_get_frontend_comment', array( $this, 'ajax_fancybox_interface' ) );
				add_action( 'wp_ajax_sce_frontend_save_comment', array( $this, 'ajax_save_frontend_comment' ) );
				add_action( 'wp_ajax_sce_frontend_delete_comment', array( $this, 'ajax_delete_frontend_comment' ) );
			}
		}
	}

	/**
	 * Get the HTML for FancyBox Edit via Ajax
	 */
	public function ajax_fancybox_interface() {
		$nonce = sanitize_text_field( $_GET['nonce'] ); // phpcs:ignore
		$comment_id = absint( $_GET['cid'] ); // phpcs:ignore
		if ( ! current_user_can( 'moderate_comments' ) ) {
			wp_die( 'The user must be able to edit comments.' );
		}
		if ( ! wp_verify_nonce( $nonce, 'edit-comment-' . $comment_id ) ) {
			wp_die( 'Could not validate nonce.' );
		}
		include_once Functions::get_plugin_dir( '/templates/front-end-editing.php' );
		die( '' );
	}

	/**
	 * Save a comment via Ajax.
	 */
	public function ajax_save_frontend_comment() {
		define( 'DOING_SCE', true );
		$nonce = sanitize_text_field( $_POST['nonce'] ); // phpcs:ignore
		$comment_id = absint( $_POST['comment_id'] ); // phpcs:ignore
		if ( ! current_user_can( 'moderate_comments' ) ) {
			die( 'The user must be able to edit comments.' );
		}
		if ( ! wp_verify_nonce( $nonce, 'sce-modify-comment-' . $comment_id ) ) {
			die( 'Could not validate nonce.' );
		}
		$comment = $this->format_comment_text( wp_kses_post( $_POST['content'] ) ); // phpcs:ignore
		$author  = $this->format_comment_text( sanitize_text_field( $_POST['name'] ) ); // phpcs:ignore
		$url     = sanitize_text_field( $_POST['url'] ); // phpcs:ignore
		$email   = sanitize_text_field( $_POST['email'] ); // phpcs:ignore
		$status  = sanitize_text_field( $_POST['status'] ); // phpcs:ignore

		$sce_comment                         = get_comment( $comment_id, ARRAY_A );
		$sce_comment['comment_content']      = $comment;
		$sce_comment['comment_author']       = $author;
		$sce_comment['comment_author_email'] = $email;
		$sce_comment['comment_author_url']   = $url;
		$sce_comment['comment_approved']     = $status;

		wp_update_comment( $sce_comment );

		// Format the comment for returning.
		if ( function_exists( 'mb_convert_encoding' ) ) {
			$comment = mb_convert_encoding( $comment, '' . get_option( 'blog_charset' ) . '', mb_detect_encoding( $comment, 'UTF-8, ISO-8859-1, ISO-8859-15', true ) );
		}
		$comment = apply_filters( 'comment_text', apply_filters( 'get_comment_text', $comment, $sce_comment, array() ), $comment, array() );

		wp_send_json_success(
			array(
				'comment' => $comment,
			)
		);
		die( '' );
	}

	/**
	 * Save a comment via Ajax.
	 */
	public function ajax_delete_frontend_comment() {
		$nonce = sanitize_text_field( $_POST['nonce'] ); // phpcs:ignore
		$comment_id = absint( $_POST['comment_id'] ); // phpcs:ignore
		if ( ! current_user_can( 'moderate_comments' ) ) {
			die( 'The user must be able to edit comments.' );
		}
		if ( ! wp_verify_nonce( $nonce, 'sce-modify-comment-' . $comment_id ) ) {
			die( 'Could not validate nonce.' );
		}

		wp_delete_comment( $comment_id );
		die( '' );
	}

	/**
	 * Add Fancybox scripts and styles.
	 */
	public function add_scripts_and_styles() {
		if ( ! is_singular() ) {
			return;
		}
		wp_enqueue_script(
			'jquery-fancybox',
			Functions::get_plugin_url( '/fancybox/jquery.fancybox.min.js' ),
			array( 'jquery' ),
			Functions::get_plugin_version(),
			true
		);
		wp_enqueue_style(
			'sce-frontend',
			Functions::get_plugin_url( 'dist/sce-frontend.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_enqueue_style(
			'fancybox',
			Functions::get_plugin_url( '/fancybox/jquery.fancybox.min.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_enqueue_script(
			'comment-edit-pro',
			Functions::get_plugin_url( '/js/simple-comment-editing-options.js' ),
			array( 'jquery', 'jquery-fancybox' ),
			Functions::get_plugin_version(),
			true
		);
	}

	/**
	 * Add editing interface for front-end comment editing.
	 *
	 * @param string $comment_content The comment content.
	 * @param object $passed_comment  A passed comment object.
	 *
	 * @return string The comment wrapper.
	 */
	public function add_edit_interface( $comment_content, $passed_comment = false ) {
		if ( ! current_user_can( 'moderate_comments' ) ) {
			return $comment_content;
		}

		// Get current comment.
		global $comment; // For Thesis.
		if ( ( ! $comment && ! $passed_comment ) || empty( $comment_content ) ) {
			return $comment_content;
		}
		if ( $passed_comment ) {
			if ( is_numeric( $passed_comment ) ) {
				$comment = get_comment( $passed_comment, OBJECT ); // phpcs:ignore
			} else {
				$comment = (object) $passed_comment; // phpcs:ignore
			}
		}
		$comment_id = absint( $comment->comment_ID );

		// Build the moderation menu links/html if enabled.
		$options                        = Options::get_options();
		$allow_frontend_moderation_menu = filter_var( $options['allow_front_end_moderation_menu'], FILTER_VALIDATE_BOOLEAN );

		// Return.
		$comment_wrapper = sprintf(
			'<div id="sce-front-end-comment-%d" class="sce-front-end-comment" data-cid="%d">%s<div class"sce-front-end-comment-content">%s</div></div>',
			$comment_id,
			$comment_id,
			$allow_frontend_moderation_menu ? $this->get_moderation_menu_html( $comment ) : '',
			$comment_content
		);
		return $comment_wrapper;
	}

	/**
	 * Retrieve moderation menu HTML.
	 *
	 * @param WP_Comment $comment The comment object.
	 *
	 * @return string The moderation menu HTML.
	 */
	private function get_moderation_menu_html( $comment ) {
		ob_start();

		// Get comment menu links.
		$approve_comment_link  = add_query_arg(
			array(
				'action' => 'sce-moderation-approve-comment',
				'cid'    => $comment->comment_ID,
				'nonce'  => wp_create_nonce( 'sce-moderation-approve-comment-' . $comment->comment_ID ),
			),
			admin_url( 'admin-ajax.php' )
		);
		$moderate_comment_link = add_query_arg(
			array(
				'action' => 'sce-moderation-moderate-comment',
				'cid'    => $comment->comment_ID,
				'nonce'  => wp_create_nonce( 'sce-moderation-moderate-comment-' . $comment->comment_ID ),
			),
			admin_url( 'admin-ajax.php' )
		);
		$delete_comment_link   = add_query_arg(
			array(
				'action' => 'sce-moderation-delete-comment',
				'cid'    => $comment->comment_ID,
				'nonce'  => wp_create_nonce( 'sce-moderation-delete-comment-' . $comment->comment_ID ),
			),
			admin_url( 'admin-ajax.php' )
		);
		$spam_comment_link     = add_query_arg(
			array(
				'action' => 'sce-moderation-spam-comment',
				'cid'    => $comment->comment_ID,
				'nonce'  => wp_create_nonce( 'sce-moderation-spam-comment-' . $comment->comment_ID ),
			),
			admin_url( 'admin-ajax.php' )
		);
		$edit_comment_link = add_query_arg(
			array(
				'action' => 'comment_edit_pro_get_frontend_comment',
				'cid'    => $comment->comment_ID,
				'nonce'  =>  wp_create_nonce( 'edit-comment-' . $comment->comment_ID ),
			),
			admin_url( 'admin-ajax.php' )
		);

		// Get comment status.
		$comment_status = 'approved';
		if ( '0' === $comment->comment_approved ) {
			$comment_status = 'unapproved';
		} elseif ( 'spam' === $comment->comment_approved ) {
			$comment_status = 'spam';
		}
		?>
		<div class="sce-meatball-menu sce-meatball-comment-status-<?php echo esc_attr( $comment_status ); ?>" data-comment-status="<?php echo esc_attr( $comment_status ); ?>" style="display: none;">
			<div class="sce-meatball-content">
				<input
					type="checkbox"
					aria-label="<?php esc_attr_e( 'Open Moderation Menu Options', 'comment-edit-pro' ); ?>"
				/>
				<ul>
					<li class="sce-meatball-menu-item sce-meatball-menu-item-edit-comment" data-comment-action="edit">
						<a class="button-reset" data-sce-fancybox data-type="iframe" data-preload="false" data-src="<?php echo esc_url( $edit_comment_link ); ?>" data-cid="<?php echo esc_attr( $comment->comment_ID ); ?>" href="<?php echo esc_url( $edit_comment_link ); ?>">
							<span class="sce-meatball-menu-icon">
								<svg width="24" height="24"><use xlink:href="#sce-edit-icon"></use></svg>
							</span>
							<span class="sce-meatball-menu-label">
								<?php esc_html_e( 'Edit Comment', 'comment-edit-pro' ); ?>
							</span>
						</a>
					</li>
					<li class="sce-meatball-menu-item sce-meatball-menu-item-approve-comment" data-comment-action="approve" data-loading-text="<?php echo esc_attr__( 'Approving...', 'comment-edit-pro' ); ?>" data-loading-done="<?php echo esc_attr__( 'Approved', 'comment-edit-pro' ); ?>">
						<a class="button-reset" data-cid="<?php echo esc_attr( $comment->comment_ID ); ?>" href="<?php echo esc_url( $approve_comment_link ); ?>"  onClick="(function(e){window.sceFrontendMenuAction(e)})(arguments[0]);">
							<span class="sce-meatball-menu-icon">
								<svg width="24" height="24"><use xlink:href="#sce-approve-icon"></use></svg>
							</span>
							<span class="sce-meatball-menu-label">
								<?php esc_html_e( 'Mark Approved', 'comment-edit-pro' ); ?>
							</span>
						</a>
					</li>
					<li class="sce-meatball-menu-item sce-meatball-menu-item-moderate-comment" data-comment-action="moderate">
						<a class="button-reset" data-cid="<?php echo esc_attr( $comment->comment_ID ); ?>" href="<?php echo esc_url( $moderate_comment_link ); ?>" data-loading-text="<?php echo esc_attr__( 'Updating comment...', 'comment-edit-pro' ); ?>" data-loading-done="<?php echo esc_attr__( 'Comment Updated', 'comment-edit-pro' ); ?>" onClick="(function(e){window.sceFrontendMenuAction(e)})(arguments[0]);">
							<span class="sce-meatball-menu-icon">
								<svg width="24" height="24"><use xlink:href="#sce-pending-icon"></use></svg>
							</span>
							<span class="sce-meatball-menu-label">
								<?php esc_html_e( 'Mark Pending', 'comment-edit-pro' ); ?>
							</span>
						</a>
					</li>
					<li class="sce-meatball-menu-item sce-meatball-menu-item-spam-comment" data-comment-action="spam">
						<a class="button-reset" data-cid="<?php echo esc_attr( $comment->comment_ID ); ?>" href="<?php echo esc_url( $spam_comment_link ); ?>" data-loading-text="<?php echo esc_attr__( 'Updating comment..', 'comment-edit-pro' ); ?>" data-loading-done="<?php echo esc_attr__( 'Comment Updated', 'comment-edit-pro' ); ?>" onClick="(function(e){window.sceFrontendMenuAction(e)})(arguments[0]);">
							<span class="sce-meatball-menu-icon">
								<svg width="24" height="24"><use xlink:href="#sce-spam-icon"></use></svg>
							</span>
							<span class="sce-meatball-menu-label">
								<?php esc_html_e( 'Mark as Spam', 'comment-edit-pro' ); ?>
							</span>
						</a>
					</li>
					<li class="sce-meatball-menu-item sce-meatball-menu-item-spam-comment" data-comment-action="delete">
						<a class="button-reset" data-cid="<?php echo esc_attr( $comment->comment_ID ); ?>" href="<?php echo esc_url( $delete_comment_link ); ?>" data-loading-text="<?php echo esc_attr__( 'Deleting...', 'comment-edit-pro' ); ?>" data-loading-done="<?php echo esc_attr__( 'Comment Deleted', 'comment-edit-pro' ); ?>" onClick="(function(e){window.sceFrontendMenuAction(e)})(arguments[0]);">
							<span class="sce-meatball-menu-icon">
								<svg width="24" height="24"><use xlink:href="#sce-trash-icon"></use></svg>
							</span>
							<span class="sce-meatball-menu-label">
								<?php esc_html_e( 'Delete Comment', 'comment-edit-pro' ); ?>
							</span>
						</a>
					</li>
				</ul>
				<div class="sce-meatball-icon-wrapper" aria-hidden="true">
					<div class="sce-meatball-icon">
						<span></span>
					</div>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Sets up Ajax calls.
	 *
	 * Sets up Ajax calls.
	 *
	 * @since 1.1.0
	 * @access public
	 */
	public function setup_ajax_calls() {
		add_action( 'wp_ajax_sce_get_moderation_comment', array( $this, 'ajax_get_comment' ) );
	}

	/**
	 * Gets a comment.
	 *
	 * Gets a comment.
	 *
	 * @since 1.1.0
	 * @access public
	 */
	public function ajax_get_comment() {
		$nonce      = sanitize_text_field( $_POST['nonce'] ); // phpcs:ignore
		$comment_id = absint( $_POST['comment_id'] ); // phpcs:ignore

		// Do a permissions check.
		if ( ! current_user_can( 'moderate_comments' ) ) {
			$return = array(
				'errors' => true,
			);
			wp_send_json( $return );
			exit;
		}

		// Verify nonce.
		if ( ! wp_verify_nonce( $nonce, 'sce-moderator-edit-' . $comment_id ) ) {
			$return = array(
				'errors' => true,
			);
			wp_send_json( $return );
			exit;
		}

		$comment                  = get_comment( $comment_id );
		$comment->comment_content = $this->format_comment_text( $comment->comment_content );
		$comment->comment_author  = $this->format_comment_text( $comment->comment_author );
		wp_send_json( $comment );
		exit;
	}

	/**
	 * Returns formatted text for output.
	 *
	 * Returns formatted text for output.
	 *
	 * @since 1.1.0
	 * @access public
	 *
	 * @param string $content The comment content.
	 *
	 * @return string formatted comment.
	 */
	private function format_comment_text( $content ) {
		// Format the comment for returning.
		if ( function_exists( 'mb_convert_encoding' ) ) {
			$content = mb_convert_encoding( $content, '' . get_option( 'blog_charset' ) . '', mb_detect_encoding( $content, 'UTF-8, ISO-8859-1, ISO-8859-15', true ) );
		}
		return $content;
	}

	/**
	 * Modify the edit link HTML
	 *
	 * @param string $link The link HTML.
	 * @param int    $comment_id The comment ID.
	 * @param string $text       The edit text.
	 *
	 * @return string modified edit link.
	 */
	public function modify_edit_link( $link, $comment_id, $text ) {
		$nonce = wp_create_nonce( 'edit-comment-' . $comment_id );
		$url   = add_query_arg(
			array(
				'action' => 'comment_edit_pro_get_frontend_comment',
				'nonce'  => $nonce,
				'cid'    => $comment_id,
			),
			admin_url( 'admin-ajax.php' )
		);
		$html  = sprintf(
			'<a data-sce-fancybox data-type="iframe" data-preload="false" data-src="%1$s" href="%1$s">%2$s</a>',
			esc_url_raw( $url ),
			__( 'Edit', 'comment-edit-pro' )
		);
		return $html;
	}

	/**
	 * Add SVG icons to the footer for the moderation menu.
	 */
	public function add_svg_icons() {
		?>
		<svg width="0" height="0" class="hidden">
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2134 2134" id="sce-pending-icon">
				<g><g><path d="M1070.83,0c-585.875,0 -1070.83,476.625 -1070.83,1062.5c0,585.875 484.958,1070.83 1070.83,1070.83c585.875,0 1062.5,-484.958 1062.5,-1070.83c0,-585.875 -476.625,-1062.5 -1062.5,-1062.5Zm525.917,1411.62c48.75,48.75 48.75,128.042 0,176.833c-48.375,48.334 -127.667,49.125 -176.833,0l-349.084,-349.208l-357.458,349.25c-48.75,48.75 -128.042,48.75 -176.833,0c-48.75,-48.75 -48.75,-128.042 -0,-176.833l349.166,-349.167l-349.166,-349.167c-48.75,-48.791 -48.75,-128.083 -0,-176.833c48.791,-48.75 128.083,-48.75 176.833,0l357.458,349.25l349.084,-349.25c48.666,-48.667 127.958,-48.833 176.833,0c48.75,48.75 48.75,128.042 0,176.833l-349.167,349.167l349.167,349.125Z" style="fill-rule:nonzero;"/></g></g>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2134 2134" id="sce-approve-icon">
				<g><path d="M1066.67,0c-589.542,0 -1066.67,477.083 -1066.67,1066.67c0,589.541 477.083,1066.67 1066.67,1066.67c589.541,0 1066.67,-477.083 1066.67,-1066.67c0,-589.542 -477.083,-1066.67 -1066.67,-1066.67Zm-253.809,1516.62c0,0 -368.425,-368.575 -394.908,-395.008c-58.912,-58.913 -58.912,-154.779 0,-213.642c59.063,-59.062 154.579,-59.062 213.642,0l238.516,238.517c29.659,29.658 77.792,29.454 107.2,-0.354l523.709,-531.259c58.862,-59.716 155.033,-60.121 214.396,-0.754c58.458,58.458 58.812,153.925 0.754,212.838c-568.721,577.025 -676.725,689.612 -676.725,689.612c-62.438,62.433 -164.096,62.488 -226.584,0.05Z" style="fill-rule:nonzero;"/></g>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2134 2134" id="sce-spam-icon">
				<g id="surface1"><path d="M1820.91,312.419c-201.465,-201.465 -469.336,-312.419 -754.248,-312.419c-284.929,0 -552.784,110.954 -754.248,312.419c-201.465,201.464 -312.419,469.336 -312.419,754.248c0,284.928 110.954,552.783 312.419,754.248c201.464,201.465 469.336,312.418 754.248,312.418c284.912,0 552.783,-110.953 754.248,-312.418c201.465,-201.465 312.418,-469.32 312.418,-754.248c0,-284.912 -110.953,-552.784 -312.418,-754.248Zm-754.248,1498.29c-410.271,-0 -744.043,-333.773 -744.043,-744.043c-0,-410.271 333.772,-744.043 744.043,-744.043c410.254,-0 744.043,333.772 744.043,744.043c-0,410.27 -333.773,744.043 -744.043,744.043Z" style="fill-rule:nonzero;"/><path d="M1066.67,447.721c-341.293,0 -618.962,277.653 -618.962,618.946c0,341.292 277.669,618.961 618.962,618.961c341.292,0 618.945,-277.669 618.945,-618.961c0.016,-341.293 -277.653,-618.946 -618.945,-618.946Zm62.744,960.677c-0.212,2.035 -0.554,4.086 -0.928,6.088c-0.407,1.953 -0.911,3.955 -1.497,5.924c-0.619,1.953 -1.286,3.874 -2.084,5.746c-0.797,1.871 -1.66,3.759 -2.636,5.55c-0.944,1.79 -1.986,3.58 -3.125,5.257c-1.123,1.709 -2.36,3.369 -3.63,4.964c-1.318,1.579 -2.702,3.125 -4.167,4.541c-1.416,1.465 -2.962,2.832 -4.541,4.118c-1.578,1.302 -3.255,2.555 -4.915,3.678c-1.709,1.123 -3.467,2.165 -5.306,3.125c-1.79,0.961 -3.63,1.84 -5.501,2.621c-1.872,0.765 -3.825,1.465 -5.795,2.051c-1.92,0.585 -3.922,1.123 -5.924,1.497c-2.002,0.423 -4.036,0.716 -6.087,0.928c-2.002,0.195 -4.086,0.325 -6.136,0.325c-2.035,0 -4.118,-0.13 -6.169,-0.325c-1.986,-0.212 -4.036,-0.505 -6.038,-0.928c-2.002,-0.374 -4.004,-0.912 -5.974,-1.497c-1.904,-0.586 -3.873,-1.286 -5.745,-2.051c-1.872,-0.781 -3.711,-1.66 -5.55,-2.621c-1.791,-0.96 -3.548,-2.002 -5.257,-3.125c-1.661,-1.123 -3.337,-2.376 -4.916,-3.678c-1.579,-1.286 -3.125,-2.653 -4.59,-4.118c-1.416,-1.416 -2.832,-2.962 -4.117,-4.541c-1.303,-1.595 -2.507,-3.255 -3.63,-4.964c-1.139,-1.677 -2.181,-3.467 -3.125,-5.257c-0.96,-1.791 -1.839,-3.679 -2.637,-5.55c-0.781,-1.872 -1.465,-3.793 -2.083,-5.746c-0.586,-1.969 -1.091,-3.971 -1.497,-5.924c-0.375,-2.002 -0.717,-4.053 -0.912,-6.088c-0.211,-2.05 -0.293,-4.085 -0.293,-6.136c0,-2.034 0.082,-4.117 0.293,-6.168c0.195,-2.035 0.537,-4.037 0.912,-6.039c0.423,-2.002 0.911,-4.004 1.497,-5.973c0.618,-1.953 1.302,-3.874 2.083,-5.745c0.798,-1.888 1.677,-3.76 2.637,-5.551c0.944,-1.79 1.986,-3.548 3.125,-5.257c1.123,-1.709 2.327,-3.369 3.63,-4.915c1.285,-1.628 2.701,-3.125 4.117,-4.59c1.465,-1.465 3.011,-2.832 4.59,-4.118c1.579,-1.302 3.255,-2.506 4.916,-3.629c1.709,-1.172 3.466,-2.214 5.257,-3.174c1.839,-0.96 3.678,-1.839 5.55,-2.588c1.872,-0.798 3.841,-1.497 5.745,-2.083c1.97,-0.586 3.972,-1.091 5.974,-1.498c2.002,-0.423 4.052,-0.716 6.038,-0.927c4.085,-0.407 8.268,-0.407 12.305,-0c2.051,0.211 4.085,0.504 6.087,0.927c2.002,0.407 4.004,0.912 5.924,1.498c1.97,0.586 3.923,1.285 5.795,2.083c1.871,0.749 3.711,1.628 5.501,2.588c1.839,0.96 3.581,2.002 5.306,3.174c1.66,1.123 3.337,2.327 4.915,3.629c1.579,1.286 3.125,2.653 4.541,4.118c1.465,1.465 2.849,2.962 4.167,4.59c1.27,1.546 2.507,3.206 3.63,4.915c1.139,1.709 2.181,3.467 3.125,5.257c0.96,1.791 1.839,3.663 2.636,5.551c0.798,1.871 1.465,3.792 2.084,5.745c0.586,1.969 1.09,3.971 1.497,5.973c0.374,2.002 0.716,4.004 0.928,6.039c0.163,2.051 0.293,4.134 0.293,6.168c-0,2.051 -0.13,4.086 -0.293,6.136Zm0.293,-202.132c-0,34.554 -28.011,62.549 -62.549,62.549c-34.538,0 -62.549,-27.995 -62.549,-62.549l0,-481.998c0,-34.554 28.011,-62.549 62.549,-62.549c34.538,-0 62.549,27.995 62.549,62.549l-0,481.998Z" /></g>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2134 2134" id="sce-trash-icon">
				<path d="M1105.24,985.408l0,439.787c0,0.014 0,0.028 0,0.042c0,21.136 -17.392,38.528 -38.528,38.528c-0.014,0 -0.028,0 -0.042,0l-1.771,0c-20.474,-0.93 -36.81,-18.033 -36.8,-38.528l0,-439.829c-0.021,-20.499 16.322,-37.609 36.8,-38.528c0,0 1.785,-0 1.792,-0c21.139,-0 38.538,17.389 38.549,38.528Zm179.755,-37.696c-21.094,-1.746 -39.89,14.171 -41.643,35.264l-36.266,438.272c-0.107,1.088 -0.15,2.133 -0.15,3.243c0.135,21.077 17.514,38.345 38.592,38.345c19.897,-0 36.699,-15.388 38.443,-35.209l36.267,-438.272c-0,-1.088 0.128,-2.134 0.128,-3.243c-0.02,-19.94 -15.499,-36.746 -35.371,-38.4Zm-395.008,35.264c-1.744,-19.821 -18.546,-35.209 -38.443,-35.209c-21.078,-0 -38.457,17.268 -38.592,38.345c0,1.088 0,2.133 0.128,3.243l36.267,438.272c1.744,19.821 18.546,35.209 38.443,35.209c21.078,-0 38.457,-17.268 38.592,-38.345c-0,-1.067 -0,-2.134 -0.128,-3.243l-36.267,-438.272Zm1211.35,83.691c0,571.434 -463.232,1034.67 -1034.67,1034.67c-571.435,0 -1034.67,-463.232 -1034.67,-1034.67c0,-571.435 463.232,-1034.67 1034.67,-1034.67c571.434,-0 1034.67,463.232 1034.67,1034.67Zm-695.85,-294.848l-681.195,-0c-31.947,0.004 -58.233,26.293 -58.233,58.24c0,1.795 0.083,3.588 0.249,5.376l70.955,765.589c2.762,29.796 28.06,52.86 57.984,52.864l541.866,-0c30.033,0.052 55.428,-23.142 58.091,-53.056l68.267,-765.589c0.152,-1.717 0.229,-3.44 0.229,-5.163c-0,-31.943 -26.27,-58.235 -58.213,-58.261Zm120.832,-109.312c-0,-0.015 -0,-0.029 -0,-0.043c-0,-35.999 -29.623,-65.621 -65.622,-65.621c-0.014,-0 -0.028,-0 -0.042,-0l-224.811,-0c-7.117,-66.407 -63.815,-117.345 -130.603,-117.334l-77.141,0c-66.787,-0.011 -123.486,50.927 -130.603,117.334l-224.81,-0c-36.023,-0 -65.664,29.641 -65.664,65.664c-0,36.022 29.641,65.664 65.664,65.664l787.968,-0c36.022,-0 65.664,-29.642 65.664,-65.664Z" style="fill-rule:nonzero;"/>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1867 1867" id="sce-edit-icon">
				<g><path d="M933.333,0c-515.332,0 -933.333,417.997 -933.333,933.333c0,515.332 418.001,933.334 933.333,933.334c515.332,-0 933.334,-418.002 933.334,-933.334c-0,-515.336 -418.002,-933.333 -933.334,-933.333Zm-409.334,1404.67c-17.334,5.998 -37.333,1.998 -50.667,-11.336c-13.33,-13.33 -17.33,-33.333 -11.332,-50.663l99.333,-275.333l238,237.996l-275.334,99.336Zm356.669,-155.334l-263.334,-263.334l419.332,-419.332l263.334,263.334l-419.332,419.332Zm542.664,-543.335l-54.663,55.335l-263.334,-263.334l55.33,-54.668c49.337,-50 130.668,-50 180.001,0l82.666,82.67c50,49.332 50,130.664 0,179.997Z" style="fill-rule:nonzero;"/></g>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"  id="sce-loading-icon" x="0px" y="0px">
			<g class="cir">
				<path d="m 20 5 a 1 1 0 0 0 0 30 a 1 1 0 0 0 0 -30" stroke="rgba(0,0,0,0.2)" stroke-width="5" fill="none" stroke-linecap="round"/>
			</g>
			<g class="sce-rotate">
				<path d="m 20 5 a 1 1 0 0 0 0 30" stroke="#333" stroke-width="5" fill="none" stroke-linecap="round"/>
			</g>
			</symbol>
		</svg>
		<?php do_action( 'comment_edit_pro_add_admin_header_content' ); ?>
		<?php
	}
}
