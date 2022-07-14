window.addEventListener('load', function (event) {
	const avatars = sceAvatars.avatars;
	function preload() {
		avatars.forEach( ( avatar, index ) => {
			const image = new Image();
			new Image().src = avatar;
		} );
	}
	preload(avatars);
});
