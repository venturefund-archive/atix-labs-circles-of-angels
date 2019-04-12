import React from 'react';
import './_style.scss';

const Label = ({ labelText, theme }) => {
  const classname = `Label ${theme}`;
  return <p className={classname}>{labelText}</p>;
};

export default Label;
