const sce_ccc_init = function( $ ) {
	const textarea = $( '#respond textarea:first' );
	const comment_submit_button = $( '#respond input[type=submit]' ).prop( 'disabled', 'disabled' );
	let html = '<div class="sce-ccc-meter">';
	html += '<span></span>';
	html += '</div>';
	$( textarea ).after( html );
	sce_progress_bar( textarea, 'sce-ccc-meter', comment_submit_button );
	$( textarea ).keyup( function() {
		sce_progress_bar( this, 'sce-ccc-meter', comment_submit_button );
	} );
	$( 'body' ).on( 'sce.edit.show', function( event, sce_textarea, comment_id ) {
		const sce_submit_button = $( '#sce-edit-comment' + comment_id + ' button' ).prop( 'disabled', 'disabled' );
		let html = '<div class="sce-ccc-meter sce-ccc-meter-' + comment_id + '">';
		html += '<span></span>';
		html += '</div>';
		if ( $( '#sce-edit-comment' + comment_id + ' .sce-ccc-meter' ).length <= 0 ) {
			$( sce_textarea ).after( html );
		}
		sce_progress_bar( sce_textarea, 'sce-ccc-meter-' + comment_id, sce_submit_button );
		$( sce_textarea ).keyup( function() {
			sce_progress_bar( this, 'sce-ccc-meter-' + comment_id, sce_submit_button );
		} );
	} );
	function sce_progress_bar( sce_progress_bar_textarea, className, submit_button ) {
		const max = sce_ccc.max_length;
		const min = sce_ccc.min_length;
		const len = $( sce_progress_bar_textarea ).val().length;
		const width = len / max * 100;
		$( '.' + className + ' span' ).css( 'width', width + '%' );
		if ( len > min ) {
			$( '.' + className ).removeClass( 'sce-ccc-invalid' ).addClass( 'sce-ccc-valid' );
			$( submit_button ).removeAttr( 'disabled' );
		}
		if ( len > max || len < min ) {
			$( '.' + className ).removeClass( 'sce-ccc-valid' ).addClass( 'sce-ccc-invalid' );
			$( submit_button ).prop( 'disabled', 'disabled' );
		}
	}
};
jQuery( document ).ready( function( $ ) {
	sce_ccc_init( $ );
	document.addEventListener( 'wpacAfterUpdateComments', () => {
		sce_ccc_init( $ );
	} );
} );
