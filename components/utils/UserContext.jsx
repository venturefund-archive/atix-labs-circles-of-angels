/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

/* eslint-disable react/no-multi-comp */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { ACCESS_TOKEN_KEY, USER_KEY } from 'constants/constants';


export const UserContext = React.createContext();

export const withUser = c => c;

/*
export function useUserContext() {
  // return useContext(UserContext);
  return context;
}
*/

export function UserProvider({
  children,
}) {
  const [_user, setUser] = useState(null)

  const changeUser = (nuser) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(nuser));
    setUser(nuser);
  };

  const removeUser = () => {
    console.log('removing user')
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    setUser(null);
  };

  
  // work with the memoized form of the user
  const user = useMemo(() => {
    let internalUser;
    console.info('getLoggedUser called');
    try {
      internalUser = JSON.parse(sessionStorage.getItem(USER_KEY));
    } catch (error) {
      internalUser = null;
    }
    console.info('getLoggedUser finish: ', internalUser);
    return internalUser;
  }, [_user])

  return (
    <UserContext.Provider
      value={{
        changeUser,
        removeUser,
        isBackofficeAdmin: false,
        isSocialEntrepreneur: false,
        isFunder: false,
        isOracle: false,
        isAdmin: false,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
