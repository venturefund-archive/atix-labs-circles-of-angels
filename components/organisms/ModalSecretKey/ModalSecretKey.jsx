/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal, Divider, Form, Input } from 'antd';
import CustomButton from 'components/atoms/CustomButton/CustomButton';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import customConfig from 'custom-config';

const generatePDF = (content) => {
  const doc = jsPDF();
  doc.text(`${content}`, 10, 10);
  return doc
}

function FormModalSecretKey({ form, modalOpen, onSuccess }) {
  const { getFieldDecorator, getFieldProps, validateFields } = form
  const [first] = useState(false);
  const [pin, setPin] = useState();
  const [doc, setDoc] = useState();

  const validPin = (_rule, value, callback) => {
    if (value && parseInt(value) !== pin) {
      callback('Secret key do not match');
    } else {
      callback();
    }
  }

  const submit = () => {
    validateFields(err => {
      if (!err) {
        return onSuccess(
          getFieldProps('pin').value
        );
      }
    })
  }

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
          onClick={submit}
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

      <Form>
        <Form.Item label="Secret Key">
          {
            getFieldDecorator('pin', {
              rules: [
                {
                  required: true,
                  message: 'Please input your secret key'
                },
                {
                  validator: validPin,
                }
              ]
            })(<Input.Password placeholder='Enter your secret key' />)
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

FormModalSecretKey.defaultProps = {
  modalOpen: false,
  onSuccess: () => undefined,
  pin: NaN
};

FormModalSecretKey.propTypes = {
  modalOpen: PropTypes.bool,
  onSuccess: PropTypes.func,
  pin: PropTypes.number
};

const ModalSecretKey = Form.create({name: 'SecretKeyForm'})(FormModalSecretKey)
export default ModalSecretKey;
