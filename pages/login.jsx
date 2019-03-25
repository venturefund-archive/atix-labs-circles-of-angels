import React, { Component } from 'react';
import DynamicForm from '../components/organisms/FormLogin/FormLogin.jsx';
import { withUser } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';
import './_login.scss';

class Login extends Component {
  onLoginSubmit = async (evnt, userName, password) => {
    const response = await loginUser("userName"," password");
    if (response.error) {
      alert(response.error);
      return;
    }
    this.props.changeUser(response.data);
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
