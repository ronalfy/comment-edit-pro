/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import {
	useForm,
	Controller,
	useWatch,
	useFormState,
	useFieldArray,
} from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';

import {
	TextControl,
	Button,
	RadioControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';
import RequestMethodValues from './RequestMethodValues';
import RequestFormatValues from './RequestFormatValues';
import RequestHeadersValues from './RequestHeadersValues';
import RequestHeaderFields from './RequestHeaderFields';

const ModalNew = ( props ) => {
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );

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
			name: __( 'New Webhook', 'comment-edit-pro' ),
			webhookUrl: '',
			requestMethod: 'POST',
			requestFormat: 'JSON',
			requestHeaders: [ { label: '', value: '' } ],
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const {
		fields: requestHeadersFields,
		append: appendRequestHeaders,
		remove: removeRequestHeaders,
	} = useFieldArray( {
		control,
		name: 'requestHeaders',
	} );

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const onSubmit = ( formData ) => {
		// setSaving( true );
		// sendCommand( 'sce_save_mailchimp_options', {
		// 	nonce: sceIntegrations.save_nonce,
		// 	...formData,
		// } )
		// 	.then( ( ajaxResponse ) => {
		// 		const ajaxData = ajaxResponse.data.data;
		// 		const ajaxSuccess = ajaxResponse.data.success;
		// 		if ( ajaxSuccess ) {
		// 			const { lists, mailchimp_selected_list, mailchimp_signup_label } =
		// 				ajaxData;
		// 			const listsValues = [];
		// 			lists.forEach( ( keys, index ) => {
		// 				listsValues.push( keys );
		// 			} );
		// 			setValue( 'selectedList', mailchimp_selected_list );
		// 			setValue( 'mailchimpLists', listsValues );
		// 			setValue( 'signUpLabel', mailchimp_signup_label );
		// 			setIsSaved( true );
		// 			setTimeout( () => {
		// 				setIsSaved( false );
		// 			}, 3000 );
		// 		} else {
		// 			setError( 'apiKey', { type: 'noLists', message: ajaxData.message } );
		// 		}
		// 	} )
		// 	.catch( ( ajaxResponse ) => {} )
		// 	.then( ( ajaxResponse ) => {
		// 		setSaving( false );
		// 	} );
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
		return __( 'Save Webhook', 'quotes-dlx' );
	};

	return (
		<>
			<h2>{ __( 'Add New Webhook', 'comment-edit-pro' ) }</h2>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">{ __( 'Name', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="name"
									control={ control }
									rules={ { required: true } }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											label={ __( 'Webhook Name', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.name?.type,
												'is-required': true,
											} ) }
											aria-required="true"
											help={ __(
												'Add a name for this webhook to easily identify it in the list of webhooks.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								{ 'required' === errors.name?.type && (
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
							<th scope="row">{ __( 'Webhook URL', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="webhookUrl"
									control={ control }
									rules={ { required: true } }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											label={ __( 'Webhook URL', 'comment-edit-pro' ) }
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.webhookUrl?.type,
												'is-required': true,
											} ) }
											aria-required="true"
											help={ __(
												'Add the URL of the webhook you want to send data to.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								{ 'required' === errors.webhookUrl?.type && (
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
							<th scope="row">{ __( 'Request Method', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="requestMethod"
									control={ control }
									rules={ { required: true } }
									render={ ( { field: { onChange, value } } ) => (
										<SelectControl
											label={ __( 'Request Method', 'comment-edit-pro' ) }
											help={ __(
												'Select how the Webhook should send data to the URL.',
												'comment-edit-pro'
											) }
											value={ value }
											options={ RequestMethodValues }
											onChange={ ( methodValue ) => {
												onChange( methodValue );
											} }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Request Format', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="requestFormat"
									control={ control }
									rules={ { required: true } }
									render={ ( { field: { onChange, value } } ) => (
										<SelectControl
											label={ __( 'Request Format', 'comment-edit-pro' ) }
											help={ __(
												'Select how the Webhook should format the data sent to the URL.',
												'comment-edit-pro'
											) }
											value={ value }
											options={ RequestFormatValues }
											onChange={ ( methodValue ) => {
												onChange( methodValue );
											} }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Request Headers', 'comment-edit-pro' ) }</th>
							<td>
								<div className="sce-admin__values-repeater">
									{ requestHeadersFields.map( ( item, index ) => (
										<div className="sce-admin__values-repeater__row" key={ item.id }>
											<div className="sce-admin__values-repeater__row__key">
												<Controller
													name={ `requestHeaders[${ index }].name` }
													control={ control }
													rules={ { required: true } }
													render={ ( { field: { onChange, value } } ) => (
														<SelectControl
															label={ __( 'Name', 'comment-edit-pro' ) }
															value={ value }
															options={ RequestHeadersValues }
															onChange={ ( methodValue ) => {
																onChange( methodValue );
															} }
														/>
													) }
												/>
											</div>
											<div className="sce-admin__values-repeater__row__value">
												<Controller
													name={ `requestHeaders[${ index }].value` }
													control={ control }
													rules={ { required: true } }
													render={ ( { field: { onChange, value } } ) => (
														<SelectControl
															label={ __( 'Value', 'comment-edit-pro' ) }
															value={ value }
															options={ RequestHeaderFields }
															onChange={ ( methodValue ) => {
																onChange( methodValue );
															} }
														/>
													) }
												/>
											</div>
											<div className="sce-admin__values-repeater__row__actions">
												<Button
													className="sce-admin__values-repeater-remove"
													icon="minus"
													label={ __(
														'Remove Request Header',
														'comment-edit-pro'
													) }
													onClick={ () => {
														removeRequestHeaders( index );
													} }
												/>
											</div>
										</div>
									) ) }
								</div>
							</td>
						</tr>
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
export default ModalNew;
