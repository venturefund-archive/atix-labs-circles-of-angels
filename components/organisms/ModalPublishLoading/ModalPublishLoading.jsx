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
import { Spin } from 'antd';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import './_style.scss';
import { CoaBaseModal } from '../CoaModals/CoaBaseModal/CoaBaseModal';

const antIcon = <LoadingOutlined style={{ fontSize: '100px' }} />;

const ModalPublishLoading = ({ visible, textTitle, ...rest }) => (
  <CoaBaseModal
    visible={visible}
    maskClosable={false}
    closable={false}
    mask
    footer={null}
    title={
      <TitlePage centeredText textTitle={textTitle} underlinePosition="none" textColor="#4C7FF7" />
    }
    withLogo
    {...rest}
  >
    <div className="o-ModalWrapper">
      <div className="o-ModalWrapper__SpinWrapper">
        <Spin className="o-ModalWrapper__Spin" indicator={antIcon} />
      </div>
    </div>
  </CoaBaseModal>
);

ModalPublishLoading.defaultProps = {
  visible: false,
  textTitle: 'Publishing project'
};

ModalPublishLoading.propTypes = {
  visible: PropTypes.bool,
  textTitle: PropTypes.string
};

export default ModalPublishLoading;
