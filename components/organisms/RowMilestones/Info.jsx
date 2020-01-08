import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const Info = ({ text }) => (
  <Col className="gutter-row " span={24}>
    <p>{text}</p>
  </Col>
);

Info.defaultProps = {
  text: ''
};

Info.propTypes = {
  text: PropTypes.string
};

export default Info;
