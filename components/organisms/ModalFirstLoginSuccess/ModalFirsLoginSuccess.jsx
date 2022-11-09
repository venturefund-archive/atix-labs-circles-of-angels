/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { useHistory } from 'react-router';
import { Typography, Button, Modal } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import PropTypes from 'prop-types';

function ModalFirstLoginSuccess({ modalOpen, admin }) {
  const history = useHistory();

  return (
    <Modal
      visible={modalOpen}
      mask={false}
      closable={false}
      maskClosable={false}
      className={`ChangePasswordSuccess ${!admin ? 'First' : ''}`}
      footer={admin ? (
        <Button className="ant-btn ant-btn-primary" onClick={() => { history.push('/my-projects') }}>
          Continue
        </Button>
      ) : ''}
    >
      <LogoWrapper textTitle="Thanks for you registration!" />
      <Typography.Paragraph className='ChangePasswordParagraph'>
        {!admin ? `
    Your account was set successfully.
          Once the project is published, we will send you the next steps
          so that you can make your first login to the platform.
      ` : 'Use your new password to login'}
      </Typography.Paragraph>
    </Modal>
  );
}

ModalFirstLoginSuccess.defaultProps = {
  modalOpen: false,
  admin: false
};

ModalFirstLoginSuccess.propTypes = {
  modalOpen: PropTypes.bool,
  admin: PropTypes.bool
}

export default ModalFirstLoginSuccess;
