/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import { Typography, Button, Divider, Form, Input } from 'antd';
import CustomButton from 'components/atoms/CustomButton/CustomButton';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import customConfig from 'custom-config';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import { RubikBold } from 'components/utils/Rubik-Bold';
import { RubikRegular } from 'components/utils/Rubik-Regular';

const generatePDF = content => {
  const doc = jsPDF();
  const imageUrl = customConfig.LARGE_LOGO_PATH_PNG;

  doc.addImage(imageUrl, 'png', 72, 10, 70, 10);
  doc.addFileToVFS('Rubik-Bold.ttf', RubikBold);
  doc.addFont('Rubik-Bold.ttf', 'Rubik', 'bold');
  doc.addFileToVFS('Rubik-Regular.ttf', RubikRegular);
  doc.addFont('Rubik-Regular.ttf', 'Rubik', 'normal');
  doc.setFont('Rubik', 'bold').setFontSize(18);
  doc.text(70, 40, 'This is your secret key').setTextColor('#26385B');

  doc
    .setFont('Rubik', 'normal')
    .setFontSize(12)
    .setTextColor('#728099');
  doc.text('The key is unique and you will need it to perform', 60, 50);
  doc.text('different actions within the platform.', 70, 55);

  doc.setFont('Rubik', 'bold');
  doc.text('Always remember to keep it in a safe place.', 63, 60);

  doc.setFont('Rubik', 'normal');
  doc.setFontSize(36);
  doc.setTextColor('#4C7FF7');
  doc.text(content, 90, 80);

  return doc;
};

function FormModalSecretKey({ form, modalOpen, onSuccess }) {
  const { getFieldDecorator, getFieldProps, validateFields } = form;
  const [pin, setPin] = useState();
  const [doc, setDoc] = useState();

  const validPin = (_rule, value, callback) => {
    if (value && parseInt(value, 10) !== pin) {
      callback('Secret key do not match');
    } else {
      callback();
    }
  };

  const submit = () => {
    validateFields(err => {
      if (!err) {
        return onSuccess(getFieldProps('pin').value);
      }
    });
  };

  useEffect(() => {
    const _pin = Math.floor(100000 + Math.random() * 900000);
    setPin(_pin);
    setDoc(generatePDF(_pin));
  }, []);

  const saveSecretKey = () => {
    doc.save(`${customConfig.ORGANIZATION_NAME} - secret key.pdf`);
  };

  return (
    <CoaModal
      visible={modalOpen}
      mask={false}
      closable={false}
      maskClosable={false}
      footer={
        <Button className="ant-btn ant-btn-primary" onClick={submit}>
          Confirm
        </Button>
      }
    >
      <LogoWrapper textTitle="Set up your Secret Key" />
      <Typography.Paragraph>
        Download secret key. This Key is unique and you will need it to perform different actions
        within the platform. Please keep it in a safe place.
      </Typography.Paragraph>
      <CustomButton
        buttonText="Download"
        icon="download"
        classNameIcon="iconDisplay"
        theme="Secondary Left"
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
          {getFieldDecorator('pin', {
            rules: [
              {
                required: true,
                message: 'Please input your secret key'
              },
              {
                validator: validPin
              }
            ]
          })(<Input.Password placeholder="Enter your secret key" />)}
        </Form.Item>
      </Form>
    </CoaModal>
  );
}

FormModalSecretKey.defaultProps = {
  form: null,
  modalOpen: false,
  onSuccess: () => undefined
};

FormModalSecretKey.propTypes = {
  form: PropTypes.element,
  modalOpen: PropTypes.bool,
  onSuccess: PropTypes.func
};

const ModalSecretKey = Form.create({ name: 'SecretKeyForm' })(FormModalSecretKey);
export default ModalSecretKey;
