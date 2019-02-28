import React from 'react';
import './_style.scss';

const ButtonPrimary = ({ text }) => (
  <button type="button" className="ButtonPrimary">
    <p>{text}</p>
  </button>
);

export default ButtonPrimary;
