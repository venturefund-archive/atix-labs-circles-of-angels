/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Typography, Button, Modal, Divider } from 'antd';
import CustomButton from 'components/atoms/CustomButton/CustomButton';
import Field from 'components/atoms/Field/Field';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';

// const generatePin = () => Math.floor(100000 + Math.random() * 900000);

function ModalSecretKey({ modalOpen, onSuccess }) {
  const [first] = useState(false);

  return (
    <Modal
      visible={modalOpen}
      mask={false}
      closable={false}
      maskClosable={false}
      className={`ChangePasswordSuccess ${first ? 'First' : ''}`}
      footer={(
        <Button className="ant-btn ant-btn-primary" onClick={onSuccess}>
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
      <Field
        name='secretKey'
        placeholder='Enter your secret key'
        type='password'
      />
    </Modal>
  );
};

ModalSecretKey.defaultProps = {
  modalOpen: false,
  onSuccess: () => undefined
};

ModalSecretKey.propTypes = {
  modalOpen: PropTypes.bool,
  onSuccess: PropTypes.func
};

export default ModalSecretKey;
