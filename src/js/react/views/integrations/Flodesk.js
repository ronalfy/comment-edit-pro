/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState, useFieldArray } from 'react-hook-form';
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
	SelectControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';
import RequestHeaderFields from '../webhooks/RequestHeaderFields';
import FlodeskIcon from '../../components/icons/Flodesk';

const retrieveFlodeskOptions = () => {
	return sendCommand( 'sce_get_flodesk_options', {
		nonce: sceIntegrations.flodesk_get_nonce,
	} );
};

const Flodesk = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveFlodeskOptions,
		[]
	);
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load FloDesk Settings.', 'comment-edit-pro' ) }
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
						<h2>{ __( 'Flodesk', 'comment-edit-pro' ) }</h2>
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
	const segmentsInput = useRef( null );
	const customFieldInputRef = useRef( null );
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ credentialsRefreshing, setCredentialsRefreshing ] = useState( false );
	const [ isRefreshingSegments, setIsRefreshingSegments ] = useState( false );
	const [ isRefreshingForms, setIsRefreshingForms ] = useState( false );
	const [ isRefreshingCustomFields, setIsRefreshingCustomFields ] = useState( false );
	const [ isAddingCustomField, setIsAddingCustomField ] = useState( false );

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		setError,
		clearErrors,
		trigger,
	} = useForm( {
		defaultValues: {
			enableFlodesk: data.enableFlodesk,
			apiValid: data.apiValid,
			apiKey: data.apiKey,
			secretKey: data.secretKey,
			signUpLabel: data.signUpLabel,
			checkboxEnabled: data.checkboxEnabled,
			segments: data.segments,
			customFields: data.customFields,
			flodeskDoubleOptinEnabled: data.flodeskDoubleOptinEnabled,
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
		// If convertkit is disabled, no need to refresh.
		if ( ! getValues( 'enableFlodesk' ) ) {
			return false;
		}

		// If api isn't valid, refresh.
		if ( ! getValues( 'apiValid' ) ) {
			return true;
		}
		if ( isDirty && ( dirtyFields.apiKey ) ) {
			return true;
		}
		return false;
	};

	/**
	 * Check if we can save the form.
	 *
	 * @return {boolean} true to show the save button, false to hide it.
	 */
	const canShowSaveButton = () => {
		// If convertkit is disabled and form is not dirty, no save button.
		if ( ! getValues( 'enableFlodesk' ) && ! isDirty ) {
			return false;
		}

		// If convertKit is disabled, we can always save.
		if ( ! getValues( 'enableFlodesk' ) ) {
			return true;
		}

		if ( ! getValues( 'apiValid' ) && isDirty ) {
			return false;
		}
		if ( needsCredentialRefresh() ) {
			return false;
		}

		return true;
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_flodesk_options', {
			nonce: sceIntegrations.flodesk_save_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsSaved( true );

					// Reset form.
					reset(
						{ ...formData, ...ajaxData },
						{
							keepErrors: false,
							keepDirty: false,
						}
					);
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// todo - set save error.
					// setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const onRefreshCredentials = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_refresh_flodesk_connection', {
			nonce: sceIntegrations.flodesk_refresh_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Reset form state.
					reset(
						{ ...formValues, ...ajaxData },
						{
							keepErrors: false,
							keepDirty: false,
						}
					);
				} else {
					const updatedFormValues = {
						apiValid: false,
					};
					reset(
						{ ...formValues, ...updatedFormValues },
						{
							keepErrors: false,
							keepDirty: false,
						}
					);
					setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
					setError( 'secretKey', { type: 'noForms', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const onAddCustomField = ( customFieldLabel ) => {
		customFieldLabel = customFieldLabel.trim();
		if ( '' === customFieldLabel ) {
			setError( 'customFieldInput', { type: 'addCustomFieldError', message: __( 'The Custom Field name cannot be empty.', 'comment-edit-pro' ) } );
			return;
		}

		// Check to see if label is in use.
		const currentCustomFields = getValues( 'customFields' );
		const customFieldExists = currentCustomFields.find( ( customField ) => customField.label === customFieldLabel );
		if ( customFieldExists ) {
			setError( 'customFieldInput', { type: 'addCustomFieldError', message: __( 'Custom Field name already in use.', 'comment-edit-pro' ) } );
			return;
		}

		// Start adding the Custom Field.
		setIsAddingCustomField( true );
		sendCommand( 'sce_add_flodesk_custom_field', {
			nonce: sceIntegrations.flodesk_add_custom_field_nonce,
			label: customFieldLabel,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { customFields } = ajaxData;
					const newCustomFieldValues = [];
					customFields.forEach( ( keys, index ) => {
						newCustomFieldValues.push( keys );
					} );
					setValue( 'customFields', newCustomFieldValues );
				} else {
					setError( 'customFieldInput', { type: 'addCustomFieldError', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsAddingCustomField( false );
				customFieldInputRef.current.focus();
			} );
	};

	const onHandleSegmentsRefresh = ( formData ) => {
		setIsRefreshingSegments( true );
		sendCommand( 'sce_refresh_flodesk_segments', {
			nonce: sceIntegrations.flodesk_refresh_segments_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { segments, apiValid } = ajaxData;
					const newSegmentValues = [];
					const oldSegmentValues = getValues( 'segments' );
					segments.forEach( ( keys, index ) => {
						// Use old selection state for new tags.
						const oldTag = oldSegmentValues.find( ( segment ) => segment.value === keys.value );
						if ( oldTag ) {
							keys.selected = oldTag.selected;
						}
						newSegmentValues.push( keys );
					} );
					const updatedFormValues = {
						segments: newSegmentValues,
						apiValid,
					};
					reset(
						{ ...formValues, ...updatedFormValues },
						{
							keepErrors: true,
							keepDirty: true,
						}
					);
				} else {
					const updatedFormValues = {
					};
					reset(
						{ ...formValues, ...updatedFormValues },
						{
							keepErrors: true,
							keepDirty: true,
						}
					);
					setError( 'segments', { type: 'noSegments', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingSegments( false );
			} );
	};

	const onHandleCustomFieldsRefresh = ( formData ) => {
		setIsRefreshingCustomFields( true );
		sendCommand( 'sce_refresh_flodesk_custom_fields', {
			nonce: sceIntegrations.flodesk_refresh_custom_fields_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { customFields, apiValid } = ajaxData;
					const newCustomFieldValues = [];
					const oldCustomFieldValues = getValues( 'customFields' );
					customFields.forEach( ( keys, index ) => {
						// Use old selection state for new tags.
						const oldCustomFields = oldCustomFieldValues.find( ( customField ) => customField.value === keys.value );
						if ( oldCustomFields ) {
							keys.field = oldCustomFields.field;
							keys.field_value = oldCustomFields.field_value ?? '';
						}
						newCustomFieldValues.push( keys );
					} );
					const updatedFormValues = {
						customFields: newCustomFieldValues,
						apiValid,
					};
					reset(
						{ ...formValues, ...updatedFormValues },
						{
							keepErrors: true,
							keepDirty: true,
						}
					);
				} else {
					const updatedFormValues = {
					};
					reset(
						{ ...formValues, ...updatedFormValues },
						{
							keepErrors: true,
							keepDirty: true,
						}
					);
					setError( 'customFields', { type: 'noFields', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingCustomFields( false );
			} );
	};

	const getNewsletterLabel = () => {
		if ( ! canShowSaveButton() || needsCredentialRefresh() ) {
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
		if ( ! canShowSaveButton() || needsCredentialRefresh() ) {
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

	const getDoubleOptIn = () => {
		if ( ! canShowSaveButton() || needsCredentialRefresh() ) {
			return <></>;
		}
		return (
			<tr>
				<th scope="row">{ __( 'Double Opt-in', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="flodeskDoubleOptinEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Double Opt-In', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Require Double Opt-in for all subscribers.',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	const getFlodeskSegments = () => {
		// Don't show tags if api is invalid.
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const flodeskSegments = getValues( 'segments' );
		return (
			<tr>
				<th scope="row">
					{ __( 'Flodesk Segments', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ getValues( 'segments' ).length === 0 && (
							<Notice
								message={ __(
									'There are no Segments available. Try creating a Segment below.',
									'comment-edit-pro'
								) }
								status="warning"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ flodeskSegments.length > 0 && getValues( 'apiValid' ) &&
						flodeskSegments.map( ( segment, index ) => (
							<Controller
								key={ index }
								name={ `segments[${ index }].selected` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<CheckboxControl
										label={ segment.label }
										onChange={ ( enableValue ) => {
											// Clear any segment errors.
											clearErrors( 'segments' );
											onChange( enableValue );
										} }
										checked={ getValues( 'segments' )[ index ].selected ?? false }
									/>
								) }
							/>
						) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingSegments }
								disabled={ isRefreshingSegments }
								onClick={ () => {
									onHandleSegmentsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingSegments },
									{ 'is-saving': isRefreshingSegments },
								) }
								text={ isRefreshingSegments ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Segments', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'required' === errors.segments?.type && (
							<Notice
								message={ __( 'Please select a Segment.', 'comment-edit-pro' ) }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ 'noSegments' === errors.segments?.type && (
							<Notice
								message={ errors.segments?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
					</>
				</td>
			</tr>
		);
	};

	const getCustomFields = () => {
		// Don't show custom fields if api is invalid.
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const convertKitCustomFields = getValues( 'customFields' );
		return (
			<tr>
				<th scope="row">
					{ __( 'Map Custom Fields', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ getValues( 'customFields' ).length === 0 && (
							<Notice
								message={ __(
									'There are no custom fields available. You can create one below.',
									'comment-edit-pro'
								) }
								status="warning"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ convertKitCustomFields.length > 0 && getValues( 'apiValid' ) &&
						convertKitCustomFields.map( ( tag, index ) => (
							<div className="sce-convertkit-custom-field" key={ index }>
								{ 'custom' !== getValues( 'customFields' )[ index ].field && (
									<>
										<Controller
											name={ `customFields[${ index }].field` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ tag.label }
													onChange={ ( customFieldSelectedValue ) => {
														onChange( customFieldSelectedValue );
													} }
													value={ getValues( 'customFields' )[ index ].field ?? false }
													options={ RequestHeaderFields }
													className="sce-admin__select-control"
												/>
											) }
										/>
									</>
								) }
								{ 'custom' === getValues( 'customFields' )[ index ].field && (
									<>
										<Controller
											name={ `customFields[${ index }].field_value` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													value={ value ?? '' }
													className={ classNames( 'sce-admin__text-control', {
													} ) }
													onChange={ ( methodValue ) => {
														onChange( methodValue );
													} }
													label={ tag.label }
												/>
											) }
										/>
										<Button
											className="sce-admin__text-control-reset button-reset"
											icon="no-alt"
											label={ __( 'Clear Text Input', 'comment-edit-pro' ) }
											onClick={ () => {
												setValue( `customFields[${ index }].field`, 'none' );
											} }
											showTooltip={ false }
										/>
									</>
								) }
							</div>
						) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingCustomFields }
								disabled={ isRefreshingCustomFields }
								onClick={ () => {
									onHandleCustomFieldsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingCustomFields },
									{ 'is-saving': isRefreshingCustomFields },
								) }
								text={ isRefreshingCustomFields ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Custom Fields', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'noCustomFields' === errors.customFields?.type && (
							<Notice
								message={ errors.customFields?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						<div className="sce-convertkit-add-tag">
							<div className="sce-convertkit-add-tag-group">
								<Controller
									name="customFieldInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( customFieldValue ) => {
												clearErrors( 'customFieldInput' );
												onChange( customFieldValue );
											} }
											label={ __( 'Add New Custom Field', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.customFieldInput?.type,
											} ) }
											placeholder={ __( 'Custom Field Name', 'comment-edit-pro' ) }
											ref={ customFieldInputRef }
										/>
									) }
								/>
								<div className="sce-admin-buttons">
									<Button
										onClick={ async( e ) => {
											const validationResult = await trigger( 'customFieldInput' );
											if ( validationResult ) {
												onAddCustomField( getValues( 'customFieldInput' ) );
											}
										} }
										className={ classNames(
											'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right',
										) }
										text={
											isAddingCustomField
												? __( 'Adding…', 'comment-edit-pro' )
												: __( 'Add Custom Field', 'comment-edit-pro' ) }
									/>
								</div>
							</div>
							{ 'pattern' === errors.customFieldInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in custom fields.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addCustomFieldError' === errors.customFieldInput?.type && (
								<Notice
									message={ errors.customFieldInput?.message }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
						</div>
					</>
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
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Flodesk API Key', 'comment-edit-pro' ) }
								type="text"
								value={ value }
								onChange={ ( apiKeyValue ) => {
									onChange( apiKeyValue );
									clearErrors();
								} }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.apiKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your Flodesk API Key in order to choose a form or tag.',
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
		return __( 'Save Flodesk Options', 'comment-edit-pro' );
	};

	const getRefreshCredentialsText = () => {
		if ( saving ) {
			return __( 'Connecting…', 'comment-edit-pro' );
		}
		if ( isSaved ) {
			return __( 'Connected', 'comment-edit-pro' );
		}
		return __( 'Connect to Flodesk', 'comment-edit-pro' );
	};

	return (
		<>
			<div className="sce-admin__tabs--content-heading">
				<h2>
					<FlodeskIcon width={ 48 } height={ 45 } fill={ '#FB6068' } aria-hidden="true" />
					<span className="sce-admin__heading--text">
						{ __( 'Flodesk', 'comment-edit-pro' ) }
					</span>
					<a
						className="sce-admin-heading-docs"
						target="_blank"
						rel="noreferrer"
						href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/convertkit-integration"
					>
						({ __( 'Docs', 'comment-edit-pro' ) })
					</a>
				</h2>

				<p className="description">
					{ __(
						'When someone leaves a comment, they can be given the option to subscribe to your Flodesk account.',
						'comment-edit-pro'
					) }
				</p>
			</div>
			<form
				onSubmit={ handleSubmit( ( submitData, e ) => {
					e.preventDefault();

					// Check if no segments have been selected.
					const segments = getValues( 'segments' );
					const selectedSegments = segments.filter( ( segment ) => segment.selected === true );
					if ( 0 === selectedSegments.length ) {
						setError( 'segments', { type: 'required', message: __( 'Please select at least one Segment.', 'comment-edit-pro' ) } );
						return;
					}

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
							<th scope="row">{ __( 'Flodesk', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="enableFlodesk"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable Flodesk', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												clearErrors();
												onChange( boolValue );
											} }
											help={ __(
												'Enable or Disable the Flodesk Integration.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'enableFlodesk' ) && (
							<>
								{ getAPIKey() }
								{ getFlodeskSegments() }
								{ getCustomFields() }
								{ getNewsletterLabel() }
								{ getSignupCheckbox() }
								{ getDoubleOptIn() }
							</>
						) }
					</tbody>
				</table>
				<div className="sce-admin-buttons">
					{ getValues( 'apiValid' ) && canShowSaveButton() && (
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
								{ 'has-error': hasErrors() }
							) }
							type="submit"
							text={ getRefreshCredentialsText() }
							icon={ false }
							disabled={ credentialsRefreshing }
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
			</form>
		</>
	);
};
export default Flodesk;
