import Tribute from 'tributejs';

window.onload = () => {
	const tribute = new Tribute( {
		values: sceMentions.values,
	} );

	// Initialize tribute.
	const commentForm = document.getElementById( 'comment' );
	if ( null !== commentForm ) {
		tribute.attach( commentForm );
	}
};
