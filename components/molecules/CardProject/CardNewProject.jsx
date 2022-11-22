import React from 'react';
import './_style.scss';
import PropTypes from 'prop-types';

const CardNewProject = ({ onClick }) => (
  <div
    className="m-cardProject --empty"
    onClick={onClick}
    role="button"
    onKeyPress={onClick}
    tabIndex="0"
  >
    <img src="/static/images/new-project.png" alt="New project" />
    <h1>New Project</h1>
  </div>
);

export default CardNewProject;

CardNewProject.propTypes = {
  onClick: PropTypes.func.isRequired
};
