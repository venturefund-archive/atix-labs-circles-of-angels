/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import Field from '../../atoms/Field/Field';

const { Option } = Select;

const commonQuestions = {
  phone: {
    name: 'phone',

    label: "What's your phone number?",
    rules: [
      {
        required: true,
        // TODO : change wording
        message: 'Please input your phone!',
        whitespace: true
      }
    ]
  },
  company: {
    name: 'company',
    label: "What's your company name?",
    rules: [
      {
        required: true,
        // TODO : change wording
        message: 'Please input your company',
        whitespace: true
      }
    ]
  }
};
const questions = {
  entrepreneur: {
    ...commonQuestions,
    seeking: {
      name: 'seeking',
      type: 'select',
      label: 'What type of funding are you seeking?',
      placeholder: 'Phone number',
      // TODO : update later
      options: ['Grant', 'Debt', 'Equity', 'Other'],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please input your phone!'
        }
      ]
    },
    goals: {
      name: 'goals',
      type: 'select',
      label: (
        <div>
          Which are the areas of impact that you tackle?
          <p>Based on the UN Sustainable Development Goals</p>
        </div>
      ),
      placeholder: 'Please select up to 3 goals',
      // TODO : update later
      options: ['Water', 'Earth', 'Fire', 'Air'],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please choose at least one goal'
        }
      ]
    }
  },
  funder: {
    ...commonQuestions,
    seeking: {
      name: 'seeking',
      type: 'select',
      label: 'How often do you or your firm make angel impact investments?',
      // TODO : update later
      options: ['None', 'Sometimes', 'Always'],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please input your phone!'
        }
      ]
    },
    goals: {
      name: 'goals',
      type: 'select',
      label: (
        <div>
          Which are the areas of impact that you tackle?
          <p>Based on the UN Sustainable Development Goals</p>
        </div>
      ),
      placeholder: 'Please select up to 3 goals',
      // TODO : update later
      options: ['Water', 'Earth', 'Fire', 'Air'],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please choose at least one goal'
        }
      ]
    }
  },
  oracle: {}
};

export const step3Inputs = {
  // TODO : should allow custom keys?
  ...questions.entrepreneur
};

export default function RegisterStep3(props) {
  const { fields, handleChange } = props;
  // const handleChangeOnSelect = (fieldName, v) => (value, options) =>
  //   handleChange(undefined, value, fieldName);

  // const children = []; //[<Option key="1">1</Option>, <Option key="2">2</Option>];
  return (
    <div>
      <div className="InfoStep">
        <img src="./static/images/icon-personal.svg" alt="Circles of Angels" />
        <h2>Enterprise Information</h2>
        <h4>
          Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
          amet..
        </h4>
      </div>
      <div className="StepPersonalInformation">
        <TitlePage textTitle="I want to create a Project" />
        <Row className="FormRegister" gutter={26}>
          <Form layout="vertical">
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.phone} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.company} handleChange={handleChange} />
            </Col>
          </Form>
        </Row>
        {/* TODO : This is confusing. 
                   There are questions before this, whats the purpose of the title? */}
        <TitlePage textTitle="We have some questions for you!" />
        <Row className="FormRegister" gutter={26}>
          <Form layout="vertical">
            <Col className="gutter-row" sm={24} lg={12}>
              <Field
                {...fields.seeking}
                handleChange={(value, options) =>
                  handleChange(undefined, 'seeking', value)
                }
              />
            </Col>
            <Col className="InputTwoLabel" sm={24} lg={12}>
              <Field
                {...fields.goals}
                mode="tags"
                handleChange={(value, options) =>
                  handleChange(undefined, 'goals', value)
                }
                // handleChange={value => handleChangeOnSelect('goals', value)}
              />
            </Col>
          </Form>
        </Row>
      </div>
    </div>
  );
}
