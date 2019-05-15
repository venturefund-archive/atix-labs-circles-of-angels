import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const InfoItem = ({ subtitle, title }) => (
  <div className="InfoItem">
    <div className="InfoItemData">
      <p>{subtitle}</p>
      <h2>{title}</h2>
    </div>
  </div>
);

export default InfoItem;
