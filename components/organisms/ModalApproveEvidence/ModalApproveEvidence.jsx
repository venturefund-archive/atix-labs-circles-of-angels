import TitlePage from 'components/atoms/TitlePage/TitlePage';
import React from 'react';
import { CoaFormModal } from '../CoaModals/CoaFormModal/CoaFormModal';

export default function ModalApproveEvidence({ visible, setVisible, onSuccess }) {
  return (
    <CoaFormModal
      visible={visible}
      onCancel={() => setVisible(false)}
      onSave={onSuccess}
      buttonsPosition="center"
      withLogo
      okText="Approve"
      title={
        <TitlePage
          centeredText
          textTitle="You are about to approve an evidence"
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      description="Are you sure you want to approve the following evidence?"
    />
  );
}
