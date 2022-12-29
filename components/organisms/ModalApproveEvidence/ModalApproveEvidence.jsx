import TitlePage from 'components/atoms/TitlePage/TitlePage';
import React from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

export default function ModalApproveEvidence({ visible, setVisible, onSuccess }) {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <CoaDialogModal
      visible={visible}
      onCancel={() => setVisible(false)}
      onSave={onSuccess}
      buttonsPosition="center"
      withLogo
      okText={texts?.general?.btnApprove || 'Approve'}
      cancelText={texts?.general?.btnCancel || 'Cancel'}
      title={
        <TitlePage
          centeredText
          textTitle="You are about to approve an evidence"
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      description={
        texts?.modalApproveEvidence?.textConfirmation ||
        'Are you sure you want to approve the following evidence?'
      }
    />
  );
}
