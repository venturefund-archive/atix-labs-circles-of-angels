import React from 'react';
import './_style.scss';

const TransferLabel = ({ theme, text, iconStatus }) => {
  const classname = `TransferLabel ${theme}`;

  return (
    <div className={classname}>
      {iconStatus && <img src={iconStatus} alt="IconLabel" />}
      <p>{text}</p>
    </div>
  );
};

export default TransferLabel;
