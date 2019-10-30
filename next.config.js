/**
 * AGPL License
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
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // HACK : Quick fix to avoid using babel when running development mode
      // TODO : Check that if we can use this to run on production.
      if (dev) {
        config.module.rules.forEach(rule => {
          if (rule.use.loader === 'next-babel-loader') {
            // neither undefined nor empty-string didn't work
            rule.use.options.cwd = 'HACK';
          }
        });
      }
      return {
        ...config,
        optimization: {
          minimizer: []
        },
        // Fixes npm packages that depend on `fs` module
        node: {
          fs: 'empty'
        }
      };
    }
  })
);
