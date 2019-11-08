import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = routeProps => {
  const {
    component: Component,
    exact,
    path,
    authenticated
  } = routeProps;
  if (authenticated && false) {
    // not logged!
    return <Redirect to="/login" />;
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
  path: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  exact: false
};

export default PrivateRoute;
