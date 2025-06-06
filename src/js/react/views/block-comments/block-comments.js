import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useForm, Controller } from 'react-hook-form';
import sendCommand from '../../../SendCommand';

const BlockComments = () => {
	const [ isSaving, setIsSaving ] = useState( false );
	// Initialize React Hook Form.
	const { handleSubmit, control } = useForm( {
		defaultValues: {
			name: false,
			ip: false,
			email: true, // This will be checked by default
			url: false,
		},
	} );

	// Get localized values from window.sceBlockComments.
	const blockOptions = [
		{
			key: 'name',
			label: __( 'Block by Name', 'comment-edit-pro' ),
			value: window.sceBlockComments?.commentAuthorName || '',
		},
		{
			key: 'ip',
			label: __( 'Block by IP', 'comment-edit-pro' ),
			value: window.sceBlockComments?.commentAuthorIp || '',
		},
		{
			key: 'email',
			label: __( 'Block by Email', 'comment-edit-pro' ),
			value: window.sceBlockComments?.commentAuthorEmail || '',
		},
		{
			key: 'url',
			label: __( 'Block by URL', 'comment-edit-pro' ),
			value: window.sceBlockComments?.commentAuthorUrl || '',
		},
	];

	// Handle form submission.
	const onSubmit = ( data ) => {
		setIsSaving( true );
		// Prepare AJAX data.
		const ajaxData = {
			cid: window.sceBlockComments?.commentId,
			nonce: window.sceBlockComments?.nonce,
			...data,
		};
		// Send command to block comments.
		sendCommand( 'sce_block_comment', ajaxData, window.sceBlockComments?.ajaxurl ).then( function( response ) {
			if ( response.data.success ) {
				window.parent.jQuery.fancybox.close();
				window.parent.jQuery( '#comment-' + window.sceBlockComments?.commentId ).fadeOut( 'slow' ); // hide comment.
			}
		} ).finally( () => {
			setIsSaving( false );
		} );
	};

	return (
		<>
			<h1>
				{ __( 'Block This Comment', 'comment-edit-pro' ) }
			</h1>
			<p>
				{ __( 'The comment will be deleted. Please check the items below to be added to the disallow list.', 'comment-edit-pro' ) }
			</p>
			<form className="sce-block-comments-form" onSubmit={ handleSubmit( onSubmit ) }>
				<div className="sce-block-comments-options">
					{ blockOptions.map( ( option ) => {
						if ( ! option.value ) {
							return null;
						}
						return (
							<div className="sce-block-comments-option" key={ option.key }>
								<Controller
									name={ option.key }
									control={ control }
									render={ ( { field } ) => (
										<label htmlFor={ `block-by-${ option.key }` }>
											<input
												id={ `block-by-${ option.key }` }
												type="checkbox"
												{ ...field }
												checked={ ! ! field.value }
												disabled={ isSaving }
											/>
											{ option.label }: <span className="sce-block-comments-value">{ option.value }</span>
										</label>
									) }
								/>
							</div>
						);
					} ) }
				</div>
				<button type="submit" disabled={ isSaving }>
					{ isSaving ? __( 'Blocking…', 'comment-edit-pro' ) : __( 'Delete and Block Comment', 'comment-edit-pro' ) }
				</button>
			</form>
		</>
	);
};
export default BlockComments;
