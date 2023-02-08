/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Suspense, useContext } from 'react';

import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __, sprintf } from '@wordpress/i18n';
import {
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';
import BeatLoader from 'react-spinners/BeatLoader';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import sendCommand from '../../../SendCommand';
import Notice from '../../components/Notice';
import KeyIcon from '../../components/icons/KeyIcon';
import VialIcon from '../../components/icons/VialIcon';
import Spinner from '../../components/icons/Spinner';
import CircularExclamationIcon from '../../components/icons/CircularExplanation';
import CircularInfo from '../../components/icons/CircularInfo';
import CodeBranchIcon from '../../components/icons/CodeBranchIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashRegular from '../../components/icons/EyeSlashRegular';
import ClipboardCheck from '../../components/icons/ClipboardCheck';

const retrieveLicenseOptions = () => {
	return sendCommand( 'sce_retrieve_admin_license_core', {
		nonce: sceAdminLicense.get_nonce,
	} );
};

const License = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveLicenseOptions, [] );
	return (
		<Suspense
			fallback={
				<>
					<div className="sce-admin-panel-area">
						<div className="sce-panel-row">
							<h2>{ __( 'Comment Edit Pro License', 'comment-edit-pro' ) }</h2>
							<BeatLoader
								color={ '#9c68b0' }
								loading={ true }
								cssOverride={ true }
								size={ 25 }
								speedMultiplier={ 0.65 }
							/>
						</div>
					</div>

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
	const [ betaSaving, setBetaSaving ] = useState( false );
	const [ betaEnabled, setBetaEnabled ] = useState( data.beta );
	const [ revokingLicense, setRevokingLicense ] = useState( false );
	const [ isRevoked, setIsRevoked ] = useState( false );
	const [ validLicense, setValidLicense ] = useState( data.license );
	const [ licenseActivated, setLicenseActivated ] = useState(
		data.license_activated
	);
	const [ licenseData, setLicenseData ] = useState( data );
	const [ showSecret, setShowSecret ] = useState(
		data.license_activated ? false : true
	);

	const {
		license_key,
		item_name,
		expires,
		expires_human_time_diff,
		license_limit,
		site_count,
		activations_left,
		license_activated,
		price_id,
	} = data;

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
			sceLicense: data.license_key.substr( 0, 8 ) + '********',
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
		sendCommand( 'sce_save_admin_license_core', {
			nonce: sceAdminLicense.save_nonce,
			license_key: getValues( 'sceLicense' ),
			...formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;

				setLicenseData( ajaxData );
				if ( ajaxSuccess ) {
					if ( ajaxData.license_activated ) {
						setLicenseActivated( true );
					} else {
						setLicenseActivated( false );
					}

					setIsSaved( true );

					// Reset count.
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// Error stuff.
					setError( 'sceLicense', {
						type: 'validate',
						message: ajaxData.message,
					} );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const revokeLicense = ( e ) => {
		setRevokingLicense( true );
		sendCommand( 'sce_save_revoke_license_core', {
			nonce: sceAdminLicense.reset_nonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// // Reset count.
					setLicenseActivated( false );
					setIsRevoked( true );
					setTimeout( () => {
						setIsRevoked( false );
					}, 3000 );
				} else {
					setError( 'sceLicense', {
						type: 'validate',
						message: __(
							'Revoking the license resulted in an error and could not be deactivated. Please reactivate the license and try again.',
							'comment-edit-pro'
						),
					} );
					setLicenseActivated( false );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setRevokingLicense( false );
			} );
	};

	const onBetaToggle = ( on_or_off ) => {
		setBetaSaving( true );
		sendCommand( 'sce_save_beta_option', {
			nonce: sceAdminLicense.save_nonce,
			beta: on_or_off,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setBetaEnabled( ajaxData.beta );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setBetaSaving( false );
			} );
	};

	const getLicenseType = () => {
		switch ( price_id ) {
			case '1':
				return 'Hobbyist';
				break;
			case '2':
				return 'Freelancer';
				break;
			case '3':
				return 'Agency';
				break;
			case '4':
				return 'Unlimited';
				break;
			default:
				return 'Subscriber';
				break;
		}
		return 'Subscriber';
	};

	const getSaveButton = () => {
		let saveText = __( 'Save License', 'comment-edit-pro' );
		let saveTextLoading = __( 'Saving…', 'comment-edit-pro' );

		if ( ! licenseActivated ) {
			saveText = __( 'Activate License', 'comment-edit-pro' );
			saveTextLoading = __( 'Activating…', 'comment-edit-pro' );
		}
		return (
			<>
				<Button
					className={ classNames(
						'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right',
						{ 'has-error': hasErrors() },
						{ 'has-icon': saving },
						{ 'is-saving': { saving } }
					) }
					type="submit"
					text={ saving ? saveTextLoading : saveText }
					icon={ saving ? Spinner : false }
					iconSize="18"
					iconPosition="right"
					disabled={ saving || revokingLicense }
				/>
			</>
		);
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
		return __( 'Save License', 'comment-edit-pro' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Revoking…', 'comment-edit-pro' );
		}
		if ( isReset ) {
			return __( 'Revoked', 'comment-edit-pro' );
		}
		return __( 'Revoke License', 'comment-edit-pro' );
	};

	const getLicenseHeader = () => {
		return (
			<>
				<h2>
					{ __( 'License', 'comment-edit-pro' ) }{ ' ' }
					<a
						className="sce-admin-heading-docs"
						target="_blank"
						rel="noreferrer"
						href="https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/akismet-spam-protection"
					>
						({ __( 'Docs', 'comment-edit-pro' ) })
					</a>
				</h2>
				<p className="description">
					{ __(
						'Enter your license for Comment Edit Pro to enable automatic updates and support.',
						'comment-edit-pro'
					) }
				</p>
			</>
		);
	};

	return (
		<>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="sce-admin-panel-area">
					<div className="sce-panel-row">
						{ getLicenseHeader() }
						<div className="sce-admin__tabs--content-panel">
							<div className="sce-admin__tabs--content-heading">
								{ licenseActivated && (
									<Notice
										message={ __( 'Your license is valid.', 'comment-edit-pro' ) }
										status="success"
										politeness="polite"
									/>
								) }
								{ ! licenseActivated && (
									<Notice
										message={ __(
											'Please enter a valid license to receive support and updates',
											'comment-edit-pro'
										) }
										status="warning"
										politeness="polite"
									/>
								) }
							</div>
							<div className="sce-admin__license--wrapper is-required">
								<div className="sce-admin__license--input-wrapper">
									<Controller
										name="sceLicense"
										control={ control }
										rules={ {
											required: true,
											pattern: /^[0-9A-Za-z]+$/i,
											validate: true,
										} }
										render={ ( { field } ) => (
											<TextControl
												{ ...field }
												label={ __( 'License Key', 'comment-edit-pro' ) }
												id="search-comment-edit-pro-license-secret"
												className={ classNames(
													'sce-admin__text-control-license',
													{
														'has-error':
													'pattern' === errors.sceLicense?.type ||
													'required' === errors.sceLicense?.type,
														'is-required': true,
													}
												) }
												disabled={ licenseActivated }
												aria-required="true"
												help={ __(
													'Entering a license will enable support and updates.',
													'comment-edit-pro'
												) }
												type={ showSecret ? 'text' : 'password' }
											/>
										) }
									/>
									<div className="sce-admin__license--input-preview">
										<input
											id="comment-edit-pro-license-show-hide"
											type="checkbox"
											aria-label={ __(
												'Click to Show or Hide the License',
												'comment-edit-pro'
											) }
											onClick={ () => {
												if ( showSecret ) {
													setShowSecret( false );
												} else {
													setShowSecret( true );
												}
											} }
											title={
												showSecret
													? __( 'Hide License', 'comment-edit-pro' )
													: __( 'Show License', 'comment-edit-pro' )
											}
										/>
										<label htmlFor="comment-edit-pro-license-show-hide not-is-required">
											<span className="comment-edit-pro-license-show-hide--label">
												{ __( 'Click to Show or Hide the License', 'comment-edit-pro' ) }
											</span>
											<span className="comment-edit-pro-license-show-hide--icon">
												{ ! showSecret ? (
													<Button
														label={ __( 'Show License', 'comment-edit-pro' ) }
														size={ 20 }
														icon={ EyeIcon }
														className="button-reset"
													/>
												) : (
													<Button
														label={ __( 'Hide License', 'comment-edit-pro' ) }
														size={ 20 }
														icon={ EyeSlashRegular }
														className="button-reset"
													/>
												) }
											</span>
										</label>
									</div>
									{ 'required' === errors.quotesdlxLicense?.type && (
										<Notice
											message={ __( 'This field is a required field.' ) }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
									{ 'pattern' === errors.quotesdlxLicense?.type && (
										<Notice
											message={ __(
												'It appears there are invalid characters in the license.'
											) }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
									{ 'validate' === errors.quotesdlxLicense?.type && (
										<Notice
											message={ errors.quotesdlxLicense.message }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
								</div>
								<div className="sce-admin__tabs--content-actions sce-admin-buttons">
									{ ! licenseActivated && getSaveButton() }
									{ licenseActivated && (
										<Button
											className={ classNames(
												'qdlx__btn qdlx__btn-danger qdlx__btn--icon-right',
												{ 'has-icon': revokingLicense },
												{ 'is-resetting': { revokingLicense } }
											) }
											type="button"
											text={
												revokingLicense
													? __( 'Revoking License…', 'comment-edit-pro' )
													: __( 'Revoke License', 'comment-edit-pro' )
											}
											icon={ revokingLicense ? Spinner : false }
											iconSize="18"
											iconPosition="right"
											disabled={ saving || revokingLicense }
											onClick={ ( e ) => {
												setRevokingLicense( true );
												revokeLicense( e );
											} }
										/>
									) }
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
								{ isRevoked && (
									<Notice
										message={ __(
											'Your license has been deactivated for this site.',
											'comment-edit-pro'
										) }
										status="success"
										politeness="assertive"
									/>
								) }
							</div>
						</div>
					</div>
				</div>
				{ licenseActivated && (
					<>
						<div className="sce-admin-panel-area">
							<div className="sce-panel-row">
								<div className="sce-admin__tabs--content-wrap">
									<div className="sce-admin__tabs--content-panel">
										<div className="sce-admin__tabs--content-heading">
											<h2>
												<CircularInfo width={ 48 } height={ 48 } aria-hidden="true" />
												<span className="sce-admin__heading--text">
													{ __( 'License Information', 'comment-edit-pro' ) }
												</span>
											</h2>
										</div>
										<div className="sce-admin__tabs--content-inner">
											<table className="comment-edit-pro-table comment-edit-pro-table--responsive comment-edit-pro-table--license-ui">
												<thead>
													<tr>
														<th scope="col">{ __( 'Item Name', 'comment-edit-pro' ) }</th>
														<th scope="col">{ __( 'License Type', 'comment-edit-pro' ) }</th>
														<th scope="col">
															{ __( 'License Activations', 'comment-edit-pro' ) }
														</th>
														<th scope="col">{ __( 'Expires On', 'comment-edit-pro' ) }</th>
														<th scope="col">{ __( 'Days Left', 'comment-edit-pro' ) }</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td data-header="Item Name">
															<p>{ licenseData.item_name }</p>
														</td>
														<td data-header="License Type">
															<p>{ getLicenseType() }</p>
														</td>
														<td data-header="License Activations">
															<p>
																<span className="">
																	{ licenseData.site_count } of{ ' ' }
																	{ licenseData.license_limit === 0
																		? __( 'Unlimited', 'comment-edit-pro' )
																		: licenseData.license_limit }
																</span>
															</p>
														</td>
														<td data-header="Expires On">
															<p>{ licenseData.expires }</p>
														</td>
														<td data-header="Days Left">
															<p>{ licenseData.expires_human_time_diff }</p>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="sce-admin-panel-area">
							<div className="sce-panel-row">
								<div className="sce-admin__tabs--content-wrap">
									<div className="sce-admin__tabs--content-panel">
										<div className="sce-admin__tabs--content-heading">
											<h2>
												<VialIcon width={ 48 } height={ 48 } aria-hidden="true" />
												<span className="sce-admin__heading--text">
													{ __( 'Beta Releases', 'comment-edit-pro' ) }
												</span>
											</h2>
											<p className="description">
												You can enable Beta Releases by checking this option.
											</p>
										</div>
										{ betaEnabled && (
											<Notice
												message={ __(
													'Beta Updates are enabled. You will receive beta updates for this plugin.',
													'comment-edit-pro'
												) }
												status="info"
												politeness="assertive"
												icon={ CodeBranchIcon }
											/>
										) }
										<div className="sce-admin__tabs--content-inner">
											{ betaSaving && (
												<div className="sce-admin__license-beta-saving">
													<Spinner />
												</div>
											) }
											{ ! betaSaving && (
												<ToggleControl
													label={ __( 'Enable Beta Releases', 'comment-edit-pro' ) }
													className="sce-admin__toggle-control"
													checked={ betaEnabled }
													onChange={ ( boolValue ) => {
														onBetaToggle( boolValue );
													} }
													help={ __(
														'If enabled, any betas available for release will show up in Dashboard->Updates.',
														'comment-edit-pro'
													) }
												/>
											) }
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) }

			</form>
		</>
	);
};
export default License;
