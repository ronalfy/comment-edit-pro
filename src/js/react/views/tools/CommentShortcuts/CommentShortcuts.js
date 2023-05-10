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

const retrieveShortcutAction = () => {
	return sendCommand( 'sce_get_comment_shortcut_settings', {
		nonce: sceToolsCommentShortcuts.get_nonce,
	} );
};

const CommentShortcuts = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveShortcutAction,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Comment Shortcuts', 'comment-edit-pro' ) }</h2>
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
			enableShortcutApproved: data.enableShortcutApproved,
			enableShortcutUnapproved: data.enableShortcutUnapproved,
			enableShortcutSpam: data.enableShortcutSpam,
			enableShortcutTrash: data.enableShortcutTrash,
			enableCoreCommentDropdown: data.enableCoreCommentDropdown,
			enableCommentDropdown: data.enableCommentDropdown,
			enableCommentDropdownApproved: data.enableCommentDropdownApproved,
			enableCommentDropdownUnapproved: data.enableCommentDropdownUnapproved,
			enableCommentDropdownSpam: data.enableCommentDropdownSpam,
			enableCommentDropdownTrash: data.enableCommentDropdownTrash,
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
		sendCommand( 'sce_save_comment_shortcut_settings', {
			nonce: sceToolsCommentShortcuts.save_nonce,
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
		return __( 'Save Comment Shortcuts', 'quotes-dlx' );
	};

	return (
		<>
			<div className="sce-panel-row">
				<h2>{ __( 'Comment Shortcuts', 'comment-edit-pro' ) }</h2>
				<p className="description">
					{ __(
						'Change where shortcuts are shown in the comments side menu and toolbar menu in the admin bar.',
						'comment-edit-pro'
					) }
				</p>
				<form onSubmit={ handleSubmit( onSubmit ) }>
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">{ __( 'Comment Menu Shortcuts', 'comment-edit-pro' ) }</th>
								<td>
									<div className="sce-panel-row">
										<Controller
											name="enableShortcutApproved"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Approved shortcut.',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will show an Approved item shortcut underneath the Comments menu item.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</div>
									<div className="sce-panel-row">
										<Controller
											name="enableShortcutUnapproved"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Pending shortcut.',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will show a Pending item shortcut underneath the Comments menu item.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</div>
									<div className="sce-panel-row">
										<Controller
											name="enableShortcutSpam"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Spam shortcut.',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will show a Pending item shortcut underneath the Comments menu item.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</div>
									<div className="sce-panel-row">
										<Controller
											name="enableShortcutTrash"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Trash shortcut.',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will show a Trash item shortcut underneath the Comments menu item.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">{ __( 'Core Comments Admin Bar', 'comment-edit-pro' ) }</th>
								<td>
									<div className="sce-panel-row">
										<Controller
											name="enableCoreCommentDropdown"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable Core Comment Admin Bar Item.',
														'comment-edit-pro'
													) }
													className="sce-admin__toggle-control"
													checked={ value }
													onChange={ onChange }
													help={ __( 'Enabling this will show your comments in the admin bar.', 'comment-edit-pro' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							{ getValues( 'enableCoreCommentDropdown' ) && (
								<>
									<tr>
										<th scope="row">{ __( 'Comments Admin Bar Shortcuts', 'comment-edit-pro' ) }</th>
										<td>
											<div className="sce-panel-row">
												<Controller
													name="enableCommentDropdown"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<ToggleControl
															label={ __(
																'Enable Custom Admin Bar Shortcuts.',
																'comment-edit-pro'
															) }
															className="sce-admin__toggle-control"
															checked={ value }
															onChange={ onChange }
															help={ __( 'Enabling this will show shortcuts under the core admin bar dropdown.', 'comment-edit-pro' ) }
														/>
													) }
												/>
											</div>
											{
												getValues( 'enableCommentDropdown' ) && (
													<>
														<div className="sce-panel-row">
															<Controller
																name="enableCommentDropdownApproved"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __(
																			'Enable Approved shortcut.',
																			'comment-edit-pro'
																		) }
																		className="sce-admin__toggle-control"
																		checked={ value }
																		onChange={ onChange }
																		help={ __( 'Enabling this will show an Approved item shortcut underneath the Comments admin bar menu item.', 'comment-edit-pro' ) }
																	/>
																) }
															/>
														</div>
														<div className="sce-panel-row">
															<Controller
																name="enableCommentDropdownUnapproved"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __(
																			'Enable Pending shortcut.',
																			'comment-edit-pro'
																		) }
																		className="sce-admin__toggle-control"
																		checked={ value }
																		onChange={ onChange }
																		help={ __( 'Enabling this will show a Pending item shortcut underneath the Comments admin bar menu item.', 'comment-edit-pro' ) }
																	/>
																) }
															/>
														</div>
														<div className="sce-panel-row">
															<Controller
																name="enableCommentDropdownSpam"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __(
																			'Enable Spam shortcut.',
																			'comment-edit-pro'
																		) }
																		className="sce-admin__toggle-control"
																		checked={ value }
																		onChange={ onChange }
																		help={ __( 'Enabling this will show a Spam item shortcut underneath the Comments admin bar menu item.', 'comment-edit-pro' ) }
																	/>
																) }
															/>
														</div>
														<div className="sce-panel-row">
															<Controller
																name="enableCommentDropdownTrash"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __(
																			'Enable Trash shortcut.',
																			'comment-edit-pro'
																		) }
																		className="sce-admin__toggle-control"
																		checked={ value }
																		onChange={ onChange }
																		help={ __( 'Enabling this will show a Trash item shortcut underneath the Comments admin bar menu item.', 'comment-edit-pro' ) }
																	/>
																) }
															/>
														</div>
													</>
												)
											}
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
		</>
	);
};
export default CommentShortcuts;
