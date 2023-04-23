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
	CheckboxControl,
} from '@wordpress/components';
import Spinner from '../../../components/icons/Spinner';
import ClipboardCheck from '../../../components/icons/ClipboardCheck';
import sendCommand from '../../../../SendCommand';
import CircularExclamationIcon from '../../../components/icons/CircularExplanation';
import Notice from '../../../components/Notice';
import ErrorBoundary from '../../../components/ErrorBoundary';

const CommentActivity = ( props ) => {
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
			enableCommentActivityExpiration: false,
			commentActivityExpirationDays: 14,
			postTypes: [],
			perPostOverride: true,
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
		sendCommand( 'sce_save_tools_post_types_support', {
			nonce: sceTools.save_nonce,
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
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
		return __( 'Save Post Type Options', 'quotes-dlx' );
	};

	console.log( getValues( 'postTypes' ) );

	return (
		<>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<h2>{ __( 'Post Comment Activity Expiration', 'comment-edit-pro' ) }</h2>
					<p className="description">
						{ __(
							'Change the default WordPress comment expiration and go by how long activity has passed on a post before closing comments',
							'comment-edit-pro'
						) }
					</p>
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<table className="form-table">
							<tbody>
								<tr>
									<th scope="row">{ __( 'Comment Activity Expiration', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="enableCommentActivityExpiration"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Comment Activity Expiration',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will disable WordPress\'s default comment expiration and enable activity-based comment closure.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</td>
								</tr>
								{ getValues( 'enableCommentActivityExpiration' ) && (
									<>
										<tr>
											<th scope="row">{ __( 'How Long Without Activity?', 'comment-edit-pro' ) }</th>
											<td>
												<Controller
													name="commentActivityExpirationDays"
													control={ control }
													rules={ { required: true } }
													render={ ( { field: { onChange, value } } ) => (
														<TextControl
															label={ __( 'Expiration in Days', 'highlight-and-share' ) }
															value={ value }
															type="number"
															onChange={ ( newValue ) => {
																onChange( newValue );
															} }
															className={ classNames( 'sce-admin__text-control', {
																'has-error':
															'required' === errors.commentActivityExpirationDays?.type,
																'is-required': true,
															} ) }
															help={ __(
																'Number of days without activity to close comments.',
																'comment-edit-pro'
															) }
														/>
													) }
												/>
												{ errors.commentActivityExpirationDays && (
													<Notice
														message={ __(
															'This does not appear to be a valid number.',
															'comment-edit-pro'
														) }
														status="error"
														politeness="assertive"
														inline={ false }
														icon={ CircularExclamationIcon }
													/>
												) }
											</td>
										</tr>
										<tr>
											<th scope="row">{ __( 'Enable for Post Types', 'comment-edit-pro' ) }</th>
											<td>
												{ Object.values( sceToolsCommentActivity.post_types ).map( ( postType, index ) => (
													<Controller
														key={ index }
														name={ `postTypes[${ postType.name }].checked` }
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<CheckboxControl
																label={ postType.label }
																value={ postType.name }
																onChange={ ( enableValue ) => {
																	onChange( enableValue );
																} }
																checked={ getValues( 'postTypes' )[ postType.name ]?.checked || false }
															/>
														) }
													/>
												) ) }
											</td>
										</tr>
										<tr>
											<th scope="row">{ __( 'Per Post Override', 'comment-edit-pro' ) }</th>
											<td>
												<Controller
													name="perPostOverride"
													control={ control }
													rules={ { required: true } }
													render={ ( { field: { onChange, value } } ) => (
														<ToggleControl
															label={ __(
																'Enable Per Post Override',
																'comment-edit-pro'
															) }
															className="sce-admin__toggle-control"
															checked={ value }
															onChange={ onChange }
															help={ __( 'Allow each post to be able to set its own expiration activity.', 'comment-edit-pro' ) }
														/>
													) }
												/>
											</td>
										</tr>
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
				</div>
			</div>
		</>
	);
};
export default CommentActivity;
