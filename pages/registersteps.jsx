/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Row, Col } from 'antd';

import RegisterForm from '../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import './_style.scss';

import RegisterStep1, {
  step1Inputs
} from '../components/organisms/RegisterStep1/RegisterStep1';
import RegisterStep2, {
  step2Inputs
} from '../components/organisms/RegisterStep2/RegisterStep2';
import RegisterStep3, {
  step3Inputs
} from '../components/organisms/RegisterStep3/RegisterStep3';
import RegisterStep4 from '../components/organisms/RegisterStep4/RegisterStep4';

const steps = [
  {
    fields: Object.keys(step1Inputs),
    component: RegisterStep1
  },
  {
    fields: Object.keys(step2Inputs),
    component: RegisterStep2
  },
  {
    fields: Object.keys(step3Inputs),
    component: RegisterStep3
  },
  {
    fields: {},
    component: RegisterStep4
  }
];

let fields = {
  ...step1Inputs,
  ...step2Inputs,
  ...step3Inputs
};

// TODO : get rid of this.
Object.entries(fields).forEach(([key, value]) => {
  value.valid = true;
});
export default function Registersteps() {
  // const [currentStep, setCurrentStep] = useState(0);

  // const { current, steps } = this.state;
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
      {/* {console.log('aaaa', currentStep, steps[currentStep])} */}
      <RegisterForm
        formFields={fields}
        formSteps={steps}
        initialStep={0}
        // currentStep={currentStep}
        // setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
