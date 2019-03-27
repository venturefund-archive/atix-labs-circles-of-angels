import React from 'react';

import './_style.scss';
import ButtonUploadFile from '../../atoms/ButtonUploadFile/ButtonUploadFile';

const UploadFile = ({ subtitle, text, change, name, buttonText }) => (
  <div className="UploadFileContainer">
    <h2>{subtitle}</h2>
    <p>{text}</p>
    <ButtonUploadFile
      change={change}
      name={name}
      text={buttonText}
      typeAccepts=".pdf"
    />
  </div>
);

export default UploadFile;
