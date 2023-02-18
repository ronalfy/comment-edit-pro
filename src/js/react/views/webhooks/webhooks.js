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

	const [ showModal, setShowModal ] = useState( true );
	
	const {
		webhooks,
	} = data;
	console.log( data );
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
					<div className="sce-panel-row"><ModalNew /></div>
				)}
				<div className="sce-panel-row">
					{ getWebhooksHeader() }
				</div>
				<div className="sce-panel-webhooks-button_wrapper sce-admin-buttons sce-admin-buttons-flex-right">
					<Button
						className="sce-panel-webhooks-button sce__btn-action"
						onClick={ () => {
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
							{
								webhooks.length > 0 && webhooks.map( ( webhook, index ) => {
									return (
										<tr key={ index }>
											<td className="sce-panel-webhooks-table__data">
												{ webhook.name }
											</td>
											<td className="sce-panel-webhooks-table__data">
												{ webhook.url }
											</td>
										</tr>
									);
								} )
							}
							{ webhooks.length === 0 && (
								<tr>
									<td className="sce-panel-webhooks-table__data" colSpan="3">
										{ __(
											'No webhooks have been added yet.',
											'comment-edit-pro'
										) }
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
