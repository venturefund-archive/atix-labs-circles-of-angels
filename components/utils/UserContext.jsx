import React from 'react';

const UserContext = React.createContext('user');

class UserProvider extends React.Component {
  state = {
    user: {
      id: 1,
      name: 'Mariano Maidana',
      
    }
  };

  loginUser = ({ id, name }) => {};

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, loginUser: this.loginUser }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
