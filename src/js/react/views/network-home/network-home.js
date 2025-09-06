/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import { isURL, isEmail } from '@wordpress/url';

import {
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
	RadioControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ValidateEmail from '../../validation/ValidateEmail';

const retrieveAdvancedSettings = () => {
	return sendCommand( 'sce_get_network_home_options', {
		nonce: sceNetworkHome.get_nonce,
	} );
};

const Network_Home = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveAdvancedSettings,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Home', 'comment-edit-pro' ) }</h2>
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
		clearErrors,
	} = useForm( {
		defaultValues: {
			disableAllComments: data.disableAllComments,
			hideCommentSection: data.hideCommentSection,
			enableNetworkWideSlack: data.enableNetworkWideSlack,
			slackWebhookUrl: data.slackWebhookUrl,
			slackModerationEnabled: data.slackModerationEnabled,
			slackEditCommentsEnabled: data.slackEditCommentsEnabled,
			timer: data.timer,
			timerOverride: data.timerOverride,
			deleteBehavior: data.deleteBehavior,
			spamBehavior: data.spamBehavior,
			overrideCommentNotificationEmail: data.overrideCommentNotificationEmail,
			commentNotificationEmail: data.commentNotificationEmail,
			unlimitedEditing: data.unlimitedEditing,
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
		sendCommand( 'sce_save_network_home_options', {
			nonce: sceNetworkHome.save_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
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
		sendCommand( 'sce_reset_network_home_options', {
			nonce: sceNetworkHome.reset_nonce,
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
		return __( 'Save Network Home Options', 'quotes-dlx' );
	};

	const getCommentEditingHeader = () => {
		return (
			<>
				<h2>
					{ __( 'Home', 'comment-edit-pro' ) }
				</h2>
				<p className="description">
					{ __(
						'Configure home settings, disable all comments, and set up Slack notifications for the network.',
						'comment-edit-pro'
					) }
				</p>
			</>
		);
	};

	return (
		<>
			{ getCommentEditingHeader() }
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table form-table-row-sections">
					<tbody>
						<tr>
							<th scope="row">{ __( 'Commenting', 'comment-edit-pro' ) }</th>
							<td>
								<div className="sce-panel-row">
									<Controller
										name="disableAllComments"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __( 'Disable All New Comments', 'comment-edit-pro' ) }
												className="sce-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enabling this will stop any new comments from being posted across the network.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="hideCommentSection"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __( 'Hide All Comments', 'comment-edit-pro' ) }
												className="sce-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Hide all comments from being shown on the frontend of the network.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="overrideCommentNotificationEmail"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<>
												<ToggleControl
													label={ __( 'Override Comment Notification Email', 'comment-edit-pro' ) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'Override the comment notification email for the network.',
														'comment-edit-pro'
													) }
												/>
											</>
										) }
									/>
								</div>
								{
									getValues( 'overrideCommentNotificationEmail' ) && (
										<>
											<div className="sce-panel-row">
												<Controller
													name="commentNotificationEmail"
													control={ control }
													rules={ {
														required: true,
														validate: ( value ) => {
															return isEmail( value );
														},
													} }
													render={ ( { field: { onChange, value } } ) => (
														<>
															<TextControl
																label={ __( 'Comment Notification Email', 'comment-edit-pro' ) }
																value={ value }
																onChange={ ( newValue ) => {
																	clearErrors( 'commentNotificationEmail' );
																	onChange( newValue );
																} }
																onBlur={ ( newValue ) => {
																	if ( ! isEmail( newValue ) ) {
																		setError( 'commentNotificationEmail', {
																			shouldFocus: true,
																		} );
																	} else {
																		clearErrors( 'commentNotificationEmail' );
																	}
																} }
																className={ classNames( 'sce-admin__text-control', {
																	'has-error': 'required' === errors.commentNotificationEmail?.type || 'validate' === errors.commentNotificationEmail?.type,
																	'is-required': true,
																} ) }
																aria-required="true"
															/>
															{ errors.commentNotificationEmail && (
																<Notice
																	message={ __( 'This does not appear to be a valid email address.', 'comment-edit-pro' ) }
																	status="error"
																	politeness="assertive"
																	inline={ false }
																	icon={ CircularExclamationIcon }
																/>
															) }
														</>
													) }
												/>
											</div>
										</>
									)
								}
								<div className="sce-panel-row">
									<Controller
										name="timerOverride"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<>
												<ToggleControl
													label={ __( 'Override Editing Timer Network-Wide', 'comment-edit-pro' ) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
												/>
											</>
										) }
									/>
								</div>
								{
									getValues( 'timerOverride' ) && (
										<>
											<div className="sce-panel-row">
												<Controller
													name="timer"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<TextControl
															label={ __( 'Timer Length (in minutes)', 'comment-edit-pro' ) }
															value={ value }
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
															type="number"
															className={ classNames( 'sce-admin__text-control', {
																'has-error': 'required' === errors.timer?.type,
																'is-required': true,
															} ) }
															aria-required="true"
														/>
													) }
												/>
											</div>
										</>
									)
								}
								<div className="sce-panel-row">
									<Controller
										name="unlimitedEditing"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __( 'Enable Unlimited Editing Network-Wide', 'comment-edit-pro' ) }
												className="sce-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enabling this will allow unlimited editing for logged-in users across the network.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="deleteBehavior"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'How should deleted comments be treated?',
													'comment-edit-pro'
												) }
												selected={ value }
												options={ [
													{
														label: __( 'Default', 'comment-edit-pro' ),
														value: 'default',
													},
													{
														label: __( 'Send to Trash', 'comment-edit-pro' ),
														value: 'trash',
													},
													{
														label: __( 'Delete Permanently', 'comment-edit-pro' ),
														value: 'delete',
													},
												] }
												onChange={ onChange }
												help={ __(
													'Choose whether to send deleted comments to the trash or delete them permanently. This affects comments deleted in the admin as well. This can be set per site, or globally here.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="spamBehavior"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'How should spammed comments be treated?',
													'comment-edit-pro'
												) }
												selected={ value }
												options={ [
													{
														label: __( 'Default', 'comment-edit-pro' ),
														value: 'default',
													},
													{
														label: __( 'Send to Spam', 'comment-edit-pro' ),
														value: 'spam',
													},
													{
														label: __( 'Spam and Delete', 'comment-edit-pro' ),
														value: 'delete',
													},
												] }
												onChange={ onChange }
												help={ __(
													'Choose whether to send spammed comments to the trash or delete them permanently. This affects comments marked as spam in the admin as well. This can be set per site, or globally here.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Slack Notifications', 'comment-edit-pro' ) }</th>
							<td>
								<div className="sce-panel-row">
									<Controller
										name="enableNetworkWideSlack"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __( 'Enable Network Wide Slack Notifications', 'comment-edit-pro' ) }
												className="sce-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enabling this will send Slack notifications for all comments across the network.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								{
									getValues( 'enableNetworkWideSlack' ) && (
										<>
											<div className="sce-panel-row">
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
															label={ __( 'Slack Webhook URL', 'comment-edit-pro' ) }
															value={ value }
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
															help={ __(
																'Enter your Slack webhook URL.',
																'comment-edit-pro'
															) }
															type="text"
															className={ classNames( 'sce-admin__text-control', {
																'has-error': 'required' === errors.slackWebhookUrl?.type || 'validate' === errors.slackWebhookUrl?.type,
																'is-required': true,
															} ) }
															aria-required="true"
														/>
													) }
												/>
											</div>
											<div className="sce-panel-row">
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
											</div>
											<div className="sce-panel-row">
												<Controller
													name="slackEditCommentsEnabled"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<ToggleControl
															label={ __( 'Enable Comment Editing Notifications', 'comment-edit-pro' ) }
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
											</div>
										</>
									)
								}
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
export default Network_Home;
