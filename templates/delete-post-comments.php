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

$post_id = filter_input( INPUT_GET, 'post_id', FILTER_SANITIZE_NUMBER_INT ); // phpcs:ignore
$nonce   = filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT );
if ( ! wp_verify_nonce( $nonce, 'sce_shortcut_delete_comments' . $post_id ) ) {
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
$delete_comments_asset = require Functions::get_plugin_dir( 'dist/delete-post-comments-view.asset.php' );
wp_register_script(
	'sce-delete-post-comments-js',
	Functions::get_plugin_url( 'dist/delete-post-comments-view.js' ),
	$delete_comments_asset['dependencies'],
	$delete_comments_asset['version'],
	true
);
wp_localize_script(
	'sce-delete-post-comments-js',
	'sceDeletePostComments',
	array(
		'nonce'   => wp_create_nonce( 'sce-delete-post-comments' . $post_id ),
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'postId'  => $post_id,
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
			<div id="sce-post-delete-comments"></div>
		</div>
		<?php
		wp_print_scripts(
			array(
				'sce-delete-post-comments-js',
			)
		);
		?>
	</body>
</html>
