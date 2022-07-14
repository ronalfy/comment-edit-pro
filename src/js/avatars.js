window.addEventListener('load', function (event) {
	const avatars = sceAvatars.avatars;
	function preload() {
		let imageHtml = '';
		avatars.forEach( ( avatar, index ) => {
			const image = new Image();
			image.src = avatar;
			image.alt = 'Avatar';
			image.width = 128;
			image.height = 128;

			imageHtml += `<img class="sce-inline-avatar" src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}" />`;
		} );
		
		const sceAvatarPlaceholder = document.getElementById( 'sce-avatars' );
		sceAvatarPlaceholder.innerHTML = imageHtml;
	}
	preload(avatars);
});
