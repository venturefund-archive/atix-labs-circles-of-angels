import React from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Row } from 'antd';
import TopBar from '../components/organisms/TopBar/TopBar';
import LogoWrapper from '../components/atoms/LogoWrapper';

function ChangePasswordSuccess() {
  const history = useHistory();
  function goToLogin() {
    history.push('/login');
  }
  return (
    <Row
      className="Landing"
      style={{
        backgroundImage: 'url(images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <TopBar />
      <Modal
        visible
        mask={false}
        closable={false}
        maskClosable={false}
        className="ChangePasswordSuccess"
        footer={
          <Button className="ant-btn ant-btn-primary" onClick={goToLogin}>
            Continue
          </Button>
        }
      >
        <LogoWrapper textTitle="The password was changed succesfully" />
      </Modal>
    </Row>
  );
}

export default ChangePasswordSuccess;
