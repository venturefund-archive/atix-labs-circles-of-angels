import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { setPin, setWallet } from 'api/userApi';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalSecretKey from 'components/organisms/ModalSecretKey/ModalSecretKey';
import Navigation from 'components/organisms/Navigation';
import { UserContext } from 'components/utils/UserContext';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';
import ModalSKSuccess from 'components/organisms/ModalSKSucess/ModalSKSuccess';
import ModalSecretKeyLoading from 'components/organisms/ModalSecretKeyLoading/ModalSecretKeyLoading';

function SecretKey() {
  const [modalOpen, setModalOpen] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const history = useHistory();

  const savePin = async pin => {
    setModalOpen(false);
    setLoadingModalOpen(true);
    const success = await setPin();

    // Wallet generated only after pin validation
    const key = `${pin}-${user.id}-${user.email}`;

    const wallet = await generateWalletFromPin(key);
    const { data } = await setWallet(wallet);

    if (success && data.id) {
      setModalOpen(false);
      setSuccessModalOpen(true);
    }
    setLoadingModalOpen(false);
  };

  const redirect = () => {
    const id = history.location.pathname.split('/')[1];
    let route = `/${id}`;
    if (user.isAdmin) {
      route = '/back-office/projects';
    }
    history.push(route);
  };

  return (
    <BackgroundLanding>
      <Navigation modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <ModalSecretKey modalOpen={modalOpen} setModalOpen={setModalOpen} onSuccess={savePin} />
      <ModalSKSuccess visible={successModalOpen} onSuccess={redirect} />
      <ModalSecretKeyLoading visible={loadingModalOpen} />
    </BackgroundLanding>
  );
}

export default SecretKey;
