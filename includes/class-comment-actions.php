<?php
/**
 * Helper fuctions.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

/**
 * Class Actions
 */
class Comment_Actions {

	/**
	 * Class runner
	 */
	public function run() {
		add_filter( 'comment_text', array( $this, 'add_action_gear_icon' ), 1000, 2 );
	}

	/**
	 * Add the contextual menu for the comment.
	 */
	public function add_action_gear_icon( $content, $comment = false ) {
		ob_start();
		?>
		<div class="sce-actions-gear">
			gear
		</div>
		<?php
		$content = $content . ob_get_clean();
		return $content;
	}


	/**
	 * Retrieve a list of avatar filenames for the avatars functionality.
	 * Decided to use pngs vs SVGs as pngs were significantly lighter.
	 *
	 * @return array List of filenames.
	 */
	public static function get_avatar_filenames() {
		// Original file can be found im /images/avatars.
		$json = '["circle-flat-icons-01","circle-flat-icons-02","circle-flat-icons-03","circle-flat-icons-04","circle-flat-icons-05","circle-flat-icons-06","circle-flat-icons-07","circle-flat-icons-08","circle-flat-icons-09","circle-flat-icons-10","circle-flat-icons-11","circle-flat-icons-12","circle-flat-icons-13","circle-flat-icons-14","circle-flat-icons-15","circle-flat-icons-16","circle-flat-icons-17","circle-flat-icons-18","circle-flat-icons-19","circle-flat-icons-20","circle-flat-icons-21","circle-flat-icons-22","circle-flat-icons-23","circle-flat-icons-24","circle-flat-icons-25","circle-flat-icons-26","circle-flat-icons-27","circle-flat-icons-28","circle-flat-icons-29","circle-flat-icons-30","circle-flat-icons-31","circle-flat-icons-32","circle-flat-icons-33","circle-flat-icons-34","circle-flat-icons-35","circle-flat-icons-36","circle-flat-icons-37","circle-flat-icons-38","circle-flat-icons-39","circle-flat-icons-40","circle-flat-icons-41","circle-flat-icons-42","circle-flat-icons-43","circle-flat-icons-44","circle-flat-icons-45"]';
		return json_decode( $json );
	}
}
