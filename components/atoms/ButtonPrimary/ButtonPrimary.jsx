import React from 'react';
import './_style.scss';

const ButtonPrimary = ({ text, onClick }) => (
  <button type="button" className="ButtonPrimary" onClick={onClick}>
    <p>{text}</p>
  </button>
);

export default ButtonPrimary;
