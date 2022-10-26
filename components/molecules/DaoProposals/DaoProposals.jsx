import React from 'react';
import PropTypes from 'prop-types';
import CardDaoDetail from '../CardDaoDetail/CardDaoDetail';

const DaoProposals = ({ proposals, completed, onClick }) => {
  const openTitle = 'Open';
  const completedTitle = 'Completed';
  return (
    <div className="column marginBottom">
      <div className="flex alignItems linkSection">
        <div className="dot" />
        <p>
          {completed ? completedTitle : openTitle} ({proposals.length})
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

DaoProposals.propTypes = {
  proposals: PropTypes.element.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
