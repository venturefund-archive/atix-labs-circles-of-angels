import React from 'react';
import { Row, Col } from 'antd';

const RegisterStepsHeader = () => (
  <Row className="TopBar" type="flex" justify="space-between" align="middle">
    <Col className="gutter-row" xs={10} sm={4} lg={4}>
      <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
    </Col>
    <Col
      className="gutter-row"
      xs={12}
      sm={{ span: 7, offset: 10 }}
      lg={{ span: 4, offset: 13 }}
    >
      Already Registered? <a href="/landing">Log In</a>
    </Col>
  </Row>
);

export default RegisterStepsHeader;
