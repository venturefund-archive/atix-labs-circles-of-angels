/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Icon, Input, Checkbox } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';
import Routing from '../../utils/Routes';
import Field from '../../atoms/Field/Field';

export const formLoginInputs = {
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    rules: [
      {
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    label: 'Password',
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

const getFieldValue = field => {
  return field.value || field.selected || field.checked;
};

const validate = (rule, value) => {
  let isValid = true;

  // TODO : why is this happening?
  if (value === undefined) {
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
  const history = useHistory();

  const handleChange = event => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    const field = fields[inputName];

    field.value = newValue;
    setFields({
      ...fields,
      [inputName]: validateField(field, fields)
    });
  };

  const submit = e => {
    e.preventDefault();
    form.validateFields();
    onSubmit(fields.email.value, fields.password.value);
  };

  return (
    <Form className="login-form" conSubmit={submit}>
      <Field {...fields.email} handleChange={handleChange} />
      <Field {...fields.password} handleChange={handleChange} />
      <Form.Item>
        <CustomButton
          theme="Primary"
          buttonText="Sign In"
          onClick={submit}
          htmlType="submit"
        />
      </Form.Item>
      <Form.Item>
        <div className="FormControls flex link">
          <a
            href="/passwordRecovery"
            className="login-form-forgot"
            //onClick={() => history.push('/passwordRecovery')}
          >
            Forgot your password?
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};

const DynamicForm = Form.create({ name: 'FormLogin' })(FormLogin);

export default DynamicForm;
