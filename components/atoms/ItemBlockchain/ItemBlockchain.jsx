/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const ItemBlockchain = ({image, label, info, link}) => (
  <div className="Items">
  <img src={image} />
  <div className="Data">
    <label>{label}</label>
    <p>{info}</p>
    <a>{link}</a>
  </div>
</div>
);

export default ItemBlockchain;
