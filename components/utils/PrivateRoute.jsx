import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
// import { useUserContext } from './UserContext';
// import { defaultRouteByRole } from '../../constants/DefaultRouteByRole';

function PrivateRoute(routeProps) {
  const {
    component: Component,
    exact,
    path,
    authentication,
    authenticated,
    role,
    user
  } = routeProps;
  // const { getLoggedUser } = useUserContext();
  // const user = getLoggedUser();
  // const authenticated = !!user;

  const { pathname } = useLocation();

  const { required, roles } = authentication;
  if (required && !authenticated) {
    return <Redirect push from={path} to="/" />;
  }

  if (pathname === '/' && authenticated && !user?.isAdmin) {
    return <Redirect push from={path} to="/my-projects" />;
  }

  if (required && authenticated && roles?.length > 0) {
    if (!roles?.includes(role))
      return <div>{`This route required a role (${roles.join(',')}): ${role}`}</div>;
    // return <Redirect push from={path} to={defaultRouteByRole[user.role]} />;
  }

  if (!required && authenticated) {
    // return <Redirect push from={path} to={defaultRouteByRole[user.role]} />;
    // return <Redirect push from={path} to="/" />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={props => (
        <Component {...props} {...routeProps} user={user} authenticated={authenticated} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
};

PrivateRoute.defaultProps = {
  exact: true
};

export default PrivateRoute;
