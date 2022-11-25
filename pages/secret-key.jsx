import React, {
  useState,
  useContext,
} from 'react';
import { useHistory } from 'react-router';
import { setPin, setWallet } from 'api/userApi';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalSecretKey from 'components/organisms/ModalSecretKey/ModalSecretKey';
import Navigation from 'components/organisms/Navigation';
import { UserContext } from 'components/utils/UserContext';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';


import ModalSKSuccess from 'components/organisms/ModalSKSucess/ModalSKSuccess';

function SecretKey() {
  const [modalOpen, setModalOpen] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const history = useHistory()

  const savePin = async (pin) => {
    const success = await setPin();

    // Wallet generated only after pin validation
    const key = `${pin}-${user.id}-${user.email}`;

    console.log(key)
    const wallet = await generateWalletFromPin(key);
    console.log(wallet.wallet)

    const { data } = await setWallet(wallet);

    if (success && data.id) {
      setModalOpen(false);
      setSuccessModalOpen(true);
    }
  }

  const redirect = () => {
    let route = '/'
    if (user.isAdmin) {
      route = '/my-projects'
    }
    history.push(route)
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
      <ModalSKSuccess
        visible={successModalOpen}
        onSuccess={redirect}
      />
    </BackgroundLanding>
  );
}

export default SecretKey;
