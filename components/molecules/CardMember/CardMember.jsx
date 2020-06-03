/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar } from 'antd';
import { CopyFilled } from '@ant-design/icons';
import './_style.scss';

const CardMember = () => (
  <div className="BoxMember flex">
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
        <p>0x9a94ac82b17e67f7dff867f7dff8</p>
        <CopyFilled />
      </div>
    </div>
  </div>
);

export default CardMember;
