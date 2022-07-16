// Pre-load all the avatar images.
window.addEventListener('load', function (event) {
	let imageHtml = '';
	// Todo: Offload to new file.
	const avatars = sceAvatars.avatars;
	function preload() {
		avatars.forEach( ( avatarData, index ) => {
			const image = new Image();
			image.src = avatarData.avatar_url;
			image.alt = 'Avatar';
			image.width = 128;
			image.height = 128;
			image['data-key'] = avatarData.avatar_key;

			// Set scoped imageHtml string with all images.
			imageHtml += `<img class="sce-inline-avatar" src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}" data-key="${image['data-key']}" />`;
		} );

		imageHtml += `<div class="sce-avatar-form-modal-close"><div class="sce-avatar-form-modal-close-x"></div><div class="sce-avatar-form-modal-close-x"></div></div>`;
		
		const sceAvatarPlaceholder = document.getElementById( 'sce-avatars' );
		sceAvatarPlaceholder.innerHTML = imageHtml;
	}
	preload(avatars);

	// Function for toggling interface.
	const toggleModalState = () => {
		const avatarsModal = document.querySelector( '#sce-avatar-form-modal-wrapper' );
		avatarsModal.classList.remove( 'sce-comment-form-hidden' );
		if ( avatarsModal.classList.contains( 'sce-avatar-open' ) ) {
			avatarsModal.classList.remove( 'sce-avatar-open' );
			avatarsModal.classList.add( 'sce-avatar-closed' );
			return;
		}
		avatarsModal.classList.remove( 'sce-avatar-closed' );
		avatarsModal.classList.add( 'sce-avatar-open' );
	}

	// Avatar click arguments.
	const avatarWrapper = document.querySelector( '.comment-form-sce-avatar .sce-avatar img' );
	avatarWrapper.addEventListener( 'click', ( e ) => {
		toggleModalState();
	} );
	
	// Avatar modal - Todo = offload to new file.
	// Credit: https://codepen.io/rebelchris/pen/MWyyLXR
	const modalWrapper = document.querySelector( '#sce-avatar-form-modal' );
	modalWrapper.setAttribute( 'height', '0' );
	modalWrapper.setAttribute( 'height', '0' );
	modalWrapper.classList.add( 'sce-comment-form-hidden' );
	modalWrapper.setAttribute( 'aria-hidden', 'true' );
	modalWrapper.innerHTML = imageHtml;
	modalWrapper.querySelectorAll(".sce-inline-avatar").forEach(avatar => { 
		avatar.addEventListener( 'click', ( e ) => {
			const filename = e.target.getAttribute( 'data-key' );
			const imgUrl = e.target.getAttribute( 'src' );

			// Get the current avatar image.
			const currentAvatar = document.querySelector( '.comment-form-sce-avatar img.avatar' );
			currentAvatar.setAttribute( 'src', imgUrl );
		} );
	 } );

	 // Close button.
	 const closeButton = modalWrapper.querySelector( '.sce-avatar-form-modal-close' );
	 closeButton.addEventListener( 'click', ( e ) => {
			toggleModalState();
		});
	 
	// avatarWrapper.querySelector( '.sce-avatar' ).addEventListener( 'click', ( event ) => {
	// 	event.preventDefault();

	// 	console.log( 'test' );
		
		
	// 	// modal.classList.add("open");
	// 	// const modalExit = document.querySelector(".sce-modal-exit");

	// 	// modalExit.addEventListener( 'click', ( event ) => {
	// 	// 	event.preventDefault();
	// 	// 	modal.classList.remove('open');
	// 	// } );
	// } );

	// modals.forEach(function (trigger) {
	// trigger.addEventListener("click", function (event) {
	// 	event.preventDefault();
	// 	const modal = document.getElementById(trigger.dataset.modal);
	// 	modal.classList.add("open");
	// 	const exits = modal.querySelectorAll(".modal-exit");
	// 	exits.forEach(function (exit) {
	// 	exit.addEventListener("click", function (event) {
	// 		event.preventDefault();
	// 		modal.classList.remove("open");
	// 	});
	// 	});
	// });
	// });

});
