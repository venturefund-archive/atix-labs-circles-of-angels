/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { Button, Modal, Typography } from "antd";
import Field from "components/atoms/Field/Field";
import LogoWrapper from "components/atoms/LogoWrapper";

const ConfirmKeyForm = () => {
  return (
    <Form
      name='secret-key-confirmation'
    >
      <Field name='password' label='Password' />
      <Field name='password' label='Secret Key' />
    </Form>
  )
}
const ModalConfirmWithSK = ({ modalOpen, onSuccess }) => {
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
      <Typography style={{ textAlign: 'center' }}>To confirm the process enter your administrator password and secret key</Typography>
      <ConfirmKeyForm />
    </Modal>
  )
}

export default ModalConfirmWithSK
