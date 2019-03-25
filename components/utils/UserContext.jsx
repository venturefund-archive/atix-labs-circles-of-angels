import React from 'react';

const UserContext = React.createContext();
const userKey = 'user';

export const withUser = ComponentToWrap => {
  return class UserComponent extends React.Component {
    static contextType = UserContext;

    changeUser = user => {
      console.log(user)
      localStorage.setItem(userKey, JSON.stringify(user));
      this.context.user = user;
    };

    render() {
      const { user } = this.context;
      return (
        <ComponentToWrap
          {...this.props}
          user={user}
          changeUser={this.changeUser}
        />
      );
    }
  };
};

export class UserProvider extends React.Component {
  componentDidMount() {
    try {
      this.user = JSON.parse(localStorage.getItem(userKey));
    } catch (error) {
      this.user = {};
    }
    
  }
  render() {
    return (
      <UserContext.Provider
        value={{ user: this.user }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;
