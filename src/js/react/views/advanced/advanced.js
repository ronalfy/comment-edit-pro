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
	return sendCommand( 'sce_get_advanced_options', {
		nonce: sceAdvanced.get_nonce,
	} );
};

const Advanced = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveAdvancedSettings,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Advanced', 'comment-edit-pro' ) }</h2>
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
			disableAllComments: data.disableAllComments,
			commentListClass: data.commentListClass,
			commentsWrapperId: data.commentsWrapperId,
			commentFormId: data.commentFormId,
			commentSubmitId: data.commentSubmitId,
			commentRespondId: data.commentRespondId,
			commentTextareaId: data.commentTextareaId,
			disableAllSpamProtection: data.disableAllSpamProtection,
			hideCommentSection: data.hideCommentSection,
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
		sendCommand( 'sce_save_advanced_options', {
			nonce: sceAdvanced.save_nonce,
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
		return __( 'Save Advanced Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Restoring Defaults…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Defaults Restored', 'quotes-dlx' );
		}
		return __( 'Restore Comment Editing Defaults', 'quotes-dlx' );
	};

	const getCommentEditingHeader = () => {
		return (
			<>
				<h2>
					{ __( 'Advanced', 'comment-edit-pro' ) }
				</h2>
				<p className="description">
					{ __(
						'Configure advanced settings, including your comment form\'s HTML IDs and classes.',
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
													'Enabling this will stop any new comments from being posted. You can enable this in case of emergency, such as if you are under attack by a spammer.',
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
													'Hide all comments from being shown on the frontend.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Spam Protection', 'comment-edit-pro' ) }</th>
							<td>
								<Controller
									name="disableAllSpamProtection"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __( 'Disable All Spam Protection', 'comment-edit-pro' ) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												onChange( boolValue );
											} }
											help={ __(
												'Enabling this may be necessary if you are testing the plugin or are troubleshooting a problem with spam comments, such as false positives. Please do not leave spam protection off for a prolonged period of time, as this will leave your site vulnerable to spam.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">{ __( 'Comment HTML Settings', 'comment-edit-pro' ) }</th>
							<td>
								<div className="sce-panel-row">
									<Controller
										name="commentsWrapperId"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Comment Wrapper ID', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentsWrapperId?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is an ID that wraps the comments.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="commentListClass"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Comment List Class', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentListClass?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is usually an OL, UL, or DIV that wraps the comments.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="commentRespondId"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Comment Respond ID', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentRespondId?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is the ID of respond container when leaving a comment.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="commentFormId"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Comment Form ID', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentFormId?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is the ID of the form element for the comments.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="commentSubmitId"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Submit Button ID', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentSubmitId?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is the ID of post comment button.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
								</div>
								<div className="sce-panel-row">
									<Controller
										name="commentTextareaId"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<TextControl
												label={ __( 'Textarea ID', 'comment-edit-pro' ) }
												className={ classNames( 'sce-admin__text-control', {
													'has-error': 'required' === errors.commentTextareaId?.type,
													'is-required': true,
												} ) }
												value={ value }
												onChange={ ( newValue ) => {
													onChange( newValue );
												} }
												help={ __(
													'This is the ID of textarea for the comment.',
													'comment-edit-pro'
												) }
											/>
										) }
									/>
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
export default Advanced;
