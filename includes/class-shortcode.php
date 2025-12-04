<?php

/**
 * Output a basic comment form as a shortcode.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Shortcode for WPAC.
 */
class Shortcode {

	/**
	 * Number of comment forms.
	 *
	 * @var int
	 */
	public static $num_comment_forms = 1;

	/**
	 * Class runner.
	 */
	public function run() {
		// Add shortcode.
		add_shortcode( 'sce_comment_form', array( $this, 'shortcode_comment_form' ) );
	}

	/**
	 * Output the comment form as a shortcode.
	 *
	 * @param array $atts Shortcode attributes. Example:
	 * array(
	 *  'comment_form_css_target' => '.comment-respond',
	 *  'hide_secondary_comment_forms' => true,
	 * ).
	 * Other attributes supported are: id_form, id_submit, class_container, class_form, class_submit, name_submit.
	 * @return string Comment form HTML.
	 */
	public function shortcode_comment_form( $atts ) {
		$default_atts = array(
			/* also support the following attributes: id_form, id_submit, class_container, class_form, class_submit, name_submit */
			'comment_form_css_target'      => '.comment-respond',
			'hide_secondary_comment_forms' => false,
		);
		$atts         = shortcode_atts( $default_atts, $atts, 'sce_comment_form' );
		$atts         = array_map( 'esc_attr', $atts );

		ob_start();
		comment_form( $atts, get_the_ID() );

		if ( (bool) $atts['hide_secondary_comment_forms'] ) {
			?>
			<style>
				<?php echo esc_attr( $atts['comment_form_css_target'] ); ?>:last-of-type {
					display: none;
				}
			</style>
			<?php
		}
		$comment_form = ob_get_clean();

		++self::$num_comment_forms;

		return $comment_form;
	}
}
