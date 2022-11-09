
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalFirstLoginSuccess from 'components/organisms/ModalFirstLoginSuccess/ModalFirsLoginSuccess';
import ModalSecretKey from 'components/organisms/ModalSecretKey/ModalSecretKey';
import Navigation from 'components/organisms/Navigation';
import { useUserContext } from 'components/utils/UserContext';
import React, { useState } from 'react';

function SecretKey() {
  const [modalOpen, setModalOpen] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const user = useUserContext();

  const openNextModal = (prevModal, nextModal) => {
    prevModal(false);
    nextModal(true);
  }

  return (
    <BackgroundLanding>
      <Navigation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ModalSecretKey
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSuccess={() => openNextModal(setModalOpen, setSuccessModalOpen)}
      />
      <ModalFirstLoginSuccess
        modalOpen={successModalOpen}
        setModalOpen={setSuccessModalOpen}
        admin={user.isBackofficeAdmin}
      />
    </BackgroundLanding>
  );
}

export default SecretKey;
