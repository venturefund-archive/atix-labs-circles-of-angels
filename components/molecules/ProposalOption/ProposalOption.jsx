import React from 'react';
import './_style.scss';

const ProposalOption = ({ img, title, onSelect, proposalType }) => {
  return (
    <div className="proposalOptionContainer flex" onClick={() => onSelect(proposalType)}>
      <img alt="proposal-icon" src={img} />
      <p>
        <strong>{title}</strong>
      </p>
    </div>
  );
};

export default ProposalOption;
