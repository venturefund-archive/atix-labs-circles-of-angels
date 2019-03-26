import React from 'react';

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
      const { user, changeUser, removeUser } = this.context;
      return (
        <ComponentToWrap
          {...this.props}
          user={user}
          changeUser={changeUser}
          removeUser={removeUser}
        />
      );
    }
  };
};

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem(userKey));
      this.setState({ user });
    } catch (error) {}
  }

  changeUser = user => {
    this.setState({ user });
    localStorage.setItem(userKey, JSON.stringify(user));
  };
};

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem(userKey));
      this.setState({ user });
    } catch (error) {}
  }

  changeUser = user => {
    this.setState({ user });
    localStorage.setItem(userKey, JSON.stringify(user));
  };

  removeUser = () => {
    this.setState({ user: {} });
    localStorage.setItem(userKey, null);
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          changeUser: this.changeUser,
          removeUser: this.removeUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
