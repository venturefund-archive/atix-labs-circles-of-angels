import React from 'react';
import { Icon } from 'antd';
import { CoaButton } from '../CoaButton/CoaButton';
import './_style.scss'

const CoaApproveButton = ({ disabled, onClick, children }) => (
  <CoaButton
    className="coaApproveButton"
    disabled={disabled}
    onClick={onClick}
  >
    <Icon type="check" />
    {children}
  </CoaButton>
  )

export default CoaApproveButton;
