/**
 * Turnstile JS functionality.
 */

/**
 * This is the main callback for Cloudflare.
 */
window.sceInitTurnstile = () => {
	// Get submit button.
	const submitButton = document.getElementById( 'sce-turnstile-submit' );
	if ( null === submitButton ) {
		return;
	}

	// Now get the main form.
	const commentForm = submitButton.closest( 'form' );
	if ( null === commentForm ) {
		return;
	}

	// We have the form. Now get the textarea.
	const commentFormTextarea = commentForm.querySelector( 'textarea ' );
	if ( null === commentFormTextarea ) {
		return;
	}

	// Check that turnstile is present.
	if ( typeof turnstile === 'undefined' ) {
		return;
	}

	/**
	 * This is the callback for when the user has filled out the textarea.
	 * We wait until the textarea is filled out to load turnstile to avoid the 300 second timeout of the token.
	 */
	const turnstileBeginRender = () => {
		// Remove the event listener immediately.
		commentFormTextarea.removeEventListener( 'input', turnstileBeginRender );

		// Now init turnstile.
		const widgetId = turnstile.render( '#sce-turnstile', {
			sitekey: sceTurnstileLocal.sitekey,
			callback: ( token ) => {
				console.log( token );
			},
			size: sceTurnstileLocal.size,
			theme: sceTurnstileLocal.theme,
			language: sceTurnstileLocal.language,
		} );
		console.log( widgetId );
	};

	// Set up the textarea event. Only load turnstile if the user has begun filling out the textarea.
	commentFormTextarea.addEventListener( 'input', turnstileBeginRender );
};
