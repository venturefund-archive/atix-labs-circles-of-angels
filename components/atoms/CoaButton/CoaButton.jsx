import { Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './coa-button.scss';

// Si es ghost que tome el estilo del project create
// Si es primary lo normal - solo opacity
// Si es seocndary -- solo opacity

export const CoaButton = ({ children, disabled, className, type, ...rest }) => (
  <Button
    disabled={disabled}
    type={type}
    className={`coaButton ${className} ${type} ${disabled ? '--disabled' : ''}`}
    {...rest}
  >
    {children}
  </Button>
);

CoaButton.defaultProps = {
  children: '',
  disabled: false,
  className: '',
  type: ''
};

CoaButton.propTypes = {
  children: React.ReactNode,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string
};
