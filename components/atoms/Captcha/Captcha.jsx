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
import ReCAPTCHA from 'react-google-recaptcha';
import getConfig from 'next/config';

const Captcha = ({ onChange }) => (
  <ReCAPTCHA
    sitekey={getConfig().publicRuntimeConfig.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
    onChange={() => onChange(true)}
  />
);

export default Captcha;

Captcha.propTypes = {
  onChange: PropTypes.func.isRequired
};
