import React from 'react';
import { Spin } from 'antd';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: '100px' }} />

export default function ModalSecretKeyLoading({ visible }) {
  return (
    <CoaModal
      visible={visible}
      maskClosabe={false}
      closable={false}
      mask
      footer={null}
    >
      <LogoWrapper textTitle='Saving your status' />
      <div className='o-ModalWrapper'>
        <div className='o-ModalWrapper__SpinWrapper'>
          <Spin className='o-ModalWrapper__Spin' indicator={antIcon} />
        </div>
      </div>
    </CoaModal>
  )
}

ModalSecretKeyLoading.defaultProps = {
  visible: false
}

ModalSecretKeyLoading.propTypes = {
  visible: PropTypes.bool
}
