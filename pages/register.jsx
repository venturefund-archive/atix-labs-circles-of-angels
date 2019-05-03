import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister.jsx';
import CustomButton from '../components/atoms/CustomButton/CustomButton.jsx';
import './_register.scss';
import './_login.scss';

class Register extends Component {
  render() {
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSideRegister">
          <h1>Register</h1>
          <FormRegister />
        </div>
      </div>
    );
  }
}

export default Register;
