/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Typography, Button, Modal, Row } from 'antd';
import Navigation from 'components/organisms/Navigation';
import LogoWrapper from '../components/atoms/LogoWrapper';

function ChangePasswordSuccess() {
  const [modalOpen, setModalOpen] = useState(false);
  const [first, setFirst] = useState(false);
  const [projectId, setProjectId] = useState();

  const history = useHistory();

  useEffect(() => {
    const {
      first: _first,
      projectId: _projectId
    } = history.location.state;
    setFirst(_first);
    setProjectId(_projectId);
  }, [history.location.state]);

  const goToLogin = () => history.push(`/${projectId}/login`)
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
        className={`ChangePasswordSuccess ${first ? 'First' : ''}`}
        footer={!first && (
          <Button className="ant-btn ant-btn-primary" onClick={goToLogin}>
            Continue
          </Button>
        )}
      >
        <LogoWrapper textTitle="Thanks for you registration!" />
        <Typography.Paragraph className='ChangePasswordParagraph'>
          {projectId ? `
    Your account was set successfully.
          Once the project is published, we will send you the next steps
          so that you can make your first login to the platform.
      ` : 'Use your new password to login'}
        </Typography.Paragraph>
      </Modal>
    </Row>
  );
}

export default ChangePasswordSuccess;
