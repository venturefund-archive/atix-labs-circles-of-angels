import React from 'react';
import './_style.scss';

const ButtonCancel = ({ text, onClick }) => (
  <button type="button" className="ButtonCancel" onClick={onClick}>
    <p>{text}</p>
  </button>
);

export default ButtonCancel;
