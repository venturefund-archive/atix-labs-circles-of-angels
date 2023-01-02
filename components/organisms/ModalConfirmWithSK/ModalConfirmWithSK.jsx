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
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';

import TitlePage from 'components/atoms/TitlePage/TitlePage';

import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaFormItemPassword } from 'components/molecules/CoaFormItems/CoaFormItemPassword/CoaFormItemPassword';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

function FormModalConfirmWithSK({
  form,
  visible,
  onCancel,
  onSuccess,
  title,
  description,
  okText,
  cancelText,
  leaveAComment,
}) {
  const { user } = useContext(UserContext);
  const [wallet, setWallet] = useState({});
  const { getFieldValue } = form;
  const keySuffix = `${user.id}-${user.email}`;
  const { texts } = React.useContext(DictionaryContext);

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
      callback(texts?.modalConfirmWithSK?.invalidKey || 'Invalid secret key');
    }
  };
  const validPassword = async (_rule, value, callback) => {
    const { email } = user;
    const res = await loginUser(email, value);
    if (res.errors) {
      callback(texts?.modalConfirmWithSK?.invalidPassword || 'Invalid password');
    }
    callback();
  };

  const handleSave = useCallback(() => {
    onSuccess(getFieldValue('secretKey').value, getFieldValue('password').value);
  }, [getFieldValue, onSuccess]);

  return (
    <CoaDialogModal
      buttonsPosition="center"
      visible={visible}
      onCancel={onCancel}
      form={form}
      onSave={handleSave}
      title={
        <TitlePage centeredText textTitle={title} underlinePosition="none" textColor="#4C7FF7" />
      }
      withLogo
      description={description}
      okText={okText}
      cancelText={cancelText}
    >
      <Form>
        {
          leaveAComment &&
          <CoaFormItemTextArea
            form={form}
            formItemProps={{
              label: 'Leave a comment'
            }}
            name="comment"
            fieldDecoratorOptions={{
              rules: [
                {
                  required: true,
                  message:
                    'Must write a reason for rejection'
                }
              ],
              validateTrigger: 'onSubmit'
            }}
            inputTextAreaProps={{
              rows: 4
            }}
          />
        }
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
                message: texts?.modalConfirmWithSK?.rulePassword || 'Please input your password'
              },
              {
                validator: validPassword
              }
            ],
            validateTrigger: 'onSubmit'
          }}
          inputProps={{
            placeholder: texts?.modalConfirmWithSK?.enterPassword || 'Enter your password'
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
                message: texts?.modalConfirmWithSK?.ruleSecretKey || 'Please input your secret key'
              },
              {
                validator: validPin
              }
            ],
            validateTrigger: 'onSubmit'
          }}
          inputProps={{
            placeholder: texts?.modalConfirmWithSK?.enterPin || 'Enter your pin'
          }}
        />
      </Form>
    </CoaDialogModal>
  );
}

FormModalConfirmWithSK.defaultProps = {
  form: null,
  visible: false,
  leaveAComment: false,
  title: 'Do you want to confirm the creation of the project?',
  onCancel: () => undefined,
  onSuccess: () => undefined,
  description: 'To confirm the process enter your administrator password and secret key',
  okText: 'Yes',
  cancelText: 'No'
};

FormModalConfirmWithSK.propTypes = {
  form: PropTypes.element,
  title: PropTypes.string,
  visible: PropTypes.bool,
  leaveAComment: PropTypes.bool,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  description: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string
};
const ModalConfirmWithSK = Form.create({ name: 'FormConfirmWithSK' })(FormModalConfirmWithSK);
export default ModalConfirmWithSK;
