import React from 'react';
import { Form, Icon, Input, Checkbox } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import 'antd/dist/antd.css';
import './_style.scss';
import Routing from '../../utils/Routes';

const FormPassword = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const submit = () => {
    form.validateFields();
    onSubmit(getFieldProps('userName').value, getFieldProps('password').value);
  };
  return (
    <Form className="recovery-form" onSubmit={submit}>
      <Form.Item>
        {getFieldDecorator('newpassword', {
          rules: [{ required: true, message: 'Please input your mail!' }]
        })(
          <Input.Password
            password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="New Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('confirm', {
          rules: [{ required: true, message: 'Please input your mail!' }]
        })(
          <Input.Password
            password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <CustomButton
          theme="Primary"
          buttonText="Save"
          onClick={submit}
        />
      </Form.Item>
    </Form>
  );
};

const DynamicFormPassword = Form.create({ name: 'FormPassword' })(FormPassword);

export default DynamicFormPassword;
