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

const Avatars = () => {
	const [ avatarsEnabled, setAvatarsEnabled ] = useState( false );
	const [ avatarSize, setAvatarSize ] = useState( 90 );

	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm( {
			defaultValues: {
				enableAvatars: false,
				avatarSize: 90,
				enableAvatarsLoggedIn: true,
				enableAvatarsAnonymous: true,
			},
		} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		console.log( formData );
	};

	const getAvatarWidth = () => {
		return (
			<tr>
				<th scope="row">
					{ __( 'Avatar Size', 'comment-edit-pro' ) }
				</th>
				<td>
					<Controller
						name="avatarSize"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<RangeControl
									label={ __(
										'Set Avatar Size',
										'comment-edit-pro'
									) }
									step={ 2 }
									value={ value }
									max={ 128 }
									min={ 24 }
									currentInput={ 50 }
									initialPosition={ 50 }
									allowReset={ true }
									className="sce-admin__range-control"
									onChange={ ( avatarSizeValue ) => {
										setAvatarSize( avatarSizeValue );
										onChange( avatarSizeValue );
									} }
									help={ __(
										'Set the Width of the Avatars.',
										'comment-edit-pro'
									) }
								/>
								<img className="sce-admin__avatar-preview" src={ sceAvatars.preview_avatar } width={ value } height={ value } alt={ __( 'Preview avatar', 'comment-edit-pro' ) } />
							</>
						) }
					/>
				</td>
			</tr>

		);
	};

	const getAvatarPermissions = () => {
		return (
			<tr>
				<th scope="row">
					{ __( 'Avatar Permissions', 'comment-edit-pro' ) }
				</th>
				<td>
					<Controller
						name="enableAvatarsLoggedIn"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __(
										'Logged-in Users',
										'comment-edit-pro'
									) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										//setShowButtonOptions( boolValue );
										onChange( boolValue );
									} }
									help={ __(
										'Allow avatars for logged-in users.',
										'comment-edit-pro'
									) }
								/>
							</>
						) }
					/>
					<Controller
						name="enableAvatarsAnonymous"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __(
										'Anonymous Users',
										'comment-edit-pro'
									) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										//setShowButtonOptions( boolValue );
										onChange( boolValue );
									} }
									help={ __(
										'Allow avatars for non-logged-in (Anonymous) users.',
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
			<h2>{ __( 'Comment Avatars', 'comment-edit-pro' ) }</h2>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">
								{ __( 'Avatars', 'comment-edit-pro' ) }
							</th>
							<td>
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
							</td>
						</tr>
						{ getAvatarPermissions() }
						{ getAvatarWidth() }
					</tbody>
				</table>
			</form>
		</>
	);
};
export default Avatars;
