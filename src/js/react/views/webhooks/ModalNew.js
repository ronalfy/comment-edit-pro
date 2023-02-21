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

/**
 * Retrieve a webhook or create dummy ID if creating a new one.
 *
 * @param {number} id    The ID of the webhook to retrieve.
 * @param {string} nonce The nonce for the request.
 * @return {Promise} The promise for the request.
 */
const retrieveWebhook = ( id = 0, nonce = '' ) => {
	if ( '' === nonce ) {
		nonce = sceWebhooks.get_webhook_nonce;
	}
	return sendCommand( 'sce_retrieve_webhook', {
		webhook_id: id,
		nonce,
	} );
};

const ModalNew = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveWebhook, props.id, props.nonce );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Loading Webhook', 'comment-edit-pro' ) }</h2>
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
			webhookEnabled: true,
			requestMethod: 'POST',
			requestFormat: 'JSON',
			requestHeaders: [ { label: '', value: '', customName: '', customValue: '' } ],
			requestBody: [ { key: '', value: '', customValue: '' } ],
			sendApprovedComments: true,
			sendPendingComments: false,
			sendSpamComments: false,
			sendDeletedComments: false,
			sendEditedComments: false,

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

	const {
		fields: requestBodyFields,
		append: appendRequestBody,
		remove: removeRequestBody,
	} = useFieldArray( {
		control,
		name: 'requestBody',
	} );

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_webhook', {
			nonce: data.nonce,
			webhook_id: data.webhook_id,
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
				<table className="form-table sce-form-table-modal">
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
							<th scope="row">{ __( 'Enabled', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="webhookEnabled"
									control={ control }
									rules={ { required: true } }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											className="sce-admin__toggle-control"
											label={ __( 'Enabled', 'comment-edit-pro' ) }
											checked={ value }
											onChange={ ( methodValue ) => {
												onChange( methodValue );
											} }
										/>
									) }
								/>
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
									<div className="sce-admin__values-repeater__row sce-admin__values-repeater__row-heading">
										<div className="sce-admin__values-repeater__row__key">
											<h3>{ __( 'Name', 'comment-edit-pro' ) }</h3>
										</div>
										<div className="sce-admin__values-repeater__row__key">
											<h3>{ __( 'Value', 'comment-edit-pro' ) }</h3>
										</div>
										<div></div>
									</div>
									{ requestHeadersFields.map( ( item, index ) => (
										<div className="sce-admin__values-repeater__row" key={ item.id }>
											<div className="sce-admin__values-repeater__row__key">
												{ 'custom' === getValues( `requestHeaders[${ index }].name` ) && (
													<>
														<Controller
															name={ `requestHeaders[${ index }].customName` }
															control={ control }
															rules={ { required: true } }
															render={ ( { field: { onChange, value } } ) => (
																<TextControl
																	value={ value ?? '' }
																	className={ classNames( 'sce-admin__text-control', {
																		'has-error': 'required' === errors.requestHeaders?.[ index ]?.customName?.type,
																		'is-required': true,
																	} ) }
																	aria-required="true"
																	onChange={ ( methodValue ) => {
																		onChange( methodValue );
																	} }
																/>
															) }
														/>
														<Button
															className="sce-admin__text-control-reset button-reset"
															icon="no-alt"
															label={ __( 'Clear Text Input', 'comment-edit-pro' ) }
															onClick={ () => {
																setValue( `requestHeaders[${ index }].name`, 'none' );
															} }
															showTooltip={ false }
														/>
													</>
												) }
												{ 'custom' !== getValues( `requestHeaders[${ index }].name` ) && (
													<Controller
														name={ `requestHeaders[${ index }].name` }
														control={ control }
														rules={ { required: true } }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																value={ value }
																options={ RequestHeadersValues }
																onChange={ ( methodValue ) => {
																	onChange( methodValue );
																} }
															/>
														) }
													/>
												) }
											</div>
											<div className="sce-admin__values-repeater__row__value">
												{ 'custom' === getValues( `requestHeaders[${ index }].value` ) && (
													<>
														<Controller
															name={ `requestHeaders[${ index }].customValue` }
															control={ control }
															rules={ { required: true } }
															render={ ( { field: { onChange, value } } ) => (
																<TextControl
																	value={ value ?? '' }
																	className={ classNames( 'sce-admin__text-control', {
																		'has-error': 'required' === errors.requestHeaders?.[ index ]?.customValue?.type,
																		'is-required': true,
																	} ) }
																	aria-required="true"
																	onChange={ ( methodValue ) => {
																		onChange( methodValue );
																	} }
																/>
															) }
														/>
														<Button
															className="sce-admin__text-control-reset button-reset"
															icon="no-alt"
															label={ __( 'Clear Text Input', 'comment-edit-pro' ) }
															onClick={ () => {
																setValue( `requestHeaders[${ index }].value`, 'none' );
															} }
															showTooltip={ false }
														/>
													</>
												) }
												{ 'custom' !== getValues( `requestHeaders[${ index }].value` ) && (
													<Controller
														name={ `requestHeaders[${ index }].value` }
														control={ control }
														rules={ { required: true } }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																value={ value }
																options={ RequestHeaderFields }
																onChange={ ( methodValue ) => {
																	onChange( methodValue );
																} }
															/>
														) }
													/>
												) }

											</div>
											<div className="sce-admin__values-repeater__row__actions">
												<Button
													className="sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset"
													icon="plus"
													label={ __(
														'Add Request Header',
														'comment-edit-pro'
													) }
													onClick={ () => {
														appendRequestHeaders( index );
													} }
													showTooltip={ false }
												/>
												{ requestHeadersFields.length > 1 && (
													<Button
														className="sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset"
														icon="minus"
														label={ __(
															'Remove Request Header',
															'comment-edit-pro'
														) }
														onClick={ () => {
															removeRequestHeaders( index );
														} }
														showTooltip={ false }
													/>
												) }
											</div>
										</div>
									) ) }
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Request Body', 'comment-edit-pro' ) }</th>
							<td>
								<div className="sce-admin__values-repeater">
									<div className="sce-admin__values-repeater__row sce-admin__values-repeater__row-heading">
										<div className="sce-admin__values-repeater__row__key">
											<h3>{ __( 'Key', 'comment-edit-pro' ) }</h3>
										</div>
										<div className="sce-admin__values-repeater__row__key">
											<h3>{ __( 'Value', 'comment-edit-pro' ) }</h3>
										</div>
										<div></div>
									</div>
									{ requestBodyFields.map( ( item, index ) => (
										<div className="sce-admin__values-repeater__row" key={ item.id }>
											<div className="sce-admin__values-repeater__row__key">
												<Controller
													name={ `requestBody[${ index }].key` }
													control={ control }
													rules={ { required: true } }
													render={ ( { field: { onChange, value } } ) => (
														<TextControl
															value={ value ?? '' }
															className={ classNames( 'sce-admin__text-control', {
																'has-error': 'required' === errors.requestBody?.[ index ]?.key?.type,
																'is-required': true,
															} ) }
															aria-required="true"
															onChange={ ( methodValue ) => {
																onChange( methodValue );
															} }
														/>
													) }
												/>

											</div>
											<div className="sce-admin__values-repeater__row__value">
												{ 'custom' === getValues( `requestBody[${ index }].value` ) && (
													<>
														<Controller
															name={ `requestBody[${ index }].customValue` }
															control={ control }
															rules={ { required: true } }
															render={ ( { field: { onChange, value } } ) => (
																<TextControl
																	value={ value ?? '' }
																	className={ classNames( 'sce-admin__text-control', {
																		'has-error': 'required' === errors.requestBody?.[ index ]?.customValue?.type,
																		'is-required': true,
																	} ) }
																	aria-required="true"
																	onChange={ ( methodValue ) => {
																		onChange( methodValue );
																	} }
																/>
															) }
														/>
														<Button
															className="sce-admin__text-control-reset button-reset"
															icon="no-alt"
															label={ __( 'Clear Text Input', 'comment-edit-pro' ) }
															onClick={ () => {
																setValue( `requestBody[${ index }].value`, 'none' );
															} }
															showTooltip={ false }
														/>
													</>
												) }
												{ 'custom' !== getValues( `requestBody[${ index }].value` ) && (
													<Controller
														name={ `requestBody[${ index }].value` }
														control={ control }
														rules={ { required: true } }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																value={ value }
																options={ RequestHeaderFields }
																onChange={ ( methodValue ) => {
																	onChange( methodValue );
																} }
															/>
														) }
													/>
												) }

											</div>
											<div className="sce-admin__values-repeater__row__actions">
												<Button
													className="sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset"
													icon="plus"
													label={ __(
														'Add Request Body',
														'comment-edit-pro'
													) }
													onClick={ () => {
														appendRequestBody( index );
													} }
													showTooltip={ false }
												/>
												{ requestBodyFields.length > 1 && (
													<Button
														className="sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset"
														icon="minus"
														label={ __(
															'Remove Request Body',
															'comment-edit-pro'
														) }
														onClick={ () => {
															removeRequestBody( index );
														} }
														showTooltip={ false }
													/>
												) }
											</div>
										</div>
									) ) }
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Webhook Triggers', 'comment-edit-pro' ) }</th>
							<td><>
								<div className="sce-panel-row">
									<Controller
										name="sendApprovedComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												className="sce-admin__toggle-control"
												label={ __( 'Send Approved Comments', 'comment-edit-pro' ) }
												checked={ value }
												onChange={ ( methodValue ) => {
													onChange( methodValue );
												} }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="sendPendingComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												className="sce-admin__toggle-control"
												label={ __( 'Send Pending (Moderated) Comments', 'comment-edit-pro' ) }
												checked={ value }
												onChange={ ( methodValue ) => {
													onChange( methodValue );
												} }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="sendSpamComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												className="sce-admin__toggle-control"
												label={ __( 'Send Spam Comments', 'comment-edit-pro' ) }
												checked={ value }
												onChange={ ( methodValue ) => {
													onChange( methodValue );
												} }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="sendDeletedComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												className="sce-admin__toggle-control"
												label={ __( 'Send Deleted Comments', 'comment-edit-pro' ) }
												checked={ value }
												onChange={ ( methodValue ) => {
													onChange( methodValue );
												} }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="sendEditedComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												className="sce-admin__toggle-control"
												label={ __( 'Send Edited Comments', 'comment-edit-pro' ) }
												checked={ value }
												onChange={ ( methodValue ) => {
													onChange( methodValue );
												} }
											/>
										) }
									/>
								</div>
							</>
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
