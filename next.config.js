/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withSass(
  withCss({
    sassLoaderOptions: {
      includePaths: [`${__dirname}/css/`]
    },
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      };

      return config;
    }
  })
);
