import React, { Component } from 'react';
import Routing from '../components/utils/Routes';
import { showModalError } from '../components/utils/Modals';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { withUser } from '../components/utils/UserContext';
import { loginUser } from '../api/userApi';

import './_login.scss';
import FormRegister from '../components/organisms/FormRegister/FormRegister';

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
        const title = error.response ? 'Unauthorized Access' : error.message;
        const content = error.response
          ? error.response.data.error
          : error.message;
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
