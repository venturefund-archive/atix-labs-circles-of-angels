/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../../utils/PrivateRoute';
import { routesConfig } from './RouteConfig';
import DefaultRoute from '../../utils/DefaultRoute';

const Router = () => {
  const routes = routesConfig.map(route => <PrivateRoute {...route} />);
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
