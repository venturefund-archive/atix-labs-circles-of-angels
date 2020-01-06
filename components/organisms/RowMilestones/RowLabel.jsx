import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const RowLabel = ({ text }) => (
  <Col className="gutter-row " span={24}>
    <label>{text}</label>
  </Col>
);

RowLabel.defaultProps = {
  text: ''
};

RowLabel.propTypes = {
  text: PropTypes.string
};

export default RowLabel;
