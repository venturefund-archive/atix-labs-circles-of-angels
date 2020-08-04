/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { withUser } from '../components/utils/UserContext';

import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import { updatePassword } from '../api/userApi';

class PasswordChange extends Component {
  static async getInitialProps(query) {
    const { token } = query.query;
    return { token };
  }

  updatePassword = async password => {
    const { token } = this.props;
    const response = await updatePassword(token, password);
    if (response.error) {
      const { error } = response;
      const title = error.response ? 'Error!' : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', 'Your password was successfully changed!');
    }
    return response;
  };

  render() {
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSide">
          <h1>CIRCLES OF ANGELS</h1>
          <h2>CHANGE PASSWORD</h2>
          <DynamicFormPassword onSubmit={this.updatePassword} />
        </div>
      </div>
    );
  }
}

export default withUser(PasswordChange);
