/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Button, Modal, Typography } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';

const ModalConfirmProjectPublish = ({ visible, onSuccess, onCancel }) => (
  <Modal
    visible={visible}
    maskClosable={false}
    className='CustomModal'
    closable={false}
    mask
    footer={[
      <Button
        className='ant-btn ant-btn-secondary'
        onClick={onCancel}
      >
        No
      </Button>,
      <Button className='ant-btn ant-btn-primary' onClick={onSuccess}>
        yes
      </Button>
    ]}
  >
    <LogoWrapper textTitle='Do you want to confirm the creation of the project?' />
    <Typography style={{ textAlign: 'center' }}>This action cannot be undone</Typography>
  </Modal>
)

ModalConfirmProjectPublish.defaultProps = {
  visible: false,
  onSuccess: () => undefined,
  onCancel: () => undefined
}

ModalConfirmProjectPublish.propTypes = {
  visible: PropTypes.bool,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
}

export default ModalConfirmProjectPublish
