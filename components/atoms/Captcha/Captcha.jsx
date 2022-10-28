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

import {
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';


const Captcha = ({ onChange }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      margin: '16px auto 32px auto'
    }}
  >
    <GoogleReCaptcha
      onVerify={(token) => {
        console.info('captch verified: ', token);
        onChange(true);
      }}
      refreshReCaptcha
    />
  </div>
);

export default Captcha;

Captcha.propTypes = {
  onChange: PropTypes.func.isRequired
};
