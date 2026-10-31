import React, { useState, Suspense, useContext } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAsyncResource } from 'use-async-resource';
import classNames from 'classnames';

import {
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';
import sendCommand from '../../../SendCommand';
import AvatarsContext from './Context';
import Notice from '../../components/Notice';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import ErrorBoundary from '../../components/ErrorBoundary';

const retrieveGravatarOptions = () => {
	return sendCommand( 'sce_get_gravatar_options', {
		nonce: sceAvatars.get_nonce,
	} );
};

const GravatarProtection = ( props ) => {
	const [ defaults ] = useAsyncResource( retrieveGravatarOptions, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Gravatar Protection Settings.', 'comment-edit-pro' ) }
				</p>
			}
		>
			<Suspense
				fallback={
					<>
						<h2>{ __( 'Gravatar Privacy Protection', 'comment-edit-pro' ) }</h2>
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

		</ErrorBoundary>

	);
};

const Interface = ( props ) => {
	const { avatarsEnabled, setAvatarsEnabled } = useContext( AvatarsContext );
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );

	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm( {
			defaultValues: {
				enableGravatarProtection: data.enableGravatarProtection,
				gravatarProtectionText: data.gravatarProtectionText,
			},
		} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_gravatar_options', {
			nonce: sceAvatars.save_nonce,
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

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const getGravatarProtectionToggle = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Gravatar Privacy', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="enableGravatarProtection"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<ToggleControl
									label={ __( 'Enable Gravatar Privacy Protection', 'comment-edit-pro' ) }
									className="sce-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										//setShowButtonOptions( boolValue );
										onChange( boolValue );
									} }
									help={ __(
										'Enable to allow users to opt-out of showing their Gravatar.',
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

	const getGravatarLabel = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Gravatar Privacy Label', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="gravatarProtectionText"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Privacy Label', 'comment-edit-pro' ) }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.signUpLabel?.type,
									'is-required': true,
								} ) }
								aria-required="true"
								help={ __(
									'This text will be shown in the comment section when a user leaves a comment.',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
					{ 'required' === errors.gravatarProtectionText?.type && (
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
		return __( 'Save Gravatar Privacy Options', 'quotes-dlx' );
	};

	return (
		<>
			<h2>{ __( 'Gravatar Privacy Protection', 'comment-edit-pro' ) }</h2>
			<p className="description">
				{ __( 'Gravatars show up for a user based on their email address. Enabling Privacy Protection will allow a user to opt-out of showing their Gravatar.', 'comment-edit-pro' ) }
			</p>
			{ avatarsEnabled && (
				<Notice
					message={ __(
						'Comment Avatars are enabled. Gravatar Privacy Protection will not work if Comment Avatars are enabled and will be ignored.',
						'comment-edit-pro'
					) }
					status="info"
					politeness="polite"
				/>
			) }
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						{ getGravatarProtectionToggle() }
						{ getGravatarLabel() }
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
export default GravatarProtection;
