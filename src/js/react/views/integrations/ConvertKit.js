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
	CheckboxControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';

const retrieveConvertKitOptions = () => {
	return sendCommand( 'sce_get_convertkit_options', {
		nonce: sceIntegrations.ck_get_nonce,
	} );
};

const ConvertKit = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveConvertKitOptions, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load ConvertKit Settings.', 'comment-edit-pro' ) }
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
						<h2>{ __( 'ConvertKit', 'comment-edit-pro' ) }</h2>
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
	const [ credentialsRefreshing, setCredentialsRefreshing ] = useState( false );

	console.log( data );

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
			enableConvertKit: data.enableConvertKit,
			apiValid: data.apiValid,
			apiKey: data.apiKey,
			secretKey: data.secretKey,
			signUpLabel: data.signUpLabel,
			checkboxEnabled: data.checkboxEnabled,
			formOrTag: data.formOrTag,
			forms: data.forms,
			tags: data.tags,
			selectedForm: data.selectedForm,
			selectedTags: data.selectedTags,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	/**
	 * Check if we need to re-connect or initially connect to the ConvertKit API.
	 *
	 * @return {boolean} true if we need to re-connect, false if not.
	 */
	const needsCredentialRefresh = () => {
		if ( ! getValues( 'apiValid' ) ) {
			return true;
		}
		if ( isDirty && ( dirtyFields.apiKey || dirtyFields.secretKey ) ) {
			return true;
		}
		return false;
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_convertkit_options', {
			nonce: sceIntegrations.ck_save_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { forms, tags } =
						ajaxData;
					const newFormValues = [];
					forms.forEach( ( keys, index ) => {
						newFormValues.push( keys );
					} );
					const newTagValues = [];
					tags.forEach( ( keys, index ) => {
						newTagValues.push( keys );
					} );
					setValue( 'forms', newFormValues );
					setValue( 'tags', newTagValues );
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => { } )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const onRefreshCredentials = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_refresh_convertkit_connection', {
			nonce: sceIntegrations.ck_refresh_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { forms, tags, apiValid } =
						ajaxData;
					const newFormValues = [];
					forms.forEach( ( keys, index ) => {
						newFormValues.push( keys );
					} );
					const newTagValues = [];
					tags.forEach( ( keys, index ) => {
						newTagValues.push( keys );
					} );
					const updatedFormValues = {
						forms: newFormValues,
						tags: newTagValues,
						apiValid,
					};
					reset( { ...formValues, ...updatedFormValues }, {
						keepErrors: false,
						keepDirty: false,
					} );
				} else {
					setValue( 'apiValid', false );
					setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
					setError( 'secretKey', { type: 'noForms', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => { } )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const handleReset = () => {
		setResetting( true );
		sendCommand( 'sce_reset_convertkit_options', {
			nonce: sceIntegrations.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( {
						enableMailchimp: false,
						mailchimpServerPrefix: '',
						apiKey: '',
						mailchimpLists: [],
						selectedList: '',
						signUpLabel: __( 'Sign Up for Updates', 'comment-edit-pro' ),
					} );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				}
			} )
			.catch( ( ajaxResponse ) => { } )
			.then( ( ajaxResponse ) => {
				setResetting( false );
			} );
	};

	const getNewsletterLabel = () => {
		if ( ! getValues( 'selectedList' ) ) {
			return <></>;
		}
		return (
			<tr>
				<th scope="row">{ __( 'Sign Up Label', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="signUpLabel"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Sign-up Label', 'comment-edit-pro' ) }
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
					{ 'required' === errors.signUpLabel?.type && (
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

	const getSignupCheckbox = () => {
		if ( ! getValues( 'selectedList' ) ) {
			return <></>;
		}
		return (
			<tr>
				<th scope="row">{ __( 'Sign Up Checkbox', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="checkboxEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Sign Up Checkbox Checked', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Check the sign-up checkbox by default (not recommended).',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	/**
	 * Gets the form or tag radio option.
	 *
	 * @return {JSX.Element} Form or tags interface.
	 */
	const getFormOrTag = () => {
		if ( needsCredentialRefresh() ) {
			return <></>;
		}
		return (
			<tr>
				<th scope="row">{ __( 'Forms or Tags', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="formOrTag"
						control={ control }
						rules={ { required: true } }
						render={ ( { field: { onChange, value } } ) => (
							<RadioControl
								label={ __( 'Add Subscribers to Forms or Tags', 'comment-edit-pro' ) }
								help={ __(
									'Select whether to add new subscribers to a an existing ConvertKit form or tag(s).',
									'comment-edit-pro'
								) }
								selected={ getValues( 'formOrTag' ) }
								options={
									[
										{
											label: __( 'Forms', 'comment-edit-pro' ),
											value: 'form',
										},
										{
											label: __( 'Tags', 'comment-edit-pro' ),
											value: 'tag',
										},
									]
								}
								onChange={ ( formOrTagValue ) => {
									onChange( formOrTagValue );
								} }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	const getConvertKitForms = () => {
		const convertKitForms = getValues( 'forms' );
		if ( convertKitForms.length === 0 ) {
			return <></>;
		}

		return (
			<tr>
				<th scope="row">{ __( 'ConvertKit Forms', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="convertKitForms"
						control={ control }
						rules={ { required: true } }
						render={ ( { field: { onChange, value } } ) => (
							<RadioControl
								label={ __( 'Select a form for your subscribers', 'comment-edit-pro' ) }
								help={ __(
									'Select a default form that will be used when signing up your subscribers.',
									'comment-edit-pro'
								) }
								selected={ getValues( 'selectedForm' ) }
								options={ getValues( 'forms' ) }
								onChange={ ( formSelectedValue ) => {
									onChange( formSelectedValue );
									setValue( 'selectedForm', formSelectedValue );
								} }
							/>
						) }
					/>
					<Controller
						name="selectedForm"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" aria-hidden="true" />
						) }
					/>
					{ 'required' === errors.selectedForm?.type && (
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

	const getConvertKitTags = () => {
		const convertKitTags = getValues( 'tags' );
		if ( convertKitTags.length === 0 || 'tag' !== getValues( 'formOrTag' ) ) {
			return <></>;
		}

		return (
			<tr>
				<th scope="row">{ __( 'ConvertKit Tags', 'comment-edit-pro' ) }</th>
				<td>
					{ convertKitTags.length > 0 && (
						convertKitTags.map( ( tag ) => (
							<Controller
								key={ tag.id }
								name="convertKitTags"
								control={ control }
								rules={ { required: true } }
								render={ ( { field: { onChange, value } } ) => (
									<CheckboxControl
										label={ tag.name }
										checked={ value }
										onChange={ ( tagSelectedValue ) => {
											onChange( tagSelectedValue );
										} }
									/>
								) }
							/>
						)
						) )
					}
				</td>
			</tr>
		);
	};

	const getAPIKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'API Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="apiKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'ConvertKit API Key', 'comment-edit-pro' ) }
								{ ...field }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.apiKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your ConvertKit API Key in order to choose a form or tag.',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.apiKey?.type && (
						<Notice
							message={ __( 'This field is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'noForms' === errors.apiKey?.type && (
						<Notice
							message={ errors.apiKey?.message }
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
						name="secretKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								label={ __( 'ConvertKit Secret Key', 'comment-edit-pro' ) }
								{ ...field }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.apiKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your ConvertKit Secret Key in order to choose a form or tag.',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.secretKey?.type && (
						<Notice
							message={ __( 'This field is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'noForms' === errors.secretKey?.type && (
						<Notice
							message={ __( 'No ConvertKit forms or tags for the API key were found.' ) }
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
			return __( 'Saving…', 'comment-edit-pro' );
		}
		if ( isSaved ) {
			return __( 'Saved', 'comment-edit-pro' );
		}
		return __( 'Save ConvertKit Options', 'comment-edit-pro' );
	};

	const getRefreshCredentialsText = () => {
		if ( saving ) {
			return __( 'Connecting…', 'comment-edit-pro' );
		}
		if ( isSaved ) {
			return __( 'Connected', 'comment-edit-pro' );
		}
		return __( 'Connect to ConvertKit', 'comment-edit-pro' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Disconnecting…', 'comment-edit-pro' );
		}
		if ( isReset ) {
			return __( 'Disconnected', 'comment-edit-pro' );
		}
		return __( 'Disconnect From ConvertKit', 'comment-edit-pro' );
	};

	return (
		<>
			<h2>{ __( 'ConvertKit', 'comment-edit-pro' ) } <a className="sce-admin-heading-docs" target="_blank" rel="noreferrer" href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailchimp-integration">({ __( 'Docs', 'comment-edit-pro' ) })</a></h2>
			<p className="description">
				{ __(
					'When someone leaves a comment, they can be given the option to subscribe to your ConvertKit account.',
					'comment-edit-pro'
				) }
			</p>
			<form
				onSubmit={ handleSubmit( ( submitData, e ) => {
					e.preventDefault();
					if ( ! needsCredentialRefresh() ) {
						onSubmit( submitData );
					} else {
						onRefreshCredentials( submitData );
					}
				} ) }
			>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">{ __( 'ConvertKit', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="enableConvertKit"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable ConvertKit', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enable or Disable the ConvertKit Integration.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'enableConvertKit' ) && (
							<>
								{ getAPIKey() }
								{ getSecretKey() }
								{ getFormOrTag() }
								{ getConvertKitForms() }
								{ getConvertKitTags() }
								{ getNewsletterLabel() }
								{ getSignupCheckbox() }
							</>
						) }
					</tbody>
				</table>
				<div className="sce-admin-buttons">
					{ ! needsCredentialRefresh() && getValues( 'apiValid' ) && (
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
					) }
					{ needsCredentialRefresh() && (
						<Button
							className={ classNames(
								'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right',
								{ 'has-error': hasErrors() },
							) }
							type="submit"
							text={ getRefreshCredentialsText() }
							icon={ false }
							disabled={ credentialsRefreshing }
						/>
					) }
					{ ! needsCredentialRefresh() && (
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
export default ConvertKit;
