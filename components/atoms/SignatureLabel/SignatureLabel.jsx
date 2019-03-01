import React from 'react';
import './_style.scss';

const SignatureLabel = ({ theme, text, iconStatus }) => {
  const classname = "SignatureLabel " + theme;

  return (
    <div className={classname}>
      <img src={iconStatus} alt="IconLabel" />
      <p>{text}</p>
    </div>
  );
};

export default SignatureLabel;
