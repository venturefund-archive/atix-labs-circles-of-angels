import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalLogin from 'components/organisms/ModalLogin/ModalLogin';
import Navigation from 'components/organisms/Navigation';
import React, { useState } from 'react';

function Login() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <BackgroundLanding>
      <Navigation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ModalLogin
        visibility={modalOpen}
        setVisibility={setModalOpen}
      />
    </BackgroundLanding>
  );
}

export default Login;
