<?php
/**
 * Helper fuctions for Mailchimp.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class Recaptcha
 */
class Recaptcha {

	/**
	 * Class runner.
	 */
	public function run() {

		/**
		 * Recaptcha admin panel actions.
		 */

		// Retrieve Recaptcha settings in the admin.
		add_action( 'wp_ajax_sce_get_recaptcha_options', array( $this, 'ajax_get_recaptcha_options' ) );
		add_action( 'wp_ajax_sce_save_recaptcha_options', array( $this, 'ajax_save_recaptcha_options' ) );
		add_action( 'wp_ajax_sce_reset_recaptcha_options', array( $this, 'ajax_reset_recaptcha_options' ) );

		$options = Options::get_options();

		// Let's check that reCAPTCHA is enabled.
		if ( ! (bool) $options['recaptcha_enabled'] ) {
			return;
		}

		// Let's check that the secret and site key are set.
		$site_key   = $options['recaptcha_site_key'];
		$secret_key = $options['recaptcha_secret_key'];
		if ( empty( $site_key ) || empty( $secret_key ) ) {
			return;
		}

		// Recaptcha options are below. Let's see if we can exclude people from them.

		// If user can moderate comments, no captcha.
		if ( current_user_can( 'moderate_comments' ) ) {
			return;
		}

		// If user is logged in and reCAPTCHA is disabled for logged-in users, exit.
		if ( is_user_logged_in() && ! (bool) $options['recaptcha_logged_in_users_enabled'] ) {
			return;
		}

		// Enqueue recaptcha assets on the front-end.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_recaptcha_scripts' ) );
		add_filter( 'script_loader_tag', array( $this, 'defer_scripts' ), 10, 3 );
		add_filter( 'comment_form_submit_button', array( $this, 'modify_comment_submit_button' ), 10, 2 );
		add_filter( 'comment_form_defaults', array( $this, 'add_recaptcha_css_class' ), 10, 1 );
		add_action( 'wp_print_footer_scripts', array( $this, 'print_recaptcha_scripts' ) );
		add_action( 'pre_comment_on_post', array( $this, 'verify_recaptcha' ), 10, 1 );
	}

	/**
	 * Verify the recaptcha response.
	 *
	 * @param int $comment_id The comment ID to check.
	 */
	public function verify_recaptcha( $comment_id ) {
		$options = Options::get_options();
		if ( ! $options['recaptcha_enabled'] ) {
			return;
		}
		$token = sanitize_text_field( filter_input( INPUT_POST, 'g-recaptcha-response', FILTER_DEFAULT ) );
		if ( ! $token ) {
			wp_die( esc_html__( 'Could not verify reCAPTCHA.', 'comment-edit-pro' ) );
		}
		$secret_key = $options['recaptcha_secret_key'];
		$url        = 'https://www.google.com/recaptcha/api/siteverify';
		$data       = array(
			'secret'   => $secret_key,
			'response' => $token,
		);
		$args       = array(
			'body'      => $data,
			'method'    => 'POST',
			'sslverify' => true,
		);
		$response   = wp_remote_post( esc_url( $url ), $args );
		if ( is_wp_error( $response ) ) {
			wp_die( esc_html__( 'reCAPTCHA could not be verified.', 'comment-edit-pro' ) );
		}
		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! $body['success'] ) {
			wp_die( esc_html__( 'reCAPTCHA security challenge has failed.', 'comment-edit-pro' ) );
		}

		// all is well. Check the threshold.
		$score_threshold         = (float) $options['recaptcha_score_threshold'];
		$comment_recaptcha_score = (float) $body['score'];
		if ( $comment_recaptcha_score < $score_threshold ) {
			wp_die( esc_html__( 'reCAPTCHA security challenge has failed.', 'comment-edit-pro' ) );
		}

		// Now silently exit as all is well now.
	}

	/**
	 * Add Google Recaptcha to the comment submit button.
	 *
	 * @param array $args Comment defaults.
	 */
	public function add_recaptcha_css_class( $args ) {
		$args['class_submit'] .= ' g-recaptcha';
		$args['name_submit']   = 'sce-recaptcha-submit';
		$args['id_submit']     = 'sce-recaptcha-submit';

		return $args;
	}

	/**
	 * Print recaptcha scripts to the front-end.
	 */
	public function print_recaptcha_scripts() {
		$options                            = Options::get_options();
		$comment_form_id                    = $options['recaptcha_comment_form_id'];
		$recaptcha_comment_submit_button_id = $options['recaptcha_comment_submit_button_id'];
		if ( (bool) $options['recaptcha_enabled'] && $comment_form_id ) {
			?>
			<script>
				var sceCommentSubmitButton = document.getElementById( '<?php echo esc_js( 'sce-recaptcha-submit' ); ?>' );
				if ( null !== sceCommentSubmitButton ) {
					sceCommentSubmitButton.addEventListener( 'click', function( event ) {
						sceCommentSubmit( event );
					} );
			}
			function sceCommentSubmit( e ) {
				e.preventDefault();
				grecaptcha.ready(function() {
				grecaptcha.execute('<?php echo esc_js( $options['recaptcha_site_key'] ); ?>', {action: 'submit'}).then(function(token) {
					let recaptchaForm = document.getElementById('<?php echo esc_js( $comment_form_id ); ?>');
					if ( null !== recaptchaForm ) {
						var recaptchaInput = document.createElement('input');
						recaptchaInput.setAttribute('type', 'hidden');
						recaptchaInput.setAttribute('name', 'g-recaptcha-response');
						recaptchaInput.setAttribute('value', token);
						recaptchaForm.appendChild(recaptchaInput);
						recaptchaForm.submit();
					}
				});
				});
			};
			</script>
			<?php
		}
	}

	/**
	 * Modify the comment submit button.
	 *
	 * @param string $submit_button The comment submit button.
	 * @param array  $args          The comment form arguments.
	 *
	 * @return string The modified comment submit button.
	 */
	public function modify_comment_submit_button( $submit_button, $args ) {
		$options                    = Options::get_options();
		$recaptcha_site_key         = $options['recaptcha_site_key'];
		$recaptcha_submit_button_id = $options['recaptcha_comment_submit_button_id'];

		if ( ! empty( $recaptcha_site_key ) && $options['recaptcha_enabled'] ) {
			$submit_button = str_replace( 'type="submit"', 'type="button"', $submit_button );
			$submit_button = str_replace( 'id="' . esc_attr( $recaptcha_submit_button_id ) . '"', 'id="sce-recaptcha-submit"', $submit_button );
			return $submit_button;
		}
		return $submit_button;
	}

	/**
	 * Defer the recaptcha scripts.
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @param string $src    The script source.
	 *
	 * @return string The script tag.
	 */
	public function defer_scripts( $tag, $handle, $src ) {
		$scripts_to_defer = array(
			'sce-recaptcha',
		);
		if ( in_array( $handle, $scripts_to_defer, true ) ) {
			return str_replace( ' src', ' defer="defer" src', $tag );
		}
		return $tag;
	}

	/**
	 * Load recaptcha if enabled and comments are open.
	 */
	public function enqueue_recaptcha_scripts() {
		$options = Options::get_options();

		if ( (bool) $options['recaptcha_enabled'] ) {
			wp_enqueue_script(
				'sce-recaptcha',
				esc_url_raw( 'https://www.google.com/recaptcha/api.js?render=' . sanitize_text_field( $options['recaptcha_site_key'] ) ),
				array(),
				Functions::get_plugin_version(),
				true
			);
		}
	}

	/**
	 * Get recaptcha options.
	 */
	public function ajax_get_recaptcha_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-retrieve-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		$options    = Options::get_options();
		$json_array = array(
			'recaptchaEnabled'               => (bool) $options['recaptcha_enabled'],
			'recaptchaSiteKey'               => $options['recaptcha_site_key'],
			'recaptchaSecretKey'             => $options['recaptcha_secret_key'],
			'recaptchaLoggedInUsersEnabled'  => (bool) $options['recaptcha_logged_in_users_enabled'],
			'recaptchaCommentFormId'         => $options['recaptcha_comment_form_id'],
			'recaptchaCommentSubmitButtonId' => $options['recaptcha_comment_submit_button_id'],
			'recaptchaScoreThreshold'        => (float) $options['recaptcha_score_threshold'],
		);

		// Exit gracefully.
		wp_send_json_success( $json_array );
	}

	/**
	 * Save ajax_save_recaptcha_options options.
	 */
	public function ajax_save_recaptcha_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Security.
		if ( ! wp_verify_nonce( $nonce, 'sce-save-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Nonce passed, let's get post vars.
		$recaptcha_enabled                  = (bool) filter_input( INPUT_POST, 'recaptchaEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_site_key                 = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSiteKey', FILTER_DEFAULT ) );
		$recaptcha_secret_key               = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaSecretKey', FILTER_DEFAULT ) );
		$recaptcha_logged_in_users_enabled  = (bool) filter_input( INPUT_POST, 'recaptchaLoggedInUsersEnabled', FILTER_VALIDATE_BOOLEAN );
		$recaptcha_comment_form_id          = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentFormId', FILTER_DEFAULT ) );
		$recaptcha_comment_submit_button_id = sanitize_text_field( filter_input( INPUT_POST, 'recaptchaCommentSubmitButtonId', FILTER_DEFAULT ) );
		$recaptcha_score_threshold          = (float) filter_input( INPUT_POST, 'recaptchaScoreThreshold', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION );

		// Now let's save options.
		$options_to_save = array(
			'recaptcha_enabled'                  => $recaptcha_enabled,
			'recaptcha_site_key'                 => $recaptcha_site_key,
			'recaptcha_secret_key'               => $recaptcha_secret_key,
			'recaptcha_logged_in_users_enabled'  => $recaptcha_logged_in_users_enabled,
			'recaptcha_comment_form_id'          => $recaptcha_comment_form_id,
			'recaptcha_comment_submit_button_id' => $recaptcha_comment_submit_button_id,
			'recaptcha_score_threshold'          => $recaptcha_score_threshold,
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
	public function ajax_reset_recaptcha_options() {
		// Security.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'sce-reset-integrations-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'comment-edit-pro' ),
				)
			);
		}

		// Clear options.
		Options::update_options(
			array(
				'recaptcha_enabled'                  => false,
				'recaptcha_site_key'                 => '',
				'recaptcha_secret_key'               => '',
				'recaptcha_logged_in_users_enabled'  => true,
				'recaptcha_comment_form_id'          => 'commentform',
				'recaptcha_comment_submit_button_id' => 'submit',
				'recaptcha_score_threshold'          => 0.5,
			)
		);

		wp_send_json_success(
			array(
				'message' => __( 'Recaptcha options have been reset to defaults.', 'comment-edit-pro' ),
			)
		);

	}
}
