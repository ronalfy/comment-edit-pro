<?php
/**
 * Helper fuctions for Featured Comments and its block.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Featured_Comments
 */
class Featured_Comments {

	/**
	 * Class runner.
	 */
	public function run() {
		$options    = Options::get_options();
		$is_enabled = (bool) $options['enable_featured_comments'];

		// If not enabled, bail.
		if ( ! $is_enabled ) {
			return;
		}

		// Add the featured comment quick action to the admin.
		add_filter( 'comment_row_actions', array( $this, 'add_featured_comment_quick_action' ), 10, 2 );

		// Add comment status link for featured.
		add_filter( 'comment_status_links', array( $this, 'add_featured_comment_status_link' ), 10, 2 );

		// Show the featured comments when the status link is viewed.
		add_action( 'comments_list_table_query_args', array( $this, 'show_featured_comments_admin' ) );

		// Add featured comment scripts to admin.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_featured_comment_scripts' ) );

		// Add ajax action for marking comment as featured in the comment list view admin section.
		add_action( 'wp_ajax_sce_feature_comment_admin', array( $this, 'ajax_feature_comment_admin' ) );

		// Add ajax action for marking comment as unfeatured in the comment list view admin section.
		add_action( 'wp_ajax_sce_unfeature_comment_admin', array( $this, 'ajax_unfeature_comment_admin' ) );
	}

	/**
	 * Display featured comments in the admin.
	 *
	 * @param array $query_args Comment query args for the list table.
	 */
	public function show_featured_comments_admin( $query_args ) {
		// Exit if not on the comments screen.
		global $pagenow;
		if ( 'edit-comments.php' !== $pagenow ) {
			return;
		}

		// Get the current comment status.
		$comment_status = sanitize_text_field( filter_input( INPUT_GET, 'comment_status', FILTER_DEFAULT ) );

		// If the comment status is featured, add the featured comments.
		if ( 'featured' === $comment_status ) {

			// If there are featured comments, add them to the query.
			$query_args['meta_key']   = 'sce_featured_comment';
			$query_args['meta_value'] = '1';
		}
		return $query_args;
	}

	/**
	 * Add the featured comment status link to the admin.
	 *
	 * @param array $status_links The comment row actions.
	 */
	public function add_featured_comment_status_link( $status_links ) {
		$classes = array();
		$comment_status = sanitize_text_field( filter_input( INPUT_GET, 'comment_status', FILTER_DEFAULT ) );

		// If the comment status is featured, add the featured class.
		if ( 'featured' === $comment_status ) {
			$classes[] = 'current';

			// Replace all link, as it is checked by default.
			$status_links['all'] = sprintf(
				"<a href='edit-comments.php' class='%s'>%s</a>",
				'',
				esc_html__( 'All', 'comment-edit-pro' )
			);
		}

		// If the comment is featured, add the unfeature link.
		$status_links['featured'] = sprintf(
			"<a href='edit-comments.php?comment_status=featured' class='%s'>%s</a>",
			esc_attr( implode( ' ', $classes ) ),
			esc_html__( 'Featured', 'comment-edit-pro' )
		);

		return $status_links;
	}

	/**
	 * Feature a comment via Ajax.
	 */
	public function ajax_feature_comment_admin() {
		// Get the nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Get the comment ID.
		$comment_id = absint( filter_input( INPUT_POST, 'comment_id', FILTER_VALIDATE_INT ) );

		// Check nonce and role.
		if ( ! wp_verify_nonce( $nonce, 'sce-feature-comment_' . $comment_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to do that.', 'comment-edit-pro' ) ) );
		}

		// Update comment meta.
		update_comment_meta( $comment_id, 'sce_featured_comment', '1' );

		// Send success response and unfeature nonce.
		wp_send_json_success(
			array(
				'message' => __( 'Comment marked as featured.', 'comment-edit-pro' ),
				'html'    => $this->get_quickaction_link( $comment_id, 'unfeature' ),
			)
		);
	}

	/**
	 * Unfeature a comment via Ajax.
	 */
	public function ajax_unfeature_comment_admin() {
		// Get the nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Get the comment ID.
		$comment_id = absint( filter_input( INPUT_POST, 'comment_id', FILTER_VALIDATE_INT ) );

		// Check nonce and role.
		if ( ! wp_verify_nonce( $nonce, 'sce-unfeature-comment_' . $comment_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to do that.', 'comment-edit-pro' ) ) );
		}

		// Update comment meta.
		delete_comment_meta( $comment_id, 'sce_featured_comment' );

		// Send success response and unfeature nonce.
		wp_send_json_success(
			array(
				'message' => __( 'Comment marked as unfeatured.', 'comment-edit-pro' ),
				'html'    => $this->get_quickaction_link( $comment_id, 'feature' ),
			)
		);
	}

	/**
	 * Add the featured comment quick action to the admin.
	 *
	 * @param array      $actions The comment row actions.
	 * @param WP_Comment $comment The comment object.
	 * @return array comment actions.
	 */
	public function add_featured_comment_quick_action( $actions, $comment ) {
		// Make sure role is editor or greater.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return $actions;
		}

		// Create a nonce for the action link.
		$nonce        = wp_create_nonce( 'sce-feature-comment_' . $comment->comment_ID );
		$remove_nonce = wp_create_nonce( 'sce-unfeature-comment_' . $comment->comment_ID );

		if ( ! self::is_featured_comment( $comment->comment_ID ) ) {
			// Create the action link.
			$actions['feature'] = $this->get_quickaction_link( $comment->comment_ID, 'feature' );
		} else {
			// Create the action link.
			$actions['feature'] = $this->get_quickaction_link( $comment->comment_ID, 'unfeature' );
		}

		return $actions;
	}

	/**
	 * Get the featured comment quick action link html.
	 *
	 * @param int    $comment_id The comment ID.
	 * @param string $action     The action to perform (can be featured|unfeature).
	 * @return string button HTML.
	 */
	private function get_quickaction_link( $comment_id, $action = 'feature' ) {
		$ajax_action = 'feature' === $action ? 'sce_feature_comment_admin' : 'sce_unfeature_comment_admin';
		$nonce       = 'feature' === $action ? wp_create_nonce( 'sce-feature-comment_' . $comment_id ) : wp_create_nonce( 'sce-unfeature-comment_' . $comment_id );
		$label       = 'feature' === $action ? __( 'Mark as Featured', 'comment-edit-pro' ) : __( 'Unmark as Featured', 'comment-edit-pro' );

		// Output button HTML.
		return sprintf(
			'<a class="sce-featured-comment-quick-action" href="%1$s" data-comment-id="%2$s" data-nonce="%3$s">%4$s</a>',
			esc_url( admin_url( 'admin-ajax.php?action=' . $ajax_action . '&comment_id=' . $comment_id ) ),
			$comment_id,
			$nonce,
			$label
		);
	}

	/**
	 * Add featured comment scripts to admin.
	 *
	 * @param string $hook The current admin page.
	 * @return void
	 */
	public function add_featured_comment_scripts( $hook ) {
		// Only enqueue on the comments page.
		if ( 'edit-comments.php' === $hook ) {
			wp_enqueue_script(
				'sce_featured_comments_comment_view_js',
				Functions::get_plugin_url( 'dist/sce-featured-comment-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
		}
	}

	/**
	 * Add the featured comment quick action to the admin.
	 *
	 * @param int $comment_id The comment ID.
	 * @return bool true if featured, false if not.
	 */
	public static function is_featured_comment( $comment_id ) {
		$maybe_featured_comment = (bool) get_comment_meta( $comment_id, 'sce_featured_comment', true );
		return $maybe_featured_comment;
	}
}
