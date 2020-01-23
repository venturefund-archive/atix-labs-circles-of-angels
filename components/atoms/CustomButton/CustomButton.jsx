/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Button, Icon } from 'antd';

const CustomButton = ({
  id,
  theme,
  buttonText,
  onClick,
  icon,
  disabled,
  hidden,
  htmlType,
  classNameIcon
}) => {
  const classname = `CustomButton ${theme}`;
  return (
    <Button
      id={id}
      className={classname}
      onClick={onClick}
      disabled={disabled}
      htmlType={htmlType}
      hidden={hidden}
    >
      <span>{buttonText} </span>
      <Icon type={icon} className={classNameIcon} />
    </Button>
  );
};

export default CustomButton;

CustomButton.defaultProps = {
  id: 1,
  theme: 'Primary',
  buttonText: '',
  onClick: () => undefined,
  icon: '',
  disabled: false,
  hidden: false,
  htmlType: '',
  classNameIcon: ''
};

CustomButton.propTypes = {
  id: PropTypes.number,
  theme: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  htmlType: PropTypes.string,
  classNameIcon: PropTypes.string
};
