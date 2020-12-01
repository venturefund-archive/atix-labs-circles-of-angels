/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

// TODO: This component needs a refactor to follow the label-has-associated-control rule

const RowLabel = ({ text }) => (
  <Col className="gutter-row ">
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
