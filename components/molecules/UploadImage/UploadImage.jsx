import React from 'react';

import './_style.scss';
import ButtonUploadImage from '../../atoms/ButtonUploadImage/ButtonUploadImage';

const UploadImage = ({ subtitle, text, change, name }) => (
  <div className="UploadImageContainer">
    <h2>{subtitle}</h2>
    <p>{text}</p>
    <ButtonUploadImage change={change} name={name} typeAccepts="image/*" />
  </div>
);

export default UploadImage;
