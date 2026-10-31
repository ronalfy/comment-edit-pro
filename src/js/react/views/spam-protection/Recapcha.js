/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect, useContext } from 'react';
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
import ErrorBoundary from '../../components/ErrorBoundary';
import SpamProtectionContext from './Context';

const retrieveRecaptchaSettings = () => {
	return sendCommand( 'sce_get_recaptcha_options', {
		nonce: sceSpamProtection.get_nonce,
	} );
};

const Recaptcha = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveRecaptchaSettings, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load reCAPTCHA 3 Settings.', 'comment-edit-pro' ) }
				</p>
			}
		>
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
		</ErrorBoundary>

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

	const { turnstileEnabled, setRecaptchaEnabled } = useContext( SpamProtectionContext );

	useEffect( () => {
		setRecaptchaEnabled( data.recaptchaEnterpriseEnabled );
	}, [ data.recaptchaEnterpriseEnabled ] );

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
			recaptchaEnterpriseEnabled: data.recaptchaEnterpriseEnabled,
			recaptchaProjectId: data.recaptchaProjectId,
			recaptchaApiKey: data.recaptchaApiKey,
			recaptchaSiteKey: data.recaptchaSiteKey,
			recaptchaScoreThreshold: data.recaptchaScoreThreshold,
			recaptchaLoggedInUsersEnabled: data.recaptchaLoggedInUsersEnabled,
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
			nonce: sceSpamProtection.save_nonce,
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
			nonce: sceSpamProtection.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( {
						recaptchaEnterpriseEnabled: false,
						recaptchaProjectId: '',
						recaptchaApiKey: '',
						recaptchaSiteKey: '',
						recaptchaSecretKey: '',
						recaptchaLoggedInUsersEnabled: false,
						recaptchaScoreThreshold: 0.5,
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

	const getProjectId = () => {
		return (
			<tr>
				<th scope="row">{ __( 'reCAPTCHA Enterprise Project ID', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaProjectId"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'reCAPTCHA Enterprise Project ID', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.recaptchaProjectId?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your reCAPTCHA Enterprise Project ID',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.recaptchaProjectId?.type && (
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

	const getSiteKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'reCAPTCHA Enterprise Site Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaSiteKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'reCAPTCHA Enterprise Site Key', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.recaptchaSiteKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your reCAPTCHA Enterprise Site Key',
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

	const getApiKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'reCAPTCHA Enterprise API Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaApiKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'reCAPTCHA Enterprise API Key', 'quotes-dlx' ) }
								{ ...field }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.recaptchaApiKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your reCAPTCHA Enterprise API Key',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.recaptchaApiKey?.type && (
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

	const getRecaptchaThreshold = () => {
		return (
			<tr>
				<th scope="row">{ __( 'reCAPTCHA Threshold', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="recaptchaScoreThreshold"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<RangeControl
									label={ __( 'Set reCAPTCHA Minimum Threshold', 'comment-edit-pro' ) }
									step={ 0.05 }
									value={ value }
									max={ 1 }
									min={ 0 }
									currentInput={ value }
									initialPosition={ value }
									allowReset={ true }
									className="sce-admin__range-control"
									onChange={ ( recaptchaThreshold ) => {
										onChange( recaptchaThreshold );
									} }
									help={ __(
										'The threshold score is between 0 and 1. The higher the score, the higher the chance of a successful reCAPTCHA challenge. The default value is 0.5. Meaning that the reCAPTCHA challenge will succeed if the score is greater than or equal to 0.5.',
										'comment-edit-pro'
									) }
									trackColor="#8019c4"
									railColor="#dad4eb"
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
			<h2>{ __( 'Recaptcha Enterprise', 'comment-edit-pro' ) }</h2>
			<p className="description">
				{ __(
					'Using Recaptcha Enterprise, you can further protect from bots and spam.',
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
									name="recaptchaEnterpriseEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable Recaptcha Enterprise', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												setRecaptchaEnabled( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enable or disable Recaptcha Enterprise support.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								{ ( turnstileEnabled && getValues( 'recaptchaEnterpriseEnabled' ) ) && (
									<>
										<Notice
											message={ __(
												'It is not recommended to have both reCAPTCHA and Cloudflare Turnstile enabled.',
												'comment-edit-pro'
											) }
											status="warning"
											politeness="polite"
										/>
									</>
								) }
							</td>
						</tr>
						{ getValues( 'recaptchaEnterpriseEnabled' ) && (
							<>
								{ getProjectId() }
								{ getApiKey() }
								{ getSiteKey() }
								{ getLoggedInToggle() }
								{ getRecaptchaThreshold() }
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
