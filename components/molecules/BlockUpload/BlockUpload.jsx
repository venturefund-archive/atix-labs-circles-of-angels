/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

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
  defaultFileList,
  hideButton,
  remove,
  beforeUpload,
  fileList
}) => (
  <div className="UploadImageContainer">
    <div>
      <p className="Title">{subtitle}</p>
      <p>{text}</p>
    </div>
    <div className="UploadButton">
      <ButtonUpload
        change={change}
        name={name}
        buttonText={buttonText}
        typeAccepts={typeAccepts}
        defaultFileList={defaultFileList}
        hideButton={hideButton}
        onRemove={remove}
        beforeUpload={beforeUpload}
        fileList={fileList}
      />
    </div>
  </div>
);

export default BlockUpload;
