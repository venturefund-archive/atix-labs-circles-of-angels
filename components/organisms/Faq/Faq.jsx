/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import { Input } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import Comment from '../../molecules/Comment/Comment';

const { TextArea } = Input;

const Faq = () => (
  <Fragment>
    <div className="faqSection">
      <div>
        <h1 className="title">Frequently Asked Questions</h1>
      </div>
      <div className="margin-bottom">
        <TextArea
          placeholder="Enter your text here"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <CustomButton buttonText="Post Question" />
      </div>
      <Comment />
    </div>
  </Fragment>
);

export default Faq;
