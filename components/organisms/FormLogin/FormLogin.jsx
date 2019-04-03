import React from 'react';
import { Form, Icon, Input, Checkbox } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton.jsx';
import 'antd/dist/antd.css';
import './_style.scss';

const FormLogin = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const submit = () => {
    form.validateFields();
    onSubmit(getFieldProps('userName').value, getFieldProps('password').value);
  };
  return (
    <Form className="login-form" onSubmit={submit}>
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className="FormControls">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="#/">
            Forgot password
          </a>
        </div>
        <CustomButton theme="Primary" buttonText="Sign In" onClick={submit} />
        Don't have an Account? <a href="#/">Sign Up</a>
      </Form.Item>
    </Form>
  );
};

const DynamicForm = Form.create({ name: 'FormLogin' })(FormLogin);

export default DynamicForm;
