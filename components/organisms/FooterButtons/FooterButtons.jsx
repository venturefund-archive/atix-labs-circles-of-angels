import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './_style.scss';

const FooterButtons = ({ finishButton, nextStepButton, prevStepButton }) => (
  <Row
    className="FooterButtons"
    type="flex"
    justify="space-between"
    align="middle"
  >
    <Col
      xs={{ span: 24, order: 1 }}
      sm={{ span: 24, order: 1 }}
      md={6}
      lg={{ span: 4, offset: 0, order: 1 }}
    >
      {prevStepButton}
    </Col>
    <Col
      className="space-between"
      xs={{ span: 24, order: 3 }}
      sm={{ span: 24, order: 3 }}
      md={6}
      lg={{ span: 3, offset: 14 }}
    >
      {nextStepButton}
    </Col>
    {!!finishButton && (
      <Col
        className="space-between"
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={6}
        lg={{ span: 3, offset: 0, order: 3 }}
      >
        {finishButton}
      </Col>
    )}
  </Row>
);

FooterButtons.defaultProps = {
  nextStepButton: undefined,
  finishButton: undefined,
  prevStepButton: undefined
};

FooterButtons.propTypes = {
  finishButton: PropTypes.func,
  prevStepButton: PropTypes.func,
  nextStepButton: PropTypes.func
};

export default FooterButtons;
