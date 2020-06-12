/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { message, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { projectPropTypes } from '../../../helpers/proptypes';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import Comment from '../../molecules/Comment/Comment';
import './_style.scss';

const { TextArea } = Input;

const Faq = ({ project }) => (
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

Faq.defaultProps = {
  project: undefined
};

Faq.propTypes = {
  project: PropTypes.shape(projectPropTypes)
};
