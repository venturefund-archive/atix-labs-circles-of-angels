/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';
import { Button, Icon } from 'antd';

const CustomButton = ({
  id,
  theme,
  buttonText,
  onClick,
  icon,
  disabled,
  htmlType
}) => {
  const classname = `CustomButton ${theme}`;
  return (
    <Button
      id={id}
      className={classname}
      onClick={onClick}
      disabled={disabled}
      htmlType={htmlType}
    >
      <span>{buttonText} </span>
      <Icon type={icon} />
    </Button>
  );
};

export default CustomButton;
