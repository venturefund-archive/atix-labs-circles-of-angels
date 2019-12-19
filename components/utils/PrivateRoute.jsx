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
  const authenticated = getLoggedUser() !== undefined;

  const { required, redirect } = authentication;

  if (required) {
    if (!authenticated) {
      return <Redirect to={redirect === undefined ? '/' : redirect} />;
    }
  } else if (authenticated && redirect !== undefined) {
    return <Redirect to={redirect} />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={props => (
        <MainLayout
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
