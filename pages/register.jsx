import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister.jsx';
import CustomButton from '../components/atoms/CustomButton/CustomButton.jsx';
import './_register.scss';

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <div className="TitleSection">
          <h1>CIRCLES OF ANGELS</h1>
          <p>CREATEA ACCOUNT</p>
        </div>
        <FormRegister />
        <CustomButton theme="Primary" buttonText="REGISTER" />
      </div>
    );
  }
}

export default Register;