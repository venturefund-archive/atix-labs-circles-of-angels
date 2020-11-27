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
import { Row, Col, Input, Button } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const { TextArea } = Input;

const BlockChat = () => (
  <Row className="BlockChat">
    <Col span={24}>
      <Col span={24} className="flex">
        <span>En respuesta a</span>
        <Button type="link">Annette Bell</Button>
      </Col>
      <Col span={24}>
        <TextArea placeholder="Write your comment here" rows={2} />
      </Col>
      <Col span={5} offset={19} className="space-between">
        <CustomButton theme="SecondaryCancel" buttonText="Cancel" />
        <CustomButton
          theme="Cancel"
          buttonText="Submit"
          icon="arrow-right"
          classNameIcon="iconDisplay"
        />
      </Col>
    </Col>
  </Row>
);

export default BlockChat;
