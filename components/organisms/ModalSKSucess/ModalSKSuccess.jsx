import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Typography } from 'antd';
import LogoWrapper from '../../atoms/LogoWrapper'

export default function ModalSKSuccess({ visible, onSuccess }) {
  return (
    <Modal
      visible={visible}
      closable={false}
      mask
      maskClosable={false}
      className='SecretKey'
      footer={<Button className='ant-btn ant-btn-primary' onClick={onSuccess}>Continue</Button>}
    >
      <LogoWrapper textTitle='Your account was set successfully!' />
      <Typography className='txtcenter'>No you can proceed</Typography>
    </Modal>
  )
}

ModalSKSuccess.defaultProps = {
  visible: false,
  onSuccess: () => undefined
}

ModalSKSuccess.propTypes = {
  visible: PropTypes.bool,
  onSuccess: PropTypes.func
}
