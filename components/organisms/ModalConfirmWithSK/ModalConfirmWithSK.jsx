/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { getWallet, loginUser } from 'api/userApi';
import { UserContext } from 'components/utils/UserContext';
import { decryptJsonWallet } from 'helpers/blockchain/wallet';

import TitlePage from 'components/atoms/TitlePage/TitlePage';

import { CoaFormItemPassword } from 'components/molecules/CoaFormItems/CoaFormItemPassword/CoaFormItemPassword';
import { CoaFormModal } from '../CoaModals/CoaFormModal/CoaFormModal';

function FormModalConfirmWithSK({ form, visible, onCancel, onSuccess, title }) {
  const { user } = useContext(UserContext);
  const [wallet, setWallet] = useState({});
  const { getFieldValue } = form;
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

  const handleSave = useCallback(() => {
    onSuccess(getFieldValue('secretKey').value, getFieldValue('password').value);
  }, [getFieldValue, onSuccess]);

  return (
    <CoaFormModal
      buttonsPosition="center"
      visible={visible}
      onCancel={onCancel}
      form={form}
      onSave={handleSave}
      title={
        <TitlePage
          centeredText
          textTitle={title ?? 'Do you want to confirm the creation of the project?'}
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      withLogo
      description="To confirm the process enter your administrator password and secret key"
    >
      <Form>
        <CoaFormItemPassword
          form={form}
          name="password"
          formItemProps={{
            label: 'Password'
          }}
          fieldDecoratorOptions={{
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
          }}
          inputProps={{
            placeholder: 'Enter your password'
          }}
        />
        <CoaFormItemPassword
          form={form}
          name="secretKey"
          formItemProps={{
            label: 'Secret Key'
          }}
          fieldDecoratorOptions={{
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
          }}
          inputProps={{
            placeholder: 'Enter your pin'
          }}
        />
      </Form>
    </CoaFormModal>
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
