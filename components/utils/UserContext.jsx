/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import Cookies from 'js-cookie';

export const UserContext = React.createContext({});

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const userKey = 'user';

  const changeUser = user => {
    this.setState({ user });
    //localStorage.setItem(userKey, JSON.stringify(user));
    Cookies.set(userKey, user);
  };

  const removeUser = () => {
    this.setState({ user: {} });
    // localStorage.setItem(userKey, null);
    Cookies.remove(userKey);
  };

  const getLoggedUser = () => {
    let user;
    try {
      // user = JSON.parse(localStorage.getItem(userKey));
      user = Cookies.getJSON(userKey);
    } catch (error) {
      user = {};
    }
    return user;
  };

  // TODO : not sure about user, and isFunder, isOracle, etc.
  const context = {
    user: getLoggedUser(),
    changeUser,
    removeUser,
    getLoggedUser,
    isBackofficeAdmin: false,
    isSocialEntrepreneur: false,
    isFunder: false,
    isOracle: false
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
