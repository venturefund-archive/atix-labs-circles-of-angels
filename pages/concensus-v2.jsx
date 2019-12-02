/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_consensusv2.scss';
import './_style.scss';

const Consensusv2 = () => (
  <div className="ConsensusView">
    <Col span={18} className="Left">
      <Row type="flex" align="middle" className="Top">
        <Col span={21} className="">
          <Col span={24} className="flex">
            <TitlePage textTitle="Wellness for Families in Asia" />
            <Tag color="cyan">Consensus Phase</Tag>
          </Col>
          <Col span={9} className="vertical">
            <a href="https://questionsanswers.com">
              https://questionsanswers.com
            </a>
            <span>FAQ-Funders and SE´s Questions & Answers</span>
          </Col>
          <Col span={9} className="vertical">
            <p>$12,000</p>
            <span>Goal Amount</span>
          </Col>
        </Col>
        <Col span={3} className="">
          <CustomButton buttonText="Follow Project" theme="Primary" />
        </Col>
      </Row>
    </Col>
    <Col span={6} className="Right">
  <h3>Related users</h3>
  <Col span={12}> <h4>Followers</h4></Col>
  <Col span={12} className="flex-end"> <a>View All</a></Col>
        <Col span={24}>
          <Avatar src="./static/images/user1.png" />
          <Avatar src="./static/images/user2.png" />
          <Avatar src="./static/images/user3.png" />
          <Avatar src="./static/images/user4.png" />
        </Col>
        <Col span={24} className="Cards">
          <Col span={24}>
          <h3>Project Social</h3>
          </Col>
          <Col span={24}>
          <h3 className="bold"> Entrepreneur</h3>
          </Col>
            <Col span={24} className="flex">
              <Col span={3}>
                <Avatar src="./static/images/user4.png" />
              </Col>
              <Col span={21}>
                <span>Jenny Steward</span>
              </Col>
            </Col>
        </Col>
    </Col>
  </div>
);
export default Consensusv2;
