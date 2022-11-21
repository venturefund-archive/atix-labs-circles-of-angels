/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import { Button, Modal, Typography, Form, Input } from "antd";
import { getWallet } from "api/userApi";
import Field from "components/atoms/Field/Field";
import LogoWrapper from "components/atoms/LogoWrapper";
import { useUserContext } from "components/utils/UserContext";
import { decryptJsonWallet } from "helpers/blockchain/wallet";
import React, { useState, useEffect } from "react";

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
const FormModalConfirmWithSK = ({ form, visible, onSuccess }) => {
  const { getFieldDecorator, getFieldProps, validateFields } = form
  const { getLoggedUser } = useUserContext();
  const [wallet, setWallet] = useState({});

  const user = getLoggedUser()
  const keySuffix = `${user.id}-${user.email}`

  const setUserWallet = async () => {
    const { data: userWallet } = await getWallet()
    if (userWallet) setWallet(userWallet)
  }

  useEffect(() => {
    setUserWallet()
  }, [])

  const validPinAndPassword = async (_rule, value, callback) => {
    try {
      const decrypted = await decryptJsonWallet(wallet, `${value}-${keySuffix}`)
      console.log(decrypted)
      callback()
    } catch (e) {
      console.log(e)
      callback('Cannot decrypt password')
    }
  }

  const submit = () => {
    validateFields(err => {
      if (!err) {
        return onSuccess(
          getFieldProps('pin').value,
          getFieldProps('password').value
        );
      }
    })
  }

  return (
    <Modal
      visible={visible}
      maskClosable={false}
      className='CustomModal'
      closable={false}
      mask={true}
      footer={[
        <Button className='ant-btn ant-btn-secondary'>No</Button>,
        <Button className='ant-btn ant-btn-primary' onClick={submit}>
          yes
        </Button>
      ]}
    >
      <LogoWrapper textTitle='Do you want to confirm the creation of the project?' />
      <Typography style={{ textAlign: 'center' }}>To confirm the process enter your administrator password and secret key</Typography>
      <Form>
        <Form.Item label='Password'>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password'
              },
            ]
          })(<Input.Password placeholder='Enter your password' />)}
        </Form.Item>
        <Form.Item label='Secret Key'>
          {getFieldDecorator('secretKey', {
            rules: [
              {
                required: true,
                message: 'Please input your secret key'
              },
              {
                validator: validPinAndPassword
              }
            ]
          })(<Input.Password placeholder='Enter your password' />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ModalConfirmWithSK = Form.create({ name: 'FormConfirmWithSK' })(FormModalConfirmWithSK)
export default ModalConfirmWithSK
