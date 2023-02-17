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

const retrieveCharacterControlOptions = () => {
	return sendCommand( 'sce_get_character_control_options', {
		nonce: sceCharacterControl.get_nonce,
	} );
};

const CharacterControl = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveCharacterControlOptions, [] );
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Character Control', 'comment-edit-pro' ) }</h2>
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
			requireCommentLength: data.requireCommentLength,
			minCommentLength: data.minCommentLength,
			allowFrontEndCharacterLimit: data.allowFrontEndCharacterLimit,
			requireCommentLengthMax: data.requireCommentLengthMax,
			maxCommentLength: data.maxCommentLength,
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
		sendCommand( 'sce_save_character_control_options', {
			nonce: sceCharacterControl.save_nonce,
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
		sendCommand( 'sce_reset_character_control_options', {
			nonce: sceCharacterControl.reset_nonce,
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
		return __( 'Save Options', 'quotes-dlx' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Restoring Defaults…', 'quotes-dlx' );
		}
		if ( isReset ) {
			return __( 'Restored.', 'quotes-dlx' );
		}
		return __( 'Restore Defaults', 'quotes-dlx' );
	};

	return (
		<>
			<h2>{ __( 'Character Control', 'comment-edit-pro' ) } <a className="sce-admin-heading-docs" target="_blank" rel="noreferrer" href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/comment-character-control">({ __( 'Docs', 'comment-edit-pro' ) })</a></h2>
			<p className="description">
				{ __(
					'Set a minimum and maximum character limit for comments.',
					'comment-edit-pro'
				) }
			</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<table className="form-table">
					<tbody>
						<tr>
							<th scope="row">
								{ __( 'Character Control', 'comment-edit-pro' ) }
							</th>
							<td>
								<Controller
									name="allowFrontEndCharacterLimit"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Comment Character Control',
												'comment-edit-pro'
											) }
											className="sce-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												//setShowButtonOptions( boolValue );
												onChange( boolValue );
											} }
											help={ __(
												'Show a progress bar on the comment form that shows the minimum and maximum character limits for comments.',
												'comment-edit-pro'
											) }
										/>
									) }
								/>
							</td>
						</tr>
						{ getValues( 'allowFrontEndCharacterLimit' ) && (
							<>
								<tr>
									<th scope="row">
										{ __( 'Minimum Comment Length', 'comment-edit-pro' ) }
									</th>
									<td>
										<Controller
											name="minCommentLength"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __(
														'Minimum Comment Length',
														'comment-edit-pro'
													) }
													type="number"
													value={ value }
													onChange={ ( newValue ) => {
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error':
															'required' === errors.minCommentLength?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Set the minimum amount of characters required for a comment.',
														'comment-edit-pro'
													) }
												/>
											) }
										/>
										{ errors.minCommentLength && (
											<Notice
												message={ __(
													'This field is required.',
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
									<th scope="row">
										{ __( 'Maximum Comment Length', 'comment-edit-pro' ) }
									</th>
									<td>
										<Controller
											name="maxCommentLength"
											control={ control }
											rules={ { required: true } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __(
														'Maximum Comment Length',
														'comment-edit-pro'
													) }
													type="number"
													value={ value }
													onChange={ ( newValue ) => {
														onChange( newValue );
													} }
													className={ classNames( 'sce-admin__text-control', {
														'has-error':
															'required' === errors.maxCommentLength?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Set the maximum amount of characters required for a comment.',
														'comment-edit-pro'
													) }
												/>
											) }
										/>
										{ errors.maxCommentLength && (
											<Notice
												message={ __(
													'This field is required.',
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
export default CharacterControl;
