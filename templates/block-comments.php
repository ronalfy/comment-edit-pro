<?php
/**
 * Template for Deleting Post Comments from the frontend.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Templates;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Options;
use CommentEditPro\Includes\Functions;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}
$comment_id = filter_input( INPUT_GET, 'cid', FILTER_SANITIZE_NUMBER_INT ); // phpcs:ignore
$nonce      = filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT );
if ( ! wp_verify_nonce( $nonce, 'sce-moderation-block-comment-' . $comment_id ) ) {
	die( 'Nonce verification failed' );
}
if ( ! current_user_can( 'moderate_comments' ) ) {
	die( 'User must be able to moderate comments' );
}
wp_register_style(
	'sce-frontend-editing-css',
	Functions::get_plugin_url( '/dist/sce-frontend-editing.css' ),
	array(),
	Functions::get_plugin_version(),
	'all'
);
wp_register_script(
	'sce-block-comments-js',
	Functions::get_plugin_url( '/dist/block-comments-view.js' ),
	array(),
	Functions::get_plugin_version(),
	false
);
wp_localize_script(
	'sce-block-comments-js',
	'sceBlockComments',
	array(
		'nonce'              => wp_create_nonce( 'sce-moderation-block-comment-' . $comment_id ),
		'ajaxurl'            => admin_url( 'admin-ajax.php' ),
		'commentId'          => $comment_id,
		'commentAuthorIp'    => get_comment_author_IP( $comment_id ),
		'commentAuthorEmail' => get_comment_author_email( $comment_id ),
		'commentAuthorUrl'   => get_comment_author_url( $comment_id ),
		'commentAuthorName'  => get_comment_author( $comment_id ),
	)
);
?>
<html>
	<head>
		<?php
		wp_print_styles(
			array(
				'sce-frontend-editing-css',
			)
		);
		?>
	</head>
	<body>
		<div class="sce-wrapper sce-wrapper-delete-post-comments" style="height: auto; overflow: hidden">
			<div id="sce-block-comments"></div>
		</div>
		<?php
		wp_print_scripts(
			array(
				'sce-block-comments-js',
			)
		);
		?>
	</body>
</html>
