import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Row } from 'antd';
import Navigation from 'components/organisms/Navigation';
import LogoWrapper from '../components/atoms/LogoWrapper';

function ChangePasswordSuccess() {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  function goToLogin() {
    history.push('/login');
  }
  return (
    <Row
      className="Landing"
      style={{
        backgroundImage: 'url(./static/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <Navigation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <Modal
        visible
        mask={false}
        closable={false}
        maskClosable={false}
        className="ChangePasswordSuccess"
        footer={(
          <Button className="ant-btn ant-btn-primary" onClick={goToLogin}>
            Continue
          </Button>
        )}
      >
        <LogoWrapper textTitle="The password was changed succesfully" />
      </Modal>
    </Row>
  );
}

export default ChangePasswordSuccess;
