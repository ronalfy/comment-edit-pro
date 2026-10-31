import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import sendCommand from '../../../SendCommand';

const COMMENTS_DELETED_PER_REQUEST = 30;

const PostDeleteComments = () => {
	const [ isConfirmDelete, setIsConfirmDelete ] = useState( false );
	const [ isConfirmDeletePermanently, setIsConfirmDeletePermanently ] = useState( false );
	const [ isDeleting, setIsDeleting ] = useState( false );
	const [ totalCommentsToDelete, setTotalCommentsToDelete ] = useState( 0 );
	const [ statusMessage, setStatusMessage ] = useState( __( 'Gathering comments for deletion.', 'comment-edit-pro' ) );
	const [ totalCommentsDeleted, setTotalCommentsDeleted ] = useState( 0 );

	const onDeleteRecursive = ( totalDeleted, totalToDelete ) => {
		const ajaxData = {
			post_id: sceDeletePostComments.postId,
			nonce: sceDeletePostComments.nonce,
			delete_total: COMMENTS_DELETED_PER_REQUEST,
			total_deleted_comments: totalDeleted,
			total_all_comments: totalToDelete,
			delete_permanently: isConfirmDeletePermanently,
		};
		sendCommand( 'sce_shortcut_delete_comments_delete_comments', ajaxData, sceDeletePostComments.ajaxurl ).then( ( response ) => {
			if ( response.data.success ) {
				const { data } = response.data;
				setStatusMessage( data.message );

				if ( data.more ) {
					setTotalCommentsDeleted( data.total_deleted_comments );
					onDeleteRecursive( data.total_deleted_comments, totalToDelete);
				} else {
					setTotalCommentsDeleted( totalToDelete );
					setStatusMessage( __( 'All comments deleted.', 'comment-edit-pro' ) );

					// Close iframe. Refresh post.
					window.parent.jQuery.fancybox.close();
					window.parent.location.reload();
				}
			}
		} );
	};
	const onSubmit = () => {
		const ajaxData = {
			post_id: sceDeletePostComments.postId,
			nonce: sceDeletePostComments.nonce,
		};
		sendCommand( 'sce_shortcut_delete_comments_get_comments', ajaxData, sceDeletePostComments.ajaxurl ).then( ( response ) => {
			if ( response.data.success ) {
				const { data } = response.data;
				setTotalCommentsToDelete( data.count );
				setStatusMessage( data.message );

				// Begin delete process.
				onDeleteRecursive( 0, data.count );
			}
		} );
	};
	return (
		<>
			<h1>
				{ __( 'Delete post comments', 'comment-edit-pro' ) }
			</h1>
			{ isDeleting && (
				<>
					<div className="sce-delete-comments-status">
						{ statusMessage }
					</div>
					<div className="sce-delete-comments-progress-bar">
						<div className="sce-delete-comments-progress-bar-inner" style={ { width: `${ ( totalCommentsDeleted / totalCommentsToDelete ) * 100 }%` } } />
						<div className="sce-delete-comments-progress-bar-label">
							{ totalCommentsDeleted } / { totalCommentsToDelete }
						</div>
					</div>
				</>
			) }
			{
				! isDeleting && (
					<form>
						<div className="sce-form-group-grid">
							<div className="sce-form-group-grid-row">
								<label htmlFor="sce-confirm-delete">
									<input
										type="checkbox"
										id="sce-confirm-delete"
										name="sce-confirm-delete"
										value="1"
										onClick={ () => {
											setIsConfirmDelete( ! isConfirmDelete );
										} }
									/>{ ' ' }
									{ __( 'Confirm Delete', 'comment-edit-pro' ) }
								</label>
								{ isConfirmDelete && (
									<>
										<label htmlFor="sce-confirm-delete-permanently">
											<input
												type="checkbox"
												id="sce-confirm-delete-permanently"
												name="sce-confirm-delete-permanently"
												value="1"
												onClick={ () => {
													setIsConfirmDeletePermanently( ! isConfirmDeletePermanently );
												} }
											/>{ ' ' }
											{ __( 'Delete Permanently', 'comment-edit-pro' ) }
										</label>
									</>
								) }
							</div>
						</div>
						<div className="sce-form-button-grid">
							<div className="sce-form-button-grid-items">
								{ isConfirmDelete && (
									<>
										<button
											type="submit"
											className="sce-delete-comment sce-button sce-button-delete"
											disabled={ ! isConfirmDelete || isDeleting }
											onClick={ ( e ) => {
												e.preventDefault();
												setIsDeleting( true );
												onSubmit();
											} }
										>
											{ __( 'Delete Comments', 'comment-edit-pro' ) }
										</button>
									</>
								) }
								{
									! isDeleting && (
										<>
											<button
												className="sce-close sce-button sce-button-info"
												onClick={ () => {
													window.parent.jQuery.fancybox.close();
												} }
											>
												{ __( 'Close', 'comment-edit-pro' ) }
											</button>
										</>
									)
								}
							</div>
						</div>
					</form>
				)
			}
			
		</>
	);
};
export default PostDeleteComments;
