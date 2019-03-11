import React from 'react';
import { Icon } from "antd";

import './_style.scss';

const ButtonDownload = ({ text, onClick }) => (
  <button type="button" className="ButtonDownload" onClick={onClick}>
    <p>{text}</p>
    <Icon type="download" />
  </button>
);

export default ButtonDownload;
