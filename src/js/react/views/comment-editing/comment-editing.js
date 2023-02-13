/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
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
				{ getValues( 'akismetActive' ) && getValues( 'akismetApiValid' ) && (
					<>
						<Notice
							message={ __(
								'Akismet is enabled and is protecting you from comment spam.',
								'comment-edit-pro'
							) }
							status="success"
							politeness="polite"
						/>
					</>
				) }
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">
								{ __( 'Akismet Spam Protection', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="akismetEnabled"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Akismet for Comments',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Akismet protection is on by default for comments. Disabling this will prevent Akismet protection for new comments.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'akismetEnabled' ) && (
							<>
								<tr>
									<th scope="row">
										{ __( 'Logged-in Users ', 'comment-edit-pro' ) }
									</th>
									<td>
										<Controller
											name="akismetLoggedInUsersEnabled"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Akismet for Logged-in Users',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														//setShowButtonOptions( boolValue );
														onChange( boolValue );
													} }
													help={ __(
														'By default, Akismet protection is enabled for all logged-in users.',
														'comment-edit-pro'
													) }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Edit Comments', 'comment-edit-pro' ) }
									</th>
									<td>
										<Controller
											name="akismetEditCommentsEnabled"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Akismet for Edited Comments',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														//setShowButtonOptions( boolValue );
														onChange( boolValue );
													} }
													help={ __(
														'By default, Akismet is enabled for edited comments.',
														'comment-edit-pro'
													) }
												/>
											) }
										/>
									</td>
								</tr>
							</>
						) }
					</tbody>
				</table>
				{ getValues( 'akismetActive' ) && (
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
				) }
			</form>
		</>
	);
};
export default CommentEditing;
