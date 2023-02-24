/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import { isURL } from '@wordpress/url';
import { escapeAttribute } from '@wordpress/escape-html';

import {
	TextControl,
	Button,
	ToggleControl,
	RadioControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';

const retrieveRecaptchaSettings = () => {
	return sendCommand( 'sce_get_slack_options', {
		nonce: sceIntegrations.get_nonce,
	} );
};

const Slack = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveRecaptchaSettings,
		[]
	);
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Slack Settings.', 'comment-edit-pro' ) }
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
						<h2>{ __( 'Slack', 'comment-edit-pro' ) }</h2>
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
			slackEnabled: data.slackEnabled,
			slackWebhookUrl: data.slackWebhookUrl,
			slackModerationEnabled: data.slackModerationEnabled,
			slackEditCommentsEnabled: data.slackEditCommentsEnabled,
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
		sendCommand( 'sce_save_slack_options', {
			nonce: sceIntegrations.save_nonce,
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
		sendCommand( 'sce_reset_slack_options', {
			nonce: sceIntegrations.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( {
						slackEnabled: false,
						slackWebhookUrl: '',
						slackModerationEnabled: false,
						slackEditCommentsEnabled: false,
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

	const getWebhookUrl = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Slack Webhook URL', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="slackWebhookUrl"
						control={ control }
						rules={ {
							required: true,
							validate: ( value ) => {
								return isURL( value );
							},
						} }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Slack Webhook URL', 'quotes-dlx' ) }
								value={ escapeAttribute( value ) }
								className={ classNames( 'sce-admin__text-control', {
									'has-error': ( 'required' === errors.slackWebhookUrl?.type || 'validate' === errors.slackWebhookUrl?.type ),
									'is-required': true,
								} ) }
								help={ __( 'Enter your Slack webhook URL', 'comment-edit-pro' ) }
								aria-required="true"
								onChange={ ( newValue ) => {
									onChange( newValue );
								} }
							/>
						) }
					/>
					{ 'required' === errors.slackWebhookUrl?.type && (
						<Notice
							message={ __(
								'This field is a required field.',
								'comment-edit-pro'
							) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'validate' === errors.slackWebhookUrl?.type && (
						<Notice
							message={ __( 'Please enter a valid URL.', 'comment-edit-pro' ) }
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

	const getModerationCheckbox = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Moderated Comments', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="slackModerationEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Moderated Comments', 'comment-edit-pro' ) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'You will also receive notifications from comments in moderation.',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	const getEditCommentsCheckbox = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Edited Comments', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="slackEditCommentsEnabled"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Comment Editing Notifications',
									'comment-edit-pro'
								) }
								className="sce-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'When a user edits their comment, send a Slack notification.',
									'comment-edit-pro'
								) }
							/>
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
		return __( 'Save Slack Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Disconnecting…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Disconnected', 'quotes-dlx' );
		}
		return __( 'Disconnect From Slack', 'quotes-dlx' );
	};

	return (
		<>
			<h2>
				{ __( 'Slack Notifications', 'comment-edit-pro' ) }{ ' ' }
				<a
					className="sce-admin-heading-docs"
					target="_blank"
					rel="noreferrer"
					href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/slack-integration"
				>
					({ __( 'Docs', 'comment-edit-pro' ) })
				</a>
			</h2>
			<p className="description">
				{ __(
					'Receive a Slack notification when someone leaves a comment.',
					'comment-edit-pro'
				) }
			</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">
								{ __( 'Enable Slack Notifications', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="slackEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Slack Notifications',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												onChange( boolValue );
											} }
											help={ __(
												'Enable or disable Recaptcha 3 support.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'slackEnabled' ) && (
							<>
								{ getWebhookUrl() }
								{ getModerationCheckbox() }
								{ getEditCommentsCheckbox() }
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
					{ getValues( 'slackEnabled' ) && (
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
export default Slack;
