import React from 'react';
import PropTypes from 'prop-types'; // ES6

const EyeIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 576 512"
			width={ props.width }
			height={ props.height }
			{ ...props }
		>
			<path
				fill={ props.fill }
				d="M288 32C129.6 32 30 181.3 0 256c30 74.7 129.6 224 288 224s258-149.3 288-224C546 181.3 446.4 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1-288 0zm48 0c0 53 43 96 96 96s96-43 96-96-43-96-96-96c-6.4 0-12.7.6-18.8 1.8L288 256l-94.2-18.8c-1.2 6.1-1.8 12.4-1.8 18.8z"
			/>
		</svg>
	);
};
EyeIcon.defaultProps = {
	width: 16,
	height: 16,
	fill: '#333333',
};

EyeIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default EyeIcon;
