/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import PropTypes from 'prop-types';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

const ModalPublishError = ({ visible, onCancel, description, onOk }) => (
  <CoaDialogModal
    buttonsPosition="center"
    withLogo
    title={
      <TitlePage
        centeredText
        textTitle="An error ocurred"
        underlinePosition="none"
        textColor="#4C7FF7"
      />
    }
    description={description}
    visible={visible}
    closable={false}
    onCancel={onCancel}
    mask
    maskClosable
    withoutCancelButton
    okText="Ok"
    onSave={onOk}
  />
);

ModalPublishError.defaultProps = {
  visible: false,
  onCancel: () => undefined,
  description: 'Try again later'
};

ModalPublishError.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  description: PropTypes.string
};

export default ModalPublishError;
