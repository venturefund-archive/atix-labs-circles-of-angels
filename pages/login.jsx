import React, { Component } from 'react';
import Routing from '../components/utils/Routes';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { withUser } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';

import './_login.scss';

class Login extends Component {
  onLoginSubmit = async (email, pwd) => {
    const response = await loginUser(email, pwd);
    const { changeUser } = this.props;
    if (response.error) {
      alert(response.error);
      return;
    }
    const user = response.data;
    user.isAdmin = user.id == 1;
    changeUser(user);
    Routing.toUserHome(user);
  };

  render() {
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSide">
          <h1>CIRCLES OF ANGELS</h1>
          <h2>PLEASE SIGN IN</h2>
          <DynamicForm onSubmit={this.onLoginSubmit} />
        </div>
      </div>
    );
  }
}

export default withUser(Login);
