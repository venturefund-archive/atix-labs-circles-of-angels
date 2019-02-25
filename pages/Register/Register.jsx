import React, { Component } from 'react';
import FormRegister from '../../components/organisms/FormRegister/FormRegister.jsx';
import ButtonPrimary from "../../components/atoms/ButtonPrimary/ButtonPrimary.jsx";
import './_style.scss';

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <div className="TitleSection">
          <h1>CIRCLES OF ANGELS</h1>
          <p>CREATEA ACCOUNT</p>
        </div>
        <FormRegister />
        <ButtonPrimary text="REGISTER" />
      </div>
    );
  }
}

export default Register;