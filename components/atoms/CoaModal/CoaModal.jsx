import React from 'react';
import { Modal } from 'antd';
import './coa-modal.scss';

export default function CoaModal({
  children,
  visible,
  ...rest
}) {
  return (
    <Modal
      bodyStyle={{
        padding: '32px 60px',
      }}
      className='CoaModal'
      visible={visible} {...rest}
      closeIcon=''
    >
      {children}
    </Modal>
  )
}

