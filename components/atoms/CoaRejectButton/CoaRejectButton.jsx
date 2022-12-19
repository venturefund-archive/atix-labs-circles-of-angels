import React from 'react';
import { Icon } from 'antd';
import { CoaButton } from '../CoaButton/CoaButton';
import './_style.scss'

const CoaRejectButton = ({ disabled, onClick, children }) => (
  <CoaButton
    className="coaRejectButton"
    disabled={disabled}
    onClick={onClick}
  >
    <Icon type="close" />
    {children}
  </CoaButton>
  )

CoaRejectButton.defaultProps = {
  disabled: false,
  onClick: () => {}
};

export default CoaRejectButton;