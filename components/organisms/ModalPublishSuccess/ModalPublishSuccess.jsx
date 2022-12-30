/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import PropTypes from 'prop-types';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

const ModalPublishSuccess = ({ visible, onCancel, textTitle, description, onSave, children }) => {
  return (
    <CoaDialogModal
      visible={visible}
      onCancel={onCancel}
      title={
        <TitlePage
          centeredText
          textTitle={textTitle}
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      withoutCancelButton
      withLogo
      okText="Continue"
      buttonsPosition="center"
      onSave={onSave}
      description={description}
    >
      {children}
    </CoaDialogModal>
  );
};

ModalPublishSuccess.defaultProps = {
  visible: false,
  onCancel: () => undefined,
  projectId: undefined,
  textTitle: 'The project has been published',
  description: 'The project has been published successfully. you can see it from here.'
};
ModalPublishSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  projectId: PropTypes.string,
  textTitle: PropTypes.string,
  description: PropTypes.string
};
export default ModalPublishSuccess;
