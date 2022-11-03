/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Row } from 'antd';
import '../_style.scss';
import './_landing.scss';
import customConfig from 'custom-config';
import Navigation from 'components/organisms/Navigation';

function Landing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Row
      className="Landing"
      style={{
        background: `url(${customConfig.BACKGROUND_PATH}) top left / cover no-repeat`
      }}
    >
      <Navigation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Row >
  );
}


export default Landing;
