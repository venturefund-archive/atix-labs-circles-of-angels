import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const Info = ({ value }) => (
  <Col className="gutter-row " span={24}>
    <p>{value}</p>
  </Col>
);

Info.defaultProps = {
  value: ''
};

Info.propTypes = {
  value: PropTypes.string
};

export default Info;
