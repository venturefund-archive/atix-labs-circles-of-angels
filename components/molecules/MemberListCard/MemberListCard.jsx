/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Avatar } from 'antd';
import { CopyFilled } from '@ant-design/icons';
import './_style.scss';

const MemberListCard = () => (
  <div className="BoxMemberList flex">
    <div className="TopBoxSection">
      <Avatar>U</Avatar>
      <div className="column">
        <p>
          <strong>Evan Nguyen</strong>
        </p>
        <p>Project Curator</p>
      </div>
    </div>
    <div className="BottomBoxSection flex">
      <div className="subBox">
        <div className="column">
          <p className="greyTitle">Country</p>
          <p>Argentina</p>
        </div>
        <div className="column">
          <p className="greyTitle">Blockchain</p>
          <div className="flex background">
            <p>Copy Number</p>
            <CopyFilled />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MemberListCard;
