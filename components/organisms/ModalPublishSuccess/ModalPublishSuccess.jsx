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
import './_style.scss';
import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';

const ModalPublishSuccess = ({ visible, onCancel }) => {
  const { push, location: { pathname } } = useHistory();
  const id = pathname.split('/').pop();
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
          onClick={() => push('/my-projects')}
        >
          Continue
        </Button>}
    >
      <LogoWrapper textTitle='The project has been published' />

      <Typography.Paragraph className='CoaModal__Paragraph--centered'>
        The project has been published successfully. you can see it from here.
      </Typography.Paragraph>

      <Link className='textcenter' style={{ textAlign: 'center', display: 'block' }} to={`/${id}`}>Project Link</Link>
    </CoaModal>
  )
};

ModalPublishSuccess.defaultProps = {
  visible: false
}
ModalPublishSuccess.propTypes = {
  visible: PropTypes.bool
}
export default ModalPublishSuccess;
