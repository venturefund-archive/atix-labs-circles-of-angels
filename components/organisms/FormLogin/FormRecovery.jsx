/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input } from 'antd';
import { useHistory } from 'react-router';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const FormRecovery = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const history = useHistory();

  const submit = () => {
    form.validateFields(err => {
      if (!err) {
        return onSubmit(getFieldProps('mail').value);
      }
    });
  };

  return (
    <Form className="recovery-form">
      <Form.Item>
        {getFieldDecorator('mail', {
          rules: [
            {
              type: 'email',
              message: 'The input is not a valid e-mail!'
            },
            { required: true, message: 'Please input your mail!' }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Mail"
          />
        )}
      </Form.Item>
      <Form.Item>
        <CustomButton
          theme="Primary"
          buttonText="Send a verification code"
          onClick={submit}
        />
        <CustomButton
          theme="Cancel"
          buttonText="Back"
          onClick={() => history.push('/login')}
        />
      </Form.Item>
    </Form>
  );
};

const DynamicFormRecovery = Form.create({ name: 'FormRecovery' })(FormRecovery);

export default DynamicFormRecovery;

FormRecovery.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
};
