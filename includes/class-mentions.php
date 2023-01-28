<?php
/**
 * Helper fuctions for mentions.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Mentions
 */
class Mentions {

	/**
	 * Class runner.
	 */
	public function run() {

		// Retrieve Akismet settings in the admin.
		add_action( 'wp_ajax_sce_get_mentions_options', array( $this, 'ajax_get_mentions_options' ) );
		add_action( 'wp_ajax_sce_save_mentions_options', array( $this, 'ajax_save_mentions_options' ) );
		add_action( 'wp_ajax_sce_reset_mentions_options', array( $this, 'ajax_reset_mentions_options' ) );

		// Add Opt-in @ mention Checkbox.
		add_filter( 'comment_form_defaults', array( $this, 'add_mentions_checkbox' ), 100 );

		// Load mentions scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Load frontend mentions scripts.
		$options = Options::get_options();
		if ( $options['mentions_enabled'] ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts_styles' ) );
		}
	}

	/**
	 * Add @ Mention frontend scripts/styles.
	 */
	public function add_frontend_scripts_styles() {
		// Determine if comments are open.
		if ( comments_open() ) {
			global $post;
			$options = Options::get_options();
			wp_enqueue_script(
				'sce-mentions-frontend',
				Functions::get_plugin_url( 'dist/mentions-frontend.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);

			// Get a list of all comments.
			$comments = get_comments(
				array(
					'post_id' => $post->ID,
				)
			);

			// Loop through comments and build names array.
			$comment_authors = array();
			foreach ( $comments as $comment ) {
				$comment_authors[ $comment->comment_ID ] = $comment->comment_author;
			}
			$comment_authors = array_unique( $comment_authors );
			$comment_names   = array();
			foreach ( $comment_authors as $comment_id => $author ) {
				$comment_names[] = array(
					'key'   => $author,
					'value' => sanitize_text_field( $comment_id ),
				);
			}

			// Output localalized mentions.
			wp_localize_script(
				'sce-mentions-frontend',
				'sceMentions',
				array(
					'values'        => $comment_names,
					'commentFormId' => $options['mentions_comment_textarea_id'],
				)
			);

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

	/**
	 * Load scripts and styles in the admin.
	 */
	public function add_admin_scripts_styles() {
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab ) {
			return;
		}
		if ( 'mentions' === $current_tab ) {
			wp_enqueue_script(
				'sce-mentions',
				Functions::get_plugin_url( 'dist/mentions-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'sce-mentions',
				'sceMentions',
				array(
					'save_nonce'  => wp_create_nonce( 'sce-save-mentions-options' ),
					'get_nonce'   => wp_create_nonce( 'sce-retrieve-mentions-options' ),
					'reset_nonce' => wp_create_nonce( 'sce-reset-mentions-options' ),
					'ajaxurl'     => esc_url( admin_url( 'admin-ajax.php' ) ),
				)
			);
		}
	}

	/**
	 * Get mentions options.
	 */
	public function ajax_get_mentions_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-mentions-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options    = Options::get_options();
		$json_array = array(
			'mentionsEnabled'           => (bool) $options['mentions_enabled'],
			'mentionsEmailsEnabled'     => (bool) $options['mentions_emails_enabled'],
			'mentionsEmailsFromName'    => $options['mentions_emails_from_name'],
			'mentionsEmailsFromEmail'   => $options['mentions_emails_from_email'],
			'mentionsSignupLabel'       => $options['mentions_signup_label'],
			'mentionsCheckboxEnabled'   => $options['mentions_checkbox_enabled'],
			'mentionsCommentTextareaId' => $options['mentions_comment_textarea_id'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save Mentions options.
	 */
	public function ajax_save_mentions_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-mentions-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$mentions_enabled             = (bool) filter_input( INPUT_POST, 'mentionsEnabled', FILTER_VALIDATE_BOOLEAN );
		$mentions_emails_enabled      = (bool) filter_input( INPUT_POST, 'mentionsEmailsEnabled', FILTER_VALIDATE_BOOLEAN );
		$mentions_emails_from_name    = sanitize_text_field( filter_input( INPUT_POST, 'mentionsEmailsFromName', FILTER_DEFAULT ) );
		$mentions_emails_from_email   = sanitize_text_field( filter_input( INPUT_POST, 'mentionsEmailsFromEmail', FILTER_DEFAULT ) );
		$mentions_signup_label        = sanitize_text_field( filter_input( INPUT_POST, 'mentionsSignupLabel', FILTER_DEFAULT ) );
		$mentions_checkbox_enabled    = (bool) filter_input( INPUT_POST, 'mentionsCheckboxEnabled', FILTER_VALIDATE_BOOLEAN );
		$mentions_comment_textarea_id = sanitize_text_field( filter_input( INPUT_POST, 'mentionsCommentTextareaId', FILTER_DEFAULT ) );

		// Now let's save options.
		$options_to_save = array(
			'mentions_enabled'             => $mentions_enabled,
			'mentions_emails_enabled'      => $mentions_emails_enabled,
			'mentions_emails_from_name'    => $mentions_emails_from_name,
			'mentions_emails_from_email'   => $mentions_emails_from_email,
			'mentions_signup_label'        => $mentions_signup_label,
			'mentions_checkbox_enabled'    => $mentions_checkbox_enabled,
			'mentions_comment_textarea_id' => $mentions_comment_textarea_id,
		);
		Options::update_options( $options_to_save );

		wp_send_json_success(
			array(
				'message' => __( 'Options saved.', 'comment-edit-pro' ),
			)
		);
		exit;
	}

	/**
	 * Reset Mailchimp Options.
	 */
	public function ajax_reset_mentions_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-mentions-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$signup_label_default = esc_html__( 'Receive an email when someone mentions you in a comment.', 'comment-edit-pro' );

		// Clear options.
		Options::update_options(
			array(
				'mentions_enabled'             => false,
				'mentions_emails_enabled'      => true,
				'mentions_emails_from_name'    => get_bloginfo( 'name' ),
				'mentions_emails_from_email'   => get_bloginfo( 'admin_email' ),
				'mentions_signup_label'        => $signup_label_default,
				'mentions_checkbox_enabled'    => false,
				'mentions_comment_textarea_id' => 'comment',
			)
		);

		$json_array = array(
			'mentionsEnabled'           => false,
			'mentionsEmailsEnabled'     => true,
			'mentionsEmailsFromName'    => get_bloginfo( 'name' ),
			'mentionsEmailsFromEmail'   => get_bloginfo( 'admin_email' ),
			'mentionsSignupLabel'       => $signup_label_default,
			'mentionsCheckboxEnabled'   => false,
			'mentionsCommentTextareaId' => 'comment',
		);

		wp_send_json_success(
			$json_array
		);

	}

	/**
	 * Add an mention option below the comment textarea and above the submit button.
	 *
	 * @param array $comment_fields Array of defaults for the form field.
	 */
	public function add_mentions_checkbox( $comment_fields ) {
		$options          = Options::get_options();
		$mentions_enabled = (bool) $options['mentions_enabled'];
		$emails_enabled   = (bool) $options['mentions_emails_enabled'];

		// Chceck to see if mentions are enabled.
		if ( ! $mentions_enabled || ! $emails_enabled || current_user_can( 'moderate_comments' ) ) {
			return $comment_fields;
		}

		// Now get the checkbox details.
		$checked_by_default              = false;
		$mentions_html                   = array(
			'sce-mentions' => sprintf(
				'<section class="comment-form-sce-mentions"><label><input type="checkbox" name="sce-mentions-signup" %s /> %s</label></section>',
				checked( (bool) $options['mentions_checkbox_enabled'], true, false ),
				esc_html( $options['mentions_signup_label'] )
			),
		);
		$comment_fields['submit_button'] = $mentions_html['sce-mentions'] . $comment_fields['submit_button'];
		return $comment_fields;
	}
}
