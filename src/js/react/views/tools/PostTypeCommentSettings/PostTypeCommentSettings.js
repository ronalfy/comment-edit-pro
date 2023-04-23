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

const retrieveOptions = () => {
	return sendCommand( 'sce_get_post_type_comment_settings', {
		nonce: sceToolsPostTypeCommentSettings.get_nonce,
	} );
};

const PostTypeCommentSettings = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveOptions,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Post Type Comment Settings', 'comment-edit-pro' ) }</h2>
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
			postTypeSettings: data.postTypeSettings,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	console.log( getValues( 'postTypeSettings' ) );

	const onSubmit = ( formData ) => {
		setSaving( true );
		sendCommand( 'sce_save_post_type_comment_settings', {
			nonce: sceToolsPostTypeCommentSettings.save_nonce,
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
		return __( 'Save Post Type Settings', 'quotes-dlx' );
	};

	return (
		<>
			<div className="sce-panel-row">
				<h2>{ __( 'Post Type Comment Settings', 'comment-edit-pro' ) }</h2>
				<p className="description">
					{ __(
						'Set the default comment settings for each post type.',
						'comment-edit-pro'
					) }
				</p>
				<form onSubmit={ handleSubmit( onSubmit ) }>
					<table className="form-table form-table-row-sections">
						<tbody>
							{ Object.values( data.postTypeSettings ).map( ( settings ) => (
								<tr key={ settings.name }>
									<th scope="row">
										{ settings.label }
									</th>
									<td>
										<div className="sce-panel-row">
											<Controller
												name={ `postTypeSettings[${ settings.name }][hide_comment_section]` }
												control={ control }

												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __(
															'Hide Comment Section',
															'comment-edit-pro'
														) }
														className="sce-admin__toggle-control"
														checked={ value }
														onChange={ onChange }
														help={ __(
															'Hide the comment section from the front end for this post type.', 'comment-edit-pro'
														) }
													/>
												) }
											/>
										</div>
										<div className="sce-panel-row">
											<Controller
												name={ `postTypeSettings[${ settings.name }][enable_discussions_default]` }
												control={ control }

												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __(
															'Discussions Enabled by Default',
															'comment-edit-pro'
														) }
														className="sce-admin__toggle-control"
														checked={ value }
														onChange={ onChange }
														help={ __(
															'Have discussions enabled by default.', 'comment-edit-pro'
														) }
													/>
												) }
											/>
										</div>
										<div className="sce-panel-row">
											<Controller
												name={ `postTypeSettings[${ settings.name }][force_comments]` }
												control={ control }

												render={ ( { field: { onChange, value } } ) => (
													<RadioControl
														label={ __(
															'Force Comments:',
															'comment-edit-pro'
														) }
														selected={ value }
														options={ [
															{
																label: __( 'Default', 'comment-edit-pro' ),
																value: 'default',
															},
															{
																label: __( 'Open', 'comment-edit-pro' ),
																value: 'open',
															},
															{
																label: __( 'Closed', 'comment-edit-pro' ),
																value: 'closed',
															},
														] }
														onChange={ onChange }
														help={ __(
															'Force comments open, closed, or leave as default.', 'comment-edit-pro'
														) }
													/>
												) }
											/>
										</div>
										<div className="sce-panel-row">
											<Controller
												name={ `postTypeSettings[${ settings.name }][force_pingbacks]` }
												control={ control }

												render={ ( { field: { onChange, value } } ) => (
													<RadioControl
														label={ __(
															'Force Pingbacks:',
															'comment-edit-pro'
														) }
														selected={ value }
														options={ [
															{
																label: __( 'Default', 'comment-edit-pro' ),
																value: 'default',
															},
															{
																label: __( 'Open', 'comment-edit-pro' ),
																value: 'open',
															},
															{
																label: __( 'Closed', 'comment-edit-pro' ),
																value: 'closed',
															},
														] }
														onChange={ onChange }
														help={ __(
															'Force pingbacks as open, closed, or leave as default.', 'comment-edit-pro'
														) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
							) ) }
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
export default PostTypeCommentSettings;
