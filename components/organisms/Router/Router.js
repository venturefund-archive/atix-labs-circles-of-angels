/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

import PrivateRoute from '../../utils/PrivateRoute';
import DefaultRoute from '../../utils/DefaultRoute';

const Router = ({ routesConfig }) => {
  const context = useContext(UserContext);
  console.info('context: ', context);
  const { user } = context;
  const authenticated = !!user;
  let role = null;
  let forcePasswordChange = false;

  if (user) {
    role = user.role;
    forcePasswordChange = user.forcePasswordChange;
  }

  return (
    <BrowserRouter>
      <Switch>
        {routesConfig.map(route => (
          <PrivateRoute key={route.path} {...route} authenticated={authenticated} role={role} user={user} />
        ))}
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
  routesConfig: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.elementType,
    authentication: PropTypes.shape({
      required: PropTypes.bool,
      roles: PropTypes.arrayOf(PropTypes.string)
    }),
    withHeader: PropTypes.bool,
    withSideBar: PropTypes.bool
  }))
};
