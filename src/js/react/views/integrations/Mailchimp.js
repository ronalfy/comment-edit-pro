/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';

import {
	TextControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';

const retrieveAvatarOptions = () => {
	return sendCommand( 'sce_get_mailchimp_options', {
		nonce: sceIntegrations.get_nonce,
	} );
};

const Mailchimp = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveAvatarOptions, [] );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'MailChimp', 'comment-edit-pro' ) }</h2>
					<BeatLoader
						color={ '#9c68b0' }
						loading={ true }
						cssOverride={ true }
						size={ 25 }
						speedMultiplier={ 0.65 }
					/>
				</>
			}
		>
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
				chooseAvatarText: data.chooseAvatarText,
				enableCustomAvatarSize: data.enableCustomAvatarSize,
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
			nonce: sceIntegrations.save_nonce,
			...formData,
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
				<th scope="row">{ __( 'Avatar Size', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="enableCustomAvatarSize"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __( 'Enable Avatar Custom Sizes', 'comment-edit-pro' ) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'By default, the theme typically chooses how large avatars are in the comment section. This will override the default size.',
										'comment-edit-pro'
									) }
								/>
							</>
						) }
					/>
					{ getValues( 'enableCustomAvatarSize' ) && (
						<Controller
							name="avatarSize"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<>
									<RangeControl
										label={ __( 'Set Avatar Size', 'comment-edit-pro' ) }
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
											'Set the Size of the Avatars.',
											'comment-edit-pro'
										) }
										trackColor="#8019c4"
										railColor="#dad4eb"
									/>
									<img
										className="sce-admin__avatar-preview"
										src={ sceIntegrations.preview_avatar }
										width={ value }
										height={ value }
										alt={ __( 'Preview avatar', 'comment-edit-pro' ) }
									/>
								</>
							) }
						/>
					) }
				</td>
			</tr>
		);
	};

	const getAvatarPermissions = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Avatar Permissions', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="enableAvatarsLoggedIn"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __( 'Logged-in Users', 'comment-edit-pro' ) }
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
									label={ __( 'Anonymous Users', 'comment-edit-pro' ) }
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

	const getAvatarLabel = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Labels', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="chooseAvatarText"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'Avatar Label', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'qdlx-admin__text-control', {
									'has-error': 'required' === errors.chooseAvatarText?.type,
									'is-required': true,
								} ) }
								placeholder="Choose an Avatar"
								help={ __(
									'When a user is not logged in, they will see this label before they submit their comment.',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.chooseAvatarText?.type && (
						<Notice
							message={ __( 'This field is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
				</td>
			</tr>
		);
	};

	const getSaveIcon = () => {
		if ( saving ) {
			return Spinner;
		}
		if ( isSaved ) {
			return ClipboardCheck;
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
			<h2>{ __( 'Custom Comment Avatars (Beta)', 'comment-edit-pro' ) }</h2>
			<p className="description">{ __( 'Spruce up your comment section and allow some fun and default avatars.', 'comment-edit-pro' ) }</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">{ __( 'Avatars', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="enableAvatars"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable Comment Avatars', 'comment-edit-pro' ) }
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
						{ getValues( 'enableAvatars' ) && (
							<>
								{ getAvatarPermissions() }
								{ getAvatarLabel() }
								{ getAvatarWidth() }
							</>
						) }
					</tbody>
				</table>
				<div className="sce-admin-buttons">
					<Button
						className={ classNames(
							'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right',
							{ 'has-error': hasErrors() },
							{ 'has-icon': saving || isSaved },
							{ 'is-saving': saving && ! isSaved },
							{ 'is-saved': isSaved }
						) }
						type="submit"
						text={ getSaveText() }
						icon={ getSaveIcon() }
						iconSize="18"
						iconPosition="right"
						disabled={ saving }
					/>
				</div>
				{ hasErrors() && (
					<Notice
						message={ __(
							'There are form validation errors. Please correct them above.',
							'comment-edit-pro'
						) }
						status="error"
						politeness="polite"
					/>
				) }
				{ isSaved && (
					<Notice
						message={ __( 'Your settings have been saved.', 'comment-edit-pro' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</>
	);
};
export default Mailchimp;
