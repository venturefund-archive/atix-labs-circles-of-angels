/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */
import React from 'react';
import './_style.scss';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import PropTypes from 'prop-types';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

const ModalPublishSuccess = ({ visible, onCancel, textTitle, description, onSave, children }) => {
  const { texts } = React.useContext(DictionaryContext);
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
      okText={texts?.general?.btnContinue || 'Continue'}
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
  textTitle: 'The project has been published',
  description: 'The project has been published successfully. you can see it from here.',
  onSave: undefined,
  children: undefined
};
ModalPublishSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  textTitle: PropTypes.string,
  description: PropTypes.string,
  onSave: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default ModalPublishSuccess;
