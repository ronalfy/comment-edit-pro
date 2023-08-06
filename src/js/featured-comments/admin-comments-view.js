/* eslint-disable no-unused-vars */
import sendCommand from '../SendCommand';

window.addEventListener( 'load', function( event ) {
	const featuredCommentButtons = document.querySelectorAll( '.sce-featured-comment-quick-action' );
	// Add click event to each button.

	const featuredCommentButtonClick = ( event ) => {
		event.preventDefault();

		const button = event.target;

			const commentId = button.getAttribute( 'data-comment-id' );
			const nonce = button.getAttribute( 'data-nonce' );

			// Get action from url.
			const url = new URL( button.href );
			const action = url.searchParams.get( 'action' );

			sendCommand( action, {
				action,
				comment_id: commentId,
				nonce
			}, ajaxurl ).then( function( response ) {
				if ( response.data.success ) {
					// Get parent container and duplicate.
					const parentContainer = button.parentNode;
					const newParentContainer = parentContainer.cloneNode( true );

					// Replace parent container with duplicate.
					parentContainer.parentNode.replaceChild( newParentContainer, parentContainer );

					// Remove old button from new container.
					const oldButton = newParentContainer.querySelector( '.sce-featured-comment-quick-action' );
					if ( null !== oldButton ) {
						oldButton.parentNode.removeChild( oldButton );
					}

					// Add new button from response html at end.
					newParentContainer.insertAdjacentHTML( 'beforeend', response.data.data.html );

					// Set up event for inserted button html.
					const newButton = newParentContainer.querySelector( '.sce-featured-comment-quick-action' );
					if ( null !== newButton ) {
						newButton.addEventListener( 'click', featuredCommentButtonClick );
					}
					

				}
			}
			);
	};
	featuredCommentButtons.forEach( function( button ) {
		button.addEventListener( 'click', featuredCommentButtonClick );
	} );
} );