/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar, Progress } from 'antd';
import './_style.scss';

function CardDaoDetail() {
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
        <h2>ProgPoW Signaling Vote (EIP-1057)</h2>
        <p className="text">
          Magna voluptate et est ad adipisicing amet occaecat exercitation
          officiar...
        </p>
      </div>
      <div className="flex middleSection">
        <div className="flex voteBox">
          <div className="imgVote">
            <img alt="img" src="../static/images/icon-yes-vote.png" />
          </div>
          <div className="column">
            <p className="text">Yes Votes</p>
            <p className="voteBold">366 - 75%</p>
          </div>
        </div>
        <div className="flex voteBox">
          <div className="imgVote">
            <img alt="img" src="../static/images/icon-no-vote.png" />
          </div>
          <div className="column">
            <p className="text">Yes Votes</p>
            <p className="voteBold">366 - 75%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDaoDetail;
