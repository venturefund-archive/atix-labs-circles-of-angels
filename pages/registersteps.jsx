/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import {
  Steps,
  Button,
  message,
  Form,
  Icon,
  Input,
  Row,
  Col,
  Checkbox
} from 'antd';

import FormRegister from '../components/organisms/FormRegister/FormRegister';
import { getQuestionnaire } from '../api/questionnaireApi';
import Roles from '../constants/RolesMap';
import Routes from '../components/utils/Routes';
import './_register-steps.scss';
import './_style.scss';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import RegisterStep1 from '../components/organisms/RegisterStep1/RegisterStep1';
import RegisterStep2 from '../components/organisms/RegisterStep2/RegisterStep2';
import RegisterStep3 from '../components/organisms/RegisterStep3/RegisterStep3';
import RegisterStep4 from '../components/organisms/RegisterStep4/RegisterStep4';
import TopBar from '../components/organisms/TopBar/TopBar';

const { Step } = Steps;

const steps = [
  {
    content: <RegisterStep1 />
  },
  {
    content: <RegisterStep2 />
  },
  {
    content: <RegisterStep3 />
  },
  {
    content: <RegisterStep4 />
  }
];

class Registersteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="RegisterWrapper">
        <TopBar textBlack="Already register?" textLink="Login"/>

        <div className="RegisterSteps">
          <div className="BlockSteps">
            <Steps progressDot current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
          <div className="vertical BlockContent">
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <CustomButton
                  theme="Primary"
                  buttonText="Save and Continue"
                  onClick={() => this.next()}
                />
              )}
              {current === steps.length - 1 && (
                <CustomButton
                  theme="Primary"
                  buttonText="Finish!"
                  onClick={() => message.success('Processing complete!')}
                />
              )}
              {current > 0 && (
                <CustomButton
                  theme="Secondary"
                  buttonText="Previous"
                  onClick={() => this.prev()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registersteps;
