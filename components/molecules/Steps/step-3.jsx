import React from 'react';
import { Icon } from 'antd';

import './_style.scss';

const Step3 = () => (
  <div className="StepContent">
    <p className="LabelSteps">Step 3</p>
    <h1>Almost Ready</h1>
    <div className="ProjectStep3Container">
      <Icon
        type="check-circle"
        theme="twoTone"
        twoToneColor="#15D380"
        className="IconSuccess"
      />
      <h1>Your Project has been created successfully!</h1>
      <h2>You can access to it from "My Projects"</h2>

    </div>
  </div>
);

export default Step3;
