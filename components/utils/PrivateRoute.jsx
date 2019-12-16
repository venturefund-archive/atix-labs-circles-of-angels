import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from './UserContext';

const PrivateRoute = routeProps => {
  const { component: Component, exact, path, authentication } = routeProps;
  const { getLoggedUser } = useUserContext();
  const authenticated = getLoggedUser() !== undefined;

  const { required, redirect } = authentication;

  if (required) {
    if (!authenticated) {
      // not logged!
      // return <Redirect to="/login" />;
      return <Redirect to={redirect === undefined ? "/" : redirect} />;
    }
  } else {
    if (authenticated && redirect !== undefined) {
      return <Redirect to={redirect} />;
    }
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={props => <Component {...props} {...routeProps} />}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
  // authenticated: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  exact: true
};

export default PrivateRoute;
