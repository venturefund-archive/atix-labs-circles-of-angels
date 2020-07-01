import React from 'react';
import './_style.scss';

const ProposalOption = ({ img, value, onSelect, proposalType }) => {
  return (
    <div className="proposalOptionContainer flex" onClick={() => onSelect(proposalType)}>
      <img alt="proposal-icon" src={img} />
      <p>
        <strong>{value}</strong>
      </p>
    </div>
  );
};

export default ProposalOption;
