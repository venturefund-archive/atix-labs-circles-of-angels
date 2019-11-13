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

export const withUser = c => c;

const USER_KEY = 'user';
const changeUser = user => {
  Cookies.set(USER_KEY, user);
};

const removeUser = () => {
  Cookies.remove(USER_KEY);
};

const getLoggedUser = () => {
  let user;
  try {
    user = Cookies.getJSON(USER_KEY);
  } catch (error) {
    user = {};
  }
  return user;
};

const context = {
  changeUser,
  removeUser,
  getLoggedUser,
  isBackofficeAdmin: false,
  isSocialEntrepreneur: false,
  isFunder: false,
  isOracle: false
};

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
