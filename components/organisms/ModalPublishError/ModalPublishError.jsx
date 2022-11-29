/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Button, Typography } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';

const getIdFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[pathParts.length - 1];
};

const ModalPublishError = ({ visible, onCancel }) => {
  const history = useHistory();
  const id = getIdFromPath();
  const projectRoute = `/${id}`;
  return (
    <CoaModal
      visible={visible}
      maskClosable={true}
      closable={false}
      onCancel={onCancel}
      mask
      footer={
        <Button
          className='ant-btn ant-btn-primary CoaModal__Primary'
          onClick={onCancel}
        >
          Continue
        </Button>}
    >
      <LogoWrapper textTitle='An error ocurred' />

      <Typography.Paragraph className='CoaModal__Paragraph--centered'>
        Try again later
      </Typography.Paragraph>

    </CoaModal>
  )
};

ModalPublishError.defaultProps = {
  visible: false,
  onCancel: () => undefined
}
ModalPublishError.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func
}
export default ModalPublishError;
