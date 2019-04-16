import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const InfoItem = ({ subtitle, title, iconInfoItem }) => (
  <div className="InfoItem">
    <Icon type={iconInfoItem} style={{ color: '#8b91a4' }} />
    <div className="InfoItemData">
      <p>{subtitle}</p>
      <h2>{title}</h2>
    </div>
  </div>
);

export default InfoItem;
