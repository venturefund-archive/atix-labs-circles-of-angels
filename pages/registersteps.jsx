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

const { Step } = Steps;

const steps = [
  {
    content: (
      <div>
        <div className="InfoStep">
          <img
            src="./static/images/icon-personal.svg"
            alt="Circles of Angels"
          />
          <h2> Personal Information</h2>
          <h4>
            Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
            amet..
          </h4>
        </div>
        <div className="StepPersonalInformation">
          <TitlePage textTitle="Register" />
          <div className="flex Linear">
            <hr />
            <p>or register with</p>
            <hr />
          </div>
          <Row gutter={16}>
            <Form layout="vertical">
              <Col className="gutter-row" span={12}>
                <Form.Item label="E-mail">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item label="E-mail">
                  <Input
                    size="large"
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item label="E-mail">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="E-mail">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="E-mail">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item>
                  <Checkbox>
                    I’ve read and accept all the{' '}
                    <a href="/">Terms and Conditions</a>of the site.
                  </Checkbox>
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    )
  },
  {
    content: (
      <div>
        <div className="InfoStep vertical">
          <img
            src="./static/images/icon-personal.svg"
            alt="Circles of Angels"
          />
          <h2>Platform User</h2>
          <h4>
            Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
            amet..
          </h4>
        </div>
        <div className="StepPersonalInformation">
          <h1> What do you want to do?</h1>
        </div>
      </div>
    )
  },
  {
    content: (
      <div>
        <div className="InfoStep vertical">
          <img
            src="./static/images/icon-personal.svg"
            alt="Circles of Angels"
          />
          <h2>Enterprise Information</h2>
          <h4>
            Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
            amet..
          </h4>
        </div>
        <div className="StepPersonalInformation">
          <h1> I want to create a Project</h1>
        </div>
      </div>
    )
  },
  {
    content: (
      <div>
        <div className="InfoStep vertical">
          <img
            src="./static/images/icon-personal.svg"
            alt="Circles of Angels"
          />
          <h2>Enterprise Information</h2>
          <h4>
            Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
            amet..
          </h4>
        </div>
        <div className="StepPersonalInformation">
          <h1> I want to create a Project</h1>
        </div>
      </div>
    )
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
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Registersteps;
