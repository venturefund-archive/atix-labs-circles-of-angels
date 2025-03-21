/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import TitlePage from '../../../../atoms/TitlePage/TitlePage';
import Field from '../../../../atoms/Field/Field';
import './_style.scss';

let callingCode;
// TODO: Questions and answers should be de-hardcoded

const commonQuestions = {
  phoneNumber: {
    name: 'phoneNumber',
    label: "What's your phone number?",
    rules: [
      {
        required: false
      },
      {
        regex: callingCode
          ? RegExp(
              // eslint-disable-next-line no-useless-escape
              `^\\+\\w*${callingCode}{1}[0-9]{3,14}$`
            )
          : /^[0-9]{3,10}$/,
        whitespace: true,
        message:
          'Please input your phone number including your country calling code.'
      }
    ]
  },
  company: {
    // TODO: This should be an entrepreneur only question
    name: 'company',
    label: "What's your company name?",
    rules: [
      {
        required: false,
        message: 'Please input your company',
        whitespace: true
      }
    ]
  }
};

// TODO: some questions should be optional (not validating properly)
export const questionsByRole = {
  entrepreneur: {
    ...commonQuestions,
    seeking: {
      name: 'seeking',
      type: 'select',
      label: 'What type of funding are you seeking?',
      placeholder: 'Select an option',
      options: [
        { value: 'Grant Funding', name: 'Grant Funding' },
        { value: 'Debt Financing', name: 'Debt Financing' },
        { value: 'Equity Financing', name: 'Equity Financing' },
        {
          value: 'Combination of blended finance',
          name: 'Combination of blended finance'
        },
        { value: 'Not Yet', name: 'Not Yet' }
      ],
      rules: [
        {
          required: false,
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
      placeholder: 'Select one or more options',
      options: [
        { value: 'No poverty', name: 'No poverty' },
        { value: 'Zero Hunger', name: 'Zero Hunger' },
        {
          value: 'Good Health and Well-Being',
          name: 'Good Health and Well-Being'
        },
        { value: 'Quality Education', name: 'Quality Education' },
        { value: 'Gender Equality', name: 'Gender Equality' },
        {
          value: 'Clean Water and Sanitation',
          name: 'Clean Water and Sanitation'
        },
        {
          value: 'Affordable and Clean Energy',
          name: 'Affordable and Clean Energy'
        },
        {
          value: 'Decent Work and Economic Growth',
          name: 'Decent Work and Economic Growth'
        },
        {
          value: 'Industry, Innovation and Infrastructure',
          name: 'Industry, Innovation and Infrastructure'
        },
        { value: 'Reduced Inequality', name: 'Reduced Inequality' },
        {
          value: 'Sustainable Cities and Communities',
          name: 'Sustainable Cities and Communities'
        },
        {
          value: 'Responsible Consumption and Production',
          name: 'Responsible Consumption and Production'
        },
        { value: 'Climate Action', name: 'Climate Action' },
        { value: 'Life Below Water', name: 'Life Below Water' },
        { value: 'Life on Land', name: 'Life on Land' },
        {
          value: 'Peace and Justice Strong Institutions',
          name: 'Peace and Justice Strong Institutions'
        },
        {
          value: 'Partnerships to Achieve the Goal',
          name: 'Partnerships to Achieve the Goal'
        }
      ],
      rules: [
        {
          required: false,
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
      label: 'How often do you or your firm make angel impact investments?',
      placeholder: 'Select an option',
      options: [
        { value: 'Not yet', name: 'Not yet' },
        {
          value: 'Less than 1 investment in the last 12 months',
          name: 'Less than 1 investment in the last 12 months'
        },
        {
          value: '1 to 3 investments in the last 12 months',
          name: '1 to 3 investments in the last 12 months'
        },
        {
          value: '4 to 5 investments in the last 12 months',
          name: '4 to 5 investments in the last 12 months'
        },
        {
          value: 'More than 5 investments in the last 12 months',
          name: 'More than 5 investments in the last 12 months'
        },
        {
          value:
            'I currently only do philanthropy e.g.: donate to charitable causes online & offline',
          name:
            'I currently only do philanthropy e.g.: donate to charitable causes online & offline'
        }
      ],
      rules: [
        {
          required: false,
          message: 'Select an answer'
        }
      ]
    },
    goals: {
      name: 'goals',
      type: 'select',
      label: (
        <div className="LabelDescriptionIF">
          Are you currently an advocate/ volunteer or donor for a social cause?
          <span>What are the impact areas you focus on?</span>
        </div>
      ),
      placeholder: 'Select one or more UN Sustainable Development Goals',
      options: [
        { value: 'No poverty', name: 'No poverty' },
        { value: 'Zero Hunger', name: 'Zero Hunger' },
        {
          value: 'Good Health and Well-Being',
          name: 'Good Health and Well-Being'
        },
        { value: 'Quality Education', name: 'Quality Education' },
        { value: 'Gender Equality', name: 'Gender Equality' },
        {
          value: 'Clean Water and Sanitation',
          name: 'Clean Water and Sanitation'
        },
        {
          value: 'Affordable and Clean Energy',
          name: 'Affordable and Clean Energy'
        },
        {
          value: 'Decent Work and Economic Growth',
          name: 'Decent Work and Economic Growth'
        },
        {
          value: 'Industry, Innovation and Infrastructure',
          name: 'Industry, Innovation and Infrastructure'
        },
        { value: 'Reduced Inequality', name: 'Reduced Inequality' },
        {
          value: 'Sustainable Cities and Communities',
          name: 'Sustainable Cities and Communities'
        },
        {
          value: 'Responsible Consumption and Production',
          name: 'Responsible Consumption and Production'
        },
        { value: 'Climate Action', name: 'Climate Action' },
        { value: 'Life Below Water', name: 'Life Below Water' },
        { value: 'Life on Land', name: 'Life on Land' },
        {
          value: 'Peace and Justice Strong Institutions',
          name: 'Peace and Justice Strong Institutions'
        },
        {
          value: 'Partnerships to Achieve the Goal',
          name: 'Partnerships to Achieve the Goal'
        }
      ],
      rules: [
        {
          required: false,
          message: 'Please choose at least one goal'
        }
      ]
    }
  }
};

const RegisterStep3 = ({ fields, setFields, handleChange }) => {
  // eslint-disable-next-line prefer-destructuring
  callingCode = fields.country.options.find(
    // eslint-disable-next-line radix
    country => country.value === parseInt(fields.country.value)
  ).callingCode;

  useEffect(() => {
    setFields({
      ...fields,
      phoneNumber: {
        name: 'phoneNumber',
        label: "What's your phone number?",
        rules: [
          {
            required: false
          },
          {
            regex: callingCode
              ? RegExp(
                  // eslint-disable-next-line no-useless-escape
                  `^\\+\\w*${callingCode}{1}[0-9]{3,14}$`
                )
              : /^[0-9]{3,10}$/,
            whitespace: true,
            message:
              'Please input your phone number including your country calling code.'
          }
        ]
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="InfoStep">
        <img src="./static/images/adicional-info.svg" alt="Circles of Angels" />
        <h2>Additional Information</h2>
        <h4>Please answer these questions</h4>
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
};

export default RegisterStep3;

RegisterStep3.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  setFields: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
