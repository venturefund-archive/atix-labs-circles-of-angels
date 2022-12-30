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
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

const ModalConfirmProjectPublish = ({ visible, onSuccess, onCancel, okText, cancelText }) => (
  <CoaDialogModal
    withLogo
    visible={visible}
    onCancel={onCancel}
    onSave={onSuccess}
    buttonsPosition="center"
    okText={okText}
    cancelText={cancelText}
    title={
      <TitlePage
        centeredText
        textTitle="Do you want to confirm the creation of the project?"
        underlinePosition="none"
        textColor="#4C7FF7"
      />
    }
    description="This action cannot be undone"
  ></CoaDialogModal>
);

ModalConfirmProjectPublish.defaultProps = {
  visible: false,
  onSuccess: () => undefined,
  onCancel: () => undefined,
  okText: 'Yes',
  cancelText: 'No'
};

ModalConfirmProjectPublish.propTypes = {
  visible: PropTypes.bool,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string
};

export default ModalConfirmProjectPublish;
