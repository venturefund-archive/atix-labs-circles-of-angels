/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import TitlePage from '../../../../atoms/TitlePage/TitlePage';
import Field from '../../../../atoms/Field/Field';

const RegisterStep2 = ({ fields, handleChange }) => {
  debugger
  return (
    <div className="h100 Register2">
      <div className="InfoStep">
        <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
        <h2>Personal Information</h2>
        <h4>Complete the form with your personal information</h4>
      </div>
      <div className="StepPersonalInformation h100">
        <TitlePage textTitle={`Register as ${fields.role.value}`} />
        <Row className="FormRegister">
          <Form layout="vertical">

            <Row gutter={26}>
              <Col className="gutter-row" sm={24} lg={12}>
                <Field {...fields.firstName} handleChange={handleChange} />
              </Col>
              <Col className="gutter-row" sm={24} lg={12}>
                <Field {...fields.lastName} handleChange={handleChange} />
              </Col>
            </Row>
            <Row gutter={26}>
              <Col className="gutter-row" sm={12} lg={6}>
                <Field {...fields.country} handleChange={handleChange} />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <Field {...fields.email} handleChange={handleChange} />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <Field
                  type="password"
                  handleChange={handleChange}
                  {...fields.password} />
              </Col>
              <Col className="gutter-row" sm={12} lg={6}>
                <Field
                  type="password"
                  handleChange={handleChange}
                  {...fields.repeatPassword} />
              </Col>
            </Row>
          </Form>


        </Row>
        <Row className="leyend">* indicates required fields</Row>
      </div>
    </div>
  );
};

export default RegisterStep2;

RegisterStep2.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired
};
