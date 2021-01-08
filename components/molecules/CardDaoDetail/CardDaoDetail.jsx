/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { daoCardDetailPropTypes } from '../../../helpers/proptypes';
import { parseDate } from '../../../helpers/daoDates';
import { proposalTypeEnum } from '../../../constants/constants';
import './_style.scss';

const CardDaoDetail = ({ proposal, showStatus, onClick }) => {
  const txPendingStatus = proposal.txStatus === 'sent';
  const {
    description,
    yesVotes,
    noVotes,
    proposalType,
    didPass,
    voterNames
  } = proposal;

  const votesPercentage = votes => {
    const totalVotes = yesVotes + noVotes;
    if (totalVotes <= 0) return 0;
    const percentage = (votes / totalVotes) * 100;
    return percentage;
  };

  const parseType = type => {
    const proposalTypes = [
      proposalTypeEnum.NEW_MEMBER,
      proposalTypeEnum.NEW_DAO,
      proposalTypeEnum.ASSIGN_BANK,
      proposalTypeEnum.ASSIGN_CURATOR
    ];
    return proposalTypes[type];
  };

  const renderRemainingTimeLabel = () => {
    if (!showStatus && !txPendingStatus) {
      return (
        <div className="flex">
          <img
            className="marginRight"
            src="../static/images/icon-time.png"
            alt="img"
          />
          <p className="text">{parseDate(proposal)}</p>
        </div>
      );
    }
  };

  const renderStatusTag = () => {
    const notPassedMessage = "Status: Didn't Pass";
    const passedMessage = 'Status: Passed';
    const pendingMessage = 'Status: Pending Transaction';
    const passedIcon = '../static/images/icon-vote-green.png';
    const notPassedIcon = '../static/images/icon-vote-red.svg';
    // const pendingIcon = '../static/images/icon-vote-red.svg';
    const passedClass = 'flex passed';
    const notPassedClass = 'flex notPassed';
    // const pendingClass = 'flex pending';

    return (
      <div>
        {showStatus && (
          <div className={didPass ? passedClass : notPassedClass}>
            <img
              className="marginRight"
              src={didPass ? passedIcon : notPassedIcon}
              alt="img"
            />
            <p className="text">{didPass ? passedMessage : notPassedMessage}</p>
          </div>
        )}

        {!showStatus && txPendingStatus && (
          <div className={notPassedClass}>
            {/* <img
              className="marginRight"
              src={pendingIcon}
              alt="img"
            /> */}
            <p className="text">{pendingMessage}</p>
          </div>
        )}
      </div>
    );
  };

  const totalVotes = () => yesVotes + noVotes;

  return (
    <div
      onClick={!txPendingStatus && onClick}
      className="Box2 column"
      role="presentation"
    >
      <div className="topSection">
        <div className="flex space-between marginBottom">
          {renderRemainingTimeLabel()}
          {renderStatusTag()}
        </div>
        <h2>{parseType(proposalType)}</h2>
        <p className="text">{description}</p>
      </div>
      <div
        className="flex middleSection"
        style={{ height: !showStatus ? '50%' : '' }}
      >
        <div className="flex voteBox">
          <div className="imgVote">
            <img alt="img" src="../static/images/icon-yes-vote.png" />
          </div>
          <div className="column">
            <p className="text">Yes Votes</p>
            <p className="voteBold">
              {yesVotes} - {votesPercentage(yesVotes)}%
            </p>
          </div>
        </div>
        <div className="flex voteBox">
          <div className="imgVote">
            <img alt="img" src="../static/images/icon-no-vote.png" />
          </div>
          <div className="column">
            <p className="text">No Votes</p>
            <p className="voteBold">
              {noVotes} - {votesPercentage(noVotes)}%
            </p>
          </div>
        </div>
      </div>
      <div className="BottomBoxSection flex space-between">
        <div className="subBox">
          <h3>Participants</h3>
          <div className="detail flex">
            <div className="avatarBox flex">
              {voterNames.map(voterName => (
                <Avatar key={voterName} className="avatar">
                  {voterName || 'NN'}
                </Avatar>
              ))}
            </div>
            <div className="plusSign flex-start">
              <h2>... {totalVotes()}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardDaoDetail.defaultProps = {
  showStatus: false
};

CardDaoDetail.propTypes = {
  proposal: PropTypes.shape(daoCardDetailPropTypes).isRequired,
  showStatus: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default CardDaoDetail;
