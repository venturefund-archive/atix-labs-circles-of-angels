/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import '../_style.scss';
import './_landing.scss';
import Navigation from 'components/organisms/Navigation';
import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import ModalLogin from 'components/organisms/ModalLogin/ModalLogin';

function Landing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BackgroundLanding>
      <Navigation setModalOpen={setModalOpen} />
      <ModalLogin visibility={modalOpen} setVisibility={setModalOpen} />
    </BackgroundLanding>
  );
}

export default Landing;
