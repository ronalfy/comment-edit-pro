/**
 * External dependencies
 */

import './editor.scss';
import classnames from 'classnames';
import { useEffect, useState } from '@wordpress/element';

import { __, sprintf } from '@wordpress/i18n';

import {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Popover,
	Spinner,
} from '@wordpress/components';

import { InspectorControls, useBlockProps, BlockControls } from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';

import {
	Link2,
	FileText,
	File,
	ShoppingCart,

} from 'lucide-react';

import sendCommand from '../../SendCommand';
import AdvancedSelectControl from '../../block-editor/components/AdvancedSelect';

const CEP_Featured_Comments = ( props ) => {
	const generatedUniqueId = useInstanceId( CEP_Featured_Comments, 'has-cts' );
	const blockProps = useBlockProps( {
		className: classnames( `cep-featured-comments`, `align${ props.attributes.align }` ),
	} );

	const [ featuredCommentsResults, setFeaturedCommentsResults ] = useState( [] );
	const [ initialLoad, setInitialLoad ] = useState( true );
	const [ screen, setScreen ] = useState( 'loading' );
	const [ postType, setPostType ] = useState( 'post' );
	const [ currentPostTypePostSuggestion, setCurrentPostTypePostSuggestion ] = useState( false );
	const [ currentPostTypePostSuggestionData, setCurrentPostTypePostSuggestionData ] = useState( {
		dataPostId: null,
		dataPermalink: null,
		dataPostTitle: null,
		dataPostType: 'post',
	} );

	// Get attributes and client id.
	const { attributes, setAttributes, clientId } = props;

	/**
	 * Retrieve post featured comments.
	 *
	 * @param {number} postId Post ID to retrieve featured comments for.
	 */
	const getFeaturedComments = async( postId ) => {
		return await sendCommand( 'sce_get_featured_comments', { post_id: postId, nonce: cepBlocksJS.getFeaturedCommentsNonce } );
	};

	// Get individual attributes.
	const {
		uniqueId,
		featuredComments,
		align,
	} = attributes;

	const retrieveFeatured = async() => {
		setScreen( 'loading' );
		// Retrieve featured comments.
		const currentPostId = wp.data.select( 'core/editor' ).getCurrentPostId();
		await getFeaturedComments( currentPostId ).then( ( response ) => {
			console.log( response );
			const { data } = response.data;
			if ( data.success ) {
				setFeaturedCommentsResults( data.data.comments );
			}
		} ).catch( ( error ) => {
		} ).then( () => {
			setScreen( 'initial' );
		} );
	};

	// Get any featured comments.
	useEffect( () => {
		if ( featuredComments.length > 0 ) {
			setScreen( 'display' );
			return;
		}

		retrieveFeatured();
	}, [] );

	/**
	 * Get the current post type label.
	 *
	 * @return {string} Post type label.
	 */
	const getPostTypeLabel = () => {
		const currentPostType = postType;

		// If post type is in cepBlocksJS.supportedPostTypes
		if ( cepBlocksJS.supportedPostTypes.hasOwnProperty( currentPostType ) ) {
			return cepBlocksJS.supportedPostTypes[ currentPostType ];
		}

		return 'Unknown Post Type';
	};

	/**
	 * Get the current post type load comments label.
	 *
	 * @param {string} selectedPostType Post type to retrieve the label for.
	 *
	 * @return {JSX} Post type label.
	 */
	const getPostTypeLoadCommentsLabel = ( selectedPostType ) => {

		// If products post type, change label to reviews.
		if ( 'product' === selectedPostType ) {
			return __( 'Load Reviews', 'comment-edit-pro' );
		}

		return __( 'Load Comments', 'comment-edit-pro' );
	};

	const getBreadcrumb = () => {
		return (
			<div className="cep-breadcrumb">
				<div className="cep-breadcrumb-item">
					<Button
						variant="link"
						icon={ <Link2 /> }
						onClick={ () => {
							setScreen( 'loading' );
						} }
						label={ __( 'Featured Comments', 'comment-edit-pro' ) }
					/>
				</div>
				<Link2 className="cep-breadcrumb-separator" />
				<div className="cep-breadcrumb-item">
					<Button
						variant="link"
						label={ __( 'Featured Source', 'comment-edit-pro' ) }
						onClick={ () => {
							setScreen( 'initial' );
						} }
					>
						{ __( 'Featured Source', 'comment-edit-pro' ) }
					</Button>
				</div>
				<Link2 className="cep-breadcrumb-separator" />
				<div className="cep-breadcrumb-item">
					<Button
						variant="link"
						label={ __( 'Post Type', 'comment-edit-pro' ) }
						onClick={ () => {
							setScreen( 'post_type_select' );
						} }
					>
						{ __( 'Post Type', 'comment-edit-pro' ) }
					</Button>
				</div>
			</div>
		);
	};

	/**
	 * Output a loading screen.
	 *
	 * @param {string} message Loading message.
	 * @return {JSX.Element} JSX.
	 */
	const getLoadingScreen = ( message ) => {
		return (
			<div className="cep-loading-screen">
				<Spinner width={ 32 } height={ 32 } style={ { width: '32px', height: '32px' } } />
				<h2>{ message }</h2>
			</div>
		);
	};

	/**
	 * Get the post type icon used.
	 * @param {string} selectedPostType Post type to retrieve the icon for.
	 * @returns {JSX.Element} Post type icon.
	 */
	const getPostTypeIcon = ( selectedPostType ) => {
		switch ( selectedPostType ) {
			case 'post':
				return <FileText />;
			case 'page':
				return <File />;
			case 'product':
				return <ShoppingCart />;
			default:
				return <Link2 />;
		}
	};

	const getScreen = () => {
		let screenInterface = <></>;
		switch ( screen ) {
			case 'loading':
				screenInterface = getLoadingScreen( __( 'Loading featured comments', 'comment-edit-pro' ) );
				break;
			case 'initial':
				if ( featuredComments.length === 0 ) {
					screenInterface = (
						<>
							<div className="cep-featured-data-select">
								<h2>{ __( 'There are no featured items for this post. Please feature a comment and refresh this block.' ) }</h2>
								<ButtonGroup
									className="cep-button-grid"
								>
									<Button
										variant="secondary"
										onClick={ () => {
											retrieveFeatured();
										} }
									>
										{ __( 'Refresh' ) }
									</Button>
									<Button
										variant="secondary"
										onClick={ () => {
											setScreen( 'post_type_select' );
										} }
									>
										{ __( 'Use a Different Post' ) }
									</Button>
									<Button
										variant="secondary"
										onClick={ () => {
											setScreen( 'comment_id' );
										} }
									>
										{ __( 'Use Comment ID' ) }
									</Button>
								</ButtonGroup>
							</div>
						</>
					);
				}
				break;
			case 'post_type_select':
				screenInterface = (
					<>
						<div className="cep-featured-data-select">
							<h2>{ __( 'Select a post type to retrieve featured comments from' ) }</h2>
							<ButtonGroup
								className="cep-button-grid"
							>
								{ Object.entries( cepBlocksJS.supportedPostTypes ).map( ( [ slug, label ] ) => {
									return (
										<Button
											key={ slug }
											variant="secondary"
											onClick={ () => {
												setPostType( slug );
												setScreen( 'post_search' );
											} }
										>
											{ label }
										</Button>
									);
								}
								) }
							</ButtonGroup>
						</div>
					</>
				);
				break;
			case 'post_search':
				screenInterface = (
					<>
						<div className="cep-featured-data-select">
							{ getBreadcrumb() }
							<h2>{ __( 'Select a post to retrieve featured comments from' ) }</h2>
							<AdvancedSelectControl
								restNonce={ cepBlocksJS.restNonce }
								restEndpoint={ cepBlocksJS.restUrl + '/search/types' }
								itemIcon={ <Link2 /> }
								params={ {
									postType,
								} }
								savedValue={ '' }
								placeholder={ __( 'Search by ID or title', 'comment-edit-pro' ) }
								label={ sprintf(
									/* Translators: %s: post type label. */
									__( 'Select a %s', 'comment-edit-pro' ),
									getPostTypeLabel()
								) }
								currentSelectedSuggestion={ currentPostTypePostSuggestion }
								onItemSelect={ ( event, suggestionValue ) => {
									if ( null === suggestionValue ) {
										setCurrentPostTypePostSuggestionData( {
											dataPostId: null,
											dataPermalink: null,
											dataPostTitle: null,
											dataPostType: 'post',
										} );
									}
								} }
							>
								{ ( showSuggestions, suggestions, selectedSuggestion ) => {
									if ( showSuggestions && suggestions.length > 0 ) {
										// Render the suggestions as button items.
										return (
											<div className="dlx-cep__post-suggestions">
												{ suggestions.map( ( suggestion, index ) => {
													const isSelected = selectedSuggestion === index;
													const suggestionClasses = classnames(
														'cep__post-suggestion',
														{
															'is-selected': isSelected,
														}
													);
													return (
														<Button
															key={ index }
															value={ suggestion.value }
															role="option"
															aria-selected={
																suggestion.value === selectedSuggestion
															}
															className={ suggestionClasses }
															onClick={ ( e ) => {
																setCurrentPostTypePostSuggestion(
																	suggestion.label
																);
																setCurrentPostTypePostSuggestionData( {
																	dataPostId: suggestion.value.toString(),
																	dataPostType: suggestion.type,
																	dataPermalink: suggestion.permalink,
																	dataPostTitle: suggestion.label,
																} );
															} }
															icon={ getPostTypeIcon( suggestion.type ) }
															iconSize={ 2 }
															iconPosition="left"
														>
															<span className="cep-search-item">
																<span className="cep-search-item-title">
																	{ suggestion.label }
																</span>
																<span className="cep-search-item-info">
																	{ suggestion.permalink }
																</span>
															</span>
														</Button>
													);
												} ) }
											</div>
										);
									}
									return <></>;
								} }
							</AdvancedSelectControl>
							{ null !== currentPostTypePostSuggestionData.dataPostId && (
								<Button
									variant="primary"
									className="cep-button-primary"
									label={ getPostTypeLoadCommentsLabel( currentPostTypePostSuggestionData.dataPostType ) }
									onClick={ () => {
										// This will load a comment modal.
									} }
								>
									{ getPostTypeLoadCommentsLabel( currentPostTypePostSuggestionData.dataPostType ) }
								</Button>
							) }
						</div>
					</>
				);
				break;
		}
		return screenInterface;
	};

	return (
		<>
			<div { ...blockProps }>
				<>
					{ getScreen() }
				</>
			</div>
		</>
	);
};

export default CEP_Featured_Comments;
