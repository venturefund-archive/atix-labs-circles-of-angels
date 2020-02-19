import { message } from 'antd';

export const step1Inputs = {
  // TODO : should allow custom keys?
  role: {
    name: 'role',
    options: [
      {
        name: 'entrepreneur',
        value: 'entrepreneur',
        usertype: 'Social Entrepreneur',
        title: 'Create a project'
      },
      // TODO define wording for each role
      {
        name: 'supporter',
        value: 'supporter',
        usertype: 'Impact Funder',
        title: 'Fund or monitor a project'
      }
    ],
    rules: [
      {
        required: true,
        message: 'Please select your role!',
        // TODO: fix hook to allow custom errors. this shouldn't be needed
        validator: (rule, value) => {
          let checkValue = value;
          if (!checkValue) {
            checkValue = '';
          }

          if (checkValue.length <= 0) {
            message.error(rule.message);
            return false;
          }
          return true;
        }
      }
    ]
  }
};

export const step2Inputs = {
  firstName: {
    name: 'firstName',
    label: 'First name',
    placeholder: 'First name',
    rules: [
      {
        required: true,
        message: 'Please input your name!',
        whitespace: true
      }
    ]
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    placeholder: 'Last name',
    rules: [
      {
        required: true,
        message: 'Please input your name!',
        whitespace: true
      }
    ]
  },
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
  country: {
    name: 'country',
    type: 'select',
    label: 'Country',
    placeholder: 'Select',
    defaultValue: undefined,
    options: [],
    rules: [
      {
        required: true,
        message: 'Choose a country!'
      }
    ]
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    rules: [
      {
        required: true,
        message: 'Please input your password!'
      }
    ]
  },
  repeatPassword: {
    name: 'repeatPassword',
    label: 'Repeat password',
    placeholder: 'Repeat password',
    valid: true,
    rules: [
      {
        required: true,
        message: 'Please repeat your password'
      },
      {
        validator: (rule, value, fields) => value === fields.password.value,
        message: 'Passwords should match'
      }
    ]
  }
};

export const step3Inputs = {};
