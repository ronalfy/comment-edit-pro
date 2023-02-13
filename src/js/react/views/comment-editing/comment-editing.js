/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { escapeAttribute } from '@wordpress/escape-html';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';

import {
	TextControl,
	Button,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ValidateEmail from '../../validation/ValidateEmail';

const retrieveCommentEditingOptions = () => {
	return sendCommand( 'sce_get_comment_editing_options', {
		nonce: sceCommentEditing.get_nonce,
	} );
};

const CommentEditing = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveCommentEditingOptions, [] );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Comment Editing', 'comment-edit-pro' ) }</h2>
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

	console.log( data );

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
			timer: data.timer,
			enableCommentEditing: data.enableCommentEditing,
			allowCommentLogging: data.allowCommentLogging,
			allowFrontEndEditing: data.allowFrontEndEditing,
			allowUnlimitedEditing: data.allowUnlimitedEditing,
			showStopTimer: data.showStopTimer,
			allowDelete: data.allowDelete,
			deleteOnly: data.deleteOnly,
			allowDeleteConfirmation: data.allowDeleteConfirmation,
			allowEditNotification: data.allowEditNotification,
			editNotificationTo: data.editNotificationTo,
			editNotificationFrom: data.editNotificationFrom,
			editNotificationSubject: data.editNotificationSubject,
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
		sendCommand( 'sce_save_comment_editing_options', {
			nonce: sceCommentEditing.save_nonce,
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
		sendCommand( 'sce_reset_comment_editing_options', {
			nonce: sceCommentEditing.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setIsReset( true );
					reset( {
						akismetApiValid: getValues( 'akismetApiValid' ),
						akismetActive: getValues( 'akismetActive' ),
						akismetEnabled: true,
						akismetEditCommentsEnabled: true,
						akismetLoggedInUsersEnabled: true,
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
		return __( 'Save Comment Editing Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Disconnecting…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Disconnected', 'quotes-dlx' );
		}
		return __( 'Restore Comment Editing Defaults', 'quotes-dlx' );
	};

	const getCommentEditingHeader = () => {
		return (
			<>
				<h2>{ __( 'Comment Editing', 'comment-edit-pro' ) } <a className="sce-admin-heading-docs" target="_blank" rel="noreferrer" href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/akismet-spam-protection">({ __( 'Docs', 'comment-edit-pro' ) })</a></h2>
				<p className="description">
					{ __(
						'Comment editing is a great way to allow your users to fix their own comments.',
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
							<th scope="row">
								{ __( 'Comment Editing', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="enableCommentEditing"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable or disable comment editing.',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Comment editing is enabled by default, but you can disable it here.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">
								{ __( 'Countdown Timer', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="timer"
									control={ control }
									rules={ { required: true } }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											label={ __( 'Timer Length', 'quotes-dlx' ) }
											type="number"
											className={ classNames( 'sce-admin__text-control', {
												'has-error': 'required' === errors.timer?.type,
												'is-required': true,
											} ) }
											help={ __(
												'Enter the time that users have to edit their comments.',
												'comment-edit-pro'
											) }
											aria-required="true"
											value={ value }
											onChange={ onChange }
										/>
									) }
								/>
								<Controller
									name="allowUnlimitedEditing"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Unlimited Timer for Logged-in Users.',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will allow unlimited editing for logged-in users.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								<Controller
									name="showStopTimer"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Allow Timer To Be Canceled by Users',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will show an extra button that will allow users to cancel their edit timer.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">
								{ __( 'Editing Options', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="allowCommentLogging"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable or disable comment logging for edited comments.',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will allow you to restore edited comments and view an edit history for comments.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								<Controller
									name="allowFrontEndEditing"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable or disable Frontend Editing for admins.',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will allow you to edit comments from the frontend of your site.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								<Controller
									name="allowDelete"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Allow Comment Deletion for Users',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this option will allow users to delete their own comments.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								<Controller
									name="deleteOnly"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Allow Comment Deletion Only',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will hide the editing options and only allows the user to delete comments only.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								<Controller
									name="allowDeleteConfirmation"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Comment Deletion Confirmation',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will show a confirmation before the user is allowed to delete their own comments.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">
								{ __( 'Email Notifications', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="allowEditNotification"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Email Notifications for Edited Comments',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this will send an email notification when someone edits their comment.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
								{ getValues( 'allowEditNotification' ) && (
									<>
										<Controller
											name="editNotificationTo"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'To Email Address', 'highlight-and-share' ) }
													value={ value }
													onChange={ ( newValue ) => {
														if ( ! ValidateEmail( newValue ) ) {
															setError( 'editNotificationTo', { shouldFocus: true } );
														} else {
															clearErrors( 'editNotificationTo' );
														}
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.editNotificationTo?.type,
														'is-required': true,
													} ) }
													help={ __( 'The email address to send the notification to.', 'comment-edit-pro' ) }
												/>
											) }
										/>
										{ errors.editNotificationTo && (
											<Notice
												message={ __( 'This does not appear to be a valid email address.', 'comment-edit-pro' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="editNotificationFrom"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'From Email Address', 'highlight-and-share' ) }
													value={ value }
													onChange={ ( newValue ) => {
														if ( ! ValidateEmail( newValue ) ) {
															setError( 'editNotificationFrom', { shouldFocus: true } );
														} else {
															clearErrors( 'editNotificationFrom' );
														}
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.editNotificationFrom?.type,
														'is-required': true,
													} ) }
													help={ __( 'The email address that notifications should be sent from.', 'comment-edit-pro' ) }
												/>
											) }
										/>
										{ errors.editNotificationFrom && (
											<Notice
												message={ __( 'This does not appear to be a valid email address.', 'comment-edit-pro' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="editNotificationSubject"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'Email Subject', 'highlight-and-share' ) }
													value={ value }
													onChange={ ( newValue ) => {
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.editNotificationSubject?.type,
														'is-required': true,
													} ) }
													help={ __( 'The subject of the email when someone edits their comment.', 'comment-edit-pro' ) }
												/>
											) }
										/>
										{ errors.editNotificationSubject && (
											<Notice
												message={ __( 'This is a required field.', 'comment-edit-pro' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</>
								) }

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
						message={ __(
							'Your settings have been saved.',
							'comment-edit-pro'
						) }
						status="success"
						politeness="assertive"
					/>
				) }
				{ isReset && (
					<Notice
						message={ __(
							'Your settings have been reset.',
							'comment-edit-pro'
						) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</>
	);
};
export default CommentEditing;
