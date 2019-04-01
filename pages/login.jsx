import React, { Component } from 'react';
import Router from 'next/router';

import { Modal } from 'antd';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { withUser } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';

import './_login.scss';

class Login extends Component {
  onLoginSubmit = async (email, pwd) => {
    if (email && pwd && email !== '' && pwd !== '') {
      const response = await loginUser(email, pwd);
      const { changeUser } = this.props;

      if (response.error) {
        const { error } = response;
        Modal.error({
          title: error.response
            ? `${error.response.status} - ${error.response.statusText}`
            : error.message,
          content: error.response ? error.response.data.error : error.message
        });
        return response;
      }

      const user = response.data;
      const nextRoute =
        user.id === 1 ? '/back-office-projects' : '/explore-projects';
      user.homeRoute = nextRoute;

      changeUser(user);
      Router.push(
        {
          pathname: nextRoute
        },
        nextRoute
      );
    }
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
