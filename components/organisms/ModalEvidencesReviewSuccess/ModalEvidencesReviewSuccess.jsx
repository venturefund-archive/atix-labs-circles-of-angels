import React from 'react';
import PropTypes from 'prop-types';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaFormModal } from '../CoaModals/CoaFormModal/CoaFormModal';

export default function ModalEvidencesReviewSuccess({ visible, onCancel }) {
  return (
    <CoaFormModal
      visible={visible}
      onSave={onCancel}
      title={
        <TitlePage
          centeredText
          textTitle="The activity was sent successfully!"
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      description="The evidences of the activity will be reviewed by an auditor."
      withoutCancelButton
      withLogo
      buttonsPosition="center"
      okText="Continue"
    />
  );
}

ModalEvidencesReviewSuccess.defaultProps = {
  visible: false,
  onCancel: () => undefined
};

ModalEvidencesReviewSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func
};
