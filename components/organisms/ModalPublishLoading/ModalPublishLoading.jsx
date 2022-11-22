/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import './_style.scss';

const antIcon = <LoadingOutlined style={{ fontSize: '100px' }} />;

const ModalPublishLoading = ({ visible }) => (
  <Modal
    visible={visible}
    maskClosable={false}
    className='CustomModal'
    closable={false}
    mask
    footer={null}
  >
    <LogoWrapper textTitle='Publishing project' />
    <div className='o-ModalWrapper'>
      <div className='o-ModalWrapper__SpinWrapper'>
        <Spin className='o-ModalWrapper__Spin' indicator={antIcon} />
      </div>
    </div>
  </Modal>
)

ModalPublishLoading.defaultProps = {
  visible: false
}

ModalPublishLoading.propTypes = {
  visible: PropTypes.bool
}

export default ModalPublishLoading;
