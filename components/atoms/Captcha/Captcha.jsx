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
console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
const Captcha = ({ onChange }) => (
  <ReCAPTCHA
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    onChange={() => onChange(true)}
  />
);

export default Captcha;

Captcha.propTypes = {
  onChange: PropTypes.func.isRequired
};
