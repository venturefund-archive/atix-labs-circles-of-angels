import React, { Component } from 'react';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { withUser } from '../components/utils/UserContext';

import './_login.scss';
import DynamicFormPassword from '../components/organisms/FormLogin/FormPassword';

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
    console.log(password, token);
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
