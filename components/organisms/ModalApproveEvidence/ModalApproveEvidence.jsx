import { Button, Typography } from 'antd';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import LogoWrapper from 'components/atoms/LogoWrapper';
import React from 'react';

export default function ModalApproveEvidence({ visible, setVisible, onSuccess }) {
  return (
    <CoaModal
      visible={visible}
      closable={false}
      maskClosable
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          className='ant-btn ant-btn-secondary CoaModal__Secondary'
          onClick={() => setVisible(false)}
        >
          Cancel
        </Button>,
        <Button className='ant-btn ant-btn-primary CoaModal__primary' onClick={onSuccess}>
          Approve
        </Button>
      ]}
    >
      <LogoWrapper textTitle='You are about to approve an evidence' />
      <Typography.Text className='CoaModal__Paragraph--centered'>Are you sure you want to approve the following evidence?</Typography.Text>
    </CoaModal>
  )
}
