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
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';
import SpamProtectionContext from './Context';

const retrieveTurnstileSettings = () => {
	return sendCommand( 'sce_get_turnstile_options', {
		nonce: sceSpamProtection.get_nonce,
	} );
};

const Turnstile = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveTurnstileSettings, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Turnstile Settings.', 'comment-edit-pro' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<>
						<h2>{ __( 'Cloudflare Turnstile', 'comment-edit-pro' ) }</h2>
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

	const { recaptchaEnabled, setTurnstileEnabled } = useContext( SpamProtectionContext );

	useEffect( () => {
		setTurnstileEnabled( data.turnstileEnabled );
	}, [ data.recaptchaEnabled ] );

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
			turnstileEnabled: data.turnstileEnabled,
			turnstileSitekey: data.turnstileSitekey,
			turnstileSecret: data.turnstileSecret,
			turnstileTheme: data.turnstileTheme,
			turnstileLanguage: data.turnstileLanguage,
			turnstileWidgetSize: data.turnstileWidgetSize,
			turnstileCommentSubmitButtonId: data.turnstileCommentSubmitButtonId,
			turnstileLoggedInUsersEnabled: data.turnstileLoggedInUsersEnabled,
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
		sendCommand( 'sce_save_turnstile_options', {
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
		sendCommand( 'sce_reset_turnstile_options', {
			nonce: sceSpamProtection.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( ajaxData );
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
		return __( 'Save Turnstile Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Disconnecting…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Disconnected', 'quotes-dlx' );
		}
		return __( 'Disconnect From Turnstile', 'quotes-dlx' );
	};

	return (
		<>
			<h2>{ __( 'Cloudflare Turnstile', 'comment-edit-pro' ) } <a className="sce-admin-heading-docs" target="_blank" rel="noreferrer" href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/recaptcha-3-support">({ __( 'Docs', 'comment-edit-pro' ) })</a></h2>
			<p className="description">
				{ __(
					'Cloudflare Turnstile is an alternative captcha that is designed for privacy and user experience.',
					'comment-edit-pro'
				) }
			</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">{ __( 'Turnstile', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="turnstileEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable Cloudflare Turnstile', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												setTurnstileEnabled( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enable or disable the Cloudflare Turnstile integration.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								{ ( recaptchaEnabled && getValues( 'turnstileEnabled' ) ) && (
									<>
										<Notice
											message={ __(
												'It is not recommended to have both reCAPTCHA 3 and Cloudflare Turnstile enabled.',
												'comment-edit-pro'
											) }
											status="warning"
											politeness="polite"
										/>
									</>
								) }
							</td>
						</tr>
						{ getValues( 'turnstileEnabled' ) && (
							<>
								<tr>
									<th scope="row">{ __( 'Logged-in Users', 'comment-edit-pro' ) }</th>
									<td>
										{ getValues( 'turnstileLoggedInUsersEnabled' ) }
										<Controller
											name="turnstileLoggedInUsersEnabled"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Enable Cloudflare Turnstile for Logged-in Users', 'comment-edit-pro' ) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'You can exclude logged-in users from Cloudflare Turnstile with this setting.',
														'comment-edit-pro'
													) }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Keys', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="turnstileSitekey"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Sitekey', 'quotes-dlx' ) }
													{ ...field }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.turnstileSitekey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Turnstile sitekey.',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.turnstileSitekey?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ true }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="turnstileSecret"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Secret Key', 'quotes-dlx' ) }
													{ ...field }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.turnstileSecret?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Turnstile secret key.',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.turnstileSecret?.type && (
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
									<th scope="row">{ __( 'Language', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="turnstileTheme"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ __( 'Widget Language', 'comment-edit-pro' ) }
													help={ __(
														'Select the language of the widget.',
														'comment-edit-pro'
													) }
													value={ value }
													options={ [
														/* auto, ar-eg, de, en, es, fa, fr, id, it, ja, ko, nl, pl, pt-br, ru, tr, zh-cn, zh-tw */
														{ label: __( 'Auto', 'comment-edit-pro' ), value: 'auto' },
														{ label: __( 'Arabic', 'comment-edit-pro' ), value: 'ar-eg' },
														{ label: __( 'German', 'comment-edit-pro' ), value: 'de' },
														{ label: __( 'English', 'comment-edit-pro' ), value: 'en' },
														{ label: __( 'Spanish', 'comment-edit-pro' ), value: 'es' },
														{ label: __( 'Persian', 'comment-edit-pro' ), value: 'fa' },
														{ label: __( 'French', 'comment-edit-pro' ), value: 'fr' },
														{ label: __( 'Indonesian', 'comment-edit-pro' ), value: 'id' },
														{ label: __( 'Italian', 'comment-edit-pro' ), value: 'it' },
														{ label: __( 'Japanese', 'comment-edit-pro' ), value: 'ja' },
														{ label: __( 'Korean', 'comment-edit-pro' ), value: 'ko' },
														{ label: __( 'Dutch', 'comment-edit-pro' ), value: 'nl' },
														{ label: __( 'Polish', 'comment-edit-pro' ), value: 'pl' },
														{ label: __( 'Portuguese', 'comment-edit-pro' ), value: 'pt-br' },
														{ label: __( 'Russian', 'comment-edit-pro' ), value: 'ru' },
														{ label: __( 'Turkish', 'comment-edit-pro' ), value: 'tr' },
														{ label: __( 'Chinese (Simplified)', 'comment-edit-pro' ), value: 'zh-cn' },
														{ label: __( 'Chinese (Traditional)', 'comment-edit-pro' ), value: 'zh-tw' },
													] }
													onChange={ ( widgetThemeValue ) => {
														onChange( widgetThemeValue );
													} }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Widget Appearance', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="turnstileTheme"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ __( 'Widget Appearance', 'comment-edit-pro' ) }
													help={ __(
														'Select the theme for the widget.',
														'comment-edit-pro'
													) }
													value={ value }
													options={ [
														/* light, dark, auto */
														{ label: __( 'Auto', 'comment-edit-pro' ), value: 'auto' },
														{ label: __( 'Light', 'comment-edit-pro' ), value: 'light' },
														{ label: __( 'Dark', 'comment-edit-pro' ), value: 'dark' },
													] }
													onChange={ ( widgetThemeValue ) => {
														onChange( widgetThemeValue );
													} }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Widget Size', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="turnstileWidgetSize"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ __( 'Widget Size', 'comment-edit-pro' ) }
													help={ __(
														'Select the size for the widget.',
														'comment-edit-pro'
													) }
													value={ value }
													options={ [
														/* normal, compact */
														{ label: __( 'Normal', 'comment-edit-pro' ), value: 'normal' },
														{ label: __( 'Compact', 'comment-edit-pro' ), value: 'compact' },
													] }
													onChange={ ( widgetSizeValue ) => {
														onChange( widgetSizeValue );
													} }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Comment Submit Button ID', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="turnstileCommentSubmitButtonId"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Submit Comment Button ID', 'quotes-dlx' ) }
													{ ...field }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.turnstileCommentSubmitButtonId?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter the CSS/HTML ID for the comment form button so Cloudflare Turnstile can target the correct button.',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.turnstileCommentSubmitButtonId?.type && (
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
					{ getValues( 'turnstileEnabled' ) && (
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
export default Turnstile;
