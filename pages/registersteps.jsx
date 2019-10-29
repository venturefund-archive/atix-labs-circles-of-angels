/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState }  from 'react';

import RegisterForm from '../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import './_style.scss';

import TopBar from '../components/organisms/TopBar/TopBar';

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

export default function Registersteps() {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="RegisterWrapper">
      <TopBar
        textBlack="Already Registered?"
        setVisibility={setVisibility}
        visibility={visibility}
      />
      <RegisterForm
        formFields={fields}
        formSteps={steps}
        initialStep={0}
      />
    </div>
  );
}
