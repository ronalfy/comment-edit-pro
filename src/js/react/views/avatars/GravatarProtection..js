import React, { useState } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __, sprintf } from '@wordpress/i18n';
import {
	TextControl,
	Button,
	ButtonGroup,
	RadioControl,
	FormTokenField,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const GravatarProtection = () => {
	const [ avatarsEnabled, setAvatarsEnabled ] = useState( false );
	const [ avatarSize, setAvatarSize ] = useState( 90 );

	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm( {
			defaultValues: {
				enableGravatars: true,
				enableGravatarProtection: false,
			},
		} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		console.log( formData );
	};

	const getGravatarPermissions = () => {
		return (
			<tr>
				<th scope="row">
					{ __( 'Gravatar Permissions', 'comment-edit-pro' ) }
				</th>
				<td>
					<Controller
						name="enableGravatarProtection"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __(
										'Gravatar Privacy',
										'comment-edit-pro'
									) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										//setShowButtonOptions( boolValue );
										onChange( boolValue );
									} }
									help={ __(
										'Enable a privacy checkbox when a user fills out a comment. By default, an avatar is attached to the user email. If enabled, the Avatar for the user will be disabled.',
										'comment-edit-pro'
									) }
								/>
							</>
						) }
					/>
				</td>
			</tr>

		);
	};

	const getGravatarEnabled = () => {
		return (
			<tr>
				<th scope="row">
					{ __( 'Enable Gravatars', 'comment-edit-pro' ) }
				</th>
				<td>
					<Controller
						name="enableGravatars"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __(
										'Enable Gravatars',
										'comment-edit-pro'
									) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										//setShowButtonOptions( boolValue );
										onChange( boolValue );
									} }
									help={ __(
										'Uncheck this to set Gravatars to an anonymous default.',
										'comment-edit-pro'
									) }
								/>
							</>
						) }
					/>
				</td>
			</tr>
		);
	};

	return (
		<>
			<h2>{ __( 'Gravatar Settings', 'comment-edit-pro' ) }</h2>
			<p className="description">
				{ __( 'Gravatars show up for a user based on their email address.', 'comment-edit-pro' ) }
			</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						{ getGravatarEnabled() }
						{ getGravatarPermissions() }
					</tbody>
				</table>
			</form>
		</>
	);
};
export default GravatarProtection;
