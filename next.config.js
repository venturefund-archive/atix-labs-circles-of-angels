/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
require('dotenv').config();

const { NODE_ENV, URL_HOST, RECAPTCHA_SITE_KEY } = process.env;

module.exports = withSass(
  withCss({
    sassLoaderOptions: {
      includePaths: [`${__dirname}/css/`]
    },
    webpack: config => ({
      ...config,
      optimization: ['development', 'testing', 'staging'].includes(NODE_ENV)
        ? {
            minimizer: []
          }
        : config.optimization,
      // Fixes npm packages that depend on `fs` module
      node: {
        fs: 'empty'
      }
    }),
    env: {
      NEXT_PUBLIC_CAPTCHA_SITE_KEY: RECAPTCHA_SITE_KEY,
      BACKEND_URL: URL_HOST
    }
  })
);
