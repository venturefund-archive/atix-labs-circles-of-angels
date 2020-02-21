/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Row, Col } from 'antd';
import TitlePage from '../../../../atoms/TitlePage/TitlePage';
import Field from '../../../../atoms/Field/Field';

// TODO: Questions and answers should be de-hardcoded

const commonQuestions = {
  phoneNumber: {
    name: 'phoneNumber',
    label: "What's your phone number?",
    rules: [
      {
        required: true,
        regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        message: 'Provide a valid phone number',
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

export const questionsByRole = {
  entrepreneur: {
    ...commonQuestions,
    seeking: {
      name: 'seeking',
      type: 'select',
      label: 'What type of funding are you seeking?',
      placeholder: 'Select an option',
      // TODO : update later
      options: [
        { value: 'Grant', name: 'Grant' },
        { value: 'Debt', name: 'Debt' },
        { value: 'Equity', name: 'Equity' },
        { value: 'Other', name: 'Other' }
      ],
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
        <div className="LabelDescription">
          Which are the areas of impact that you tackle?
          <span>Based on the UN Sustainable Development Goals</span>
        </div>
      ),
      placeholder: 'Please select up to 3 goals',
      // TODO : update later
      options: [
        { value: 'Water', name: 'Water' },
        { value: 'Earth', name: 'Earth' },
        { value: 'Fire', name: 'Fire' },
        { value: 'Air', name: 'Air' }
      ],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please choose at least one goal'
        }
      ]
    }
  },
  supporter: {
    ...commonQuestions,
    seeking: {
      name: 'seeking',
      type: 'select',
      label: 'How often do you make angel impact investments?',
      placeholder: 'Select an option',
      // TODO : update later
      options: [
        { value: 'None', name: 'None' },
        { value: 'Sometimes', name: 'Sometimes' },
        { value: 'Always', name: 'Always' }
      ],
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
        <div className="LabelDescription">
          Which are the areas of impact that you tackle?
          <span>Based on the UN Sustainable Development Goals</span>
        </div>
      ),
      placeholder: 'Please select up to 3 goals',
      // TODO : update later
      options: [
        { value: 'Water', name: 'Water' },
        { value: 'Earth', name: 'Earth' },
        { value: 'Fire', name: 'Fire' },
        { value: 'Air', name: 'Air' }
      ],
      rules: [
        {
          required: true,
          // TODO : change wording
          message: 'Please choose at least one goal'
        }
      ]
    }
  }
};

export default function RegisterStep3({ fields, handleChange }) {
  // const handleChangeOnSelect = (fieldName, v) => (value, options) =>
  //   handleChange(undefined, value, fieldName);

  const getFormTitle = () => {
    // TODO : this shouldn't use label's value.
    if (fields.role.value === 'Social Entrepreneur') {
      return 'I want to create a project';
    }
    if (fields.role.value === 'Impact Funder') {
      return 'I want to fund a project';
    }
    if (fields.role.value === 'Oracle') {
      return 'I want to monitor a project';
    }
  };

  // const questionFields = questionsByRole.

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
        <TitlePage textTitle="We have some questions for you!" />
        <Row className="FormRegister" gutter={26}>
          <Form layout="vertical">
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.phoneNumber} handleChange={handleChange} />
            </Col>
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.company} handleChange={handleChange} />
            </Col>
          </Form>
        </Row>
        <Row className="FormRegister" gutter={26}>
          <Form layout="vertical">
            <Col className="gutter-row" sm={24} lg={12}>
              <Field {...fields.seeking} handleChange={handleChange} />
            </Col>
            <Col className="InputTwoLabel" sm={24} lg={12}>
              <Field
                {...fields.goals}
                mode="tags"
                handleChange={handleChange}
              />
            </Col>
          </Form>
        </Row>
      </div>
    </div>
  );
}
