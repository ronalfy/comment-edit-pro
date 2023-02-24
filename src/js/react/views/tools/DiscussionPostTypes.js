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
import Spinner from '../../components/icons/Spinner';
import ClipboardCheck from '../../components/icons/ClipboardCheck';
import sendCommand from '../../../SendCommand';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import Notice from '../../components/Notice';
import ErrorBoundary from '../../components/ErrorBoundary';

const DiscussionPostTypes = ( props ) => {
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
			postTypesSupported: [],
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

	return (
		<>
			<div className="sce-admin-panel-area">
				<div className="sce-panel-row">
					<h2>{ __( 'Comments and Post Types', 'comment-edit-pro' ) }</h2>
					<p className="description">
						{ __(
							'Some post types do not have discussion (comment) support. You can enable discussion support for any post type here.',
							'comment-edit-pro'
						) }
					</p>
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<table className="form-table">
							<tbody>
								<tr>
									<th scope="row">{ __( 'Post Types', 'comment-edit-pro' ) }</th>
									<td>
										<Controller
											name="postTypesSupported"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<CheckboxControl
													label={ __( 'Pages', 'comment-edit-pro' ) }
													className="sce-admin__checkbox-control"
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
												/>
											) }
										/>
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
					</form>
				</div>
			</div>
		</>
	);
};
export default DiscussionPostTypes;
