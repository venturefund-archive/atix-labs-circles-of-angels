/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Avatar, Input } from 'antd';
import CustomButton from '../CustomButton/CustomButton';

const { TextArea } = Input;

const CommentReply = () => (
  <div className="ReplyWriting">
    <div className="flex verticalStart">
      <Avatar size="small">JS</Avatar>
      <div className="flex column write">
        <TextArea
          placeholder="Enter your text here"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <CustomButton buttonText="Post Question" />
      </div>
    </div>
  </div>
);

export default CommentReply;
