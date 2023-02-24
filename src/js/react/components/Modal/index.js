import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'; // ES6
import { __ } from '@wordpress/i18n';
import {
	Button,
	Modal as WPModal,
} from '@wordpress/components';

const Modal = ( props ) => {
	const {
		type,
		title,
		message,
		onClose,
		onConfirm,
		isDismissible,
		shouldCloseOnClickOutside,
	} = props;
	return (
		<WPModal
			className={
				classNames( 'sce-modal', {
					'sce-modal-prompt': type === 'prompt',
					'sce-modal-alert': type === 'alert',
					'sce-modal-error': type === 'error',
				} )
			}
			isDismissible={ isDismissible }
			shouldCloseOnClickOutside={ shouldCloseOnClickOutside }
			title={ title }
			onRequestClose={ () => {
				onClose();
			} }
		>
			<p className="sce-modal-message">{ message }</p>
			<div className="sce-modal-actions">
				{ type === 'prompt' && (
					<>
						<Button
							variant="secondary"
							className="sce-button sce-button-secondary"
							onClick={ () => {
								onClose();
							} }
						>
							{ __( 'Cancel', 'comment-edit-pro' ) }
						</Button>
						<Button
							variant="primary"
							className="sce-button sce-button-primary"
							onClick={ () => {
								onConfirm();
							} }
						>
							{ __( 'Confirm', 'comment-edit-pro' ) }
						</Button>
					</>
				) }
				{ type === 'alert' && (
					<Button
						variant="primary"
						className="sce-button sce-button-primary"
						onClick={ () => {
							onClose();
						} }
					>
						{ __( 'OK', 'comment-edit-pro' ) }
					</Button>
				) }
				{ type === 'error' && (
					<Button
						variant="primary"
						className="sce-button sce-button-primary"
						onClick={ () => {
							onClose();
						} }
					>
						{ __( 'OK', 'comment-edit-pro' ) }
					</Button>
				) }
			</div>
		</WPModal>
	)
};

Modal.defaultProps = {
	type: 'prompt',
	title: '',
	message: '',
	onClose: () => {},
	onConfirm: () => {},
	isDismissible: true,
	shouldCloseOnClickOutside: true,
};
Modal.propTypes = {
	type: PropTypes.oneOf( [ 'prompt', 'alert', 'error' ] ).isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	isDismissible: PropTypes.bool,
	shouldCloseOnClickOutside: PropTypes.bool,
};
export default Modal;
