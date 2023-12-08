<?php
/**
 * Helper fuctions Comment Character Control.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Character_Control
 */
class Character_Control {

	/**
	 * Class runner.
	 */
	public function run() {

		// Check edited comments for length.
		add_filter( 'sce_comment_check_errors', array( $this, 'check_comment_length' ), 10, 2 );
		add_filter( 'sce_comment_check_errors', array( $this, 'check_comment_length_max' ), 10, 2 );

		$options = Options::get_options();

		if ( isset( $options['allow_front_end_character_limit'] ) && true === filter_var( $options['allow_front_end_character_limit'], FILTER_VALIDATE_BOOLEAN ) ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_ccc' ) );
		}
	}

	/**
	 * Checks to see if comment meets minimum length.
	 *
	 * Checks to see if comment meets minimum length.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param bool  $errors Any comment errors.
	 * @param array $comment Comment to save.
	 *
	 * @return mixed false if no errors, string if errors exist
	 */
	public function check_comment_length( $errors, $comment ) {
		$options                    = Options::get_options();
		$allow_comment_length_check = isset( $options['require_comment_length'] ) ? $options['require_comment_length'] : $errors;
		if ( false === $allow_comment_length_check ) {
			return $errors;
		}

		// Get minimum char length.
		$minimum_char_length = isset( $options['min_comment_length'] ) ? $options['min_comment_length'] : 50;
		if ( 0 === $minimum_char_length ) {
			return $errors;
		}

		// Format comment text.
		$comment_content = trim( wp_strip_all_tags( $comment['comment_content'] ) );
		$comment_length  = strlen( $comment_content );
		if ( $comment_length < $minimum_char_length ) {
			/* Translators: %d is the minimum number of characters for a comment. */
			return sprintf( __( 'Comment must be at least %d characters.', 'comment-edit-pro' ), absint( $minimum_char_length ) );
		}
		return $errors;
	}

	/**
	 * Checks to see if comment meets maxiumum length.
	 *
	 * Checks to see if comment meets maxiumum length.
	 *
	 * @since 1.1.0
	 * @access public
	 *
	 * @param bool  $errors Any comment errors.
	 * @param array $comment Comment to save.
	 *
	 * @return mixed false if no errors, string if errors exist
	 */
	public function check_comment_length_max( $errors, $comment ) {
		$options                    = Options::get_options();
		$allow_comment_length_check = isset( $options['require_comment_length_max'] ) ? $options['require_comment_length_max'] : $errors;
		if ( false === $allow_comment_length_check ) {
			return $errors;
		}

		// Get minimum char length.
		$maximum_char_length = isset( $options['max_comment_length'] ) ? $options['max_comment_length'] : 2000;
		if ( 0 === $maximum_char_length ) {
			return $errors;
		}

		// Format comment text.
		$comment_content = trim( wp_strip_all_tags( $comment['comment_content'] ) );
		$comment_length  = strlen( $comment_content );
		if ( $comment_length > $maximum_char_length ) {
			/* Translators: %d is the maximum number of characters for a comment. */
			return sprintf( __( 'Comment cannot exceed %d characters.', 'comment-edit-pro' ), absint( $maximum_char_length ) );
		}
		return $errors;
	}

	/**
	 * Add scripts for comment character control frontend.
	 */
	public function add_scripts_ccc() {
		if ( ! is_singular() || ! comments_open() || current_user_can( 'moderate_comments' ) ) {
			return;
		}
		$options = Options::get_options();
		wp_enqueue_style( 'sce-ccc', Functions::get_plugin_url( '/dist/sce-ccc-progress-bar.css' ), array(), Functions::get_plugin_version(), 'all' );
		wp_enqueue_script( 'sce-ccc', Functions::get_plugin_url( '/js/comment-character-control.js' ), array( 'jquery' ), Functions::get_plugin_version(), true );
		wp_localize_script(
			'sce-ccc',
			'sce_ccc',
			array(
				'min_length' => $options['min_comment_length'],
				'max_length' => $options['max_comment_length'],
				'min_option' => true,
				'max_option' => true,
			)
		);
	}
}
