import { Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './coa-text-button.scss';
import classNames from 'classnames';

export const CoaTextButton = ({ children, disabled, className, variant, ...rest }) => (
  <Button
    type="link"
    disabled={disabled}
    className={classNames('customTextButton', className, {
      '--disabled': disabled,
      [`--${variant}`]: variant
    })}
    {...rest}
  >
    {children}
  </Button>
);

CoaTextButton.defaultProps = {
  children: '',
  disabled: false,
  className: ''
};

CoaTextButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  disabled: PropTypes.bool,
  className: PropTypes.string
};
