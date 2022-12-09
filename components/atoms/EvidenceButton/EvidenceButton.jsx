import PropTypes from 'prop-types';
import './_style.scss';

const EvidenceButton = ({ type, onClick, text, width, variant }) => (
		// eslint-disable-next-line react/button-has-type
  <button
			className={`customButton ${variant}`}
			style={{ width: width ? '140px' : '100%' }}
			onClick={onClick}
			type={type}
		>
    {text}
  </button>
);

export default EvidenceButton;

EvidenceButton.propTypes = {
	type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    width: PropTypes.string,
}
