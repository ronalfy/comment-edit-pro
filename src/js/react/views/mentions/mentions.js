/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import ValidateEmail from '../../validation/ValidateEmail';

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

const retrieveMentionsOptions = () => {
	return sendCommand( 'sce_get_mentions_options', {
		nonce: sceMentions.get_nonce,
	} );
};

const Mentions = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveMentionsOptions, [] );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( '@ Mentions', 'comment-edit-pro' ) }</h2>
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
			mentionsEnabled: data.mentionsEnabled,
			mentionsEmailsEnabled: data.mentionsEmailsEnabled,
			mentionsEmailsFromName: data.mentionsEmailsFromName,
			mentionsEmailsFromEmail: data.mentionsEmailsFromEmail,
			mentionsSignupLabel: data.mentionsSignupLabel,
			mentionsCheckboxEnabled: data.mentionsCheckboxEnabled,
			mentionsCommentTextareaId: data.mentionsCommentTextareaId,
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
		sendCommand( 'sce_save_mentions_options', {
			nonce: sceMentions.save_nonce,
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
		sendCommand( 'sce_reset_mentions_options', {
			nonce: sceMentions.reset_nonce,
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
			return __( 'Saving…', 'comment-edit-pro' );
		}
		if ( isSaved ) {
			return __( 'Saved', 'comment-edit-pro' );
		}
		return __( 'Save @ Mention Options', 'comment-edit-pro' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Resetting…', 'comment-edit-pro' );
		}
		if ( isReset ) {
			return __( 'Reset', 'comment-edit-pro' );
		}
		return __( 'Reset Mentions Defaults', 'comment-edit-pro' );
	};

	const getMentionsHeader = () => {
		return (
			<>
				<h2>{ __( '@ Mentions', 'comment-edit-pro' ) }</h2>
				<p className="description">
					{ __(
						'Allow commenters to mention others in their replies.',
						'comment-edit-pro'
					) }
				</p>
			</>
		);
	};

	const getSignupLabel = () => {
		return (
			<tr>
				<th scope="row">{ __( 'Sign Up Label', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="mentionsSignupLabel"
						control={ control }
						rules={ { required: true } }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Sign-up Label', 'comment-edit-pro' ) }
								className={ classNames( 'qdlx-admin__text-control', {
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
		return (
			<tr>
				<th scope="row">{ __( 'Sign Up Checkbox', 'comment-edit-pro' ) }</th>
				<td>
					<Controller
						name="mentionsCheckboxEnabled"
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
									'Check the mentions email checkbox by default (not recommended).',
									'comment-edit-pro'
								) }
							/>
						) }
					/>
				</td>
			</tr>
		);
	};

	return (
		<>
			{ getMentionsHeader() }
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">
								{ __( '@ Mentions Options', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="mentionsEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable @ Mentions Comments',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Allow your commenters to @ mention others users in their replies',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'mentionsEnabled' ) && (
							<>
								<tr>
									<th scope="row">
										{ __( 'Email Preferences ', 'comment-edit-pro' ) }
									</th>
									<td>
										<Controller
											name="mentionsEmailsEnabled"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Sending Emails to @ Mention\'d users',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														//setShowButtonOptions( boolValue );
														onChange( boolValue );
													} }
													help={ __(
														'By default, @ mention\'d users will receive an email notification if opted in.',
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
											name="mentionsEmailsFromEmail"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'From Email', 'highlight-and-share' ) }
													value={ value }
													onChange={ ( newValue ) => {
														if ( ! ValidateEmail( newValue ) ) {
															setError( 'mentionsEmailsFromEmail', { shouldFocus: true } );
														} else {
															clearErrors( 'mentionsEmailsFromEmail' );
														}
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.mentionsEmailsFromEmail?.type,
														'is-required': true,
													} ) }
												/>
											) }
										/>
										{ errors.mentionsEmailsFromEmail && (
											<Notice
												message={ __( 'This does not appear to be a valid email address.', 'comment-edit-pro' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="mentionsEmailsFromName"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'From Name', 'highlight-and-share' ) }
													value={ value }
													onChange={ onChange }
													className={ classNames( 'sce-admin__text-control', {
														'has-error': 'required' === errors.mentionsEmailsFromName?.type,
														'is-required': true,
													} ) }
												/>
											) }
										/>
										{ errors.mentionsEmailsFromName && (
											<Notice
												message={ __( 'This field is required.', 'comment-edit-pro' ) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ CircularExclamationIcon }
											/>
										) }
									</td>
								</tr>
								{ getSignupCheckbox() }
								{ getSignupLabel() }
								<tr>
									<th scope="row">{ __( 'Comment Textarea ID', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="mentionsCommentTextareaId"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Comment Textarea ID', 'quotes-dlx' ) }
													{ ...field }
													className={ classNames( 'qdlx-admin__text-control', {
														'has-error': 'required' === errors.mentionsCommentTextareaId?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter the CSS/HTML ID for the comment textarea so the @ mentions can target the correct textarea field.',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.mentionsCommentTextareaId?.type && (
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

							</>
						) }
					</tbody>
				</table>

				<>
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
				</>
			</form>
		</>
	);
};
export default Mentions;
