/* eslint-disable prettier/prettier */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const RegisterStep3 = () => (
  <div>
    <div className="InfoStep">
      <img src="images/icon-personal.svg" alt="Circles of Angels" />
      <h2>Enterprise Information</h2>
      <h4>
        Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit amet..
      </h4>
    </div>
    <div className="StepPersonalInformation">
      <TitlePage textTitle="I want to create a Project" />
      <Row className="FormRegister" gutter={26}>
        <Form layout="vertical">
          <Col className="gutter-row" sm={24} lg={12}>
            <Form.Item label="What´s your company name?">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={24} lg={12}>
            <Form.Item label="Last Name">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Form>
      </Row>
      <TitlePage textTitle="We have some questions for you!" />
      <Row className="FormRegister" gutter={26}>
        <Form layout="vertical">
          <Col className="gutter-row" sm={24} lg={12}>
            <Form.Item label="What type of funding you are seeking?">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="InputTwoLabel" sm={24} lg={12}>
            <Form.Item
              label={
                <div className="LabelDescription">
                  Which are the areas of impact that you tackle?
                  <p>Based on the UN Sustainable Development Goals</p>
                </div>
              }
            >
              <Select size="large" mode="tags">
                {children}
              </Select>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  </div>
);

export default RegisterStep3;
