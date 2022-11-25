import React from 'react';
import { Button, Typography } from 'antd';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { useHistory } from 'react-router';

export default function ModalInvalidToken() {
  const history = useHistory();

  const goToLogin = () => {
    history.push('login');
  }
  return (
    <CoaModal
      visible
      footer={
        <Button className='CoaModal__Primary' onClick={goToLogin}>
          Go to login
        </Button>
      } closable={false}
    >
      <LogoWrapper textTitle='This token is expired' />
      <Typography className='CoaModal__Paragraph--centered'>
        Login using your user and password
      </Typography>
    </CoaModal>
  )
}
