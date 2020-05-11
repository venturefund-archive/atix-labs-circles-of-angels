/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar } from 'antd';
import './_style.scss';

function CardDao() {
  return (
    <div className="Box1 column">
      <h2>Hello - This is the name of the Dao</h2>
      <div className="BottomBoxSection flex space-between">
        <div className="subBox">
          <h3>Members</h3>
          <div className="detail flex">
            <div className="avatarBox flex">
              <Avatar className="avatar-overlap">U</Avatar>
              <Avatar className="avatar">A</Avatar>
            </div>
            <div className="plusSign flex-start">
              <h2>+</h2>
              <p>34</p>
            </div>
          </div>
        </div>
        <div className="subBox flex-start">
          <h3>Proposal</h3>
          <div className="detail space-between">
            <div className="detailText space-between">
              <h2>42</h2>
              <p>Total</p>
            </div>
            <div className="detailText green space-between">
              <h2>42</h2>
              <p>Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDao;
