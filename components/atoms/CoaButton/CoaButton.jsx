import { Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './coa-button.scss';
import classNames from 'classnames';

export const CoaButton = ({ children, disabled, className, type, ...rest }) => (
  <Button
    disabled={disabled}
    type={type}
    className={classNames('coaButton', {
      [className]: Boolean(className),
      '--disabled': disabled,
      [type]: Boolean(type)
    })}
    {...rest}
  >
    {children}
  </Button>
);

CoaButton.defaultProps = {
  children: '',
  disabled: false,
  className: '',
  type: undefined
};

CoaButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string
};
