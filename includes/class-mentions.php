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

			// When a new comment has been added.
			add_action( 'comment_post', array( $this, 'comment_posted' ), 100, 2 );
			add_action( 'comment_post', array( $this, 'send_notification_emails' ), 100, 2 );

			// Template actions for the mentions subscribe screen.
			add_filter( 'template_include', array( $this, 'add_subscribe_template' ) );
			add_filter( 'sce_mentions_subscribe_styles_header', array( static::class, 'add_subscribe_styles_header' ) );
			add_action( 'sce_mentions_subscribe_body', array( static::class, 'add_mentions_subscribe_body' ) );
		}
	}

	/**
	 * Output the success body and save subscription status.
	 */
	public static function add_mentions_subscribe_body() {
		// Let's gather hash and state.
		$hash  = sanitize_text_field( filter_input( INPUT_GET, 'hash', FILTER_DEFAULT ) );
		$state = sanitize_text_field( filter_input( INPUT_GET, 'state', FILTER_DEFAULT ) );

		if ( empty( $hash ) || empty( $state ) ) {
			return;
		}

		$state      = json_decode( base64_decode( $state ), true );
		$comment_id = $state['comment_id'] ?? false;
		$nonce      = $state['nonce'] ?? false;
		if ( ! $comment_id || ! $nonce ) {
			return;
		}

		// Get comment from comment ID.
		$comment = get_comment( $comment_id );
		if ( ! $comment ) {
			return;
		}
		$email_address = $comment->comment_author_email;

		// Verify nonce.
		if ( ! wp_verify_nonce( $nonce, 'sce_mentions_subscribe_' . sanitize_text_field( $comment_id ) . $email_address ) ) {
			return;
		}

		// Get current hash/password for email.
		global $wpdb;
		$tablename = $wpdb->base_prefix . 'sce_mentions';
		$email_hash = $wpdb->get_var(
			$wpdb->prepare(
				'select hash from ' . esc_sql( $tablename ) . ' where email = %s limit 1',
				$email_address
			)
		);
		if ( ! $email_hash || is_wp_error( $email_hash ) ) {
			return;
		}
		$email_hash = sanitize_text_field( $email_hash );

		// Get unsubscribe URL.
		$unsubscribe_nonce = wp_create_nonce( 'sce_mentions_unsubscribe_' . $comment_id . $email_address );
			$unsubscribe_url   = add_query_arg(
				array(
					'hash'   => md5( $comment_id . $email_address . $email_hash . $unsubscribe_nonce ),
					'state'  => base64_encode( // phpcs:ignore
						wp_json_encode(
							array(
								'comment_id' => $comment_id,
								'nonce'      => $unsubscribe_nonce,
							)
						)
					),
					'action' => 'sce-mentions-unsubscribe',
				),
				home_url()
			);

		ob_start();
		?>
		<h2><?php esc_html_e( 'Thank you for subscribing', 'comment-edit-pro' ); ?></h2>
		<p><?php esc_html_e( 'You will now receive an email if you are mentioned.', 'comment-edit-pro' ); ?></p>
		<p class="unsubscribe"><a href="<?php echo esc_url_raw( $unsubscribe_url ); ?>"><?php esc_html_e( 'Unsubscribe', 'comment-edit-pro' ); ?></a></p>
		<?php
		$body = ob_get_clean();
		echo wp_kses_post( $body );
	}

	/**
	 * Load styles for the subscription header.
	 *
	 * @param array $style_handles Array of style handles.
	 */
	public static function add_subscribe_styles_header( $style_handles ) {
		$header_style_handle = 'sce_mentions_subscribe_css';
		wp_register_style(
			$header_style_handle,
			Functions::get_plugin_url( 'dist/sce-mentions-theme-white.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		$style_handles[] = $header_style_handle;
		return $style_handles;
	}

	/**
	 * Load the subscribe template.
	 *
	 * @param string $original_template The original template.
	 */
	public function add_subscribe_template( $original_template ) {
		$maybe_subscribe_action = filter_input( INPUT_GET, 'action', FILTER_DEFAULT );
		if ( 'sce-mentions-subscribe' === $maybe_subscribe_action ) {
			// Get hash and state and check status.
			$hash  = sanitize_text_field( filter_input( INPUT_GET, 'hash', FILTER_DEFAULT ) );
			$state = sanitize_text_field( filter_input( INPUT_GET, 'state', FILTER_DEFAULT ) );
			if ( empty( $hash ) || empty( $state ) ) {
				wp_die( esc_html__( 'Could not verify email address', 'comment-edit-pro' ) );
				exit;
			}

			// Get comment ID and nonce from state.
			$state      = json_decode( base64_decode( $state ), true );
			$comment_id = $state['comment_id'] ?? false;
			$nonce      = $state['nonce'] ?? false;
			if ( ! $comment_id || ! $nonce ) {
				return;
			}

			// Get comment from comment ID.
			$comment = get_comment( $comment_id );
			if ( ! $comment ) {
				return;
			}
			$email_address = $comment->comment_author_email;

			// Verify nonce.
			if ( ! wp_verify_nonce( $nonce, 'sce_mentions_subscribe_' . sanitize_text_field( $comment_id ) . $email_address ) ) {
				return;
			}

			// Get password from db.
			global $wpdb;
			$tablename = $wpdb->base_prefix . 'sce_mentions';
			// Check if email exists.
			$email_row = $wpdb->get_row(
				$wpdb->prepare(
					'select id, email, is_subscribed, hash from ' . esc_sql( $tablename ) . ' where email = %s limit 1',
					$email_address
				)
			);
			if ( ! $email_row || is_wp_error( $email_row ) ) {
				return;
			}
			$subscribe_pass = $email_row->hash;
			$new_hash       = md5( $comment_id . $email_address . $subscribe_pass . $nonce );
			if ( $hash !== $new_hash ) {
				return;
			}
			$is_subscribed = sanitize_text_field( $email_row->is_subscribed );
			if ( 'false' === $is_subscribed || false === $is_subscribed || empty( $is_subscribed ) ) {
				$mention_id = absint( $email_row->id );
				$wpdb->update(
					$tablename,
					array(
						'is_subscribed' => 'true',
					),
					array(
						'email' => $email_address,
						'id'    => $mention_id,
					),
					array(
						'%s',
					),
					array(
						'%s',
						'%d',
					)
				);
			}

			// Update subscription to valid.

			$sce_mentions_theme_name = 'default';
			$template                = Functions::get_plugin_dir( 'templates/mentions-subscribe.php' );
			if ( file_exists( $template ) ) {
				require_once $template;
			} else {
				wp_die( esc_html__( 'Template not found', 'comment-edit-pro' ) );
				exit;
			}
			exit;
		}
		return $original_template;
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

	/**
	 * Send commenter subscriber email.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function comment_posted( $comment_id, $maybe_comment_approved ) {
		$signup_enabled = (bool) filter_input( INPUT_POST, 'sce-mentions-signup', FILTER_VALIDATE_BOOLEAN );

		if ( $signup_enabled && 'spam' !== $maybe_comment_approved ) {
			$options = Options::get_options();
			// Get comment.
			$comment = get_comment( $comment_id );
			if ( ! $comment ) {
				return;
			}

			// Get comment author's email address.
			$email_address = $comment->comment_author_email;
			if ( ! is_email( $email_address ) ) {
				return;
			}

			// Create email send hash. Comement ID. Email address. Unique hash. Nonce with comment ID and email address.
			$subscribe_nonce = wp_create_nonce( 'sce_mentions_subscribe_' . sanitize_text_field( $comment_id ) . $email_address );
			$subscribe_pass  = wp_generate_password( 20, false ); // Will be stored in db.
			$hash            = $comment_id . $email_address . $subscribe_pass . $subscribe_nonce;

			// Set state.
			$state = base64_encode( // phpcs:ignore
				wp_json_encode(
					array(
						'comment_id' => $comment_id,
						'nonce'      => $subscribe_nonce,
					)
				)
			);

			// Build subscribe URL.
			$subscribe_url = add_query_arg(
				array(
					'hash'   => md5( $hash ),
					'state'  => $state,
					'action' => 'sce-mentions-subscribe',
				),
				home_url()
			);

			// Now let's add the subscriber to the mentions table.
			global $wpdb;
			$tablename = $wpdb->base_prefix . 'sce_mentions';

			// Check if email already exists.
			$maybe_email = $wpdb->get_var(
				$wpdb->prepare(
					'select email from ' . esc_sql( $tablename ) . ' where email = %s limit 1',
					$email_address
				)
			);
			if ( ( ! $maybe_email || empty( $maybe_email ) ) && is_email( $email_address ) ) {
				$wpdb->insert(
					$tablename,
					array(
						'email'         => $email_address,
						'hash'          => $subscribe_pass,
						'is_subscribed' => false,
						'date_added'    => gmdate( 'Y-m-d' ),
					)
				);
			}

			$maybe_subscribed = $wpdb->get_var(
				$wpdb->prepare(
					'select is_subscribed from ' . esc_sql( $tablename ) . ' where email = %s AND is_subscribed = "true"',
					$email_address
				)
			);
			if ( ! $maybe_subscribed ) {
				// Send subscription email.
				$subject = sprintf(
					/* translators: %s: Site name. */
					__( '[%s] Please confirm your subscription', 'simple-comment-editing' ),
					wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES )
				);
				$body = sprintf(
					/* translators: %s: Subscribe URL. */
					esc_html__( 'Please click the following link to confirm your subscription: %s', 'simple-comment-editing', 'comment-edit-pro' ),
					"\n\n" . esc_url_raw( $subscribe_url )
				);
				// Get email headers from name.
				$headers = array(
					'From: ' . $options['mentions_emails_from_name'] . ' <' . $options['mentions_emails_from_email'] . '>',
				);
				wp_mail( $email_address, $subject, $body, $headers );
			}
		}
	}

	/**
	 * Send commenter subscriber emails.
	 *
	 * @param int  $comment_id Comment ID that has been submitted.
	 * @param bool $maybe_comment_approved Whether the comment is approved or not (1, 0, spam).
	 */
	public function send_notification_emails( $comment_id, $maybe_comment_approved ) {

		// Get comment.
		$comment = get_comment( $comment_id );
		if ( ! $comment ) {
			return;
		}

		// Get mentions from post.
		$mentions = filter_input( INPUT_POST, 'mentions', FILTER_VALIDATE_INT, FILTER_REQUIRE_ARRAY ); // mentions contains a comment ID for the user.
		$options  = Options::get_options();

		foreach ( $mentions as $mention ) {
			$user_comment = get_comment( $mention );
			$user_email   = $user_comment->comment_author_email;
			$user_name    = $user_comment->comment_author;

			// Check if subscribed.
			global $wpdb;
			$tablename        = $wpdb->base_prefix . 'sce_mentions';
			$maybe_subscribed = $wpdb->get_var(
				$wpdb->prepare(
					'select is_subscribed from ' . esc_sql( $tablename ) . ' where email = %s AND is_subscribed = "true"',
					$user_email
				)
			);
			if ( ! $maybe_subscribed ) {
				continue;
			}

			// Get subject line for email.
			$subject = sprintf(
				/* translators: %s: Site name. */
				__( '[%s] You have been mentioned in a comment', 'comment-edit-pro' ),
				get_bloginfo( 'name' )
			);

			// Get email headers from name.
			$headers = array(
				'From: ' . $options['mentions_emails_from_name'] . ' <' . $options['mentions_emails_from_email'] . '>',
			);

			// Craft to field.
			$to_field = $user_email;

			// Craft email body.
			$body  = sprintf( __( 'Hello %s,', 'comment-edit-pro' ), sanitize_text_field( $user_name ) ) . "\n\n";
			$body .= "You have been mentioned in a comment.\n\n";
			$body .= esc_html__( 'Comment: ', 'comment-edit-pro' ) . "\n";
			$body .= esc_textarea( $comment->comment_content ) . "\n\n";
			$body .= esc_html__( 'Link to comment: ', 'comment-edit-pro' ) . "\n";
			$body .= get_comment_link( $comment ) . "\n\n";
			$body .= esc_html__( 'Thank you,', 'comment-edit-pro' ) . "\n";
			$body .= esc_url( home_url() );

			// Create unsubscribe link.
			$unsubscribe_nonce = wp_create_nonce( 'sce_mentions_unsubscribe_' . $mention . $user_email );
			$unsubscribe_url   = add_query_arg(
				array(
					'hash'   => md5( $comment_id . $user_email . $unsubscribe_nonce ),
					'state'  => base64_encode( // phpcs:ignore
						wp_json_encode(
							array(
								'comment_id' => $mention,
								'nonce'      => $unsubscribe_nonce,
							)
						)
					),
					'action' => 'sce-mentions-unsubscribe',
				),
				home_url()
			);

			// Add unsubscribe link to body.
			$body .= "\n\n" . esc_html__( 'Unsubscribe from future mentions: ', 'comment-edit-pro' ) . "\n";
			$body .= $unsubscribe_url;

			// Send the email.
			wp_mail(
				$to_field,
				$subject,
				$body,
				$headers
			);
		}
	}
}
