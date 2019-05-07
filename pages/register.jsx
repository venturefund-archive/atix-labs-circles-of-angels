import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister';
import { getQuestionnaire } from '../api/questionnaireApi';
import Roles from '../constants/RolesMap';
import Routes from '../components/utils/Routes';
import './_register.scss';
import './_login.scss';

class Register extends Component {
  static async getInitialProps() {
    const seQuestionnaire = await getQuestionnaire(Roles.SocialEntrepreneur);
    const funderQuestionnaire = await getQuestionnaire(Roles.Funder);
    return { seQuestionnaire, funderQuestionnaire };
  }

  goToLogin() {
    Routes.toLogin();
  }

  render() {
    const { seQuestionnaire, funderQuestionnaire } = this.props;
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
