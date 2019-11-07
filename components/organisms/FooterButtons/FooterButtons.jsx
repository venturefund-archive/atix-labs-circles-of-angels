import React, { Component } from 'react';
import {
  Tag,
  Row,
  Col,
  Breadcrumb,
  Divider,
  Form,
  Icon,
  Input,
  Upload
} from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const FooterButtons = () => (
  <Row
    className="FooterButtons"
    type="flex"
    justify="space-around"
    align="middle"
  >
    <Col
      xs={{ span: 24, order: 1 }}
      sm={{ span: 24, order: 1 }}
      md={6}
      lg={{ span: 4, offset: 0, order: 1 }}
    >
      <CustomButton buttonText="Back" theme="Cancel" />
    </Col>

    <Col
      className="space-between"
      xs={{ span: 24, order: 2 }}
      sm={{ span: 24, order: 2 }}
      md={6}
      lg={{ span: 3, offset: 15, order: 3 }}
    >
      <CustomButton
        buttonText="Save & Continue"
        theme="Primary"
        classNameIcon="iconDisplay"
        icon="arrow-right"
      />
    </Col>
  </Row>
);
export default FooterButtons;
