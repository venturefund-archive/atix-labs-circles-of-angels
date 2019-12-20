import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from './UserContext';
import MainLayout from '../organisms/MainLayout/MainLayout';

const PrivateRoute = routeProps => {
  const {
    component: Component,
    exact,
    path,
    authentication,
    withHeader,
    withSideBar
  } = routeProps;
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  const authenticated = !!user;
  console.log('loggedUser: ', user);

  const { required, redirect } = authentication;

  if (required && !authenticated) {
    return <Redirect to={!redirect ? '/' : redirect} />;
  }
  if (!required && authenticated && redirect) {
    return <Redirect to={redirect} />;
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
          <Component {...props} {...routeProps} />
        </MainLayout>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
};

PrivateRoute.defaultProps = {
  exact: true
};

export default PrivateRoute;
