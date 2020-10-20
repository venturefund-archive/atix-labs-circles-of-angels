/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Row, Col, Avatar, Badge, Button } from 'antd';

const BlockDiscussion = ({}) => (
  <Row className="BlockDiscussion">
    <Col span={24} className="MessageContent BlockVisible">
      <Col span={24} className="flex">
        <Avatar src="./static/images/user4.png" />
        <h3>Annette Bell </h3>
        <span>12 July 2019</span>
      </Col>
      <Col span={24}>
        <p className="Text">
          April visit has been so fun!, These women are amazing with their
          hands, they have reached 10 hammocks per week!April visit has been so
          fun!, These women are amazing with their hands, they have reached 10
          hammocks per week!
        </p>
      </Col>
      <Col span={23}>
        <Button type="link">Respond</Button>
      </Col>
      <Col span={1} className="flex">
        <img src="/static/images/chat.svg" alt="chatimage" />
        <Badge
          count={3}
          style={{
            backgroundColor: '#F3F4FB',
            color: '#4C7FF7',
            border: '1px solid #4C7FF7'
          }}
        />
      </Col>
    </Col>
    <Col span={20} offset={4} className="MessageContent Answer">
      <Col span={24} className="flex">
        <Avatar src="./static/images/user4.png" />
        <h3>Annette Bell </h3>
        <span>12 July 2019</span>
      </Col>
      <Col span={24}>
        <p className="Text">
          April visit has been so fun!, These women are amazing with their
          hands, they have reached 10 hammocks per week!April visit has been so
          fun!
        </p>
      </Col>
    </Col>
  </Row>
);

export default BlockDiscussion;
