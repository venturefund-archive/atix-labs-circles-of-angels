import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
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
      visible={visible}
      {...rest}
      closeIcon=''
    >
      {children}
    </Modal>
  )
}

CoaModal.defaultProps = {
  children: null,
  visible: false
}

CoaModal.propTypes = {
  children: PropTypes.element,
  visible: PropTypes.bool
}
