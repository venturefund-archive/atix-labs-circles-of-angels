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

import RegisterForm from '../components/organisms/FormRegister/FormRegister';
import './_register-steps.scss';
import './_style.scss';

import RegisterStep1 from '../components/organisms/RegisterStep1/RegisterStep1';
import RegisterStep2 from '../components/organisms/RegisterStep2/RegisterStep2';
import RegisterStep3 from '../components/organisms/RegisterStep3/RegisterStep3';
import RegisterStep4 from '../components/organisms/RegisterStep4/RegisterStep4';

// const { Step } = Steps;

class Registersteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [
        <RegisterStep1 />,
        <RegisterStep2 />,
        <RegisterStep3 />,
        <RegisterStep4 />
      ]
    };
  }

  next() {
    const { current } = this.state;
    console.log('page next', current);
    this.setState({ current });
  }

  prev() {
    const { current } = this.state;
    this.setState({ current });
  }

  render() {
    const { current, steps } = this.state;
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

        {/* <div className="RegisterSteps">
          <div className="BlockSteps">
            <Steps progressDot current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div> */}
        <RegisterForm
          currentStep={current}
          steps={steps}
          // goBackHandler={this.goToLogin}
        />
        {/* <div className="vertical BlockContent">
            <div className="steps-content">{steps[current]}</div>
            <div className="steps-action">
              {this.getNextStepButton()}
              {this.getPreviousStepButton()}
            </div>
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Registersteps;
