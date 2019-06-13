/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import './_style.scss';

const TransferLabel = ({ theme, text, iconStatus }) => {
  const classname = `TransferLabel ${theme}`;

  return (
    <div className={classname}>
      {iconStatus && <img src={iconStatus} alt="IconLabel" />}
      <p>{text}</p>
    </div>
  );
};

export default TransferLabel;
