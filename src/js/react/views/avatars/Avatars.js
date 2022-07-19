import React, { useContext } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __, sprintf } from '@wordpress/i18n';
import {
	TextControl,
	Button,
	ButtonGroup,
	RadioControl,
	FormTokenField,
	ToggleControl,
} from '@wordpress/components';

const Avatars = () => {
	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm( {
			defaultValues: {
				enableAvatars: false,
			},
		} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		console.log( formData );
	};

	return (
		<>
			<h2>{ __( 'Comment Avatars', 'comment-edit-pro' ) }</h2>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<Controller
					name="enableAvatars"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __(
								'Enable Comment Avatars',
								'comment-edit-pro'
							) }
							className="sce-admin__toggle-control"
							checked={ value }
							onChange={ ( boolValue ) => {
								//setShowButtonOptions( boolValue );
								onChange( boolValue );
							} }
							help={ __(
								'Enable or Disable Comment Avatars.',
								'comment-edit-pro'
							) }
						/>
					) }
				/>
			</form>
		</>
	);
};
export default Avatars;
