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
    <Row type="flex" justify="start">
      <Col>{prevStepButton}</Col>
    </Row>
    <Row className="RightFooterButtons" type="flex" justify="end">
      <Col>{nextStepButton}</Col>
      {!!finishButton && <Col>{finishButton}</Col>}
    </Row>
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
