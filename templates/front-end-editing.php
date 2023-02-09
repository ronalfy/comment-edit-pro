<?php
/**
 * Template for front-end editing.
 *
 * @package CommentEditPro
 */

namespace CommentEditPro\Templates;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use CommentEditPro\Includes\Options as Options;
use CommentEditPro\Includes\Functions as Functions;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
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
	'sce-frontend-editing-js',
	Functions::get_plugin_url( '/js/front-end-editing.js' ),
	array( 'jquery' ),
	COMMENTEDITPRO_VERSION,
	false
);
wp_localize_script(
	'sce-frontend-editing-js',
	'sce_frontend',
	array(
		'saving'   => __( 'Saving...', 'comment-edit-pro' ),
		'save'     => __( 'Save', 'comment-edit-pro' ),
		'saved'    => __( 'Comment Has Been Saved', 'comment-edit-pro' ),
		'deleting' => __( 'Deleting...', 'comment-edit-pro' ),
		'deleted'  => __( 'Comment Has Been Deleted', 'comment-edit-pro' ),
		'ajaxurl'  => admin_url( 'admin-ajax.php' ),
	)
);
$sce_comment        = get_comment( $comment_id );
$comment_author     = $this->format_comment_text( $sce_comment->comment_author );
$comment_email      = $sce_comment->comment_author_email;
$comment_content    = $this->format_comment_text( $sce_comment->comment_content );
$comment_url        = $sce_comment->comment_author_url;
$sce_comment_status = $sce_comment->comment_approved;
$sce_admin_edit_url = add_query_arg(
	array(
		'action' => 'editcomment',
		'c'      => $comment_id,
	),
	admin_url( 'comment.php' )
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
		wp_print_scripts(
			array(
				'sce-frontend-editing-js',
			)
		);
		?>
	</head>
	<body>
		<div class="sce-wrapper" style="height: auto; overflow: hidden">
			<h1><?php esc_html_e( 'Comment Editing', 'comment-edit-pro' ); ?> <span class="sce-headling-admin-shortcut">(<a href="<?php echo esc_url( $sce_admin_edit_url ); ?>" target="_blank"><?php esc_html_e( 'View in Admin', 'comment-edit-pro' ); ?></a>)</span></h1>
			<form>
				<div class="sce-form-group-grid">
					<div class="sce-form-group-grid-row">
						<label for="sce-name"><?php esc_html_e( 'Name', 'comment-edit-pro' ); ?></label>
						<input type="text" value="<?php echo esc_attr( $comment_author ); ?>" class="form-input-text" id="sce-name" placeholder="<?php esc_html_e( 'Enter a name', 'comment-edit-pro' ); ?>">
					</div>
					<div class="sce-form-group-grid-row">
						<label for="sce-email"><?php esc_html_e( 'Email', 'comment-edit-pro' ); ?></label>
						<input type="text" value="<?php echo esc_attr( $comment_email ); ?>" class="form-control" id="sce-email" placeholder="<?php esc_html_e( 'Enter an email address', 'comment-edit-pro' ); ?>">
					</div>
					<div class="sce-form-group-grid-row">
						<label for="sce-url"><?php esc_html_e( 'URL', 'comment-edit-pro' ); ?></label>
						<input type="text" value="<?php echo esc_attr( esc_url_raw( $comment_url ) ); ?>" class="form-control" id="sce-url" placeholder="<?php esc_html_e( 'Enter a URL', 'comment-edit-pro' ); ?>">
					</div>
					<div class="sce-form-group-grid-row sce-has-textarea">
						<label for="sce-content"><?php esc_html_e( 'Comment', 'comment-edit-pro' ); ?></label>
						<textarea class="form-control" rows="5" id="sce-content"><?php echo wp_kses_post( $comment_content ); ?></textarea>
					</div>
					<div class="sce-form-group-grid-row">
						<label for="sce-comment"><?php esc_html_e( 'Comment Status', 'comment-edit-pro' ); ?></label>
						<div class="sce-radio-group-grid">
							<div class="sce-radio-group-grid-row">
								<input class="form-check-input" type="radio" name="status" id="status-approved" value="1" <?php checked( 1, $sce_comment_status ); ?>>
								<label class="form-check-label" for="status-approved">
									<?php esc_html_e( 'Approved', 'comment-edit-pro' ); ?>
								</label>
							</div>
							<div class="sce-radio-group-grid-row">
								<input class="form-check-input" type="radio" name="status" id="status-pending" value="0" <?php checked( 0, $sce_comment_status ); ?>>
								<label class="form-check-label" for="status-pending">
									<?php esc_html_e( 'Pending', 'comment-edit-pro' ); ?>
								</label>
							</div>
							<div class="sce-radio-group-grid-row">
								<input class="form-check-input" type="radio" name="status" id="status-spam" value="spam" <?php checked( 'spam', $sce_comment_status ); ?>>
								<label class="form-check-label" for="status-spam">
									<?php esc_html_e( 'Spam', 'comment-edit-pro' ); ?>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="sce-form-button-grid">
					<input type="hidden" id="sce-comment-id" value="<?php echo esc_attr( $comment_id ); ?>" />
					<?php
					wp_nonce_field( 'sce-modify-comment-' . $comment_id, 'sce_nonce' );
					?>
					<div class="sce-form-button-grid-items">
						<button type="submit" class="sce-save-comment sce-button sce-button-save"><?php esc_html_e( 'Save Comment', 'comment-edit-pro' ); ?></button>
						<button class="sce-close sce-button sce-button-info"><?php esc_html_e( 'Close', 'comment-edit-pro' ); ?></button>
						<div class="empty-div"></div>
						<button type="submit" class="sce-delete-comment sce-button sce-button-delete"><?php esc_html_e( 'Delete Comment', 'comment-edit-pro' ); ?></button>
					</div>
				</div>
			</form>
		</div>
	</body>
</html>
