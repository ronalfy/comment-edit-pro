<?php

/**
 * Helper fuctions for Webhooks tab.
 *
 * @package SCE
 */

namespace CommentEditPro\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Functions as Functions;
use CommentEditPro\Includes\Options as Options;

/**
 * Class WP_Rocket
 */
class WP_Rocket {


	/**
	 * Class runner.
	 */
	public function run() {

		// Clear WP Rocket cache when comment is posted.
		if ( function_exists( 'rocket_clean_post' ) ) {
			add_action( 'comment_post', array( $this, 'clear_wp_rocket_cache' ), 10, 2 );
		}
	}

	/**
	 * Clear Rocket cache when approved/moderated comments show.
	 *
	 * @param int   $comment_id       Comment ID.
	 * @param mixed $comment_approved Comment object.
	 */
	public function clear_wp_rocket_cache( $comment_id, $comment_approved ) {
		if ( 'spam' === $comment_approved ) {
			return;
		}

		// Get comment.
		$comment = get_comment( $comment_id );

		// Get post ID.
		$post_id = $comment->comment_post_ID;

		// Now clear rocket cache.
		\rocket_clean_post( $post_id );
	}
}
