/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister';
import { getQuestionnaire } from '../api/questionnaireApi';
import Roles from '../constants/RolesMap';
import Routes from '../components/utils/Routes';
import './_register.scss';
import './_login.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seQuestionnaire: null,
      funderQuestionnaire: null
    };
  }

  componentDidMount = async () => {
    const seQuestionnaire = await getQuestionnaire(Roles.SocialEntrepreneur);
    const funderQuestionnaire = await getQuestionnaire(Roles.Funder);
    this.setState({ seQuestionnaire, funderQuestionnaire });
  };

  goToLogin() {
    Routes.toLogin();
  }

  render() {
    const { seQuestionnaire, funderQuestionnaire } = this.state;
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSideRegister">
          <h1>Register</h1>
          <FormRegister
            seQuestionnaire={seQuestionnaire}
            funderQuestionnaire={funderQuestionnaire}
            goBackHandler={this.goToLogin}
          />
        </div>
      </div>
    );
  }
}

export default Register;
