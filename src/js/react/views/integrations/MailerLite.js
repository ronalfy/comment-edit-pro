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
import MailerLiteIcon from '../../components/icons/MailerLite';

const retrieveMailerLiteOptions = () => {
	return sendCommand( 'sce_get_mailerlite_options', {
		nonce: sceIntegrations.ml_get_nonce,
	} );
};

const MailerLite = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveMailerLiteOptions,
		[]
	);
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load MailerLite Settings.', 'comment-edit-pro' ) }
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
						<h2>{ __( 'MailerLite', 'comment-edit-pro' ) }</h2>
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
	const groupInput = useRef( null );
	const customFieldInputRef = useRef( null );
	const classicGroupInput = useRef( null );
	const classicCustomFieldInputRef = useRef( null );
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ credentialsRefreshing, setCredentialsRefreshing ] = useState( false );
	const [ isRefreshingGroups, setIsRefreshingGroups ] = useState( false );
	const [ isRefreshingForms, setIsRefreshingForms ] = useState( false );
	const [ isRefreshingCustomFields, setIsRefreshingCustomFields ] = useState( false );
	const [ isAddingGroup, setIsAddingGroup ] = useState( false );
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
			enableMailerlite: data.enableMailerlite,
			enableMailerliteClassic: data.enableMailerliteClassic,
			apiValid: data.apiValid,
			apiKey: data.apiKey,
			signUpLabel: data.signUpLabel,
			checkboxEnabled: data.checkboxEnabled,
			doubleOptinEnabled: data.doubleOptinEnabled,
			groups: data.groups ?? [],
			customFields: data.customFields ?? [],
			groupInput: '',
			customFieldInput: '',
			classicApiValid: data.classicApiValid,
			classicApiKey: data.classicApiKey,
			classicGroups: data.classicGroups ?? [],
			classicCustomFields: data.classicCustomFields ?? [],
			classicGroupInput: '',
			classicCustomFieldInput: '',
		},
	} );

	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	/**
	 * Check if we need to re-connect or initially connect to the MailerLite API.
	 *
	 * @return {boolean} true if we need to re-connect, false if not.
	 */
	const needsCredentialRefresh = () => {
		// If convertkit is disabled, no need to refresh.
		if ( ! getValues( 'enableMailerlite' ) ) {
			return false;
		}

		// If api isn't valid, refresh.
		if ( ! getValues( 'apiValid' ) && ! getValues( 'enableMailerliteClassic' ) ) {
			return true;
		}
		if ( ! getValues( 'classicApiValid' ) && getValues( 'enableMailerliteClassic' ) ) {
			return true;
		}
		if ( isDirty && ( dirtyFields.apiKey ) && ! getValues( 'enableMailerliteClassic' ) ) {
			return true;
		}
		if ( isDirty && ( dirtyFields.classicApiKey ) && getValues( 'enableMailerliteClassic' ) ) {
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
		// If mailerlite is disabled and form is not dirty, no save button.
		if ( ! getValues( 'enableMailerlite' ) && ! isDirty ) {
			return false;
		}

		// If mailerlite is disabled, we can always save.
		if ( ! getValues( 'enableMailerlite' ) ) {
			return true;
		}

		const groups = getValues( 'groups' );
		const classicGroups = getValues( 'classicGroups' );
		const customFields = getValues( 'customFields' );
		const classicCustomFields = getValues( 'classicCustomFields' );


		if ( getValues( 'enableMailerliteClassic' ) ) {
			if ( getValues( 'classicApiValid' ) && ( classicGroups.length === 0 && classicCustomFields.length === 0 ) ) {
				return false;
			}
			if ( ! getValues( 'classicApiValid' ) && isDirty ) {
				return false;
			}
		} else {
			if ( getValues( 'apiValid' ) && ( groups.length === 0 && customFields.length === 0 ) ) {
				return false;
			}
			if ( ! getValues( 'apiValid' ) && isDirty ) {
				return false;
			}
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
		sendCommand( 'sce_save_mailerlite_options', {
			nonce: sceIntegrations.ml_save_nonce,
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
							keepDirty: true,
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
		sendCommand( 'sce_refresh_mailerlite_connection', {
			nonce: sceIntegrations.ml_refresh_nonce,
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

	const onAddGroup = ( groupLabel ) => {
		groupLabel = groupLabel.trim();
		if ( '' === groupLabel ) {
			setError( 'groupInput', { type: 'addGroupError', message: __( 'Group name cannot be empty.', 'comment-edit-pro' ) } );
			return;
		}

		// Check to see if label is in use.
		const currentGroup = getValues( 'groups' );
		const groupExists = currentGroup.find( ( group ) => group.label === groupLabel );
		if ( groupExists ) {
			setError( 'groupInput', { type: 'addGroupError', message: __( 'Group name already in use.', 'comment-edit-pro' ) } );
			return;
		}

		// Start adding the group.
		setIsAddingGroup( true );
		sendCommand( 'sce_add_mailerlite_group', {
			nonce: sceIntegrations.ml_add_group_nonce,
			label: groupLabel,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { groups } = ajaxData;
					const newGroupValues = [];
					groups.forEach( ( keys, index ) => {
						newGroupValues.push( keys );
					} );
					setValue( 'groupInput', '' );
					setValue( 'groups', newGroupValues );
				} else {
					setError( 'groupInput', { type: 'addGroupError', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsAddingGroup( false );
				groupInput.current.focus();
			} );
	};

	const onAddClassicGroup = ( groupLabel ) => {
		groupLabel = groupLabel.trim();
		if ( '' === groupLabel ) {
			setError( 'classicGroupInput', { type: 'addGroupError', message: __( 'Group name cannot be empty.', 'comment-edit-pro' ) } );
			return;
		}

		// Check to see if label is in use.
		const currentGroup = getValues( 'groups' );
		const groupExists = currentGroup.find( ( group ) => group.label === groupLabel );
		if ( groupExists ) {
			setError( 'classicGroupInput', { type: 'addGroupError', message: __( 'Group name already in use.', 'comment-edit-pro' ) } );
			return;
		}

		// Start adding the group.
		setIsAddingGroup( true );
		sendCommand( 'sce_add_mailerlite_classic_group', {
			nonce: sceIntegrations.ml_add_group_nonce,
			label: groupLabel,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { classicGroups } = ajaxData;
					const newGroupValues = [];
					classicGroups.forEach( ( keys, index ) => {
						newGroupValues.push( keys );
					} );
					setValue( 'classicGroupInput', '' );
					setValue( 'classicGroups', newGroupValues );
				} else {
					setError( 'classicGroupInput', { type: 'addGroupError', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsAddingGroup( false );
				classicGroupInput.current.focus();
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
		sendCommand( 'sce_add_mailerlite_custom_field', {
			nonce: sceIntegrations.ml_add_custom_field_nonce,
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

	const onHandleGroupsRefresh = ( formData ) => {
		setIsRefreshingGroups( true );
		sendCommand( 'sce_refresh_mailerlite_groups', {
			nonce: sceIntegrations.ml_refresh_groups_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { groups, apiValid } = ajaxData;
					const newGroupValues = [];
					const oldGroupValues = getValues( 'groups' );
					groups.forEach( ( keys, index ) => {
						// Use old selection state for new groups.
						const oldGroup = oldGroupValues.find( ( group ) => group.value === keys.value );
						if ( oldGroup ) {
							keys.selected = oldGroup.selected;
						}
						newGroupValues.push( keys );
					} );
					const updatedFormValues = {
						groups: newGroupValues,
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
					setError( 'groups', { type: 'noGroups', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingGroups( false );
			} );
	};

	const onHandleClassicGroupsRefresh = ( formData ) => {
		setIsRefreshingGroups( true );
		sendCommand( 'sce_refresh_mailerlite_classic_groups', {
			nonce: sceIntegrations.ml_refresh_groups_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { groups, apiValid } = ajaxData;
					const newGroupValues = [];
					const oldGroupValues = getValues( 'classicGroups' );
					groups.forEach( ( keys, index ) => {
						// Use old selection state for new groups.
						const oldGroup = oldGroupValues.find( ( group ) => group.value === keys.value );
						if ( oldGroup ) {
							keys.selected = oldGroup.selected;
						}
						newGroupValues.push( keys );
					} );
					const updatedFormValues = {
						groups: newGroupValues,
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
					setError( 'classicGroups', { type: 'noGroups', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingGroups( false );
			} );
	};

	const onHandleCustomFieldsRefresh = ( formData ) => {
		setIsRefreshingCustomFields( true );
		sendCommand( 'sce_refresh_mailerlite_custom_fields', {
			nonce: sceIntegrations.ml_refresh_custom_fields_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { customFields, apiValid } = ajaxData;
					const newCustomFieldValues = [];
					const oldCustomFieldValues = getValues( 'customFields' );
					customFields.forEach( ( keys, index ) => {
						// Use old selection state for new custom fields.
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

	const onHandleClassicCustomFieldsRefresh = ( formData ) => {
		setIsRefreshingCustomFields( true );
		sendCommand( 'sce_refresh_mailerlite_classic_custom_fields', {
			nonce: sceIntegrations.ml_refresh_custom_fields_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { classicCustomFields, classicApiValid } = ajaxData;
					const newCustomFieldValues = [];
					const oldCustomFieldValues = getValues( 'classicCustomFields' );
					classicCustomFields.forEach( ( keys, index ) => {
						// Use old selection state for new custom fields.
						const oldCustomFields = oldCustomFieldValues.find( ( customField ) => customField.value === keys.value );
						if ( oldCustomFields ) {
							keys.field = oldCustomFields.field;
							keys.field_value = oldCustomFields.field_value ?? '';
						}
						newCustomFieldValues.push( keys );
					} );
					const updatedFormValues = {
						classicCustomFields: newCustomFieldValues,
						classicApiValid,
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

	const getMailerLiteClassicSwitch = () => {
		return (
			<tr>
				<th scope="row">{ __( 'MailerLite Classic', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="enableMailerliteClassic"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable MailerLite Classic', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									clearErrors();
									onChange( boolValue );
								} }
								help={ __(
									'Enable the MailerLite Classic integration. If you have not switched to the New version of MailerLite, you will need to enable this option.',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
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

	const getOptinCheckbox = () => {
		if ( ! canShowSaveButton() || needsCredentialRefresh() ) {
			return <></>;
		}
		return (
			<tr>
				<th scope="row">{ __( 'Double Optin', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="doubleOptinEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Double Optin', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Enable double-optin for your email subscribers (recommended).',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	const getMailerliteGroups = () => {
		// Don't show groups if api is invalid.
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const mailerliteGroups = getValues( 'groups' );
		console.log( mailerliteGroups );
		return (
			<tr>
				<th scope="row">
					{ __( 'MailerLite Groups', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ getValues( 'groups' ).length === 0 && (
							<Notice
								message={ __(
									'There are no groups available. Try creating a group below.',
									'comment-edit-pro'
								) }
								status="warning"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ mailerliteGroups.length > 0 && getValues( 'apiValid' ) &&
						mailerliteGroups.map( ( group, index ) => (
							<Controller
								key={ index }
								name={ `groups[${ index }].selected` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<CheckboxControl
										label={ group.label }
										onChange={ ( enableValue ) => {
											onChange( enableValue );
										} }
										checked={ getValues( 'groups' )[ index ].selected ?? false }
									/>
								) }
							/>
						) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingGroups }
								disabled={ isRefreshingGroups }
								onClick={ () => {
									onHandleGroupsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingGroups },
									{ 'is-saving': isRefreshingGroups },
								) }
								text={ isRefreshingGroups ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Groups', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'noGroups' === errors.groups?.type && (
							<Notice
								message={ errors.groups?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						<div className="sce-convertkit-add-tag">
							<div className="sce-convertkit-add-tag-group">
								<Controller
									name="groupInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( groupInputValue ) => {
												clearErrors( 'groupInput' );
												onChange( groupInputValue );
											} }
											label={ __( 'Add New Group', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.groupInput?.type,
											} ) }
											placeholder={ __( 'Group Name', 'comment-edit-pro' ) }
											aria-required="true"
											ref={ groupInput }
										/>
									) }
								/>
								<div className="sce-admin-buttons">
									<Button
										onClick={ async( e ) => {
											const validationResult = await trigger( 'groupInput' );
											if ( validationResult ) {
												onAddGroup( getValues( 'groupInput' ) );
											}
										} }
										className={ classNames(
											'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right',
										) }
										text={
											isAddingGroup
												? __( 'Adding…', 'comment-edit-pro' )
												: __( 'Add New Group', 'comment-edit-pro' ) }
									/>
								</div>
							</div>
							{ 'pattern' === errors.groupInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in Groups.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addGroupError' === errors.groupInput?.type && (
								<Notice
									message={ errors.groupInput?.message }
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

	const getMailerliteClassicGroups = () => {
		// Don't show groups if api is invalid.
		if ( ! getValues( 'classicApiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const mailerliteGroups = getValues( 'classicGroups' );
		return (
			<tr>
				<th scope="row">
					{ __( 'MailerLite Groups', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ getValues( 'classicGroups' ).length === 0 && (
							<Notice
								message={ __(
									'There are no groups available. Try creating a group below.',
									'comment-edit-pro'
								) }
								status="warning"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ mailerliteGroups.length > 0 && getValues( 'classicApiValid' ) &&
						mailerliteGroups.map( ( group, index ) => (
							<Controller
								key={ index }
								name={ `classicGroups[${ index }].selected` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<CheckboxControl
										label={ group.label }
										onChange={ ( enableValue ) => {
											onChange( enableValue );
										} }
										checked={ getValues( 'classicGroups' )[ index ].selected ?? false }
									/>
								) }
							/>
						) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingGroups }
								disabled={ isRefreshingGroups }
								onClick={ () => {
									onHandleClassicGroupsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingGroups },
									{ 'is-saving': isRefreshingGroups },
								) }
								text={ isRefreshingGroups ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Groups', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'noGroups' === errors.classicGroups?.type && (
							<Notice
								message={ errors.classicGroups?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						<div className="sce-convertkit-add-tag">
							<div className="sce-convertkit-add-tag-group">
								<Controller
									name="classicGroupInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( groupInputValue ) => {
												clearErrors( 'groupInput' );
												onChange( groupInputValue );
											} }
											label={ __( 'Add New Group', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.groupInput?.type,
											} ) }
											placeholder={ __( 'Group Name', 'comment-edit-pro' ) }
											aria-required="true"
											ref={ classicGroupInput }
										/>
									) }
								/>
								<div className="sce-admin-buttons">
									<Button
										onClick={ async( e ) => {
											const validationResult = await trigger( 'classicGroupInput' );
											if ( validationResult ) {
												onAddClassicGroup( getValues( 'classicGroupInput' ) );
											}
										} }
										className={ classNames(
											'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right',
										) }
										text={
											isAddingGroup
												? __( 'Adding…', 'comment-edit-pro' )
												: __( 'Add New Group', 'comment-edit-pro' ) }
									/>
								</div>
							</div>
							{ 'pattern' === errors.groupInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in Groups.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addGroupError' === errors.groupInput?.type && (
								<Notice
									message={ errors.groupInput?.message }
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

	const getCustomFields = () => {
		// Don't show custom fields if api is invalid.
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const mailerliteCustomFields = getValues( 'customFields' );
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
						{ mailerliteCustomFields.length > 0 && getValues( 'apiValid' ) &&
						mailerliteCustomFields.map( ( customField, index ) => (
							<div className="sce-convertkit-custom-field" key={ index }>
								{ 'custom' !== getValues( 'customFields' )[ index ].field && (
									<>
										<Controller
											name={ `customFields[${ index }].field` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ customField.label }
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
													label={ customField.label }
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
									name="classicCustomFieldInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( customFieldValue ) => {
												clearErrors( 'classicCustomFieldInput' );
												onChange( customFieldValue );
											} }
											label={ __( 'Add New Custom Field', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.classicCustomFieldInput?.type,
											} ) }
											placeholder={ __( 'Custom Field Name', 'comment-edit-pro' ) }
											ref={ classicCustomFieldInputRef }
										/>
									) }
								/>
								<div className="sce-admin-buttons">
									<Button
										onClick={ async( e ) => {
											const validationResult = await trigger( 'classicCustomFieldInput' );
											if ( validationResult ) {
												onAddClassiCustomField( getValues( 'classicCustomFieldInput' ) );
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
							{ 'pattern' === errors.classicCustomFieldInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in custom fields.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addCustomFieldError' === errors.classicCustomFieldInput?.type && (
								<Notice
									message={ errors.classicCustomFieldInput?.message }
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

	const getClassicFields = () => {
		// Don't show custom fields if api is invalid.
		if ( ! getValues( 'classicApiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const mailerliteCustomFields = getValues( 'classicCustomFields' );
		return (
			<tr>
				<th scope="row">
					{ __( 'Map Custom Fields', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ getValues( 'classicCustomFields' ).length === 0 && (
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
						{ ( mailerliteCustomFields.length > 0 && getValues( 'classicApiValid' ) ) &&
						( mailerliteCustomFields.map( ( customField, index ) => (
							<div className="sce-convertkit-custom-field" key={ index }>
								{ 'custom' !== getValues( 'classicCustomFields' )[ index ].field && (
									<>
										<Controller
											name={ `classicCustomFields[${ index }].field` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<SelectControl
													label={ customField.label }
													onChange={ ( customFieldSelectedValue ) => {
														onChange( customFieldSelectedValue );
													} }
													value={ getValues( 'classicCustomFields' )[ index ].field ?? false }
													options={ RequestHeaderFields }
													className="sce-admin__select-control"
												/>
											) }
										/>
									</>
								) }
								{ 'custom' === getValues( 'classicCustomFields' )[ index ].field && (
									<>
										<Controller
											name={ `classicCustomFields[${ index }].field_value` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													value={ value ?? '' }
													className={ classNames( 'sce-admin__text-control', {
													} ) }
													onChange={ ( methodValue ) => {
														onChange( methodValue );
													} }
													label={ customField.label }
												/>
											) }
										/>
										<Button
											className="sce-admin__text-control-reset button-reset"
											icon="no-alt"
											label={ __( 'Clear Text Input', 'comment-edit-pro' ) }
											onClick={ () => {
												setValue( `classicCustomFields[${ index }].field`, 'none' );
											} }
											showTooltip={ false }
										/>
									</>
								) }
							</div>
						) ) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingCustomFields }
								disabled={ isRefreshingCustomFields }
								onClick={ () => {
									onHandleClassicCustomFieldsRefresh();
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
						{ 'noCustomFields' === errors.classicCustomFields?.type && (
							<Notice
								message={ errors.classicCustomFields?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						<div className="sce-convertkit-add-tag">
							<div className="sce-convertkit-add-tag-group">
								<Controller
									name="classicCustomFieldInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( customFieldValue ) => {
												clearErrors( 'classicCustomFieldInput' );
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
											const validationResult = await trigger( 'classicCustomFieldInput' );
											if ( validationResult ) {
												onAddCustomField( getValues( 'classicCustomFieldInput' ) );
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
							{ 'pattern' === errors.classicCustomFieldInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in custom fields.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addCustomFieldError' === errors.classicCustomFieldInput?.type && (
								<Notice
									message={ errors.classicCustomFieldInput?.message }
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
				<th scope="row">{ __( 'API Token', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="apiKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'MailerLite API Token', 'comment-edit-pro' ) }
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
									'Enter your MailerLite API Token in order to select a group and match any custom fields.',
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

	const getClassicAPIKey = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Classic API Key', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="classicApiKey"
						control={ control }
						rules={ { required: true } }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'MailerLite Classic API Key', 'comment-edit-pro' ) }
								type="text"
								value={ value }
								onChange={ ( apiKeyValue ) => {
									onChange( apiKeyValue );
									clearErrors();
								} }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.classicApiKey?.type,
									'is-required': true,
								} ) }
								help={ __(
									'Enter your MailerLite API Key in order to select a group and match any custom fields.',
									'comment-edit-pro'
								) }
								aria-required="true"
							/>
						) }
					/>
					{ 'required' === errors.classicApiKey?.type && (
						<Notice
							message={ __( 'This field is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'noForms' === errors.classicApiKey?.type && (
						<Notice
							message={ errors.classicApiKey?.message }
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
		return __( 'Save MailerLite Options', 'comment-edit-pro' );
	};

	const getRefreshCredentialsText = () => {
		if ( saving ) {
			return __( 'Connecting…', 'comment-edit-pro' );
		}
		if ( isSaved ) {
			return __( 'Connected', 'comment-edit-pro' );
		}
		return __( 'Connect to MailerLite', 'comment-edit-pro' );
	};

	return (
		<>
			<div className="sce-admin__tabs--content-heading">
				<h2>
					<MailerLiteIcon width={ 48 } height={ 45 } aria-hidden="true" />
					<span className="sce-admin__heading--text">
						{ __( 'MailerLite', 'comment-edit-pro' ) }
					</span>
					<a
						className="sce-admin-heading-docs"
						target="_blank"
						rel="noreferrer"
						href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailerlite-integration"
					>
						({ __( 'Docs', 'comment-edit-pro' ) })
					</a>
				</h2>

				<p className="description">
					{ __(
						'When someone leaves a comment, they can be given the option to subscribe to your MailerLite account.',
						'comment-edit-pro'
					) }
				</p>
			</div>
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
							<th scope="row">{ __( 'MailerLite', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="enableMailerlite"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Enable MailerLite', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												clearErrors();
												onChange( boolValue );
											} }
											help={ __(
												'Enable or Disable the MailerLite Integration.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'enableMailerlite' ) && (
							<>
								{ getMailerLiteClassicSwitch() }
								{ ! getValues( 'enableMailerliteClassic' ) && (
									<>
										{ getAPIKey() }
										{ getMailerliteGroups() }
										{ getCustomFields() }
									</>
								) }
								{ getValues( 'enableMailerliteClassic' ) && (
									<>
										{ getClassicAPIKey() }
										{ getMailerliteClassicGroups() }
										{ getClassicFields() }
									</>
								) }
								{ getNewsletterLabel() }
								{ getSignupCheckbox() }
								{ getOptinCheckbox() }
							</>
						) }
					</tbody>
				</table>
				<div className="sce-admin-buttons">
					{ ( getValues( 'apiValid' ) || getValues( 'classicApiValid' ) ) && canShowSaveButton() && (
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
export default MailerLite;
