import React from 'react';
import './_style.scss';
import CardDaoDetail from '../CardDaoDetail/CardDaoDetail';

const DaoProposals = ({ proposals, completed, onClick }) => {
  const onVotingTitle = 'Voting Period';
  const completedTitle = 'Completed';
  return (
    <div className="column marginBottom">
      <div className="flex alignItems linkSection">
        <div className="dot" />
        <p>
          {completed ? completedTitle : onVotingTitle} ({proposals.length})
        </p>
      </div>
      <div className="BoxContainer">
        {proposals.map(proposal => (
          <CardDaoDetail
            proposal={proposal}
            showStatus={completed}
            onClick={() => onClick(proposal.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DaoProposals;
