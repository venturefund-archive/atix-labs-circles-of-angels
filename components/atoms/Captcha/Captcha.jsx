/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = props => (
  <ReCAPTCHA
    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
    onChange={() => props.onChange(true)}
  />
);

export default Captcha;
