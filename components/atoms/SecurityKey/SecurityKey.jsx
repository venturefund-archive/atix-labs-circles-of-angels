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
import './_style.scss';

const SecurityKey = ({ word }) => <p className="SecurityWord">{word}</p>;

export default SecurityKey;

SecurityKey.defaultProps = {
  word: ''
};

SecurityKey.propTypes = {
  word: PropTypes.string
};
