import React from 'react';
import './_style.scss';

const ButtonPrimary = ({ text, onClick, disabled }) => (
  <button
    type="button"
    className={`ButtonPrimary ${disabled ? 'buttonDisabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    <p>{text}</p>
  </button>
);

export default ButtonPrimary;
