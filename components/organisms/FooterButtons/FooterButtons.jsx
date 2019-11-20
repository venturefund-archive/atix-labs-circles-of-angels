import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const FooterButtons = ({
  showCreateButton,
  nextStepButton,
  prevStepButton
}) => (
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
      {prevStepButton}
    </Col>
    <Col
      className="space-between"
      xs={{ span: 24, order: 3 }}
      sm={{ span: 24, order: 3 }}
      md={6}
      lg={{ span: 3, offset: 12 }}
    >
      {nextStepButton || (
        <CustomButton
          buttonText="Save & Continue later"
          theme={showCreateButton ? 'Secondary' : 'Primary'}
        />
      )}
    </Col>
    {showCreateButton && (
      <Col
        className="space-between"
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={6}
        lg={{ span: 3, offset: 0, order: 3 }}
      >
        <CustomButton
          buttonText="Create Project"
          theme="Primary"
          classNameIcon="iconDisplay"
          icon="arrow-right"
        />
      </Col>
    )}
  </Row>
);

FooterButtons.defaultProps = {
  showCreateButton: false,
  nextStepButton: undefined
};

FooterButtons.propTypes = {
  showCreateButton: PropTypes.bool,
  prevStepButton: PropTypes.func.isRequired,
  nextStepButton: PropTypes.func
};

export default FooterButtons;
