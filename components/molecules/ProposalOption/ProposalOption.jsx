import React from 'react';
import PropTypes from 'prop-types';

const ProposalOption = ({
  img,
  value,
  onSelect,
  selectedOption,
  proposalType
}) => (
  <div
    className={
      selectedOption === proposalType
        ? 'proposalSelectedContainer flex'
        : 'proposalOptionContainer flex'
    }
    onClick={() => onSelect(proposalType)}
    role="presentation"
  >
    <img alt="proposal-icon" src={img} />
    <p>
      <strong>{value}</strong>
    </p>
  </div>
);

export default ProposalOption;

ProposalOption.propTypes = {
  img: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.element.isRequired,
  proposalType: PropTypes.element.isRequired
};
