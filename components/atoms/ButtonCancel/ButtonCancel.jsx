import React from 'react';
import './_style.scss';

const ButtonCancel = ({ text, onClick, disabled }) => (
  <button
    type="button"
    className={`ButtonCancel ${disabled ? 'buttonDisabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    <p>{text}</p>
  </button>
);

export default ButtonCancel;
