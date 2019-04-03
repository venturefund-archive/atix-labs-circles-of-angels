import React, { Component } from 'react';
import Routing from '../components/utils/Routes';
import Router from 'next/router';
import { showModalError } from '../components/utils/Modals';
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
        const title = error.response
          ? `${error.response.status} - ${error.response.statusText}`
          : error.message;
        const content = error.response
          ? error.response.data.error
          : error.message;
        showModalError(title, content);
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
