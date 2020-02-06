import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { defaultRouteByRole } from '../../constants/DefaultRouteByRole';

const DefaultRoute = () => {
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  const authenticated = !!user;

  return authenticated ? (
    <Redirect push to={defaultRouteByRole[user.role]} />
  ) : (
    <Redirect push to="/" />
  );
};
export default DefaultRoute;
