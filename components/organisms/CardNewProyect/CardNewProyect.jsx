import React from 'react';
import './_style.scss';
import { Col } from 'antd';
import PropTypes from 'prop-types';

const CardNewProyect = ({ onClick }) => (
  <Col span={8} xs={24} md={12} lg={8} className="CardNewProyect">
    <div className="ContentContainer">
      <img src="/static/images/new-project.png" alt="" />
      <h1>New Project</h1>
    </div>
  </Col>
);

export default CardNewProyect;

CardNewProyect.propTypes = {
  onClick: PropTypes.func.isRequired
};
