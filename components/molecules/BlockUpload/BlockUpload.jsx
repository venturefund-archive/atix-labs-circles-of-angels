import React from 'react';
import './_style.scss';
import ButtonUpload from '../../atoms/ButtonUpload/ButtonUpload';

const BlockUpload = ({
  subtitle,
  text,
  change,
  name,
  buttonText,
  typeAccepts,
  defaultFileList
}) => (
  <div className="UploadImageContainer">
    <div>
      <p className="Title">{subtitle}</p>
      <p>{text}</p>
    </div>
    <ButtonUpload
      change={change}
      name={name}
      buttonText={buttonText}
      typeAccepts={typeAccepts}
      defaultFileList={defaultFileList}
    />
  </div>
);

export default BlockUpload;
