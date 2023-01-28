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
					'values' => $comment_names,
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
			'mentionsEnabled'         => (bool) $options['mentions_enabled'],
			'mentionsEmailsEnabled'   => (bool) $options['mentions_emails_enabled'],
			'mentionsEmailsFromName'  => $options['mentions_emails_from_name'],
			'mentionsEmailsFromEmail' => $options['mentions_emails_from_email'],
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
		$mentions_enabled           = (bool) filter_input( INPUT_POST, 'mentionsEnabled', FILTER_VALIDATE_BOOLEAN );
		$mentions_emails_enabled    = (bool) filter_input( INPUT_POST, 'mentionsEmailsEnabled', FILTER_VALIDATE_BOOLEAN );
		$mentions_emails_from_name  = sanitize_text_field( filter_input( INPUT_POST, 'mentionsEmailsFromName', FILTER_DEFAULT ) );
		$mentions_emails_from_email = sanitize_text_field( filter_input( INPUT_POST, 'mentionsEmailsFromEmail', FILTER_DEFAULT ) );

		// Now let's save options.
		$options_to_save = array(
			'mentions_enabled'           => $mentions_enabled,
			'mentions_emails_enabled'    => $mentions_emails_enabled,
			'mentions_emails_from_name'  => $mentions_emails_from_name,
			'mentions_emails_from_email' => $mentions_emails_from_email,
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

		// Clear options.
		Options::update_options(
			array(
				'mentions_enabled'           => false,
				'mentions_emails_enabled'    => true,
				'mentions_emails_from_name'  => get_bloginfo( 'name' ),
				'mentions_emails_from_email' => get_bloginfo( 'admin_email' ),
			)
		);

		$json_array = array(
			'mentionsEnabled'         => false,
			'mentionsEmailsEnabled'   => true,
			'mentionsEmailsFromName'  => get_bloginfo( 'name' ),
			'mentionsEmailsFromEmail' => get_bloginfo( 'admin_email' ),
		);

		wp_send_json_success(
			$json_array
		);

	}
}
