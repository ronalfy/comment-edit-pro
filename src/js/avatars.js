/* eslint-disable no-unused-vars */
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
			imageHtml += `<img class="sce-inline-avatar" src="${ image.src }" alt="${ image.alt }" width="${ image.width }" height="${ image.height }" data-key="${ image[ 'data-key' ] }" />`;
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
	avatarWrapper.addEventListener( 'click', ( e ) => {
		toggleModalState();
	} );

	// Avatar modal - Actions to run for when the modal is visible.
	// Credit: https://codepen.io/rebelchris/pen/MWyyLXR
	const modalWrapper = document.querySelector( '#sce-avatar-form-modal' );
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
			const commentFormInput = document.querySelector( '#sce-comment-form-avatar' );
			commentFormInput.setAttribute( 'value', filename );
			currentAvatar.setAttribute( 'src', imgUrl );
		} );
	} );

	// Close button.
	const closeButton = modalWrapper.querySelector(
		'.sce-avatar-form-modal-close'
	);
	closeButton.addEventListener( 'click', ( e ) => {
		toggleModalState();
	} );

	window.sceAvatars = ( event, commentId, userId, postId, nonce ) => {

		// From: https://stackoverflow.com/a/28222246
		const getOffset = ( el ) => {
			const rect = el.getBoundingClientRect();
			return {
			  left: rect.left + window.scrollX,
			  top: rect.top + window.scrollY
			};
		}

		// Check to see if wrapper is already visible.
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
		const popoverCloseButton = wrapper.querySelector( '.sce-avatar-form-modal-close' );
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
			popoverAvatars.forEach( ( popoverAvatar ) => {
				// Each time a popover avatar is clicked, change the source of the original avatar.
				popoverAvatar.addEventListener( 'click', ( e ) => {
					const dataCommentId = wrapper.getAttribute( 'data-comment-id' );
					const commentAvatar = document.querySelector( '.sce-popover-comment-id-' + dataCommentId );
					if ( null !== commentAvatar ) {
						const imgUrl = popoverAvatar.getAttribute( 'src' );
						commentAvatar.setAttribute( 'src', imgUrl );

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
