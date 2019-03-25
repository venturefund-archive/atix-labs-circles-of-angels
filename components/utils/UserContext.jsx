import React from 'react';

const UserContext = React.createContext('user');
const userKey= 'user';

export const withUser = ComponentToWrap => {
  return class UserComponent extends React.Component {
    static contextType = UserContext;

    render() {
      const { user, changeUser } = this.context;
      return (
        <ComponentToWrap {...this.props} user={user} changeUser={changeUser} />
      );
    }
  };
}

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    console.log("me construyo!")
  }

  componentDidMount() {
    try {
      this.user = JSON.parse(localStorage.getItem(userKey));
    } catch (error) {
      this.user = {};
    }
  }

  changeUser = user => {
    this.setState({ user });
    localStorage.setItem(userKey, JSON.stringify(user));
  };

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, changeUser: this.changeUser }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}