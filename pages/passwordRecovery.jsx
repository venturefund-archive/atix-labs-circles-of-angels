import React, { Component } from 'react';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { withUser } from '../components/utils/UserContext';

import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';
import { updatePassword } from '../api/userApi';
import Routing from '../components/utils/Routes';

class PasswordRecovery extends Component {
  static async getInitialProps(query) {
    const { token } = query.query;
    return { token };
  }

  componentDidMount() {
    const { removeUser } = this.props;
    removeUser();
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
      Routing.toLogin();
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
          <h2>PASS RECOVERY</h2>
          <DynamicFormPassword onSubmit={this.updatePassword} />
        </div>
      </div>
    );
  }
}

export default withUser(PasswordRecovery);
