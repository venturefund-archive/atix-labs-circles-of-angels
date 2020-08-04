import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { defaultRouteByRole } from '../../constants/DefaultRouteByRole';

const DefaultRoute = () => {
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  const authenticated = !!user;
  const { role, forcePasswordChange } = user;

  if(authenticated && forcePasswordChange) {
    return <Redirect push to={'/password-change'} />
  }
  
  return authenticated ? (
    <Redirect push to={defaultRouteByRole[role]} />
  ) : (
    <Redirect push to="/" />
  );
};
export default DefaultRoute;
