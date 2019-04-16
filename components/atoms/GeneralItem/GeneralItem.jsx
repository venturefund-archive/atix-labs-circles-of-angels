import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const GeneralItem = ({ subtitle, title, iconItem }) => (
  <div className="GeneralItem">
    <div className="HeaderData">
      <Icon type={iconItem} style={{ color: '#8b91a4' }} />
      <p>{subtitle}</p>
    </div>
    <h2>{title}</h2>
  </div>
);

export default GeneralItem;
