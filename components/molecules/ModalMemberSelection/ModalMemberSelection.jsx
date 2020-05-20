/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';

function ModalMemberSelection() {
  return (
    <div className="memberSelection column">
      <p>Aplicant</p>
      <div className="flex input">
        <img src="../static/images/proposer1.png" />
        <div className="column">
          <p><strong>Enric Conner</strong></p>
          <p>0x864253f40x864253f4864253f404253f4864253</p>
        </div>
      </div>
    </div>
  );
}

export default ModalMemberSelection;
