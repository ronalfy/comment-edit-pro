import Tribute from 'tributejs';

window.onload = () => {
	const tribute = new Tribute( {
		values: sceMentions.values,
		selectTemplate: ( item ) => {
			const commentForm = document.getElementById( '#comment' );
			if ( null !== commentForm ) {
				commentForm.append( `<input type="hidden" name="mentions[]" value="${ item.original.key }">`);
			}
			console.log( item  );
			return '@' + 'doh';
		},
	} );

	// Initialize tribute.
	const commentForm = document.getElementById( 'comment' );
	if ( null !== commentForm ) {
		tribute.attach( commentForm );
	}
};
