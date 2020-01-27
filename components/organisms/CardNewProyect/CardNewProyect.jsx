import React from 'react';
import './_style.scss';
import PropTypes from 'prop-types';

const CardNewProyect = ({ onClick }) => (
  <button className="CardNewProyect" onClick={onClick} type="button">
    <img src="/static/images/Icon-project-created.svg" alt="" />
    <h2>Creación de</h2>
    <h1>Nuevo proyecto</h1>
  </button>
);

export default CardNewProyect;

CardNewProyect.propTypes = {
  onClick: PropTypes.func.isRequired
};
