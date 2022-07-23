import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';

import {
	TextControl,
	Button,
	ButtonGroup,
	RadioControl,
	FormTokenField,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';

const retrieveAvatarOptions = () => {
	return sendCommand( 'sce_get_avatar_options', {
		nonce: sceAvatars.get_nonce,
	} );
};

const Avatars = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveAvatarOptions, [] );
	return (
		<Suspense fallback={ (
			<>
				<h2>{ __( 'Comment Avatars', 'comment-edit-pro' ) }</h2>
				<BeatLoader
					color={ '#9c68b0' }
					loading={ true }
					cssOverride={ true }
					size={ 25 }
					speedMultiplier={ 0.65 }
				/>
			</>
		) }>
			<Interface defaults={ defaults } { ...props } />
		</Suspense>
	);
};


const Interface = ( props ) => {
	const [ avatarsEnabled, setAvatarsEnabled ] = useState( false );
	const [ avatarSize, setAvatarSize ] = useState( 90 );
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );

	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm( {
			defaultValues: {
				enableAvatars: data.enableAvatars,
				avatarSize: data.avatarSize,
				enableAvatarsLoggedIn: data.enableAvatarsLoggedIn,
				enableAvatarsAnonymous: data.enableAvatarsAnonymous,
			},
		} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_avatar_options', {
			nonce: sceAvatars.save_nonce,
			...formData
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;

				if ( ajaxSuccess ) {
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// Error stuff.
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
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
									trackColor="#8019c4"
									railColor="#dad4eb"
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

	const getSaveIcon = () => {
		if ( saving ) {
			return ( Spinner );
		}
		if ( isSaved ) {
			return ( ClipboardCheck );
		}
		return false;
	};

	const getSaveText = () => {
		if ( saving ) {
			return __( 'Saving…', 'quotes-dlx' );
		}
		if ( isSaved ) {
			return __( 'Saved', 'quotes-dlx' );
		}
		return __( 'Save Avatar Options', 'quotes-dlx' );
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
				<div className="sce-admin-buttons">
					<Button
						className={ classNames(
							'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right',
							{ 'has-error': hasErrors() },
							{ 'has-icon': saving || isSaved },
							{ 'is-saving': ( saving && ! isSaved ) },
							{ 'is-saved': isSaved }
						) }
						type="submit"
						text={getSaveText() }
						icon={ getSaveIcon() }
						iconSize="18"
						iconPosition="right"
						disabled={ saving }
					/>
				</div>
			</form>
		</>
	);
};
export default Avatars;
