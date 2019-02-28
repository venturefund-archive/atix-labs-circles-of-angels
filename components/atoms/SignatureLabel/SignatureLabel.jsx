import React from 'react';
import './_style.scss';

const SignatureLabel = ( {text}) => (
  <div className="SignatureLabel">
    <img src="./static/images/icon-clock.svg" alt="Clock" />
    <p>{text}</p>
  </div>
);

export default SignatureLabel;
