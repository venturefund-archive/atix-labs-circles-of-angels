/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Button, Modal, Typography } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { Link, useHistory } from 'react-router-dom';
import './_style.scss';
import PropTypes from 'prop-types';

const getIdFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[pathParts.length - 1];
};

const ModalPublishSuccess = ({ visible, setVisible }) => {
  const history = useHistory();
  const id = getIdFromPath();
  const projectRoute = `/${id}`;
  return (
    <Modal
      visible={visible}
      maskClosable={false}
      className='CustomModal o-ModalSuccess'
      closable={false}
      mask
      footer={
        <Button
        className='ant-btn ant-btn-primary'
        onClick={() => setVisible(false)}
        >
          Continue
        </Button>}
    >
      <LogoWrapper textTitle='The project has been published' />

      <Typography.Paragraph className='textcenter'>
        The project has been published successfully. you can see it from here.
      </Typography.Paragraph>

      <Link to={projectRoute}>Project Link</Link>
    </Modal>
  )
};

ModalPublishSuccess.defaultProps = {
  visible: false
}
ModalPublishSuccess.propTypes = {
  visible: PropTypes.bool
}
export default ModalPublishSuccess;
