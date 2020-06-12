/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import './_style.scss';
import CardMember from '../CardMember/CardMember';

function DaoMembers() {
  return (
    <div className="BoxContainer">
      <CardMember />
      <CardMember />
      <CardMember />
      <CardMember />
      <CardMember />
      <CardMember />
      <CardMember />
    </div>
  );
}

export default DaoMembers;
