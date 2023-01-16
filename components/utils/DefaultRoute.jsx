import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// import { useUserContext } from './UserContext';
import { UserContext } from './UserContext';
// import { defaultRouteByRole } from '../../constants/DefaultRouteByRole';

const DefaultRoute = () => {
  const { user } = useContext(UserContext);
  const authenticated = !!user;
  const { role, forcePasswordChange } = user;

  if (authenticated && forcePasswordChange) {
    return <Redirect push to="/password-change" />;
  }

  if (authenticated && role === 'admin') {
    return <Redirect push to="/back-office/projects" />;
  }

  if (authenticated && role !== 'admin') {
    return <Redirect push to="/my-projects" />;
  }

  /*
  return authenticated ? (
    <Redirect push to={defaultRouteByRole[role]} />
  ) : (
    <Redirect push to="/" />
  );
  */
};
export default DefaultRoute;
