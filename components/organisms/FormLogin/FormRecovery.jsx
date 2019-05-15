import React from 'react';
import { Form, Icon, Input, Checkbox } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import 'antd/dist/antd.css';
import './_style.scss';
import Routing from '../../utils/Routes';

const FormRecovery = ({ form, onSubmit }) => {
  const { getFieldDecorator, getFieldProps } = form;
  const submit = () => {
    form.validateFields();
    onSubmit(getFieldProps('userName').value, getFieldProps('password').value);
  };
  return (
    <Form className="recovery-form" onSubmit={submit}>
      <Form.Item>
        {getFieldDecorator('mail', {
          rules: [{ required: true, message: 'Please input your mail!' }]
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
        onClick={submit} />
      </Form.Item>
    </Form>
  );
};

const DynamicFormRecovery = Form.create({ name: 'FormRecovery' })(FormRecovery);

export default DynamicFormRecovery;
