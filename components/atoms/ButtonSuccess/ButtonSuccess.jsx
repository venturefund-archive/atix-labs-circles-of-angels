import React from 'react';
import './_style.scss';

const ButtonSuccess = ({ text, onClick }) => (
  <button type="button" className="ButtonSuccess" onClick={onClick}>
    <p>{text}</p>
  </button>
);

export default ButtonSuccess;
