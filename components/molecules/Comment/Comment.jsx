/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar, Button } from 'antd';
import CommentReply from '../../atoms/CommentReply/CommentReply';
import ReplyWriting from '../../atoms/ReplyWriting/ReplyWriting';

const Comment = () => (
  <div className="comment">
    <div className="flex">
      <Avatar size="small">JS</Avatar>
      <div className="flex column userAvatar">
        <p>
          <strong>Jenny Steward</strong>
        </p>
        <p className="date">4 days ago</p>
      </div>
    </div>
    <p className="commentText">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt ollit anim id est laborum,quis nostrud exercitation ullamco.
      Laboris nisi ut aliquip ex ea commodo?
    </p>
    <Button type="link" href="#">
      Reply
    </Button>
    <CommentReply />
    <ReplyWriting />
  </div>
);

export default Comment;
