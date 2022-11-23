import React from 'react';
import { Modal } from 'antd';
import './coa-modal.scss';

export default function CoaModal({
  children,
  visible,
  ...rest
}) {
  return (
    <Modal className='CoaModal' visible={visible} {...rest}>
      {children}
    </Modal>
  )
}
