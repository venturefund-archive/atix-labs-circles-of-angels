
import { setPin, setWallet } from 'api/userApi';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalSecretKey from 'components/organisms/ModalSecretKey/ModalSecretKey';
import Navigation from 'components/organisms/Navigation';
import { useUserContext } from 'components/utils/UserContext';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

function SecretKey() {
  const [modalOpen, setModalOpen] = useState(true);
  const user = useUserContext();
  const history = useHistory()

  const savePin = async (pin) => {
    const success = await setPin();
    const wallet = await generateWalletFromPin(pin)
    let route = '/'
    if (success) {
      if (user.isBackofficeAdmin) {
        route = '/my-proyects'
      }
      const { data } = await setWallet(wallet)
      if (data.id) {
        history.push(route)
      }
    }
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
        onSuccess={savePin}
      />
    </BackgroundLanding>
  );
}

export default SecretKey;
