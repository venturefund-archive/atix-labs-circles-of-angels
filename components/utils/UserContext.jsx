/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN_KEY } from 'constants/constants';

export const UserContext = React.createContext({});

export const withUser = c => c;

const USER_KEY = 'user';

const changeUser = user => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

const removeUser = () => {
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};

const getLoggedUser = () => {
  let user;

  try {
    user = JSON.parse(sessionStorage.getItem(USER_KEY));
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
  isOracle: false,
  isAdmin: false
};

export function useUserContext() {
  // return useContext(UserContext);
  return context;
}

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={context}>{children}</UserContext.Provider>
);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
