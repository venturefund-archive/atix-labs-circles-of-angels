import React from 'react';
import './_style.scss';

const ProposalOption = ({ img, value, onSelect, selectedOption, proposalType }) => {
  return (
    <div
      className={
        selectedOption === proposalType
          ? 'proposalSelectedContainer flex'
          : 'proposalOptionContainer flex'
      }
      onClick={() => onSelect(proposalType)}
    >
      {/* className={this.state.button ? 'buttonTrue' : 'buttonFalse'} */}
      <img alt="proposal-icon" src={img} />
      <p>
        <strong>{value}</strong>
      </p>
    </div>
  );
};

export default ProposalOption;
