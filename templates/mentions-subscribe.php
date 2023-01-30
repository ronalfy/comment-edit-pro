<?php
/**
 * Template inclusion file template.
 *
 * @package email-for-file
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'you are way off' );
}
?>
<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">

		<title><?php echo esc_html__( 'Subscription Successful', 'comment-edit-pro' ); ?></title>
		<?php
		/**
		 * Add scripts to print in the header on the subscibe.
		 *
		 * @since 1.0.0
		 * @param array  Script handles to output.
		 * @param string Theme name.
		 */
		$script_header_handles = apply_filters( 'sce_mentions_subscribe_scripts_header', array(), $sce_mentions_theme_name );
		if ( ! is_array( $script_header_handles ) ) {
			$script_header_handles = array();
		}
		wp_print_scripts( $script_header_handles );
		do_action( 'sce_mentions_subscribe_after_scripts', $sce_mentions_theme_name );

		/**
		 * Add styles to print in the header on the lock screen.
		 *
		 * @since 1.0.0
		 * @param array  Style handles to output.
		 * @param string Theme name.
		 */
		$style_header_handles = apply_filters( 'sce_mentions_subscribe_styles_header', array(), $sce_mentions_theme_name );
		if ( ! is_array( $style_header_handles ) ) {
			$style_header_handles = array();
		}
		wp_print_styles( $style_header_handles );
		do_action( 'sce_mentions_subscribe_after_styles', $sce_mentions_theme_name );
		?>
	</head>
	<body>
		<?php do_action( 'sce_mentions_subscribe_body_open' ); ?>
		<section id="sce-mentions-subscribe-wrapper">
			<main>
				<?php do_action( 'sce_mentions_subscribe_body' ); ?>
			</main>
		</section>
		<?php
		/**
		 * Add scripts to print on the subscribe in the footer.
		 *
		 * @since 1.0.0
		 * @param array  Script handles to output.
		 * @param string Theme name.
		 */
		$script_footer_handles = apply_filters( 'sce_mentions_subscribe_scripts_footer', array(), $eff_theme_name );
		if ( ! is_array( $script_footer_handles ) ) {
			$script_footer_handles = array();
		}
		wp_print_scripts( $script_footer_handles );
		?>
	</body>
</html>
