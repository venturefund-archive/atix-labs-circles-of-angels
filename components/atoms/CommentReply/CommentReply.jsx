/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Avatar } from 'antd';

const ReplyWriting = () => (
  <div className="commentReply">
    <div className="flex">
      <Avatar size="small">JS</Avatar>
      <div className="flex column userAvatar">
        <p>
          <strong>Jenny Steward</strong>
        </p>
        <p className="date">4 days ago</p>
      </div>
    </div>
    <p className="commentReplyText">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt ollit anim id est laborum,quis nostrud exercitation ullamco.
      Laboris nisi ut aliquip ex ea commodo?
    </p>
  </div>
);

export default ReplyWriting;
