/* eslint-disable no-unused-vars */
import sendCommand from './SendCommand';

// Pre-load all the avatar images.
window.addEventListener( 'load', function( event ) {
	let imageHtml = '';
	// Todo: Offload to new file.
	const avatars = sceAvatars.avatars;

	/**
	 * Get all the pngs and pre-load in the footer.
	 */
	function preload() {
		// eslint-disable-next-line no-unused-vars
		avatars.forEach( ( avatarData, index ) => {
			const image = new Image();
			image.src = avatarData.avatar_url;
			image.alt = 'Avatar';
			image.width = 128;
			image.height = 128;
			image[ 'data-key' ] = avatarData.avatar_key;

			// Set scoped imageHtml string with all images.
			imageHtml += `<a href="#" aria-label="Select an Avatar" onClick="window.sce_avatars_stop_propagation( event );"><img class="sce-inline-avatar" src="${ image.src }" alt="${ image.alt }" width="${ image.width }" height="${ image.height }" data-key="${ image[ 'data-key' ] }" /></a>`;
		} );

		// This is the close button for the avatar popup.
		imageHtml += `<div class="sce-avatar-form-modal-close"><div class="sce-avatar-form-modal-close-x"></div><div class="sce-avatar-form-modal-close-x"></div></div>`;

		const sceAvatarPlaceholder = document.getElementById( 'sce-avatars' );
		sceAvatarPlaceholder.innerHTML = imageHtml;
	}

	// Run after doc has finished loading. Preloads all the png files.
	preload( avatars );

	// Function for toggling interface.
	const toggleModalState = () => {
		const avatarsModal = document.querySelector(
			'#sce-avatar-form-modal-wrapper'
		);
		avatarsModal.classList.remove( 'sce-comment-form-hidden' );
		if ( avatarsModal.classList.contains( 'sce-avatar-open' ) ) {
			avatarsModal.classList.remove( 'sce-avatar-open' );
			avatarsModal.classList.add( 'sce-avatar-closed' );
			return;
		}
		avatarsModal.classList.remove( 'sce-avatar-closed' );
		avatarsModal.classList.add( 'sce-avatar-open' );
	};

	// This runs when someone clicks on the avatar image.
	const avatarWrapper = document.querySelector(
		'.comment-form-sce-avatar .sce-avatar img'
	);
	if ( null !== avatarWrapper ) {
		avatarWrapper.addEventListener( 'click', ( e ) => {
			toggleModalState();
		} );
	}

	// Avatar modal - Actions to run for when the modal is visible.
	// Credit: https://codepen.io/rebelchris/pen/MWyyLXR
	const modalWrapper = document.querySelector( '#sce-avatar-form-modal' );
	if ( null !== modalWrapper ) {
		modalWrapper.setAttribute( 'height', '0' );
		modalWrapper.setAttribute( 'height', '0' );
		modalWrapper.classList.add( 'sce-comment-form-hidden' );
		modalWrapper.setAttribute( 'aria-hidden', 'true' );
		modalWrapper.innerHTML = imageHtml;
		modalWrapper.querySelectorAll( '.sce-inline-avatar' ).forEach( ( avatar ) => {
			avatar.addEventListener( 'click', ( e ) => {
				const filename = e.target.getAttribute( 'data-key' );
				const imgUrl = e.target.getAttribute( 'src' );

				// Get the current avatar image.
				const currentAvatar = document.querySelector(
					'.comment-form-sce-avatar img.avatar'
				);
				const commentFormInput = document.querySelector(
					'#sce-comment-form-avatar'
				);
				commentFormInput.setAttribute( 'value', filename );
				currentAvatar.setAttribute( 'src', imgUrl );
				toggleModalState();
			} );
		} );

		// Close button.
		const closeButton = modalWrapper.querySelector(
			'.sce-avatar-form-modal-close'
		);
		closeButton.addEventListener( 'click', ( e ) => {
			toggleModalState();
		} );
	}

	// An anchor is shown around the avatar, so this stops the anchor event from triggering.
	window.sce_avatars_stop_propagation = ( anchorEvent ) => {
		anchorEvent.preventDefault();
		anchorEvent.stopPropagation();

		const parentAnchor = anchorEvent.target;
		if ( null !== parentAnchor ) {
			const childOfAnchor = parentAnchor.querySelector( 'img' );
			if ( null !== childOfAnchor ) {
				childOfAnchor.click();
			}
		}
	};

	// This global function is executed when someone clicks on their avatar.
	window.sce_avatars = ( event, commentId, userId, postId, nonce ) => {
		// From: https://stackoverflow.com/a/28222246
		const getOffset = ( el ) => {
			const rect = el.getBoundingClientRect();
			return {
				left: rect.left + window.scrollX,
				top: rect.top + window.scrollY,
			};
		};

		// Check to see if wrapper is already visible. Hide if so.
		const maybeWrapper = document.querySelector( '.sce-avatar-popover-wrapper' );
		if ( null !== maybeWrapper ) {
			maybeWrapper.classList.add( 'sce-avatar-closed' );
			setTimeout( () => {
				maybeWrapper.remove(); // CSS delay is 0.4s. Let's remove the node after.
			}, 600 );
			return;
		}

		// Remove all existing popovers.
		const avatarPopovers = document.querySelectorAll( '.sce-avatars-popover' );
		if ( null !== avatarPopovers ) {
			avatarPopovers.forEach( ( popover ) => {
				popover.remove();
			} );
		}

		// Get wrapper for avatar container.
		const avatarsContainer = document.getElementById( 'sce-avatars' );
		const avatarsClone = avatarsContainer.cloneNode( true );
		avatarsClone.id = 'sce-avatars-' + commentId;
		avatarsClone.classList.add( 'sce-avatars-popover' );
		avatarsClone.style.display = '';

		// Get x,y height position.
		const wrapper_x = getOffset( event.target ).left + 60; // Need an option for this.
		const wrapper_y = getOffset( event.target ).top; // Need an option for this.

		// Append to the avatars container.
		const wrapper = document.createElement( 'div' );
		wrapper.classList.add( 'sce-avatar-popover-wrapper' );
		wrapper.style.left = wrapper_x + 'px';
		wrapper.style.top = wrapper_y + 'px';
		wrapper.style.position = 'absolute';

		// Append a wrapper inside the wrapper for relative positioning.
		const wrapperInner = document.createElement( 'div' );
		wrapperInner.classList.add( 'sce-avatar-popover-inner' );

		// Add comment ID to wrapper.
		wrapper.setAttribute( 'data-comment-id', commentId );
		//wrapper.attributes.

		// Add interface inside inner wrapper.
		wrapperInner.appendChild( avatarsClone );

		// Now append to the wrapper.
		wrapper.appendChild( wrapperInner );

		// Finally, display to dom.
		avatarsContainer.after( wrapper );

		// Add event for close button.
		const popoverCloseButton = wrapper.querySelector(
			'.sce-avatar-form-modal-close'
		);
		if ( null !== popoverCloseButton ) {
			popoverCloseButton.addEventListener( 'click', ( e ) => {
				wrapper.classList.add( 'sce-avatar-closed' );
				this.setTimeout( () => {
					wrapper.remove(); // CSS delay is 0.4s. Let's remove the node after.
				}, 600 );
			} );
		}

		// Add events for avatar selection.
		const popoverAvatars = wrapper.querySelectorAll( '.sce-inline-avatar' );
		if ( null !== popoverAvatars ) {
			popoverAvatars.forEach( ( popoverAvatar, index ) => {
				if ( 0 === index ) {
					popoverAvatar.parentNode.focus();
				}
				// Each time a popover avatar is clicked, change the source of the original avatar.
				popoverAvatar.addEventListener( 'click', ( e ) => {
					const dataCommentId = wrapper.getAttribute( 'data-comment-id' );
					const commentAvatar = document.querySelector(
						'.sce-popover-comment-id-' + dataCommentId
					);
					if ( null !== commentAvatar ) {
						const imgUrl = popoverAvatar.getAttribute( 'src' );
						const imgKey = popoverAvatar.getAttribute( 'data-key' );

						// Hide the existig avatar.
						commentAvatar.classList.add( 'sce-popover-avatar-hidden' );

						// Replace with loading SVG.
						const loadingContainer = document.createElement( 'span' ); // todo , dynamic width/height.
						loadingContainer.style.display = 'inline-block';
						loadingContainer.classList.add( 'sce-popover-spinner' );
						loadingContainer.style.width = '50px'; // todo dynamnic width/height.
						loadingContainer.style.height = '50px';
						loadingContainer.innerHTML =
							'<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" class="sce-loading-avatar" viewBox="0 0 576 512"><path fill="currentColor" d="M320 96C320 113.7 305.7 128 288 128C270.3 128 256 113.7 256 96V32C256 14.33 270.3 0 288 0C305.7 0 320 14.33 320 32V96zM320 480C320 497.7 305.7 512 288 512C270.3 512 256 497.7 256 480V416C256 398.3 270.3 384 288 384C305.7 384 320 398.3 320 416V480zM32 256C32 238.3 46.33 224 64 224H128C145.7 224 160 238.3 160 256C160 273.7 145.7 288 128 288H64C46.33 288 32 273.7 32 256zM512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288H448C430.3 288 416 273.7 416 256C416 238.3 430.3 224 448 224H512zM106.1 74.98C119.5 62.49 139.7 62.49 152.2 74.98L197.5 120.2C209.1 132.7 209.1 152.1 197.5 165.5C184.1 177.1 164.7 177.1 152.2 165.5L106.1 120.2C94.48 107.7 94.48 87.48 106.1 74.98zM469 391.8C481.5 404.3 481.5 424.5 469 437C456.5 449.5 436.3 449.5 423.8 437L378.5 391.8C366 379.3 366 359 378.5 346.5C391 334 411.3 334 423.8 346.5L469 391.8zM106.1 437C94.48 424.5 94.48 404.3 106.1 391.8L152.2 346.5C164.7 334 184.1 334 197.5 346.5C209.1 359 209.1 379.3 197.5 391.8L152.2 437C139.7 449.5 119.5 449.5 106.1 437zM423.8 74.98C436.3 62.48 456.5 62.48 469 74.98C481.5 87.47 481.5 107.7 469 120.2L423.8 165.5C411.3 177.1 391 177.1 378.5 165.5C366 152.1 366 132.7 378.5 120.2L423.8 74.98z"/></svg>';
						commentAvatar.parentNode.prepend( loadingContainer );

						let ajaxErrors = true;
						// Do ajax request.
						sendCommand( 'sce_save_user_avatar', {
							comment_id: commentId,
							post_id: postId,
							user_id: userId,
							nonce,
							key: imgKey,
						} )
							.then( ( ajaxResponse ) => {
								const ajaxData = ajaxResponse.data.data;
								const ajaxSuccess = ajaxResponse.data.success;
								if ( ajaxSuccess ) {
									ajaxErrors = false;
									// Remove loading.
									loadingContainer.remove();
									// Set the comment avatar image src.
									commentAvatar.setAttribute( 'src', imgUrl );
									commentAvatar.classList.remove( 'sce-popover-avatar-hidden' );

									// Change all matching author comments to new image.
									ajaxData.forEach( ( ajaxCommentId, index ) => {
										const commentAvatarToReplace = document.querySelector(
											'img.sce-popover-comment-id-' + ajaxCommentId
										);
										if ( null !== commentAvatarToReplace ) {
											commentAvatarToReplace.setAttribute( 'src', imgUrl );
										}
									} );
								} else {
									// Error stuff.
								}
							} )
							.catch( ( ajaxResponse ) => {} )
							.then( ( ajaxResponse ) => {
								if ( ajaxErrors ) {
									const spinner = commentAvatar.parentNode.querySelector(
										'.sce-popover-spinner'
									);
									if ( null !== spinner ) {
										// Replace with loading SVG.
										const errorContainer = document.createElement( 'span' );
										errorContainer.style.display = 'inline-block';
										errorContainer.classList.add( 'sce-popover-error' );
										errorContainer.style.width = '25px'; // todo dynamnic width/height.
										errorContainer.style.height = '25x';
										errorContainer.innerHTML =
											'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>';
										spinner.replaceWith( errorContainer );
									}
								}
							} );

						// Hide popover as it's no longer needed.
						// This hides the popover when an avatar is clicked within the popover.
						wrapper.classList.add( 'sce-avatar-closed' );
						this.setTimeout( () => {
							wrapper.remove(); // CSS delay is 0.4s. Let's remove the node after.
						}, 600 );
					}
				} );
			} );
		}
	};
} );
