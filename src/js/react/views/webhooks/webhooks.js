/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Suspense, useContext, lazy } from 'react';

import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import {
	TextControl,
	Button,
	ToggleControl,
	Modal as WPModal,
} from '@wordpress/components';
import BeatLoader from 'react-spinners/BeatLoader';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import sendCommand from '../../../SendCommand';
import Notice from '../../components/Notice';
import KeyIcon from '../../components/icons/KeyIcon';
import VialIcon from '../../components/icons/VialIcon';
import Spinner from '../../components/icons/Spinner';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import CircularInfo from '../../components/icons/CircularInfo';
import CodeBranchIcon from '../../components/icons/CodeBranchIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashRegular from '../../components/icons/EyeSlashRegular';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import WebhooksIcon from '../../components/icons/Webhooks';
import WebhooksContext from './Context';
import Modal from '../../components/Modal';
import useStateCallback from '../../hooks/useStateCallback';

const ModalNew = lazy( () =>
	import( /* webpackChunkName: "WebhookModalNew0.0.1" */ './ModalNew' )
);

const retrieveWebhooks = () => {
	return sendCommand( 'sce_get_webhooks', {
		nonce: sceWebhooks.get_nonce,
	} );
};

const Webhooks = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveWebhooks, [] );
	return (
		<Suspense
			fallback={
				<>
					<div className="sce-admin-panel-area">
						<div className="sce-panel-row">
							<h2>{ __( 'Webhooks', 'comment-edit-pro' ) }</h2>
							<BeatLoader
								color={ '#9c68b0' }
								loading={ true }
								cssOverride={ true }
								size={ 25 }
								speedMultiplier={ 0.65 }
							/>
						</div>
					</div>
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

	const [ showModal, setShowModal ] = useStateCallback( false );
	const [ showWPModal, setShowWPModal ] = useState( false );
	const [ modalParams, setModalParams ] = useState( {
		type: 'prompt',
		title: '',
		message: '',
		onClose: () => {},
		onConfirm: () => {},
		isDismissible: true,
		shouldCloseOnClickOutside: true,
	} );
	const [ editModalParams, setEditModalParams ] = useStateCallback( {
		id: 0,
		nonce: '',
	} );
	const [ modalCount, setModalCount ] = useState( 0 );

	const { existingWebhooks, setExistingWebhooks } = useContext( WebhooksContext );

	const { webhooks } = data;

	// Set webhooks when they load in,.
	useEffect( () => {
		setExistingWebhooks( webhooks );
	}, [ webhooks ] );

	/**
	 * Update webhook data row with new data.
	 *
	 * @param {Array}  webhookData Existing webhook data.
	 * @param {number} webhookId   The webhook ID.
	 * @param {Object} rowData     Row data to replace.
	 * @return {Array} Updated webhook data.
	 */
	const updateWebhooksRow = ( webhookData, webhookId, rowData ) => {
		const updatedWebhooks = webhookData.map( ( webhook ) => {
			if ( webhook.id === webhookId ) {
				return rowData;
			}
			return webhook;
		} );
		return updatedWebhooks;
	};

	/**
	 * Disables a webhook.
	 *
	 * @param {number} id    The webhook ID.
	 * @param {string} nonce The webhook nonce.
	 * @return {Promise} The ajax promise.
	 */
	const disableWebhook = async( id, nonce ) => {
		const disableResponse = await sendCommand( 'sce_disable_webhook', {
			nonce,
			id,
		} );
		return disableResponse;
	};
	/**
	 * Enables a webhook.
	 *
	 * @param {number} id    The webhook ID.
	 * @param {string} nonce The webhook nonce.
	 * @return {Promise} The ajax promise.
	 */
	const enableWebhook = async( id, nonce ) => {
		const enableResponse = await sendCommand( 'sce_enable_webhook', {
			nonce,
			id,
		} );
		return enableResponse;
	};
	/**
	 * Deletes a webhook.
	 *
	 * @param {number} id    The webhook ID.
	 * @param {string} nonce The webhook nonce.
	 * @return {Promise} The ajax promise.
	 */
	const deleteWebhook = async( id, nonce ) => {
		const deleteResponse = await sendCommand( 'sce_delete_webhook', {
			nonce,
			id,
		} );
		return deleteResponse;
	};

	const getWebhooksHeader = () => {
		return (
			<div className="sce-admin__tabs--content-heading">
				<h2>
					<WebhooksIcon width={ 48 } height={ 48 } aria-hidden="true" />
					<span className="sce-admin__heading--text">
						{ __( 'Webhooks', 'comment-edit-pro' ) }
					</span>
				</h2>
				<p className="description">
					{ __(
						'Add or modify webhooks to send after each comment has been posted or edited.',
						'comment-edit-pro'
					) }
				</p>
			</div>
		);
	};

	return (
		<>
			<div className="sce-admin-panel-area">
				{ showModal && (
					<WPModal
						title={
							0 !== editModalParams.id
								? __( 'Edit Existing Webhook', 'comment-edit-pro' )
								: __( 'Add New Webhook', 'comment-edit-pro' )
						}
						isDismissible={ true }
						shouldCloseOnClickOutside={ false }
						isFullScreen={ true }
						onRequestClose={ () => {
							setShowModal( false );
							setEditModalParams( { id: 0, nonce: '' } );
							setModalCount( modalCount + 1 );
						} }
						key={ modalCount }
					>
						<div className="sce-panel-row">
							<ModalNew
								id={ editModalParams.id }
								nonce={ editModalParams.nonce }
								modalNumber={ modalCount }
								onSave={ ( webhookData ) => {
									// Clear modal data.
									setEditModalParams( { id: 0, nonce: '' } );
									// Increase the modal count.
									setModalCount( modalCount + 1 );

									// Determine if we need to update a webhook in the table, or add a new entry.
									const webhookExists = existingWebhooks.find(
										( webhook ) => webhook.id === webhookData.id
									);
									if ( webhookExists ) {
										// Update the webhook.
										const updatedWebhooks = updateWebhooksRow(
											existingWebhooks,
											webhookData.id,
											webhookData
										);
										setExistingWebhooks( updatedWebhooks );
									} else {
										// Add the webhook.
										setExistingWebhooks( [ ...existingWebhooks, webhookData ] );
									}

									// Close the modal.
									setShowModal( false );
								} }
							/>
						</div>
					</WPModal>
				) }
				{ showWPModal && (
					<Modal
						title={ modalParams.title }
						onClose={ modalParams.onClose }
						onConfirm={ modalParams.onConfirm }
						type={ modalParams.type }
						message={ modalParams.message }
						isDismissible={ modalParams.isDismissible }
						shouldCloseOnClickOutside={ modalParams.shouldCloseOnClickOutside }
					/>
				) }
				<div className="sce-panel-row">{ getWebhooksHeader() }</div>
				<div className="sce-panel-webhooks-button_wrapper sce-admin-buttons sce-admin-buttons-flex-right">
					<Button
						className="sce-panel-webhooks-button sce__btn-action"
						onClick={ ( e ) => {
							setShowModal( true );
						} }
						icon={ WebhooksIcon }
						iconSize={ 3 }
					>
						{ __( 'Add New Webhook', 'comment-edit-pro' ) }
					</Button>
				</div>
				<div className="sce-panel-webhooks-table__wrapper">
					<table className="sce-panel-webhooks-table">
						<thead>
							<tr>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Name', 'comment-edit-pro' ) }
								</th>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Status', 'comment-edit-pro' ) }
								</th>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Webhook URL', 'comment-edit-pro' ) }
								</th>
							</tr>
						</thead>
						<tbody>
							{ existingWebhooks.length > 0 &&
								existingWebhooks.map( ( webhook, index ) => {
									return (
										<tr
											key={ webhook.id }
											className={ classNames( {
												'sce-delete-row': webhook?.isDeleted,
											} ) }
										>
											<td className="sce-panel-webhooks-table__data">
												<div className="sce-panel-webhooks-name">
													{ webhook.name }
												</div>
												<div className="sce-panel-webhooks-actions">
													<Button
														className="sce-panel-webhooks-button sce__btn-action"
														onClick={ () => {
															setEditModalParams(
																{
																	id: 0,
																	nonce: '',
																},
																() => {
																	setEditModalParams( {
																		id: webhook.id,
																		nonce: webhook.edit_nonce,
																	} );
																	setShowModal( true );
																}
															);
														} }
														variant="link"
													>
														{ __( 'Edit', 'comment-edit-pro' ) }
													</Button>
													{ ' | ' }
													<Button
														className="sce-panel-webhooks-button sce__btn-action
														sce__btn-delete"
														onClick={ () => {
															setModalParams( {
																title: __(
																	'Please confirm the deletion of this webhook',
																	'comment-edit-pro'
																),
																message: __(
																	'Deleting this webhook cannot be undone.',
																	'comment-edit-pro'
																),
																type: 'prompt',
																isDismissible: false,
																shouldCloseOnClickOutside: false,
																onConfirm: () => {
																	// Copy webhook and update state.
																	const webhookCopy = { ...webhook };
																	if ( webhookCopy?.isDeleted ) {
																		return;
																	}
																	webhookCopy.deleting = true;

																	// Update the row.
																	const updatedWebhooksStatus =
																		updateWebhooksRow(
																			existingWebhooks,
																			webhook.id,
																			webhookCopy
																		);
																	// Update the context/state.
																	setExistingWebhooks( updatedWebhooksStatus );

																	// Delete the webhook.
																	const deleteResposne = deleteWebhook(
																		webhook.id,
																		webhook.delete_nonce
																	);
																	deleteResposne.then( ( ajaxResponse ) => {
																		const ajaxData = ajaxResponse.data;
																		if ( ajaxData.success ) {
																			// Get a copy of the webhook, update table, and set timer to remove.
																			const webhookDeleteCopy = { ...webhook };
																			webhookDeleteCopy.isDeleted = true;

																			// Update the row.
																			const webhookDeleted = updateWebhooksRow(
																				existingWebhooks,
																				webhook.id,
																				webhookDeleteCopy
																			);
																			// Update the context/state.
																			setExistingWebhooks( webhookDeleted );

																			// Set timer to remove webhook.
																			setTimeout( () => {
																				// Remove the webhook from the table.
																				const updatedWebhooks =
																					existingWebhooks.filter(
																						( webhookFilter ) =>
																							webhookFilter.id !==
																							ajaxData.data.id
																					);
																				setExistingWebhooks( updatedWebhooks );
																			}, 800 );
																		} else {
																			// Show error message.
																			setModalParams( {
																				title: __(
																					'Error deleting webhook',
																					'comment-edit-pro'
																				),
																				message: ajaxData.message,
																				type: 'error',
																				isDismissible: true,
																				shouldCloseOnClickOutside: true,
																			} );
																		}
																	} );
																	setShowWPModal( false );
																},
																onClose: () => {
																	setShowWPModal( false );
																},
															} );
															setShowWPModal( true );
														} }
														variant="link"
													>
														{ webhook?.deleting
															? __( 'Deleting…', 'comment-edit-pro' )
															: __( 'Delete', 'comment-edit-pro' ) }
													</Button>
												</div>
											</td>
											<td className="sce-panel-webhooks-table__data">
												<div className="sce-panel-row">
													<ToggleControl
														className="sce-admin__toggle-control"
														checked={ webhook.enabled }
														onChange={ ( value ) => {
															// Create copy of webhook.
															const webhookCopy = { ...webhook };
															webhookCopy.enabled = value;

															// Update the row.
															const updatedWebhooks = updateWebhooksRow(
																existingWebhooks,
																webhook.id,
																webhookCopy
															);

															// Update the context/state.
															setExistingWebhooks( updatedWebhooks );

															// Perform Ajax requests.
															if ( ! value ) {
																const disableResponse = disableWebhook(
																	webhook.id,
																	webhook.disable_nonce
																);
																disableResponse.then( ( ajaxResponse ) => {
																	const ajaxData = ajaxResponse.data;
																	if ( ! ajaxData.success ) {
																		// Notify user.
																		setModalParams( {
																			title: __(
																				'There was an error changing the Webhook status',
																				'comment-edit-pro'
																			),
																			message: ajaxData.data.message,
																			type: 'error',
																			isDismissible: true,
																			shouldCloseOnClickOutside: true,
																			onClose: () => {
																				setShowWPModal( false );
																			},
																		} );
																		setShowWPModal( true );

																		// Revert the row.
																		const revertedWebhooks = updateWebhooksRow(
																			webhooks,
																			webhook.id,
																			webhook
																		);
																		setExistingWebhooks( revertedWebhooks );
																	}
																} );
															} else {
																const enableResponse = enableWebhook(
																	webhook.id,
																	webhook.enable_nonce
																);
																enableResponse.then( ( ajaxResponse ) => {
																	const ajaxData = ajaxResponse.data;
																	// Revert the row.
																	if ( ! ajaxData.success ) {
																		// Notify user.
																		setModalParams( {
																			title: __(
																				'There was an error changing the Webhook status',
																				'comment-edit-pro'
																			),
																			message: ajaxData.data.message,
																			type: 'error',
																			isDismissible: true,
																			shouldCloseOnClickOutside: true,
																			onClose: () => {
																				setShowWPModal( false );
																			},
																		} );
																		setShowWPModal( true );

																		// Revert the row.
																		const revertedWebhooks = updateWebhooksRow(
																			webhooks,
																			webhook.id,
																			webhook
																		);
																		setExistingWebhooks( revertedWebhooks );
																	}
																} );
															}
														} }
														label={ __( 'Enabled', 'comment-edit-pro' ) }
													/>
												</div>
											</td>
											<td className="sce-panel-webhooks-table__data">
												{ webhook.url }
											</td>
										</tr>
									);
								} ) }
							{ existingWebhooks.length === 0 && (
								<tr>
									<td className="sce-panel-webhooks-table__data" colSpan="3">
										{ __( 'No webhooks have been added yet.', 'comment-edit-pro' ) }
									</td>
								</tr>
							) }
						</tbody>
						<tfoot>
							<tr>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Name', 'comment-edit-pro' ) }
								</th>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Status', 'comment-edit-pro' ) }
								</th>
								<th className="sce-panel-webhooks-table__header" scope="col">
									{ __( 'Webhook URL', 'comment-edit-pro' ) }
								</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</>
	);
};
export default Webhooks;
