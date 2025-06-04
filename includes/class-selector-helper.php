<?php // phpcs:ignore
/**
 * Register selector helper and add Ajax actions.
 *
 * @package CommentEditPro
 */



namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Selector_Helper for CommentEditPro.
 */
class Selector_Helper {

	/**
	 * Class runner.
	 */
	public function run() {
		// Determine if menu helper is enabled.
		$options                = Options::get_options();
		$enable_selector_helper = (bool) $options['selector_helper_enabled'];
		if ( ! $enable_selector_helper ) {
			return;
		}

		// Add ajax action for checking if comments are open and there are comments.
		add_action( 'wp_ajax_sce_check_comment_status', array( $this, 'ajax_check_comment_status' ) );

		// Add ajax action for saving the selectors.
		add_action( 'wp_ajax_sce_save_selectors', array( $this, 'ajax_save_selectors' ) );

		// Bail if not on frontend.
		if ( is_admin() ) {
			return;
		}

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_selector_helper_scripts_styles' ) );

		add_action( 'admin_bar_menu', array( $this, 'admin_bar_menu' ), 200 );
	}

	/**
	 * Ajax callback for checking if comments are open and there are comments.
	 */
	public function ajax_check_comment_status() {
		// Get nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Get the post ID.
		$post_id = filter_input( INPUT_POST, 'postId', FILTER_VALIDATE_INT );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce_open_selector_helper_' . $post_id ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'title'   => __( 'Error', 'comment-edit-pro' ),
					'message' => __( 'Could not verify nonce or permissions.', 'comment-edit-pro' ),
				)
			);
		}

		// Check if Jetpack comments is enabled. If so, send compatibility error.
		if ( class_exists( 'Jetpack' ) ) {
			$is_jetpack_comments_enabled = \Jetpack::is_module_active( 'comments' );
			if ( $is_jetpack_comments_enabled ) {
				wp_send_json_error(
					array(
						'title'   => __( 'Incompatible Plugin Found', 'comment-edit-pro' ),
						'message' => __( 'Jetpack Comments is enabled. Jetpack loads their comment form in an iframe. This prevents a lot of third-party comment integrations from working, including this plugin.', 'comment-edit-pro' ),
					)
				);
			}
		}

		// Check that comments are open for the post.
		$post = get_post( $post_id );
		if ( ! $post || ! comments_open( $post_id ) ) {
			wp_send_json_error(
				array(
					'title'   => __( 'Error: Comments are closed', 'comment-edit-pro' ),
					'message' => __( 'Comments are not open for this post. Please enable comments for this post and try Selector Helper again.', 'comment-edit-pro' ),
				)
			);
		}

		// Check that there are at least one visible (approved) comment on the post.
		$comments = get_comments(
			array(
				'post_id' => $post_id,
				'status'  => 'approve',
			)
		);
		if ( empty( $comments ) ) {
			wp_send_json_error(
				array(
					'title'   => __( 'Error: No comments found', 'comment-edit-pro' ),
					'message' => __( 'No comments were found for this post. Please add a comment and try Selector Helper again.', 'comment-edit-pro' ),
				)
			);
		}

		wp_send_json_success(
			array(
				'title'   => __( 'Comment Tests Passed', 'comment-edit-pro' ),
				'message' => __( 'Your comment section looks good. Let\'s try to grab the selectors.', 'comment-edit-pro' ),
			)
		);
	}

	/**
	 * Save the Ajax selectors.
	 */
	public function ajax_save_selectors() {
		// Get nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce_save_selector_helper' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'title'   => __( 'Error', 'comment-edit-pro' ),
					'message' => __( 'Could not verify nonce or permissions.', 'comment-edit-pro' ),
				)
			);
		}

		// Get the selectors. Input is stringified object.
		$comment_selectors = filter_input( INPUT_POST, 'selectors', FILTER_DEFAULT );
		$comment_selectors = json_decode( $comment_selectors, true );

		// Make sure we have selectors.
		if ( empty( $comment_selectors ) ) {
			wp_send_json_error(
				array(
					'title'   => __( 'Error', 'comment-edit-pro' ),
					'message' => __( 'No selectors were found. Please try again.', 'comment-edit-pro' ),
				)
			);
		}

		// Get existing options.
		$options          = Options::get_options();
		$options_to_merge = array();

		// Loop through comment selectors.
		foreach ( $comment_selectors as $index => $selector_arr ) {
			$options_to_merge[ sanitize_text_field( $selector_arr['selectorOptionName'] ) ] = sanitize_text_field( $selector_arr['selector'] );
		}

		// Merge and update the options.
		$options = wp_parse_args( $options_to_merge, $options );
		Options::update_options( $options );

		wp_send_json_success(
			array(
				'title'   => __( 'Selectors Have Been Saved', 'comment-edit-pro' ),
				'message' => __( 'You should be all set. Please visit the Advanced settings to turn Selector Helper off.', 'comment-edit-pro' ),
			)
		);
	}

	/**
	 * Enqueue the menu helper scripts and styles.
	 */
	public function enqueue_selector_helper_scripts_styles() {
		wp_enqueue_script(
			'sce-selector-helper-js',
			Functions::get_plugin_url( 'dist/sce-selector-helper.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'sce-selector-helper-js',
			'sceSelectorHelper',
			array(
				'ajaxUrl'   => esc_url( admin_url( 'admin-ajax.php' ) ),
				'nonce'     => wp_create_nonce( 'sce_open_selector_helper_' . get_the_ID() ),
				'saveNonce' => wp_create_nonce( 'sce_save_selector_helper' ),
			)
		);
		wp_set_script_translations( 'sce-selector-helper-js', 'comment-edit-pro' );
		wp_enqueue_style(
			'sce-selector-helper-css',
			Functions::get_plugin_url( 'dist/sce-selector-helper-css.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Add the admin bar menu.
	 *
	 * @param WP_Admin_Bar $admin_bar Admin bar reference.
	 */
	public function admin_bar_menu( $admin_bar ) {
		// Only load on singular and page types.
		if ( ! is_singular() && ! is_page() ) {
			return;
		}

		// If user doesn't have capabilities, don't show the menu.
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$post_id   = get_the_ID();
		$permalink = get_permalink( $post_id );

		$admin_bar->add_group(
			array(
				'id'     => 'sce-comment-selector-helper',
				'parent' => 'comments',
			)
		);
		$admin_bar->add_node(
			array(
				'id'     => 'sce-comment-selector-helper-label',
				'parent' => 'sce-comment-selector-helper',
				'title'  => '<span style="font-weight: 900;">' . __( 'Selector Helper', 'comment-edit-pro' ) . '</span>',
				'href'   => false,
			)
		);
		$admin_bar->add_node(
			array(
				'id'     => 'sce-open-selector-helper',
				'parent' => 'sce-comment-selector-helper',
				'title'  => __( 'Launch Selector Helper', 'comment-edit-pro' ),
				'href'   => esc_url(
					add_query_arg(
						array(
							'sceOpenSelectorHelper' => '1',
							'post_id'               => $post_id,
						),
						$permalink
					)
				),
			)
		);
	}
}
