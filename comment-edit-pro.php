<?php // phpcs:ignore
/* phpcs:ignore
Plugin Name: Comment Edit Pro
Plugin URI: https://dlxplugins.com/plugins/comment-edit-pro/
Description: Take comment editing to new heights.
Author: Ronald Huereca
Version: 3.9.1
Requires at least: 5.0
Author URI: https://dlxplugins.com/plugins/comment-edit-pro/
Contributors: DLX Plugins
Text Domain: comment-edit-pro
Domain Path: /languages
*/

namespace CommentEditPro;

require_once 'autoloader.php';

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;
use CommentEditPro\Includes\Plugin_Updater as Plugin_Updater;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}
define( 'COMMENTEDITPRO_VERSION', '3.9.1' );
define( 'COMMENTEDITPRO_TABLE_VERSION', '1.0.0' );
define( 'COMMENTEDITPRO_MENTIONS_TABLE_VERSION', '0.0.9' );
define( 'COMMENTEDITPRO_SLUG', plugin_basename( __FILE__ ) );
define( 'COMMENTEDITPRO_FILE', __FILE__ );
define( 'SCE_MIN_VERSION', '2.4.5' );

/**
 * Main Class.
 */
class Comment_Edit_Pro {


	/**
	 * Comment_Edit_Pro class instance.
	 *
	 * @var Comment_Edit_Pro Class instance.
	 */
	private static $instance = null;

	// Minimum PHP version required to run this plugin.
	const PHP_REQUIRED = '5.6';

	// Minimum WP version required to run this plugin.
	const WP_REQUIRED = '4.9.8';

	/**
	 * Get an instance of the class.
	 *
	 * @return Comment_Edit_Pro class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	} //end get_instance

	/**
	 * Class constructor.
	 *
	 * Set up internationalization, auto-loader, and plugin initialization.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function __construct() {
		$has_errors = false;

		// Check if PHP version is sufficient.
		if ( version_compare( PHP_VERSION, self::PHP_REQUIRED, '<' ) ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_insufficient_php' ) );
			if ( self::is_multisite() ) {
				add_action( 'network_admin_notices', array( $this, 'admin_notice_insufficient_php' ) );
			}
			$has_errors = true;
		}

		// Checks if WordPress version is sufficient.
		include ABSPATH . WPINC . '/version.php';
		if ( version_compare( $wp_version, self::WP_REQUIRED, '<' ) ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_insufficient_wp' ) );
			if ( Functions::is_multisite() ) {
				add_action( 'network_admin_notices', array( $this, 'admin_notice_insufficient_wp' ) );
			}
			$has_errors = true;
		}

		if ( ! $has_errors ) {
			add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 9 );
		}
	}

	/**
	 * Checks for PHP version.
	 *
	 * Checks if PHP version is sufficient.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_notice_insufficient_php() {
		$this->show_admin_warning(
			__( 'Higher PHP version required', 'comment-edit-pro' ),
			/* translators: %1$s is name of the plugin. */
			sprintf( __( 'The %1$s plugin requires %2$s version %3$s or higher - your current version is only %4$s.', 'comment-edit-pro' ), 'Comment Edit Pro', 'PHP', self::PHP_REQUIRED, PHP_VERSION ),
			'notice-error'
		);
	}

	/**
	 * Checks for WP version.
	 *
	 * Checks if WP version is sufficient.
	 *
	 * @since 1.0.3
	 * @access public
	 */
	public function admin_notice_insufficient_wp() {
		include ABSPATH . WPINC . '/version.php';
		$this->show_admin_warning(
			__( 'Higher WordPress version required', 'comment-edit-pro' ),
			/* translators: %1$s is name of the plugin. */
			sprintf( __( 'The %1$s plugin requires %2$s version %3$s or higher - your current version is only %4$s.', 'comment-edit-pro' ), 'Comment Edit Pro', 'WordPress', self::WP_REQUIRED, $wp_version ),
			'notice-error'
		);
	}

	/**
	 * Checks for SCE Options is installed.
	 *
	 * Checks for SCE Options is installed.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_notice_comment_edit_pro_installed() {
		$this->show_admin_warning(
			__( 'Simple Comment Editing Options is already installed.', 'comment-edit-pro' ),
			__( 'The Simple Comment Editing Options plugin needs to be disabled for Comment Edit Pro to run.', 'comment-edit-pro' ),
			'notice-error'
		);
	}

	/**
	 * Shows a dismissible warning notice admin dashboard
	 *
	 * @param string $title   Title of the warning message.
	 * @param string $message Warning message in detail.
	 * @param string $class   Style class name for warning.
	 */
	private function show_admin_warning( $title = '', $message = '', $class = 'notice-error' ) {
		?>
		<div class="notice is-dismissible <?php echo esc_attr( $class ); ?>">
			<p>
				<?php if ( ! empty( $title ) ) : ?>
					<strong>
						<?php echo wp_kses_post( $title ); ?>
					</strong>
				<?php endif; ?>
				<span>
					<?php echo wp_kses_post( $message ); ?>
				</span>
			</p>
		</div>
		<?php
	}

	/**
	 * Add scripts to SCE options front-end
	 *
	 * Add scriptss to SCE options front-end
	 *
	 * @since 1.0.4
	 * @access public
	 */
	public function add_scripts() {
		wp_enqueue_script( 'comment-edit-pro', plugins_url( '/js/simple-comment-editing-options.js', __FILE__ ), array( 'wp-hooks', 'simple-comment-editing', 'jquery', 'wp-ajax-response' ), COMMENTEDITPRO_VERSION, true );
		$options = Options::get_options();

		$show_stop_timer  = isset( $options['show_stop_timer'] ) ? $options['show_stop_timer'] : false;
		$stop_timer_text  = isset( $options['stop_timer_text'] ) ? $options['stop_timer_text'] : __( 'Cancel Timer', 'comment-edit-pro' );
		$timer_appearance = isset( $options['timer_appearance'] ) ? $options['timer_appearance'] : 'words';
		wp_localize_script(
			'sce-options',
			'sce_options',
			array(
				'show_stop_timer'     => $show_stop_timer,
				'stop_timer_text'     => $stop_timer_text,
				'stop_timer_svg'      => apply_filters( 'sce_button_extra_stop_timer', '' ),
				'timer_appearance'    => $timer_appearance,
				'comments_wrapper_id' => $options['comments_wrapper_id'],
				'comment_form_id'     => $options['comment_form_id'],
				'comment_submit_id'   => $options['comment_submit_id'],
				'comment_respond_id'  => $options['comment_respond_id'],
				'comment_textarea_id' => $options['comment_textarea_id'],
			)
		);
	}

	/**
	 * Add scripts to SCE options front-end
	 *
	 * Add scriptss to SCE options front-end
	 *
	 * @since 1.0.4
	 * @access public
	 */
	public function add_scripts_frontend() {
		if ( ! is_singular() && ! is_page() ) {
			return;
		}
		$options = Options::get_options();
		// Output JSON.
		$localized_vars = array(
			'comments_wrapper_id' => sanitize_text_field( $options['comments_wrapper_id'] ),
			'comment_form_id'     => sanitize_text_field( $options['comment_form_id'] ),
			'comment_submit_id'   => sanitize_text_field( $options['comment_submit_id'] ),
			'comment_respond_id'  => sanitize_text_field( $options['comment_respond_id'] ),
			'comment_textarea_id' => sanitize_text_field( $options['comment_textarea_id'] ),
		);
		?>
		<script>
			var sceFrontend = <?php echo wp_json_encode( $localized_vars ); ?>;
		</script>
		<?php
	}

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @return true if multisite, false if not.
	 */
	public static function is_plugin_activated_multisite() {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		if ( is_multisite() && is_plugin_active_for_network( COMMENTEDITPRO_SLUG ) && is_plugin_active_for_network( 'simple-comment-editing' ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $network_admin Check if in network admin.
	 *
	 * @return true if multisite, false if not.
	 */
	public function is_multisite( $network_admin = false ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$is_network_admin = false;
		if ( $network_admin ) {
			if ( is_network_admin() ) {
				if ( is_multisite() && is_plugin_active_for_network( COMMENTEDITPRO_SLUG ) ) {
					return true;
				}
			} else {
				return false;
			}
		}
		if ( is_multisite() && is_plugin_active_for_network( COMMENTEDITPRO_SLUG ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks for Simple Comment Editing.
	 *
	 * Checks if SCE is installed
	 *
	 * @since 1.0.0
	 * @access private
	 */
	public function is_sce_enabled() {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		if ( self::is_plugin_activated_multisite() ) {
			return true;
		} elseif ( is_network_admin() && is_plugin_active_for_network( 'comment-edit-pro' ) && ! is_plugin_active_for_network( 'simple-comment-editing' ) ) {
			return false;
		} elseif ( is_multisite() && ! self::is_plugin_activated_multisite() && class_exists( 'DLXPlugins\CommentEditLite\Simple_Comment_Editing' ) ) {
			return true;
		} elseif ( ! is_multisite() && class_exists( 'DLXPlugins\CommentEditLite\Simple_Comment_Editing' ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks for Simple Comment Editing Options (old version).
	 *
	 * Checks if SCE is installed
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function is_comment_edit_pro_enabled() {
		if ( class_exists( 'SCE_Options' ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Plugins have been loaded.
	 *
	 * Set up i18n, plugin options.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function plugins_loaded() {
		// Prevent double loading admin/classnames.
		add_filter( 'sce_show_admin', '__return_false' );

		// Check if SCE Options is installed.
		if ( $this->is_comment_edit_pro_enabled() ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_comment_edit_pro_installed' ) );
			if ( is_multisite() ) {
				add_action( 'network_admin_notices', array( $this, 'admin_notice_comment_edit_pro_installed' ) );
			}
			return;
		}

		if ( is_admin() ) {
			$this->admin = new \CommentEditPro\Includes\Admin();
		}
		$this->output           = new \CommentEditPro\Includes\Output();
		$this->frontend_editing = new \CommentEditPro\Includes\Frontend_Editing();
		$this->avatars          = new \CommentEditPro\Includes\Avatars();
		$this->avatars->run();
		$this->integrations = new \CommentEditPro\Includes\Integrations();
		$this->integrations->run();
		$this->comment_mentions = new \CommentEditPro\Includes\Mentions();
		$this->comment_mentions->run();
		$this->license_ajax = new \CommentEditPro\Includes\Plugin_License_Ajax();
		$this->license_ajax->run();
		$this->comment_editing = new \CommentEditPro\Includes\Comment_Editing();
		$this->comment_editing->run();
		$this->comment_form = new \CommentEditPro\Includes\Comment_Form();
		$this->comment_form->run();
		$this->comment_shortcuts = new \CommentEditPro\Includes\Comment_Shortcuts();
		$this->comment_shortcuts->run();
		$this->spam_protection = new \CommentEditPro\Includes\Spam_Protection();
		$this->spam_protection->run();
		$this->character_control = new \CommentEditPro\Includes\Character_Control();
		$this->character_control->run();
		$this->webhooks = new \CommentEditPro\Includes\Webhooks();
		$this->webhooks->run();
		$this->wprocket = new \CommentEditPro\Includes\WP_Rocket();
		$this->wprocket->run();
		$this->tools = new \CommentEditPro\Includes\Tools();
		$this->tools->run();
		$this->advanced = new \CommentEditPro\Includes\Advanced();
		$this->advanced->run();
		$this->selector_helper = new \CommentEditPro\Includes\Selector_Helper();
		$this->selector_helper->run();

		add_action( 'sce_scripts_loaded', array( $this, 'add_scripts' ) );
		add_action( 'wp_footer', array( $this, 'add_scripts_frontend' ) );

		add_action( 'init', array( $this, 'setup_ajax_calls' ) );

		// Auto Update class.
		add_action( 'admin_init', array( $this, 'sce_plugin_updater' ), 0 );

		// Load text domain.
		load_plugin_textdomain( 'comment-edit-pro', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	/**
	 * Allow for automatic updates.
	 *
	 * Allow for automatic updates.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function sce_plugin_updater() {
		$options = Options::get_options();

		$license_valid = $options['license_valid'] ?? '';
		if ( isset( $options['license'] ) && 'valid' === $license_valid ) {
			// setup the updater.
			$edd_updater = new Plugin_Updater(
				'https://dlxplugins.com',
				__FILE__,
				array(
					'version' => COMMENTEDITPRO_VERSION,
					'license' => $options['license'],
					'item_id' => 882,
					'author'  => 'Ronald Huereca',
					'beta'    => true,
					'url'     => home_url(),
				)
			);
		}
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
		add_action( 'wp_ajax_sce_restore_comment', array( $this, 'ajax_restore_comment' ) );
	}

	/**
	 * Restores a comment.
	 *
	 * Restores a comment.
	 *
	 * @since 1.0.7
	 * @access public
	 */
	public function ajax_restore_comment() { 		$nonce      = sanitize_text_field($_POST['nonce']); // phpcs:ignore
		$comment_id = absint($_POST['comment_id']); // phpcs:ignore
		$record_id  = absint($_POST['id']); // phpcs:ignore

		// Do a permissions check.
		if ( ! current_user_can( 'moderate_comments' ) ) {
			$return = array(
				'errors' => true,
			);
			wp_send_json( $return );
			exit;
		}

		// Verify nonce.
		if ( ! wp_verify_nonce( $nonce, 'restore-comment-' . $comment_id ) ) {
			$return = array(
				'errors' => true,
			);
			wp_send_json( $return );
			exit;
		}

		// Get record ID.
		global $wpdb;
		$tablename    = $wpdb->base_prefix . 'sce_comments';
		$query        = "select comment_content from $tablename where id = %d";
		$query        = $wpdb->prepare($query, $record_id); // phpcs:ignore
		$results      = $wpdb->get_row($query); // phpcs:ignore
		$comment_text = $results->comment_content;

		// Now update the comment.
		$comment_to_save                    = get_comment( $comment_id, ARRAY_A );
		$comment_to_save['comment_content'] = $comment_text;
		wp_update_comment( $comment_to_save );
		die( wp_kses_post( $comment_text ) );
	}
}
/**
 * Initializes plugin and returns main class instance
 *
 * @return Comment_Edit_Pro
 */
function comment_edit_pro() {
	return Comment_Edit_Pro::get_instance();
}
comment_edit_pro();


register_activation_hook( Functions::get_plugin_file(), __NAMESPACE__ . '\comment_edit_pro_plugin_activate' );
add_action( 'admin_init', __NAMESPACE__ . '\comment_edit_pro_plugin_activate_redirect' );

/**
 * Add an option upon activation to read in later when redirecting.
 */
function comment_edit_pro_plugin_activate() {
	if ( ! Functions::is_multisite( true ) ) {
		add_option( 'comment-edit-pro-activate', sanitize_text_field( Functions::get_plugin_file() ) );
	}
}

/**
 * Redirect to Comment Edit Lite settings page upon activation.
 */
function comment_edit_pro_plugin_activate_redirect() {
	// If on multisite, bail.
	if ( Functions::is_multisite( true ) ) {
		return;
	}

	// Make sure we're in the admin and that the option is available.
	if ( is_admin() && Functions::get_plugin_file() === get_option( 'comment-edit-pro-activate' ) ) {
		delete_option( 'comment-edit-pro-activate' );
		// GEt bulk activation variable if it exists.
		$maybe_multi = filter_input( INPUT_GET, 'activate-multi', FILTER_VALIDATE_BOOLEAN );

		// Skip debug.
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			return;
		}

		// Return early if it's a bulk activation.
		if ( $maybe_multi ) {
			return;
		}

		$settings_url = Functions::get_settings_url();
		wp_safe_redirect( esc_url( $settings_url ) );
		exit;
	}
}
