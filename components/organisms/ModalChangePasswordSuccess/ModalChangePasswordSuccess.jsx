/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Typography, Button, Modal } from 'antd';
import { useHistory } from 'react-router';
import LogoWrapper from 'components/atoms/LogoWrapper';

function ModalChangePasswordSuccess({ visible }) {
  const history = useHistory();

  const goToLogin = () => {
    history.push('login');
  }

  return (
    <Modal
      visible={visible}
      mask={false}
      closable={false}
      maskClosable={false}
      className={`ChangePasswordSuccess`}
      footer={(
        <Button className="ant-btn ant-btn-primary" onClick={goToLogin}>
          Continue
        </Button>
      )}
    >
      <LogoWrapper textTitle="Thanks for you registration!" />
      <Typography.Paragraph className='ChangePasswordParagraph'>
        Use your new password to login
      </Typography.Paragraph>
    </Modal>
  );
}

export default ModalChangePasswordSuccess;
