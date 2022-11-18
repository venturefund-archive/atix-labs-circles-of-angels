import { setPin, setWallet } from 'api/userApi';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalLogin from 'components/organisms/ModalLogin/ModalLogin';
import ModalSecretKey from 'components/organisms/ModalSecretKey/ModalSecretKey';
import Navigation from 'components/organisms/Navigation';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const [modalOpen, setModalOpen] = useState(true);
  const [secretKeyOpen, setSecretKeyOpen] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  const openSecretKey = (_user) => {
    setSecretKeyOpen(true);
    setModalOpen(false);
    setUser(_user);
  }

  const savePin = async (pin) => {
    const success = await setPin();
    const wallet = await generateWalletFromPin(pin, user.password)
    const { data } = await setWallet(wallet)

    if (success && data.id) {
      redirect(user)
    }
  }

  const redirect = (_user) => {
    let route = '/'
    if (_user.isAdmin) {
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
      <ModalLogin
        visible={modalOpen}
        setVisible={setModalOpen}
        nextModal={openSecretKey}
      />
      <ModalSecretKey
        visible={secretKeyOpen}
        setVisibility={setSecretKeyOpen}
        onSuccess={savePin}
      />
    </BackgroundLanding>
  );
}

export default Login;
