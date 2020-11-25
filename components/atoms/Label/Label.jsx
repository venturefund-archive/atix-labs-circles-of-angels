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

const Label = ({ labelText, theme }) => {
  const classname = `Label ${theme}`;
  return <p className={classname}>{labelText}</p>;
};

export default Label;

Label.defaultProps = {
  labelText: '',
  theme: ''
};

Label.propTypes = {
  labelText: PropTypes.string,
  theme: PropTypes.string
};
