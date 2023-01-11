/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import customConfig from 'custom-config';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { withUser } from '../components/utils/UserContext';
import { recoverPassword } from '../api/userApi';
import './_style.scss';
import './_login.scss';
import DynamicFormRecovery from '../components/organisms/FormLogin/FormRecovery';

class Recovery extends Component {
  componentDidMount() {
    // const { removeUser } = this.props;
    // removeUser();
  }

  sendVerificationCode = async email => {
    const response = await recoverPassword(email);
    if (response.error) {
      const { error } = response;
      const title = error.response ? 'Error!' : error.message;
      const content = error.response ? error.response.data.error : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', 'A mail has been sent to you. Please check your inbox!');
    }
    return response;
  };

  render() {
    return (
      <div className="Login">
        <div className="LogoSide">
          <img
            src={customConfig.LARGE_LOGO_PATH_PNG}
            alt={`${customConfig.ORGANIZATION_NAME} side logo`}
          />
        </div>
        <div className="FormSide">
          <h1>{customConfig.ORGANIZATION_NAME}</h1>
          <h2>PASS RECOVERY</h2>
          <DynamicFormRecovery onSubmit={this.sendVerificationCode} />
        </div>
      </div>
    );
  }
}

export default withUser(Recovery);
