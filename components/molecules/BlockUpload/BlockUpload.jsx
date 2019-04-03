import React from 'react';
import './_style.scss';
import ButtonUpload from '../../atoms/ButtonUpload/ButtonUpload';

const BlockUpload = ({
  subtitle,
  text,
  change,
  name,
  buttonText,
  typeAccepts
}) => (
  <div className="UploadImageContainer">
    <p className="Title">{subtitle}</p>
    <p>{text}</p>
    <ButtonUpload
      change={change}
      name={name}
      buttonText={buttonText}
      typeAccepts={typeAccepts}
    />
  </div>
);

export default BlockUpload;
