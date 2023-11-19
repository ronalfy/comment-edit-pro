const initCommentEditPro = ( $ ) => {
	// Get frontend comments menus.
	const sceFrontendCommentMenus = document.querySelectorAll( '.sce-meatball-menu' );
	if ( null !== sceFrontendCommentMenus && undefined !== sceFrontendCommentMenus ) {
		// Loop through comment menus and try to attach to comment LI.
		sceFrontendCommentMenus.forEach( function( sceFrontendCommentMenu ) {
			// Find closest LI.
			const sceFrontendCommentMenuLI = sceFrontendCommentMenu.closest( 'li' );

			// If no LI found, go ahead and show the menu.
			if ( null === sceFrontendCommentMenuLI || undefined === sceFrontendCommentMenuLI ) {
				sceFrontendCommentMenu.style.display = 'block';
			} else {
				// If LI found, move the menu into the LI at the top.
				sceFrontendCommentMenuLI.insertBefore( sceFrontendCommentMenu, sceFrontendCommentMenuLI.firstChild );

				// Set LI to position relative.
				sceFrontendCommentMenuLI.style.position = 'relative';
				sceFrontendCommentMenu.style.display = 'block';
			}
		} );
	}

	// Frontend menu actions.
	window.sceFrontendMenuAction = function( e ) {
		e.preventDefault();
		const anchor = e.target.closest( 'a' );
		const anchorHref = anchor.getAttribute( 'href' );
		const ajaxParams = wpAjax.unserialize( anchorHref );
		const originalText = anchor.querySelector( '.sce-meatball-menu-label' ).innerHTML;

		// Get comment status.
		const commentStatus = ajaxParams.status;
		// todo - after ajax call, update status.

		// Change to loading.
		const anchorSvg = anchor.querySelector( 'use' );
		const anchorText = anchor.querySelector( '.sce-meatball-menu-label' );
		if ( null !== anchorSvg && undefined !== anchorSvg ) {
			anchorSvg.setAttribute( 'xlink:href', '#sce-loading-icon' );
		}
		if ( null !== anchorText && undefined !== anchorText ) {
			anchorText.innerHTML = anchor.getAttribute( 'data-loading-text' );
		}

		// Set loading data attribute to LI.
		const anchorContainer = anchor.closest( 'li' );
		anchorContainer.setAttribute( 'data-loading', 'true' );

		$.post( anchorHref, { action: ajaxParams.action, comment_id: ajaxParams.cid, nonce: ajaxParams.nonce }, function( response ) {
			// Change to success text.
			if ( null !== anchorText && undefined !== anchorText ) {
				// Set finished loading text.
				anchorText.innerHTML = anchor.getAttribute( 'data-loading-done' );

				// Get the container and action type of the anchor and set SVG with current action icon (original icon).

				const anchorAction = anchorContainer.getAttribute( 'data-comment-action' );
				anchorSvg.setAttribute( 'xlink:href', '#sce-' + anchorAction + '-icon' );

				// Get the parent/parent container with the comment status.
				const commentStatusContainer = anchorContainer.closest( 'div.sce-meatball-menu' );

				// If approve, pending, spam, update the commentStatusContainer.
				switch ( anchorAction ) {
					case 'approve':
					case 'pending':
						setTimeout( function() {
							// Add fadeout class to container.
							jQuery( anchorContainer ).fadeOut( 1000, function() {
								commentStatusContainer.setAttribute( 'data-comment-status', anchorAction );
								// Update link label with original text.
								anchor.querySelector( '.sce-meatball-menu-label' ).innerHTML = originalText;

								// Remove loading data attribute from LI.
								anchorContainer.setAttribute( 'data-loading', 'false' );

								// jQuery's fadeout adds display: none to dom element. Remove it.
								jQuery( anchorContainer ).css( { display: '' } );
							} );
						}, 2500 );
						break;
					case 'spam':
					case 'trash':
						// Remove comment from dom.
						const comment_id = ajaxParams.cid;
						jQuery( commentStatusContainer.closest( 'div.comment' ) ).fadeOut( 'slow' ); // attempt to hide parent DIV.
						jQuery( commentStatusContainer.closest( 'li.comment' ) ).fadeOut( 'slow' ); // attempt to hide parent LI.
						jQuery( commentStatusContainer ).fadeOut( 'slow' ); // hide meatball menu.
						jQuery( '#comment-' + comment_id ).fadeOut( 'slow' ); // hide comment.
						break;
				}
			}
		}, 'json' );

		

		// const ajax_params = wpAjax.unserialize( e.target.url );
		// console.log( ajax_params );
	};

	const simplecommenteditingoptions = $.simplecommenteditingoptions = $.fn.simplecommenteditingoptions = function() {
		const $this = this;
		return this.each( function() {
			const ajax_url = $( this ).find( 'a:first' ).attr( 'href' );
			const ajax_params = wpAjax.unserialize( ajax_url );
			const element = this;
			jQuery( element ).on( 'sce.timer.loaded', function( e ) {
				if ( sce_options.show_stop_timer ) {
					$( element ).find( '.sce-timer' ).after( '<div class="sce-timer-cancel-wrapper"><button class="sce-timer-cancel">' + sce_options.stop_timer_svg + sce_options.stop_timer_text + '</button></div>' );
					$( element ).siblings( '.sce-textarea' ).find( ' .sce-timer' ).after( '<div class="sce-timer-cancel-wrapper"><button class="sce-timer-cancel">' + sce_options.stop_timer_svg + sce_options.stop_timer_text + '</button></div>' );
				}
			} );
			jQuery( element ).on( 'click', '.sce-timer-cancel', function( e ) {
				e.preventDefault();
				cancel_timer( element );
			} );
			jQuery( element ).siblings( '.sce-textarea' ).find( '.sce-timer' ).on( 'click', '.sce-timer-cancel', function( e ) {
				e.preventDefault();
				cancel_timer( element );
			} );
			function cancel_timer( element ) {
				$( element ).siblings( '.sce-textarea' ).off();
				$( element ).off();

				//Remove elements
				$( element ).parent().remove();

				$.post( ajax_url, { action: 'sce_stop_timer', comment_id: ajax_params.cid, post_id: ajax_params.pid, nonce: ajax_params._wpnonce }, function( response ) {
					// do nothing for now
				}, 'json' );
			}
		} );
	};
	$( '.sce-edit-button' ).simplecommenteditingoptions();
	// Check for third-party Fancybox.
	if ( typeof jQuery.fancybox !== 'undefined' ) {
		jQuery( '[data-sce-fancybox]' ).fancybox( {
			type: 'iframe',
			toolbar: true,
			smallBtn: true,
			iframe: {
				preload: true,
			},
			width: '80%',
			height: '80%',
		} );
	}
}

jQuery( document ).ready( function( $ ) {
	if ( typeof WPAC !== 'undefined' ) {
		const lazyLoadEnabled = WPAC._Options?.lazyLoadEnabled ?? false;
		if ( ! lazyLoadEnabled ) {
			initCommentEditPro( $ );
		} else {
			document.addEventListener( 'wpacAfterUpdateComments', () => {
				initCommentEditPro( $ );
			} );
		}
	} else {
		initCommentEditPro( $ );
	}
	
} );
function sce_get_comment( e ) {
	e.preventDefault();
	const $ = jQuery;
	$element = $( e.target );
	const url = wpAjax.unserialize( $element.attr( 'href' ) );
	$.post( $element.attr( 'href' ), { action: 'sce_get_moderation_comment', comment_id: url.comment_id, nonce: url.nonce }, function( response ) {
		const $wrapper_clone = $( '.sce-inline-interface-hidden:last' ).clone();
		$wrapper_clone.removeClass( 'sce-inline-interface-hidden' ).addClass( 'sce-inline-interface' );

		// Add name to wrapper
		$wrapper_clone.find( '.sce-inline-name' ).val( response.comment_author );

		// Add email to wrapper
		$wrapper_clone.find( '.sce-inline-email' ).val( response.comment_author_email );

		// Add URL to wrapper
		$wrapper_clone.find( '.sce-inline-url' ).val( response.comment_author_url );

		// Add Comment to wrapper
		$wrapper_clone.find( '.sce-inline-comment' ).val( response.comment_content );

		// Add comment status to wrapper
		const comment_status = response.comment_approved;
		if ( 1 == comment_status ) {
			$wrapper_clone.find( '.sce-inline-status-wrapper .approved' ).attr( 'checked', 'checked' );
		} else if ( 2 == comment_status ) {
			$wrapper_clone.find( '.sce-inline-status-wrapper .pending' ).attr( 'checked', 'checked' );
		} else {
			$wrapper_clone.find( '.sce-inline-status-wrapper .spam' ).attr( 'checked', 'checked' );
		}

		$wrapper_clone.find( 'button' ).attr( 'data-comment_id', url.comment_id );
		$wrapper_clone.find( 'button' ).attr( 'data-nonce', url.nonce );
		$wrapper_clone.appendTo( '#sce-comment' + url.comment_id );
	}, 'json' );
}
