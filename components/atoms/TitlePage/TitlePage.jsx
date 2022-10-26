/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';

const TitlePage = ({ textTitle }) => (
  <div className="TitlePage">
    <h1>{textTitle}</h1>
  </div>
);
export default TitlePage;

TitlePage.propTypes = {
  textTitle: PropTypes.string.isRequired
};
