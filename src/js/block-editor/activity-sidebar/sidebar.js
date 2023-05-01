import { __ } from '@wordpress/i18n';
const { useState, useEffect } = wp.element;
const { ToggleControl, TextControl, PanelRow } = wp.components;
const { withDispatch } = wp.data;

const Sidebar = ( props ) => {
	const [ expirationEnabled, setExpirationEnabled ] = useState( false );
	const [ expirationDays, setExpirationDays ] = useState( 28 );

	/* Initialize the initial state */
	useEffect( () => {
		const { _sce_expiration_enabled, _sce_expiration_days } = wp.data
			.select( 'core/editor' )
			.getEditedPostAttribute( 'meta' );

		// Set expiration meta.
		if ( _sce_expiration_enabled !== null || typeof _sce_expiration_enabled !== 'undefined' ) {
			setExpirationEnabled( _sce_expiration_enabled );
		} else {
			setExpirationEnabled( false );
		}

		// Set expiration meta.
		if ( _sce_expiration_days !== null || typeof _sce_expiration_days !== 'undefined' ) {
			setExpirationDays( _sce_expiration_days );
		} else {
			setExpirationDays( 28 );
		}
	}, [] );
	return (
		<>
			<PanelRow>
				<ToggleControl
					label={ __( 'Enable Comment Activity Expiration', 'comment-edit-pro' ) }
					help={ __(
						'Enable this to set a time limit on how long comments remain open without any post activity.',
						'comment-edit-pro'
					) }
					checked={ expirationEnabled }
					onChange={ ( value ) => {
						setExpirationEnabled( value );
						props.setMetaFieldValue( '_sce_expiration_enabled', value );
					} }
				/>
			</PanelRow>
			{ expirationEnabled && (
				<>
					<PanelRow>
						<TextControl
							label={ __( 'Days of Inactivity', 'comment-edit-pro' ) }
							help={ __(
								'Enter the number of days of inactivity after which comments will be closed.',
								'comment-edit-pro'
							) }
							value={ expirationDays }
							type="number"
							onChange={ ( value ) => {
								setExpirationDays( value );
								props.setMetaFieldValue( '_sce_expiration_days', value );
							} }
						/>
					</PanelRow>
				</>
			) }
		</>
	);
};

export default withDispatch( ( dispatch ) => {
	return {
		setMetaFieldValue( key, value ) {
			dispatch( 'core/editor' ).editPost( { meta: { [ key ]: value } } );
		},
	};
} )( Sidebar );
