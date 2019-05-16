/* eslint-disable react/no-multi-comp */
import React from 'react';
import Cookies from 'js-cookie';
import Roles from '../../constants/RolesMap';

const UserContext = React.createContext('user');
const userKey = 'user';

export const withUser = ComponentToWrap => {
  return class UserComponent extends React.Component {
    static contextType = UserContext;

    static async getInitialProps(query) {
      let pageProps = {};
      if (ComponentToWrap.getInitialProps) {
        pageProps = await ComponentToWrap.getInitialProps(query);
      }

      return pageProps;
    }

    render() {
      const {
        user,
        changeUser,
        removeUser,
        getLoggedUser,
        isBackofficeAdmin,
        isSocialEntrepreneur,
        isFunder,
        isOracle
      } = this.context;
      return (
        <ComponentToWrap
          {...this.props}
          user={user}
          changeUser={changeUser}
          removeUser={removeUser}
          getLoggedUser={getLoggedUser}
          isBackofficeAdmin={isBackofficeAdmin}
          isSocialEntrepreneur={isSocialEntrepreneur}
          isFunder={isFunder}
          isOracle={isOracle}
        />
      );
    }
  };
};

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getLoggedUser()
    };
  }

  componentDidMount() {
    const user = this.getLoggedUser();
    this.setState({ user });
  }

  changeUser = user => {
    this.setState({ user });
    //localStorage.setItem(userKey, JSON.stringify(user));
    Cookies.set(userKey, user);
  };

  removeUser = () => {
    this.setState({ user: {} });
    // localStorage.setItem(userKey, null);
    Cookies.remove(userKey);
  };

  getLoggedUser = () => {
    let user;
    try {
      // user = JSON.parse(localStorage.getItem(userKey));
      user = Cookies.getJSON(userKey);
    } catch (error) {
      user = {};
    }
    return user;
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          user,
          changeUser: this.changeUser,
          removeUser: this.removeUser,
          getLoggedUser: this.getLoggedUser,
          isBackofficeAdmin:
            user && user.role && user.role.id === Roles.BackofficeAdmin,
          isSocialEntrepreneur:
            user && user.role && user.role.id === Roles.SocialEntrepreneur,
          isFunder: user && user.role && user.role.id === Roles.Funder,
          isOracle: user && user.role && user.role.id === Roles.Oracle
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}
