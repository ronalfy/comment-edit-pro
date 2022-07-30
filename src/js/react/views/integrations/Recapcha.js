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
	RadioControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';

const retrieveRecaptchaSettings = () => {
	return sendCommand( 'sce_get_recaptcha_options', {
		nonce: sceIntegrations.get_nonce,
	} );
};

const Recaptcha = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveRecaptchaSettings, [] );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Recaptcha', 'comment-edit-pro' ) }</h2>
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
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		setError,
	} = useForm( {
		defaultValues: {
			recaptchaEnabled: data.recaptchaEnabled,
			recaptchaSiteKey: data.recaptchaSiteKey,
			recaptchaSecretKey: data.recaptchaSecretKey,
			recaptchaLoggedInUsersEnabled: data.recaptchaLoggedInUsersEnabled,
			recaptchaCommentFormId: data.recaptchaCommentFormId,
			recaptchaCommentSubmitButtonId: data.recaptchaCommentSubmitButtonId,
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
		sendCommand( 'sce_save_recaptcha_options', {
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
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const handleReset = () => {
		setResetting( true );
		sendCommand( 'sce_reset_recaptcha_options', {
			nonce: sceIntegrations.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( {
						recaptchaEnabled: false,
						recaptchaSiteKey: '',
						recaptchaSecretKey: '',
						recaptchaLoggedInUsersEnabled: true,
					} );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setResetting( false );
			} );
	};

	const getSiteKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Site Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaSiteKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'Recaptcha 3 Site Key', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'qdlx-admin__text-control', {
									'has-error': 'required' === errors.recaptchaSiteKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your Recaptcha 3 Site Key',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.recaptchaSiteKey?.type && (
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

	const getSecretKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Secret Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaSecretKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'Recaptcha 3 Secret Key', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'qdlx-admin__text-control', {
									'has-error': 'required' === errors.recaptchaSiteKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your Recaptcha 3 Secret Key',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.recaptchaSecretKey?.type && (
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

	const getCommentEntityIds = () => {
		return (
			<>
				<tr>
					<th scope="row">{ __( 'Comment Form ID', 'comment-edit-pro' ) }</th>
					<td>
						<Controller
							name="recaptchaCommentFormId"
							control={ control }
							rules={ { required: true } }
							render={ ( { field } ) => (
								<TextControl
									label={ __( 'Comment Form ID', 'quotes-dlx' ) }
									{ ...field }
									className={ classNames( 'qdlx-admin__text-control', {
										'has-error': 'required' === errors.recaptchaSiteKey?.type,
										'is-required': true,
									} ) }
									help={ __(
										'Enter the CSS/HTML ID for the comment form so Recaptcha can target the correct comment form.',
										'comment-edit-pro'
									) }
									aria-required="true"
								/>
							) }
						/>
						{ 'required' === errors.recaptchaCommentFormId?.type && (
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
				<tr>
					<th scope="row">{ __( 'Comment Submit Button ID', 'comment-edit-pro' ) }</th>
					<td>
						<Controller
							name="recaptchaCommentSubmitButtonId"
							control={ control }
							rules={ { required: true } }
							render={ ( { field } ) => (
								<TextControl
									label={ __( 'Submit Comment Button ID', 'quotes-dlx' ) }
									{ ...field }
									className={ classNames( 'qdlx-admin__text-control', {
										'has-error': 'required' === errors.recaptchaCommentSubmitButtonId?.type,
										'is-required': true,
									} ) }
									help={ __(
										'Enter the CSS/HTML ID for the comment form button so Recaptcha can target the correct button.',
										'comment-edit-pro'
									) }
									aria-required="true"
								/>
							) }
						/>
						{ 'required' === errors.recaptchaCommentSubmitButtonId?.type && (
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
			</>
		);
	};

	const getLoggedInToggle = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Logged-in Users', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaLoggedInUsersEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Recaptcha for Logged-in Users', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'You can exclude logged-in users from Recaptcha with this setting.',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
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
		return __( 'Save Recaptcha Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Disconnecting…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Disconnected', 'quotes-dlx' );
		}
		return __( 'Disconnect From Recaptcha', 'quotes-dlx' );
	};

	return (
		<>
			<h2>{ __( 'Recaptcha', 'comment-edit-pro' ) }</h2>
			<p className="description">
				{ __(
					'Using Recaptcha 3, you can further protect from bots and spam.',
					'comment-edit-pro'
				) }
			</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">{ __( 'Recaptcha', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="recaptchaEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable Recaptcha 3', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												onChange( boolValue );
											} }
											help={ __(
												'Enable or disable Recaptcha 3 support.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'recaptchaEnabled' ) && (
							<>
								{ getSiteKey() }
								{ getSecretKey() }
								{ getLoggedInToggle() }
								{ getCommentEntityIds() }
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
					{ getValues( 'recaptchaEnabled' ) && (
						<Button
							className={ classNames(
								'qdlx__btn qdlx__btn-danger qdlx__btn--icon-right',
								{ 'has-icon': resetting },
								{ 'is-resetting': { resetting } }
							) }
							type="button"
							text={ getResetText() }
							icon={ resetting ? Spinner : false }
							iconSize="18"
							iconPosition="right"
							disabled={ saving || resetting }
							onClick={ ( e ) => {
								setResetting( true );
								handleReset( e );
							} }
						/>
					) }
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
				{ isReset && (
					<Notice
						message={ __( 'Your settings have been reset.', 'comment-edit-pro' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</>
	);
};
export default Recaptcha;
