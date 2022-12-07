import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// import { useUserContext } from './UserContext';
import MainLayout from '../organisms/MainLayout/MainLayout';
// import { defaultRouteByRole } from '../../constants/DefaultRouteByRole';

function PrivateRoute(routeProps) {
  const {
    component: Component,
    exact,
    path,
    authentication,
    withHeader,
    withSideBar,
    authenticated,
    role,
    user
  } = routeProps;
  // const { getLoggedUser } = useUserContext();
  // const user = getLoggedUser();
  // const authenticated = !!user;

  const { required, roles } = authentication;
  if (required && !authenticated) {
    return <Redirect push from={path} to="/" />;
  }

  if (required && authenticated && !roles.includes(role)) {
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
        <MainLayout
          user={user}
          withHeader={withHeader}
          withSideBar={withSideBar}
          authenticated={authenticated}
        >
          <Component {...props} {...routeProps} user={user} authenticated={authenticated} />
        </MainLayout>
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
