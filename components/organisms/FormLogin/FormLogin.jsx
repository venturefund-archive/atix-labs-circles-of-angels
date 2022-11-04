/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, message, Typography } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';
import Field from '../../atoms/Field/Field';
import Captcha from '../../atoms/Captcha/Captcha';

const { Text } = Typography;

const DynamicLabel = ({ valid, label }) => (
  <p
    className={`${valid || valid === undefined ? 'valid' : 'invalid'}Label`}
  >
    {label}
  </p >
);

DynamicLabel.defaultProps = {
  valid: undefined,
  label: ''
}

DynamicLabel.propTypes = {
  valid: PropTypes.bool,
  label: PropTypes.string
};

export const formLoginInputs = {
  email: {
    name: 'email',
    placeholder: 'example@domain.com',
    rules: [
      {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'The input is not valid E-mail!'
      },
      {
        required: true,
        message: 'Please input your E-mail!'
      }
    ]
  },
  password: {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    rules: [
      {
        required: true,
        message: 'Please input your password!'
      }
    ]
  }
};

const getInvalidRule = (field, fields) => {
  // TODO : input.value wont work for Checkbox (and maybe Select).
  if (field.rules === undefined || field.rules.length === 0) return undefined;

  // find the first not satisfied rule
  return field.rules.find(rule => {
    // allow custom validators.
    const validator = rule.validator ? rule.validator : validate;

    return !validator(rule, getFieldValue(field), fields)
      ? rule.message
      : undefined;
  });
};

const validateField = (field, fields) => {
  const rule = getInvalidRule(field, fields);
  const valid = rule === undefined;
  const errorMessage = valid ? undefined : rule.message;

  return {
    ...field,
    valid,
    errorMessage
  };
};

const getFieldValue = field => field.value || field.selected || field.checked;

const validate = (rule, value) => {
  let isValid = true;

  if (value === undefined) {
    // eslint-disable-next-line no-param-reassign
    value = '';
  }

  const v = rule.whitespace ? value.trim() : value;

  if (rule.required) {
    isValid = isValid && v.length > 0;
  }
  if (rule.regex) {
    isValid = isValid && v.match(rule.regex);
  }
  return isValid;
};

const FormLogin = ({ form, onSubmit }) => {
  const [fields, setFields] = useState(formLoginInputs);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [feedback, setFeedback] = useState('');

  const clearFields = () => {
    resetFormLoginInputs();
    return setFields(formLoginInputs);
  };

  const handleChange = event => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    const field = fields[inputName];

    setFeedback('');

    field.value = newValue;
    setFields({
      ...fields,
      [inputName]: validateField(field, fields)
    });
  };

  const submit = async (e) => {
    if (!isCaptchaVerified) {
      message.error('Please verify that you are a human with the Captcha');
      return;
    }
    e.preventDefault();
    form.validateFields();
    const { error } = await onSubmit(fields.email.value, fields.password.value, clearFields);

    if (error) {
      setFields((oldFields) => ({
        email: {
          ...oldFields.email,
          valid: false,
        },
        password: {
          ...oldFields.password,
          valid: false,
        }
      }));
      // TODO: make api error response match UX specification improve source of truth
      if (error === 'Invalid user or password') {
        setFeedback('Invalid email or password')
      }
    }
  };

  const resetFormLoginInputs = () => {
    Object.keys(formLoginInputs).forEach(fieldName => {
      formLoginInputs[fieldName].value = '';
    });
  };

  return (
    <Form className="login-form" onSubmit={submit}>
      <Field
        {...fields.email}
        label={<DynamicLabel label='Email' {...fields.email} />}
        handleChange={handleChange}
        hasFeedback
      />

      <Field
        {...fields.password}
        label={<DynamicLabel label='Password' {...fields.password} />}
        handleChange={handleChange}
        hasFeedback
      />
      {feedback && <Text type="danger" className="loginFeedback">{feedback}</Text>}
      <Form.Item>
        <Captcha onChange={value => setIsCaptchaVerified(value)}>
          Captcha
        </Captcha>
        <CustomButton
          theme="Primary"
          buttonText="Log In"
          onClick={submit}
          htmlType="submit"
          visible
        />
      </Form.Item>
    </Form>
  );
};

const DynamicForm = Form.create({ name: 'FormLogin' })(FormLogin);

export default DynamicForm;

FormLogin.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
};
