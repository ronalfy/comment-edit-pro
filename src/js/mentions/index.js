import Tribute from 'tributejs';

window.onload = () => {
	const tribute = new Tribute( {
		values: sceMentions.values,
		selectTemplate: ( item ) => {
			const commentForm = document.getElementById( 'comment' );
			if ( null !== commentForm ) {
				// Create a hidden input to append to the comment form.
				const input = document.createElement( 'input' );
				input.setAttribute( 'type', 'hidden' );
				input.setAttribute( 'name', 'mentions[]' );
				input.setAttribute( 'value', item.original.value );

				commentForm.after( input );
			}
			return '@' + item.original.key;
		},
	} );

	// Initialize tribute.
	const commentForm = document.getElementById( 'comment' );
	if ( null !== commentForm ) {
		tribute.attach( commentForm );
	}
};
