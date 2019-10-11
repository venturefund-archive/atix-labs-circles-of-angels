/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const RegisterStep1 = () => (
  <div>
    <div className="InfoStep">
      <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
      <h2> Personal Information</h2>
      <h4>
        Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit amet..
      </h4>
    </div>
    <div className="StepPersonalInformation">
      <TitlePage textTitle="Register" />
      <CustomButton
        theme="Facebook"
        buttonText="Register with Facebook Account"
      />
      <div className="flex Linear">
        <hr />
        <p>or register with</p>
        <hr />
      </div>
      <Row className="FormRegister" gutter={26}>
        <Form layout="vertical">
          <Col className="gutter-row" sm={24} lg={12}>
            <Form.Item label="First Name">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={24} lg={12}>
            <Form.Item label="Last Name">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={12} lg={6}>
            <Form.Item label="Country">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={12} lg={6}>
            <Form.Item label="Email">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={12} lg={6}>
            <Form.Item label="Password">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={12} lg={6}>
            <Form.Item label="Repeat Password">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Form>
        <Col className="gutter-row" sm={24} lg={12}>
          <Checkbox>
            I’ve read and accept all the <a href="/">Terms and Conditions</a> of
            the site.
          </Checkbox>
        </Col>
      </Row>
    </div>
  </div>
);

export default RegisterStep1;
