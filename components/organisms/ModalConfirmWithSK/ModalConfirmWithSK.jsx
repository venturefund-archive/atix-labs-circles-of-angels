/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import { Button, Modal, Typography, Form, Input } from 'antd';
import { getWallet } from 'api/userApi';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { useUserContext } from 'components/utils/UserContext';
import { decryptJsonWallet } from 'helpers/blockchain/wallet';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormModalConfirmWithSK = ({ form, visible, setVisible, onSuccess }) => {
  const { getFieldDecorator, getFieldProps, validateFields } = form;
  const { getLoggedUser } = useUserContext();
  const [wallet, setWallet] = useState({});

  const user = getLoggedUser()
  const keySuffix = `${user.id}-${user.email}`;

  const setUserWallet = async () => {
    const { data: userWallet } = await getWallet();
    if (userWallet) setWallet(userWallet);
  };

  useEffect(() => {
    setUserWallet();
  }, []);

  const validPinAndPassword = async (_rule, value, callback) => {
    try {
      const key = `${value}-${keySuffix}`;
      await decryptJsonWallet(JSON.stringify(wallet), key)
      callback()
    } catch (e) {
      callback(e)
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
      mask
      footer={[
        <Button className='ant-btn ant-btn-secondary' onClick={() => setVisible(false)}>No</Button>,
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

FormModalConfirmWithSK.defaultProps = {
  form: null,
  visible: false,
  setVisible: () => undefined,
  onSuccess: () => undefined
}

FormModalConfirmWithSK.propTypes = {
  form: PropTypes.element,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  onSuccess: PropTypes.func
}
const ModalConfirmWithSK = Form.create({ name: 'FormConfirmWithSK' })(FormModalConfirmWithSK)
export default ModalConfirmWithSK
