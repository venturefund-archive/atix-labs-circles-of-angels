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
import './_style.scss';
import { daoCardDetailPropTypes } from '../../../helpers/proptypes';
import { proposalTypeEnum } from '../../../constants/constants';

const CardDaoDetail = ({ proposal }) => {
  const { description, yesVotes, noVotes, proposalType, didPass, processed } = proposal;

  const votesPercentage = votes => {
    const totalVotes = yesVotes + noVotes;
    if (totalVotes <= 0) return 0;
    const percentage = votes / totalVotes;
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
  }

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
          <a href="http://google.com" className="newMember">
            {parseType(proposalType)}
          </a>
        </div>
        <h2>ProgPoW Signaling Vote (EIP-1057)</h2>
        <p className="text">{description}</p>
      </div>
      <div className="flex middleSection">
        <div className="percent space-between">
          <Progress type="circle" percent={70} />
          <img alt="img" src="../static/images/icon_vote_grey.png" />
        </div>
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
              <Avatar className="avatar-overlap">U</Avatar>
              <Avatar className="avatar">A</Avatar>
              <Avatar className="avatar">R</Avatar>
              <Avatar className="avatar">S</Avatar>
              <Avatar className="avatar">P</Avatar>
            </div>
            <div className="plusSign flex-start">
              <h2>+</h2>
              <p>334</p>
            </div>
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
