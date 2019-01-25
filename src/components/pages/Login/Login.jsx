import React, { Component } from 'react';
import DynamicForm from '../../organisms/FormLogin/FormLogin.jsx';
import './_style.scss';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="LogoSide">
        <img src="/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSide">
          <h1>CIRCLES OF ANGELS</h1>
          <h2>PLEASE SIGN IN</h2>
          <DynamicForm />
        </div>
      </div>
    );
  }
}

export default Login;
