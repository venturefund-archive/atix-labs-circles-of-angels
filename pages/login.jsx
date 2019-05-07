import React, { Component } from 'react';
import Routing from '../components/utils/Routes';
import { showModalError } from '../components/utils/Modals';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { withUser } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';

import './_login.scss';
import UserRegistrationStatus from '../constants/UserRegistrationStatus';

class Login extends Component {
  componentDidMount() {
    const { removeUser } = this.props;
    removeUser();
  }

  onLoginSubmit = async (email, pwd) => {
    if (email && pwd && email !== '' && pwd !== '') {
      const response = await loginUser(email, pwd);
      const { changeUser } = this.props;

      if (response.error) {
        const { error } = response;
        const title = error.response ? 'Hello!' : error.message;
        let content =
          'There was an error logging in! Please try to log-in again later' +
          ' or send an email to hello@circlesofangels.com';

        console.log(response);
        if (error.response && error.response.data) {
          const { data } = error.response;
          if (data.error.user) {
            if (
              data.error.user.registrationStatus ===
              UserRegistrationStatus.PENDING_APPROVAL
            ) {
              content =
                'We are reviewing your account details. Please try to ' +
                'log-in again later or send an email to hello@circlesofangels.com';
            } else if (
              data.error.user.registrationStatus ===
              UserRegistrationStatus.REJECTED
            ) {
              content =
                'There has been an issue with your account. Please contact us at hello@circlesofangels.com';
            }
          } else {
            content = error.response
              ? error.response.data.error.error
              : error.message;
          }
        }
        showModalError(title, content);
        return response;
      }

      const user = response.data;
      changeUser(user);
      Routing.toUserHome(user);
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
