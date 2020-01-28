import React from 'react';
import './_style.scss';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

const CardNewProyect = ({ onClick }) => (
  <Col span={8} className="CardNewProyect">
    <button onClick={onClick} type="button">
      <img src="/static/images/new.project.svg" alt="" />
      <h1>New Project</h1>
    </button>
  </Col>
);

export default CardNewProyect;

CardNewProyect.propTypes = {
  onClick: PropTypes.func.isRequired
};
