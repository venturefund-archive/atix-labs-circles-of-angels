/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal, Divider, Form } from 'antd';
import CustomButton from 'components/atoms/CustomButton/CustomButton';
import Field from 'components/atoms/Field/Field';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import customConfig from 'custom-config';
import { parseInt } from 'lodash';

function SecretKeyValidator({ secretKey, onSuccess }) {
  const [field, setField] = useState({
    type: 'password',
    name: 'secret-key',
    placeholder: 'Enter your secret key',
    value: '',
    validateStatus: '',
    help: ''
  });

  const isValid = (value, _secretKey) => parseInt(value) === _secretKey;
  const handleChange = (e) => {
    const { value } = e.target
    const valid = isValid(value, secretKey);
    setField(oldField => ({
      ...oldField,
      value,
      validateStatus: valid ? 'success' : 'error',
      help: !valid ? 'Must match Secret Key' : '',
    }))
  }

  useEffect(() => {
    if (isValid(field.value, secretKey)) {
      onSuccess()
    }
  }, [field.value, onSuccess, secretKey])

  return (
    <Form>
      <Field {...field} handleChange={handleChange} />
    </Form>
  )
}

const generatePDF = (content) => {
  const doc = jsPDF();
  doc.text(`${content}`, 10, 10);
  return doc
}
function ModalSecretKey({ modalOpen, onSuccess }) {
  const [first] = useState(false);
  const [pin, setPin] = useState();
  const [doc, setDoc] = useState();
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    const _pin = Math.floor(100000 + Math.random() * 900000);
    setPin(_pin)
    setDoc(generatePDF(_pin))
  }, []);

  const saveSecretKey = () => {
    doc.save(`${customConfig.NAME} - secret key.pdf`);
  }

  return (
    <Modal
      visible={modalOpen}
      mask={false}
      closable={false}
      maskClosable={false}
      className={`ChangePasswordSuccess ${first ? 'First' : ''}`}
      footer={(
        <Button
          className="ant-btn ant-btn-primary"
          disabled={disabled}
          onClick={onSuccess}
        >
          Confirm
        </Button>
      )}
    >
      <LogoWrapper textTitle="Set up your Secret Key" />
      <Typography.Paragraph>
        Download secret key. This Key is unique and you will need
        it to perform different actions within the platform.
        Please keep it in a safe place.
      </Typography.Paragraph>
      <CustomButton
        buttonText='Download'
        icon="download"
        classNameIcon='iconDisplay'
        theme='Secondary Left'
        onClick={saveSecretKey}
        style={{
          display: 'flex',
          border: 'solid 1px #4c7ff7',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between'
        }}
      />
      <Divider />
      <Typography.Paragraph>
        Enter the secret key you downloaded in the previous step.
      </Typography.Paragraph>
      <Typography.Text
        style={{
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        Secret Key
      </Typography.Text>
      <SecretKeyValidator secretKey={pin} onSuccess={() => setDisabled(false)} />
    </Modal>
  );
};

SecretKeyValidator.defaultProps = {
  secretKey: NaN,
  onSuccess: () => undefined,
}

SecretKeyValidator.propTypes = {
  secretKey: PropTypes.number,
  onSuccess: PropTypes.func
}

ModalSecretKey.defaultProps = {
  modalOpen: false,
  onSuccess: () => undefined,
};

ModalSecretKey.propTypes = {
  modalOpen: PropTypes.bool,
  onSuccess: PropTypes.func
};

export default ModalSecretKey;
