/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Icon, Spin } from 'antd';
import { isEmpty } from 'lodash';

import './_style.scss';

const FileVerificationList = ({ errors, loading }) => {
  const iconType = isEmpty(errors) ? 'exclamation-circle' : 'close-circle';
  const iconColor = isEmpty(errors) ? '#728099' : '#FF0050'; // "#15D380"

  return (
    <div className="FileVerification">
      <Spin spinning={loading}>
        <div className="center">
          <Icon
            type={iconType}
            theme="twoTone"
            twoToneColor={iconColor}
            className="IconVerify"
          />
          <h2>File Verification</h2>
          {!isEmpty(errors) && (
            <p>
              The Excel file has errors. Please fix the errors shown below and
              upload a new Excel file
            </p>
          )}
        </div>
        <ul>
          {!isEmpty(errors) &&
            errors.map((item, i) => (
              <li key={i}>
                At Row: {item.rowNumber} - {item.msg}
              </li>
            ))}
        </ul>
      </Spin>
    </div>
  );
};
export default FileVerificationList;