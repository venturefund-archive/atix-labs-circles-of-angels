/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { Button, Modal, Typography, Form, Input } from 'antd';
import { getWallet } from 'api/userApi';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { UserContext } from 'components/utils/UserContext';
import { decryptJsonWallet } from 'helpers/blockchain/wallet';

import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';

function FormModalConfirmWithSK({ form, visible, setVisible, onSuccess }) {
  const { getFieldDecorator, getFieldProps, validateFields } = form;
  const { user } = useContext(UserContext);
  const [wallet, setWallet] = useState({});

  const keySuffix = `${user.id}-${user.email}`;

  const setUserWallet = async () => {
    const { data } = await getWallet();
    if (data) setWallet(data.wallet);
  };

  useEffect(() => {
    setUserWallet();
  }, []);

  const validPinAndPassword = async (_rule, value, callback) => {
    try {
      const key = `${value}-${keySuffix}`;
      await decryptJsonWallet(wallet, key)
      callback()
    } catch (e) {
      callback(e)
    }
  }

  const submit = () => {
    const { getFieldValue } = form;
    validateFields(err => {
      if (!err) {
        return onSuccess(
          getFieldValue('secretKey').value,
          getFieldValue('password').value
        );
      }
    })
  }

  return (
    <CoaModal
      visible={visible}
      maskClosable={true}
      closable={true}
      mask
      footer={[
        <Button className='ant-btn ant-btn-primary CoaModal__Primary' onClick={submit}>
          Continue
        </Button>
      ]}
    >
      <LogoWrapper textTitle='Do you want to confirm the creation of the project?' />
      <Typography style={{ textAlign: 'center' }}>
        To confirm the process enter your administrator password and secret key
      </Typography>
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
          })(<Input.Password placeholder='Enter your password' name='pin'/>)}
        </Form.Item>
      </Form>
    </CoaModal>
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
