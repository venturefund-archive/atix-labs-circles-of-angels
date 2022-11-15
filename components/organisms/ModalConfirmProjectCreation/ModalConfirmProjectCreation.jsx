/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { Button, Modal, Typography } from "antd";
import LogoWrapper from "components/atoms/LogoWrapper";

const ModalConfirmProjectCreation = ({ modalOpen, onSuccess }) => {
  return (
    <Modal
      visible={modalOpen}
      maskClosable={false}
      className='CustomModal'
      closable={false}
      mask={true}
      footer={[
        <Button className='ant-btn ant-btn-secondary'>No</Button>,
        <Button className='ant-btn ant-btn-primary' onClick={onSuccess}>
          yes
        </Button>
      ]}
    >
      <LogoWrapper textTitle='Do you want to confirm the creation of the project?' />
      <Typography style={{ textAlign: 'center' }}>This action cannot be undone</Typography>
    </Modal>
  )
}

export default ModalConfirmProjectCreation
