/**
 * Init fancybox for delete post comments link.
 */
window.addEventListener( 'load', function() {
	const deletePostCommentsLink = document.querySelector( '.sce-delete-post-comments a' );

	if ( null !== deletePostCommentsLink ) {
		// Init fancybox for link.
		deletePostCommentsLink.addEventListener( 'click', function( event ) {
			event.preventDefault();
			jQuery.fancybox.open( {
				src: event.target.href,
				type: 'iframe',
				width: '450px',
				baseClass: 'sce-fancybox-delete-post-comments',
			} );
		} );
	}
} );
