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
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../../utils/PrivateRoute';
import DefaultRoute from '../../utils/DefaultRoute';

const Router = ({ routesConfig }) => {
  const routes = routesConfig.map(route => (
    <PrivateRoute key={route.path} {...route} />
  ));

  return (
    <BrowserRouter>
      <Switch>
        {routes}
        <DefaultRoute />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

Router.defaultProps = {
  routesConfig: []
};

Router.propTypes = {
  routesConfig: PropTypes.arrayOf({
    path: PropTypes.string,
    component: PropTypes.elementType,
    authentication: PropTypes.shape({
      required: PropTypes.bool,
      roles: PropTypes.arrayOf(PropTypes.string)
    }),
    withHeader: PropTypes.bool,
    withSideBar: PropTypes.bool
  })
};
