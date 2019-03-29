import React from 'react';

import './_style.scss';
import ButtonUploadImage from '../../atoms/ButtonUploadImage/ButtonUploadImage';

const UploadImage = ({ subtitle, text, change, name }) => (
  <div className="UploadImageContainer">
    <p className="Title">{subtitle}</p>
    <p>{text}</p>
    <ButtonUploadImage change={change} name={name} typeAccepts="image/*" />
  </div>
);

export default UploadImage;
