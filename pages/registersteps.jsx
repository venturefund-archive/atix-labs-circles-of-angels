/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';

import RegisterForm from '../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import './_style.scss';

import RegisterStep1, {
  step1Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep1';
import RegisterStep2, {
  step2Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep2';
import RegisterStep3, {
  step3Inputs
} from '../components/organisms/FormRegister/steps/RegisterStep3';
import RegisterStep4 from '../components/organisms/FormRegister/steps/RegisterStep4';
import { ENTREPRENEUR, FUNDER, ORACLE } from '../constants/constants';

const steps = [
  {
    fields: Object.keys(step2Inputs),
    component: RegisterStep2
  },
  {
    fields: Object.keys(step1Inputs),
    component: RegisterStep1
  },
  {
    fields: Object.keys(step3Inputs),
    component: RegisterStep3
  },
  {
    fields: [],
    component: RegisterStep4
  }
];

let fields = {
  ...step1Inputs,
  ...step2Inputs,
  ...step3Inputs
};

const roleFromQueryString = props => {
  const params = new URLSearchParams(props.location.search);
  return params.get('role');
};

const defineRole = role => {
  const mappedRoles = { 2: ENTREPRENEUR, 3: FUNDER, 4: ORACLE };
  return mappedRoles[role];
};

const defineInitialStep = role => {
  return isEmpty(role) ? 0 : 1;
};

export default function Registersteps(props) {
  const roleQueryString = roleFromQueryString(props);
  const initialStep = defineInitialStep(roleQueryString);
  fields.role.value = defineRole(roleQueryString);

  return (
    <div className="RegisterWrapper">
      <Row
        className="TopBar"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col className="gutter-row" xs={10} sm={4} lg={4}>
          <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
        </Col>
        <Col
          className="gutter-row"
          xs={12}
          sm={{ span: 7, offset: 10 }}
          lg={{ span: 3, offset: 14 }}
        >
          Already Registered? <a href="/">Log In</a>
        </Col>
      </Row>
      <RegisterForm
        formFields={fields}
        formSteps={steps}
        initialStep={initialStep}
      />
    </div>
  );
}
