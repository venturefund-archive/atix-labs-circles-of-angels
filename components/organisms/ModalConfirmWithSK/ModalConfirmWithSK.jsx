/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Form, Input } from 'antd';
import { getWallet, loginUser } from 'api/userApi';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { UserContext } from 'components/utils/UserContext';
import { decryptJsonWallet } from 'helpers/blockchain/wallet';

import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';

function FormModalConfirmWithSK({ form, visible, onCancel, onSuccess, title }) {
  const { getFieldDecorator, validateFields, isFieldValidating } = form;
  const { user } = useContext(UserContext);
  const [wallet, setWallet] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const keySuffix = `${user.id}-${user.email}`;

  const setUserWallet = async () => {
    const { data } = await getWallet();
    if (data) setWallet(data.wallet);
  };

  useEffect(() => {
    setUserWallet();
  }, []);

  const validPin = async (_rule, value, callback) => {
    if (!value) callback();
    try {
      const key = `${value}-${keySuffix}`;
      await decryptJsonWallet(wallet, key);
      callback();
    } catch (e) {
      callback('Invalid secret key');
    }
  };
  const validPassword = async (_rule, value, callback) => {
    const { email } = user;
    const res = await loginUser(email, value);
    if (res.errors) {
      callback('Invalid password');
    }
    callback();
  };

  const submit = () => {
    const { getFieldValue } = form;
    validateFields(async err => {
      if (!err) {
        setIsLoading(true);
        await onSuccess(getFieldValue('secretKey').value, getFieldValue('password').value);
        setIsLoading(false);
      }
    });
  };

  return (
    <CoaModal
      visible={visible}
      closable={false}
      onCancel={onCancel}
      mask
      maskClosable
      footer={[
        <Button
          className="ant-btn ant-btn-primary CoaModal__Primary"
          onClick={submit}
          loading={isLoading || isFieldValidating('password') || isFieldValidating('secretKey')}
        >
          Continue
        </Button>
      ]}
    >
      <LogoWrapper textTitle={title ?? 'Do you want to confirm the creation of the project?'} />
      <Typography style={{ textAlign: 'center' }}>
        To confirm the process enter your administrator password and secret key
      </Typography>
      <Form>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password'
              },
              {
                validator: validPassword
              }
            ],
            validateTrigger: 'onSubmit'
          })(<Input.Password placeholder="Enter your password" />)}
        </Form.Item>
        <Form.Item label="Secret Key">
          {getFieldDecorator('secretKey', {
            rules: [
              {
                required: true,
                message: 'Please input your secret key'
              },
              {
                validator: validPin
              }
            ],
            validateTrigger: 'onSubmit'
          })(<Input.Password placeholder="Enter your password" name="pin" />)}
        </Form.Item>
      </Form>
    </CoaModal>
  );
}

FormModalConfirmWithSK.defaultProps = {
  form: null,
  visible: false,
  title: null,
  onCancel: () => undefined,
  onSuccess: () => undefined
};

FormModalConfirmWithSK.propTypes = {
  form: PropTypes.element,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func
};
const ModalConfirmWithSK = Form.create({ name: 'FormConfirmWithSK' })(FormModalConfirmWithSK);
export default ModalConfirmWithSK;
