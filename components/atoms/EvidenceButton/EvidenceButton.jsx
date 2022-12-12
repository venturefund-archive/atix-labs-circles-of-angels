import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const EvidenceButton = ({ onClick, text, width, variant }) => (
  <button
			className={`customButton ${variant}`}
			style={{ width: width ? '140px' : '100%' }}
			onClick={onClick}
			type='button'
		>
    {text}
  </button>
);

export default EvidenceButton;

EvidenceButton.defaultProps = {
	width: false,
}


EvidenceButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    width: PropTypes.bool,
}
