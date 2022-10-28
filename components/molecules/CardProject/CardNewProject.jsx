import React from 'react';
import './_style.scss';
import { Col } from 'antd';
import PropTypes from 'prop-types';

const CardNewProject = ({ onClick }) => (
  <Col
    onClick={onClick}
    span={8}
    xs={24}
    md={12}
    lg={8}
    className="ProjectCard ProjectCardCreate
  "
  >
    <div className="ContentContainer">
      <img src="/static/images/new-project.png" alt="" />
      <h1>New Project</h1>
    </div>
  </Col>
);

export default CardNewProject;

CardNewProject.propTypes = {
  onClick: PropTypes.func.isRequired
};
