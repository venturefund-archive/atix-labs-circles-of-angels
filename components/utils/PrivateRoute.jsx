import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = routeProps => {
  const { component: Component, exact, path, authenticated } = routeProps;
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        authenticated ? (
          <Component {...props} {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  exact: false
};

export default PrivateRoute;
