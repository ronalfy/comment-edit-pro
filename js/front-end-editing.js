jQuery( document ).ready( function( $ ) {
	$('.sce-save-comment').on('click', function( e ) {
		e.preventDefault();
		var nonce = $( '#sce_nonce' ).val();
		var comment_id = $( '#sce-comment-id' ).val();
		var comment_content = $.trim( $( '#sce-content' ).val() );
		var comment_name = $.trim( $( '#sce-name' ).val() );
		var comment_email = $.trim( $( '#sce-email' ).val() );
		var comment_url = $.trim( $( '#sce-url' ).val() );
		var status = $( 'input[name="status"]:checked' ).val();
		var rating = $( '#sce-rating-' + comment_id ).val();
		$( this ).html( sce_frontend.saving ).prop( 'disabled', 'disabled' );
		$.post( sce_frontend.ajaxurl, { action: 'sce_frontend_save_comment', comment_id: comment_id, nonce: nonce, content: comment_content, name: comment_name, email: comment_email, url: comment_url, status: status, rating: rating }, function( response ) {
			if ( 'spam' === status ) {
				window.parent.jQuery( '#comment-' + comment_id ).fadeOut( 'slow' );
			} else {
				window.parent.jQuery( '#sce-front-end-comment-' + comment_id + ' .sce-front-end-comment-content').html( response.data.comment );
				var $comment = window.parent.jQuery( '#comment-' + comment_id );
				$comment.find( '.comment-author-link' ).html( comment_name );
				var $starRating = $comment.find( '.star-rating span' );
				if ( $starRating.length ) {

					// Assign ratings to the star string represented by width.
					$starRating.css( { width: ( rating * 20 ) + '%' } );

					// Update data param.
					const commentFormRating = $comment.find( '.comment-form-rating' );
					commentFormRating.data( 'selected-rating', rating );
				}
			}
			window.parent.jQuery.fancybox.close();
		} );
	} );
	$('.sce-delete-comment').on('click', function( e ) {
		e.preventDefault();
		var nonce = $( '#sce_nonce' ).val();
		var comment_id = $( '#sce-comment-id' ).val();
		$( this ).html( sce_frontend.deleting ).prop( 'disabled', 'disabled' );
		$.post( sce_frontend.ajaxurl, { action: 'sce_frontend_delete_comment', comment_id: comment_id, nonce: nonce }, function( response ) {
			window.parent.jQuery( '#comment-' + comment_id ).fadeOut( 'slow' );
			window.parent.jQuery.fancybox.close();
		} );
	} );
	$('.sce-close').on('click', function( e ) {
		e.preventDefault();
		window.parent.jQuery.fancybox.close();
	} );

	// If jQuery is enabled, hook into WooCommerce ratings.
	jQuery( '.comment-form-rating select' )
		.hide()
		.before(
			'<p class="stars">\
					<span>\
						<a class="star-1" href="#">1</a>\
						<a class="star-2" href="#">2</a>\
						<a class="star-3" href="#">3</a>\
						<a class="star-4" href="#">4</a>\
						<a class="star-5" href="#">5</a>\
					</span>\
				</p>'
	);
	// Select the right star.
	const $dataStarRating = jQuery( '.comment-form-rating' );
	const starRating = $dataStarRating.data( 'selected-rating' );
	const $stars = jQuery( $dataStarRating ).find( '.stars' );
	$stars.find( 'a' ).removeClass( 'active' );
	$stars.addClass( 'selected' );
	$stars.find( '.star-' + starRating ).addClass( 'active' );

	/**
	 * When someone selects a star, update the select field and add the active class.
	 */
	jQuery( 'body' ).on( 'click', '.comment-form-rating p.stars a', function( e ) {
		e.preventDefault();
		const $star = jQuery( this ),
			$rating 	= jQuery( this ).closest( '.comment-form-rating' ).find( 'select' ),
			$container 	= jQuery( this ).closest( '.stars' );

		// Update the select option selected.
		$rating.find( 'option:selected' ).removeAttr( 'selected' );
		$rating.val( $star.text() + '' );
		$star.siblings( 'a' ).removeClass( 'active' );
		$star.addClass( 'active' );
		$container.addClass( 'selected' );
		return false;
	} );
} );