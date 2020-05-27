/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar, Progress } from 'antd';
import PropTypes from 'prop-types';
import { daoCardDetailPropTypes } from '../../../helpers/proptypes';
import { proposalTypeEnum } from '../../../constants/constants';
import './_style.scss';

const CardDaoDetail = ({ proposal }) => {
  const { description, yesVotes, noVotes, proposalType, didPass, processed } = proposal;

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

  return (
    <div className="Box2 column">
      <div className="topSection">
        <div className="flex space-between marginBottom">
          <div className="flex">
            <img
              className="marginRight"
              src="../static/images/icon-time.png"
              alt="img"
            />
            <p className="text">01 d : 21 h :09 m</p>
          </div>
          {/* STATUS PASSED */}
          <div className="flex passed">
            <img
              className="marginRight"
              src="../static/images/icon-vote-green.png"
              alt="img"
            />
            <p className="text">Status: Passed</p>
          </div>
        </div>
        <h2>{parseType(proposalType)}</h2>
        <p className="text">{description}</p>
      </div>
      <div className="flex middleSection">
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
            <p className="text">Yes Votes</p>
            <p className="voteBold">
              {noVotes} - {votesPercentage(noVotes)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CardDaoDetail.propTypes = {
  proposal: PropTypes.shape(daoCardDetailPropTypes).isRequired
};

export default CardDaoDetail;
