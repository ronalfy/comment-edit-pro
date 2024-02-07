<?php
/**
 * Helper fuctions for Comment Form admin settings.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions;
use CommentEditPro\Includes\Options;

/**
 * Class Comment Form
 */
class Comment_Form {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_comment_form_options', array( $this, 'ajax_save_comment_form_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_comment_form_options', array( $this, 'ajax_get_comment_form_options' ) );

		// Reset Mailchimp API key.
		add_action( 'wp_ajax_sce_reset_comment_form_options', array( $this, 'ajax_reset_comment_form_options' ) );

		// Load comment form admin scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Remove URL field from comment if applicable.
		add_filter( 'comment_form_default_fields', array( $this, 'remove_url_field' ), 200, 1 );

		// Remove URLs from author if applicable.
		add_filter( 'get_comment_author_link', array( $this, 'remove_link_from_author' ), 200, 1 );

		add_filter( 'comment_form_defaults', array( $this, 'add_comment_form_submit_button_label' ), 500, 1 );
	}

	/**
	 * Add comment form submit button label.
	 *
	 * @param array $fields Array of comment form fields.
	 *
	 * @return array
	 */
	public function add_comment_form_submit_button_label( $fields ) {
		// Return early for WooCommerce.
		if ( 'product' === get_post_type() ) {
			return $fields;
		}

		// Let's begin the overrides.
		$options      = Options::get_options();
		$submit_label = sanitize_text_field( trim( $options['submit_button_label'] ) );
		$reply_label  = sanitize_text_field( trim( $options['comment_reply_label'] ) );

		// Take over the submit label.
		if ( ! empty( $submit_label ) ) {
			$fields['label_submit'] = $submit_label;
		}

		// Take over the reply label.
		if ( ! empty( $reply_label ) ) {
			$fields['title_reply'] = $reply_label;
		}

		return $fields;
	}

	/**
	 * Remove URLs from author if applicable.
	 *
	 * @param string $author Author name.
	 *
	 * @return string
	 */
	public function remove_link_from_author( $author ) {
		$options                   = Options::get_options();
		$is_stripping_urls_enabled = (bool) $options['comment_strip_urls'];
		// Now strip any URLs from the author field if enabled.
		if ( $is_stripping_urls_enabled ) {
			$post_html = \wp_kses_allowed_html( 'post' );

			// Remove anchor.
			unset( $post_html['a'] );

			// Remove href.
			$author = wp_kses( $author, $post_html );

		}
		return $author;
	}

	/**
	 * Remove URL field from comment if applicable.
	 *
	 * @param array $fields Array of comment form fields.
	 *
	 * @return array
	 */
	public function remove_url_field( $fields ) {
		$options              = Options::get_options();
		$is_url_field_enabled = (bool) $options['comment_url_field_enabled'];

		if ( ! $is_url_field_enabled ) {
			// Add a closing div and strip URL field from comment form if applicable.
			// This is in case someone uses an opening div for the author field and does not close it.
			$regex = '/<\/div>$/';

			// Check URL field for regex.
			if ( preg_match( $regex, $fields['url'] ) ) {
				$fields['url'] = '</div>';
			} else {
				unset( $fields['url'] );
			}
		}

		return $fields;
	}




	/**
	 * Get comment form options.
	 */
	public function ajax_get_comment_form_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-comment-form-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();

		$json_array = array(
			'commentUrlFieldEnabled'      => (bool) $options['comment_url_field_enabled'],
			'commentStripUrls'            => (bool) $options['comment_strip_urls'],
			'submitButtonLabel'           => sanitize_text_field( $options['submit_button_label'] ),
			'commentReplyLabel'           => sanitize_text_field( $options['comment_reply_label'] ),
			'minCommentLength'            => absint( $options['min_comment_length'] ), /* min length */
			'allowFrontEndCharacterLimit' => (bool) $options['allow_front_end_character_limit'], /* enable character control */
			'maxCommentLength'            => absint( $options['max_comment_length'] ),
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save comment form options.
	 */
	public function ajax_save_comment_form_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-comment-form-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options                                    = array();
		$options['comment_url_field_enabled']       = (bool) filter_input( INPUT_POST, 'commentUrlFieldEnabled', FILTER_VALIDATE_BOOLEAN );
		$options['comment_strip_urls']              = (bool) filter_input( INPUT_POST, 'commentStripUrls', FILTER_VALIDATE_BOOLEAN );
		$options['submit_button_label']             = sanitize_text_field( filter_input( INPUT_POST, 'submitButtonLabel', FILTER_DEFAULT ) );
		$options['comment_reply_label']             = sanitize_text_field( filter_input( INPUT_POST, 'commentReplyLabel', FILTER_DEFAULT ) );
		$options['comment_reply_label_logged_in']   = sanitize_text_field( filter_input( INPUT_POST, 'commentReplyLabelLoggedIn', FILTER_DEFAULT ) );
		$options['min_comment_length']              = absint( filter_input( INPUT_POST, 'minCommentLength', FILTER_DEFAULT ) );
		$options['max_comment_length']              = absint( filter_input( INPUT_POST, 'maxCommentLength', FILTER_DEFAULT ) );
		$options['allow_front_end_character_limit'] = (bool) filter_input( INPUT_POST, 'allowFrontEndCharacterLimit', FILTER_VALIDATE_BOOLEAN );

		// Save options.
		Options::update_options( $options );

		// Return success.
		wp_send_json_success(
			array(
				'message' => __( 'Options saved.', 'comment-edit-pro' ),
			)
		);
	}

	/**
	 * Reset Comment Form Options.
	 */
	public function ajax_reset_comment_form_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-comment-form-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$defaults = Options::get_defaults();

		// Populate defaults.
		$return = array(
			'commentUrlFieldEnabled'      => (bool) $defaults['comment_url_field_enabled'],
			'commentStripUrls'            => (bool) $defaults['comment_strip_urls'],
			'submitButtonLabel'           => '',
			'commentReplyLabel'           => '',
			'commentReplyLabelLoggedIn'   => '',
			'minCommentLength'            => absint( $defaults['min_comment_length'] ),
			'maxCommentLength'            => absint( $defaults['max_comment_length'] ),
			'allowFrontEndCharacterLimit' => (bool) $defaults['allow_front_end_character_limit'],

		);

		// Go through return defaults and format into options.
		$options_to_save = array();
		foreach ( $return as $key => $value ) {
			$options_to_save[ Functions::to_underlines( $key ) ] = $value;
		}
		Options::update_options( $options_to_save );

		wp_send_json_success( $return );
	}

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'comment-form' === $current_tab ) {
			$deps = require_once Functions::get_plugin_dir( 'build/sce-comment-form.asset.php' );
			wp_enqueue_script(
				'sce-comment-form',
				Functions::get_plugin_url( 'build/sce-comment-form.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
			$comment_edit_pro = \CommentEditPro\Comment_Edit_Pro::get_instance();

			// Localize.
			wp_localize_script(
				'sce-comment-form',
				'sceCommentEditing',
				array(
					'save_nonce'  => wp_create_nonce( 'sce-save-comment-form-options' ),
					'get_nonce'   => wp_create_nonce( 'sce-retrieve-comment-form-options' ),
					'reset_nonce' => wp_create_nonce( 'sce-reset-comment-form-options' ),
					'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}
}
