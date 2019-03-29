import React, { Component } from 'react';
import Router from 'next/router';
import ErrorPopUp from '../components/molecules/ErrorPopUp/ErrorPopUp';
import DynamicForm from '../components/organisms/FormLogin/FormLogin';
import { withUser } from '../components/utils/UserContext';
import { withErrorPopUp } from '../components/utils/ErrorPopUpContext';
import { loginUser } from '../api/userApi';

import './_login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {}
    };
  }

  onLoginSubmit = async (email, pwd) => {
    if (email && pwd && email !== '' && pwd !== '') {
      const response = await loginUser(email, pwd);
      const { changeUser, showErrorPopUp } = this.props;

      if (response.error) {
        this.setState({ error: response.error });
        showErrorPopUp();
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
    const { error } = this.state;
    const { visibleErrorPopUp, hideErrorPopUp } = this.props;
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSide">
          {error && (
            <ErrorPopUp
              visible={visibleErrorPopUp}
              errorMessage={
                error.response ? error.response.data.error : error.message
              }
              errorTitle={
                error.response
                  ? `${error.response.status} - ${error.response.statusText}`
                  : error.message
              }
              handleOk={hideErrorPopUp}
            />
          )}
          <h1>CIRCLES OF ANGELS</h1>
          <h2>PLEASE SIGN IN</h2>
          <DynamicForm onSubmit={this.onLoginSubmit} />
        </div>
      </div>
    );
  }
}

export default withUser(withErrorPopUp(Login));
