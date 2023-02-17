<?php
/**
 * Helper fuctions for Comment Editing admin settings.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Comment Editing
 */
class Comment_Editing {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Mailchimp admin panel actions.
		 */

		// Save mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_save_comment_editing_options', array( $this, 'ajax_save_comment_editing_options' ) );

		// Retrieve mailchimp settings in the admin.
		add_action( 'wp_ajax_sce_get_comment_editing_options', array( $this, 'ajax_get_comment_editing_options' ) );

		// Reset Mailchimp API key.
		add_action( 'wp_ajax_sce_reset_comment_editing_options', array( $this, 'ajax_reset_comment_editing_options' ) );

		// Load comment editing admin scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts_styles' ) );

		// Maybe disable comment editing.
		add_action( 'wp', array( $this, 'maybe_disable_comment_editing' ) );
	}

	/**
	 * Maybe disable comment editing based on settings.
	 */
	public function maybe_disable_comment_editing() {
		$options = Options::get_options();
		if ( class_exists( 'Simple_Comment_Editing' ) && ! (bool) $options['enable_comment_editing'] ) {
			$sce = \Simple_Comment_Editing::get_instance();
			remove_action( 'comment_post', array( $sce, 'comment_posted' ), 100, 1 );
			remove_filter( 'comment_excerpt', array( $sce, 'add_edit_interface' ), 1000, 2 );
			remove_filter( 'comment_text', array( $sce, 'add_edit_interface' ), 1000, 2 );
			remove_filter( 'thesis_comment_text', array( $sce, 'add_edit_interface' ), 1000, 2 );
			add_filter( 'sce_can_edit', '__return_false' );
			add_filter( 'sce_can_edit_pre', '__return_false' );
		}
	}

	/**
	 * Get comment editing options.
	 */
	public function ajax_get_comment_editing_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-comment-editing-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options = Options::get_options();

		$json_array = array(
			'timer'                   => absint( $options['timer'] ),
			'enableCommentEditing'    => (bool) $options['enable_comment_editing'],
			'allowCommentLogging'     => (bool) $options['allow_comment_logging'],
			'allowFrontEndEditing'    => (bool) $options['allow_front_end_editing'],
			'allowUnlimitedEditing'   => (bool) $options['allow_unlimited_editing'],
			'showStopTimer'           => (bool) $options['show_stop_timer'],
			'allowDelete'             => (bool) $options['allow_delete'],
			'deleteOnly'              => (bool) $options['delete_only'],
			'allowDeleteConfirmation' => (bool) $options['allow_delete_confirmation'],
			'allowEditNotification'   => (bool) $options['allow_edit_notification'],
			'editNotificationTo'      => sanitize_text_field( $options['edit_notification_to'] ),
			'editNotificationFrom'    => sanitize_text_field( $options['edit_notification_from'] ),
			'editNotificationSubject' => sanitize_text_field( $options['edit_notification_subject'] ),
			'showTimer'               => (bool) $options['show_timer'],
			'buttonTheme'             => sanitize_text_field( $options['button_theme'] ),
			'showIcons'               => (bool) $options['show_icons'],
			'timerAppearance'         => sanitize_text_field( $options['timer_appearance'] ),
			'saveText'                => sanitize_text_field( $options['save_text'] ),
			'cancelText'              => sanitize_text_field( $options['cancel_text'] ),
			'deleteText'              => sanitize_text_field( $options['delete_text'] ),
			'stopTimerText'           => sanitize_text_field( $options['stop_timer_text'] ),
			'clickToEditText'         => sanitize_text_field( $options['click_to_edit_text'] ),
			'confirmDelete'           => sanitize_text_field( $options['confirm_delete'] ),
			'commentDeleted'          => sanitize_text_field( $options['comment_deleted'] ),
			'commentDeletedError'     => sanitize_text_field( $options['comment_deleted_error'] ),
			'commentEmptyError'       => sanitize_text_field( $options['comment_empty_error'] ),
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save comment editing options.
	 */
	public function ajax_save_comment_editing_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-comment-editing-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options                              = array();
		$options['timer']                     = absint( filter_input( INPUT_POST, 'timer', FILTER_DEFAULT ) );
		$options['enable_comment_editing']    = (bool) filter_input( INPUT_POST, 'enableCommentEditing', FILTER_VALIDATE_BOOLEAN );
		$options['allow_comment_logging']     = (bool) filter_input( INPUT_POST, 'allowCommentLogging', FILTER_VALIDATE_BOOLEAN );
		$options['allow_front_end_editing']   = (bool) filter_input( INPUT_POST, 'allowFrontEndEditing', FILTER_VALIDATE_BOOLEAN );
		$options['allow_unlimited_editing']   = (bool) filter_input( INPUT_POST, 'allowUnlimitedEditing', FILTER_VALIDATE_BOOLEAN );
		$options['show_stop_timer']           = (bool) filter_input( INPUT_POST, 'showStopTimer', FILTER_VALIDATE_BOOLEAN );
		$options['allow_delete']              = (bool) filter_input( INPUT_POST, 'allowDelete', FILTER_VALIDATE_BOOLEAN );
		$options['delete_only']               = (bool) filter_input( INPUT_POST, 'deleteOnly', FILTER_VALIDATE_BOOLEAN );
		$options['allow_delete_confirmation'] = (bool) filter_input( INPUT_POST, 'allowDeleteConfirmation', FILTER_VALIDATE_BOOLEAN );
		$options['allow_edit_notification']   = (bool) filter_input( INPUT_POST, 'allowEditNotification', FILTER_VALIDATE_BOOLEAN );
		$options['edit_notification_to']      = sanitize_text_field( filter_input( INPUT_POST, 'editNotificationTo', FILTER_DEFAULT ) );
		$options['edit_notification_from']    = sanitize_text_field( filter_input( INPUT_POST, 'editNotificationFrom', FILTER_DEFAULT ) );
		$options['edit_notification_subject'] = sanitize_text_field( filter_input( INPUT_POST, 'editNotificationSubject', FILTER_DEFAULT ) );
		$options['show_timer']                = (bool) filter_input( INPUT_POST, 'showTimer', FILTER_VALIDATE_BOOLEAN );
		$options['button_theme']              = sanitize_text_field( filter_input( INPUT_POST, 'buttonTheme', FILTER_DEFAULT ) );
		$options['show_icons']                = (bool) filter_input( INPUT_POST, 'showIcons', FILTER_VALIDATE_BOOLEAN );
		$options['timer_appearance']          = sanitize_text_field( filter_input( INPUT_POST, 'timerAppearance', FILTER_DEFAULT ) );
		$options['save_text']                 = sanitize_text_field( filter_input( INPUT_POST, 'saveText', FILTER_DEFAULT ) );
		$options['cancel_text']               = sanitize_text_field( filter_input( INPUT_POST, 'cancelText', FILTER_DEFAULT ) );
		$options['delete_text']               = sanitize_text_field( filter_input( INPUT_POST, 'deleteText', FILTER_DEFAULT ) );
		$options['stop_timer_text']           = sanitize_text_field( filter_input( INPUT_POST, 'stopTimerText', FILTER_DEFAULT ) );
		$options['click_to_edit_text']        = sanitize_text_field( filter_input( INPUT_POST, 'clickToEditText', FILTER_DEFAULT ) );
		$options['confirm_delete']            = sanitize_text_field( filter_input( INPUT_POST, 'confirmDelete', FILTER_DEFAULT ) );
		$options['comment_deleted']           = sanitize_text_field( filter_input( INPUT_POST, 'commentDeleted', FILTER_DEFAULT ) );
		$options['comment_deleted_error']     = sanitize_text_field( filter_input( INPUT_POST, 'commentDeletedError', FILTER_DEFAULT ) );
		$options['comment_empty_error']       = sanitize_text_field( filter_input( INPUT_POST, 'commentEmptyError', FILTER_DEFAULT ) );

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
	 * Reset Comment Editing Options.
	 */
	public function ajax_reset_comment_editing_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-comment-editing-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$defaults = Options::get_defaults();

		// Populate defaults.
		$return = array(
			'timer'                   => absint( $defaults['timer'] ),
			'enableCommentEditing'    => (bool) $defaults['enable_comment_editing'],
			'allowCommentLogging'     => (bool) $defaults['allow_comment_logging'],
			'allowFrontEndEditing'    => (bool) $defaults['allow_front_end_editing'],
			'allowUnlimitedEditing'   => (bool) $defaults['allow_unlimited_editing'],
			'showStopTimer'           => (bool) $defaults['show_stop_timer'],
			'allowDelete'             => (bool) $defaults['allow_delete'],
			'deleteOnly'              => (bool) $defaults['delete_only'],
			'allowDeleteConfirmation' => (bool) $defaults['allow_delete_confirmation'],
			'allowEditNotification'   => (bool) $defaults['allow_edit_notification'],
			'editNotificationTo'      => sanitize_text_field( $defaults['edit_notification_to'] ),
			'editNotificationFrom'    => sanitize_text_field( $defaults['edit_notification_from'] ),
			'editNotificationSubject' => sanitize_text_field( $defaults['edit_notification_subject'] ),
			'showTimer'               => (bool) $defaults['show_timer'],
			'buttonTheme'             => sanitize_text_field( $defaults['button_theme'] ),
			'showIcons'               => (bool) $defaults['show_icons'],
			'timerAppearance'         => sanitize_text_field( $defaults['timer_appearance'] ),
			'saveText'                => sanitize_text_field( $defaults['save_text'] ),
			'cancelText'              => sanitize_text_field( $defaults['cancel_text'] ),
			'deleteText'              => sanitize_text_field( $defaults['delete_text'] ),
			'stopTimerText'           => sanitize_text_field( $defaults['stop_timer_text'] ),
			'clickToEditText'         => sanitize_text_field( $defaults['click_to_edit_text'] ),
			'confirmDelete'           => sanitize_text_field( $defaults['confirm_delete'] ),
			'commentDeleted'          => sanitize_text_field( $defaults['comment_deleted'] ),
			'commentDeletedError'     => sanitize_text_field( $defaults['comment_deleted_error'] ),
			'commentEmptyError'       => sanitize_text_field( $defaults['comment_empty_error'] ),
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
		if ( 'comment-editing' === $current_tab ) {
			wp_enqueue_script(
				'sce-comment-editing',
				Functions::get_plugin_url( 'dist/sce-comment-editing.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			$comment_edit_pro = \CommentEditPro\Comment_Edit_Pro::get_instance();
			wp_localize_script(
				'sce-comment-editing',
				'sceCommentEditing',
				array(
					'save_nonce'       => wp_create_nonce( 'sce-save-comment-editing-options' ),
					'get_nonce'        => wp_create_nonce( 'sce-retrieve-comment-editing-options' ),
					'reset_nonce'      => wp_create_nonce( 'sce-reset-comment-editing-options' ),
					'ajaxurl'          => esc_url( admin_url( 'admin-ajax.php' ) ),
					'default_theme'    => esc_url( Functions::get_plugin_url( '/images/screenshot-theme-default.png' ) ),
					'light_theme'      => esc_url( Functions::get_plugin_url( '/images/screenshot-theme-light.png' ) ),
					'dark_theme'       => esc_url( Functions::get_plugin_url( '/images/screenshot-theme-dark.png' ) ),
					'is_sce_installed' => $comment_edit_pro->is_sce_enabled(),
				)
			);
		}
	}
}
