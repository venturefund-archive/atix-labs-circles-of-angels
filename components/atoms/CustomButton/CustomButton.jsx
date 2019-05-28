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
