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
import ConvertKitIcon from '../../components/icons/ConvertKit';

const retrieveConvertKitOptions = () => {
	return sendCommand( 'sce_get_convertkit_options', {
		nonce: sceIntegrations.ck_get_nonce,
	} );
};

const ConvertKit = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveConvertKitOptions,
		[]
	);
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load ConvertKit Settings.', 'comment-edit-pro' ) }
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
	const tagInput = useRef( null );
	const customFieldInputRef = useRef( null );
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ credentialsRefreshing, setCredentialsRefreshing ] = useState( false );
	const [ isRefreshingTags, setIsRefreshingTags ] = useState( false );
	const [ isRefreshingForms, setIsRefreshingForms ] = useState( false );
	const [ isRefreshingCustomFields, setIsRefreshingCustomFields ] = useState( false );
	const [ isAddingTag, setIsAddingTag ] = useState( false );
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
			enableConvertKit: data.enableConvertKit,
			apiValid: data.apiValid,
			apiKey: data.apiKey,
			secretKey: data.secretKey,
			signUpLabel: data.signUpLabel,
			checkboxEnabled: data.checkboxEnabled,
			formOrTag: data.formOrTag,
			forms: data.forms ?? [],
			tags: data.tags ?? [],
			customFields: data.customFields ?? [],
			selectedForm: data.selectedForm,
			tagInput: '',
			customFieldInput: '',
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
		if ( ! getValues( 'enableConvertKit' ) ) {
			return false;
		}

		// If api isn't valid, refresh.
		if ( ! getValues( 'apiValid' ) ) {
			return true;
		}
		if ( isDirty && ( dirtyFields.apiKey || dirtyFields.secretKey ) ) {
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
		if ( ! getValues( 'enableConvertKit' ) && ! isDirty ) {
			return false;
		}

		// If convertKit is disabled, we can always save.
		if ( ! getValues( 'enableConvertKit' ) ) {
			return true;
		}

		const forms = getValues( 'forms' );
		const tags = getValues( 'tags' );

		if ( getValues( 'apiValid' ) && ( forms.length === 0 && tags.length === 0 ) ) {
			return false;
		}
		if ( ! getValues( 'apiValid' ) && isDirty ) {
			return false;
		}
		if ( needsCredentialRefresh() ) {
			return false;
		}

		// Check to see if any forms are selected.
		if ( getValues( 'formOrTag' ) === 'form' ) {
			if ( forms.length === 0 ) {
				return false;
			}
			if ( '0' === getValues( 'selectedForm' ) ) {
				return false;
			}
			if ( '0' !== getValues( 'selectedForm' ) ) {
				// Check if selectedForm is not in the forms array.
				const selectedForm = getValues( 'selectedForm' );
				let selected = false;
				forms.forEach( ( form ) => {
					if ( form.value === selectedForm ) {
						selected = true;
					}
				} );
				if ( ! selected ) {
					return false;
				}
			}
		}

		// Check to see if any tags are selected.
		if ( getValues( 'formOrTag' ) === 'tag' ) {
			if ( tags.length === 0 ) {
				return false;
			}
			let selected = false;
			tags.forEach( ( tag ) => {
				if ( tag.selected ) {
					selected = true;
				}
			} );
			if ( ! selected ) {
				return false;
			}
		}
		return true;
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
		sendCommand( 'sce_refresh_convertkit_connection', {
			nonce: sceIntegrations.ck_refresh_nonce,
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

	const onAddTag = ( tagLabel ) => {
		tagLabel = tagLabel.trim();
		if ( '' === tagLabel ) {
			setError( 'tagInput', { type: 'addTagError', message: __( 'Tag name cannot be empty.', 'comment-edit-pro' ) } );
			return;
		}

		// Check to see if label is in use.
		const currentTags = getValues( 'tags' );
		const tagExists = currentTags.find( ( tag ) => tag.label === tagLabel );
		if ( tagExists ) {
			setError( 'tagInput', { type: 'addTagError', message: __( 'Tag name already in use.', 'comment-edit-pro' ) } );
			return;
		}

		// Start adding the tag.
		setIsAddingTag( true );
		sendCommand( 'sce_add_convertkit_tag', {
			nonce: sceIntegrations.ck_add_tag_nonce,
			label: tagLabel,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { tags } = ajaxData;
					const newTagValues = [];
					tags.forEach( ( keys, index ) => {
						newTagValues.push( keys );
					} );
					setValue( 'tagInput', '' );
					setValue( 'tags', newTagValues );
				} else {
					setError( 'tagInput', { type: 'addTagError', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsAddingTag( false );
				tagInput.current.focus();
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
		sendCommand( 'sce_add_convertkit_custom_field', {
			nonce: sceIntegrations.ck_add_custom_field_nonce,
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

	const onHandleTagsRefresh = ( formData ) => {
		setIsRefreshingTags( true );
		sendCommand( 'sce_refresh_convertkit_tags', {
			nonce: sceIntegrations.ck_refresh_tags_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { tags, apiValid } = ajaxData;
					const newTagValues = [];
					const oldTagValues = getValues( 'tags' );
					tags.forEach( ( keys, index ) => {
						// Use old selection state for new tags.
						const oldTag = oldTagValues.find( ( tag ) => tag.value === keys.value );
						if ( oldTag ) {
							keys.selected = oldTag.selected;
						}
						newTagValues.push( keys );
					} );
					const updatedFormValues = {
						tags: newTagValues,
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
					setError( 'tags', { type: 'noTags', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingTags( false );
			} );
	};

	const onHandleFormsRefresh = ( formData ) => {
		setIsRefreshingForms( true );
		sendCommand( 'sce_refresh_convertkit_forms', {
			nonce: sceIntegrations.ck_refresh_forms_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					const { forms, apiValid } = ajaxData;

					const updatedFormValues = {
						forms,
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
					setError( 'forms', { type: 'noForms', message: ajaxData.message } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setIsRefreshingForms( false );
			} );
	};

	const onHandleCustomFieldsRefresh = ( formData ) => {
		setIsRefreshingCustomFields( true );
		sendCommand( 'sce_refresh_convertkit_custom_fields', {
			nonce: sceIntegrations.ck_refresh_custom_fields_nonce,
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

	/**
	 * Gets the form or tag radio option.
	 *
	 * @return {JSX.Element} Form or tags interface.
	 */
	const getFormOrTag = () => {
		if ( needsCredentialRefresh() ) {
			return <></>;
		}
		const forms = getValues( 'forms' );
		const tags = getValues( 'tags' );
		return (
			<tr>
				<th scope="row">{ __( 'Forms and Tags', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="formOrTag"
						control={ control }
						rules={ { required: true } }
						render={ ( { field: { onChange, value } } ) => (
							<>
								<RadioControl
									label={ __(
										'Add Subscribers to Forms or Tags',
										'comment-edit-pro'
									) }
									help={ __(
										'Select whether to add new subscribers to a an existing ConvertKit form or tag(s).',
										'comment-edit-pro'
									) }
									selected={ getValues( 'formOrTag' ) }
									options={ [
										{
											label: __( 'Forms and Tags', 'comment-edit-pro' ),
											value: 'form',
										},
										{
											label: __( 'Tags Only', 'comment-edit-pro' ),
											value: 'tag',
										},
									] }
									onChange={ ( formOrTagValue ) => {
										onChange( formOrTagValue );
									} }
								/>
							</>
						) }
					/>
				</td>
			</tr>
		);
	};

	const getConvertKitForms = () => {
		// Get forms.
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const convertKitForms = getValues( 'forms' );
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() || 'form' !== getValues( 'formOrTag' ) ) {
			return <></>;
		}

		return (
			<tr>
				<th scope="row">{ __( 'ConvertKit Forms (Required)', 'comment-edit-pro' ) }</th>
				<td>
					<>
						{ convertKitForms.length !== 0 && (
							<Controller
								name="selectedForm"
								control={ control }
								rules={ { required: true } }
								render={ ( { field: { onChange, value } } ) => (
									<RadioControl
										label={ __(
											'Select a form for your subscribers',
											'comment-edit-pro'
										) }
										help={ __(
											'Select a default form that will be used when signing up your subscribers.',
											'comment-edit-pro'
										) }
										selected={ value }
										options={ getValues( 'forms' ) }
										onChange={ ( formSelectedValue ) => {
											onChange( formSelectedValue );
										} }
										className={ classNames( {
											'has-error': 'required' === errors.apiKey?.type,
											'is-required': true,
										} ) }
									/>
								) }
							/>
						) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingForms }
								disabled={ isRefreshingForms }
								onClick={ () => {
									onHandleFormsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingForms },
									{ 'is-saving': isRefreshingForms },
								) }
								text={ isRefreshingForms ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Forms', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'required' === errors.selectedForm?.type && (
							<Notice
								message={ __( 'This field is a required field.' ) }
								status="error"
								politeness="assertive"
								inline={ true }
								icon={ CircularExclamationIcon }
							/>
						) }
					</>
					{ 'form' === getValues( 'formOrTag' ) && convertKitForms.length === 0 && (
						<Notice
							message={ __(
								'There are no forms associated with this ConvertKit account and setup cannot continue. Please create a form in ConvertKit or try tags instead.',
								'comment-edit-pro'
							) }
							status="error"
							politeness="assertive"
							inline={ false }
							icon={ CircularExclamationIcon }
						/>
					) }
				</td>
			</tr>
		);
	};

	const getConvertKitTags = () => {
		// Don't show tags if api is invalid.
		if ( ! getValues( 'apiValid' ) || needsCredentialRefresh() ) {
			return <></>;
		}

		const convertKitTags = getValues( 'tags' );
		return (
			<tr>
				<th scope="row">
					{ __( 'ConvertKit Tags', 'comment-edit-pro' ) }
				</th>
				<td>
					<>
						{ 'tag' === getValues( 'formOrTag' ) && getValues( 'tags' ).length === 0 && (
							<Notice
								message={ __(
									'There are no tags available. Try creating a tag below.',
									'comment-edit-pro'
								) }
								status="warning"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						{ convertKitTags.length > 0 && getValues( 'apiValid' ) &&
						convertKitTags.map( ( tag, index ) => (
							<Controller
								key={ index }
								name={ `tags[${ index }].selected` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<CheckboxControl
										label={ tag.label }
										onChange={ ( enableValue ) => {
											onChange( enableValue );
										} }
										checked={ getValues( 'tags' )[ index ].selected ?? false }
									/>
								) }
							/>
						) ) }
						<div className="sce-admin-buttons">
							<Button
								isBusy={ isRefreshingTags }
								disabled={ isRefreshingTags }
								onClick={ () => {
									onHandleTagsRefresh();
								} }
								className={ classNames(
									'qdlx__btn qdlx__btn-link qdlx__btn--icon-right',
									{ 'has-error': hasErrors() },
									{ 'has-icon': isRefreshingTags },
									{ 'is-saving': isRefreshingTags },
								) }
								text={ isRefreshingTags ? __( 'Refreshing…', 'comment-edit-pro' ) : __( 'Refresh Tags', 'comment-edit-pro' ) }
							/>
						</div>
						{ 'noTags' === errors.tags?.type && (
							<Notice
								message={ errors.tags?.message }
								status="error"
								politeness="assertive"
								inline={ false }
								icon={ CircularExclamationIcon }
							/>
						) }
						<div className="sce-convertkit-add-tag">
							<div className="sce-convertkit-add-tag-group">
								<Controller
									name="tagInput"
									control={ control }
									rules={ {
										pattern: /[-_ 0-9A-Za-z]/,
									} }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											type="text"
											value={ value }
											onChange={ ( tagInputValue ) => {
												clearErrors( 'tagInput' );
												onChange( tagInputValue );
											} }
											label={ __( 'Add New Tag', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.tagInput?.type,
											} ) }
											placeholder={ __( 'Tag Name', 'comment-edit-pro' ) }
											aria-required="true"
											ref={ tagInput }
										/>
									) }
								/>
								<div className="sce-admin-buttons">
									<Button
										onClick={ async( e ) => {
											const validationResult = await trigger( 'tagInput' );
											if ( validationResult ) {
												onAddTag( getValues( 'tagInput' ) );
											}
										} }
										className={ classNames(
											'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right',
										) }
										text={
											isAddingTag
												? __( 'Adding…', 'comment-edit-pro' )
												: __( 'Add New Tag', 'comment-edit-pro' ) }
									/>
								</div>
							</div>
							{ 'pattern' === errors.tagInput?.type && (
								<Notice
									message={ __( 'Special characters are not allowed in tags.', 'comment-edit-pro' ) }
									status="error"
									politeness="assertive"
									inline={ false }
									icon={ CircularExclamationIcon }
								/>
							) }
							{ 'addTagError' === errors.tagInput?.type && (
								<Notice
									message={ errors.tagInput?.message }
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
											isAddingTag
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
								label={ __( 'ConvertKit API Key', 'comment-edit-pro' ) }
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
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'ConvertKit Secret Key', 'comment-edit-pro' ) }
								type="text"
								value={ value }
								onChange={ ( secretKey ) => {
									onChange( secretKey );
									clearErrors();
								} }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': 'required' === errors.secretKey?.type,
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
							message={ errors.secretKey?.message }
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

	return (
		<>
			<div className="sce-admin__tabs--content-heading">
				<h2>
					<ConvertKitIcon width={ 48 } height={ 45 } fill={ '#FB6068' } aria-hidden="true" />
					<span className="sce-admin__heading--text">
						{ __( 'ConvertKit', 'comment-edit-pro' ) }
					</span>
				</h2>

				<p className="description">
					{ __(
						'When someone leaves a comment, they can be given the option to subscribe to your ConvertKit account.',
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
												clearErrors();
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
								{ getCustomFields() }
								{ getNewsletterLabel() }
								{ getSignupCheckbox() }
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
export default ConvertKit;
