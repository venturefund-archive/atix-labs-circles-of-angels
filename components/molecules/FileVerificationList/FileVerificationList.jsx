import React from 'react';
import { Icon } from 'antd';

import './_style.scss';

const FileVerificationList = ({ status, errors }) => {
  const iconType = status === 1 ? 'exclamation-circle' : 'close-circle';
  const iconColor = status === 1 ? '#728099' : '#FF0050'; // "#15D380"

  return (
    <div className="FileVerification">
    <div className="center">
    <Icon
        type={iconType}
        theme="twoTone"
        twoToneColor={iconColor}
        className="IconVerify"
      />
      <h2>File Verification</h2>
    </div>
      <ul>
        {errors.map((item, i) => (
          <li key={i}>
            At Row: {item.rowNumber} - {item.msg}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FileVerificationList;
