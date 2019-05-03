import React from 'react';
import { Form, Input, Icon, Select } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const { Option } = Select;

const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class AngelsForm extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = {
          username: values.name,
          email: values.email,
          pwd: values.password
        };

        if (values.role === '2') {
          if (values.phone) {
            user.detail = {
              phone: values.phone
            };
          }

          if (values.company) {
            user.detail = {
              ...user.detail,
              company: values.company
            };
          }
        } else if (values.role === '3') {
          if (values.phone) {
            user.detail = {
              phone: values.phone
            };
          }
        }

        console.log('USER:', user);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 0
        }
      }
    };

    const funderInformation = (
      <span>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              { required: false, message: 'Please input your phone number!' }
            ]
          })(
            <Input
              placeholder="Phone Number"
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </span>
    );

    const seInformation = (
      <span>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              { required: false, message: 'Please input your phone number!' }
            ]
          })(
            <Input
              placeholder="Phone Number"
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('company', {
            rules: [
              {
                required: false,
                whitespace: true
              }
            ]
          })(
            <Input
              placeholder="Company Name"
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
      </span>
    );

    return (
      <Form layout="vertical">
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true
              }
            ]
          })(
            <Input
              placeholder="Full Name"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              placeholder="E-mail"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              }
            ]
          })(
            <Input
              placeholder="Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: 'Please select your role!'
              }
            ]
          })(
            <Select
              placeholder="Role"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              initialValue="2"
            >
              <Option value="2">SE</Option>
              <Option value="3">Funder</Option>
              <Option value="4">Oracle</Option>
            </Select>
          )}
        </Form.Item>

        {form.getFieldValue('role') === '3' && funderInformation}
        {form.getFieldValue('role') === '2' && seInformation}

        <Form.Item
          className="BlockQuestions"
          label="How often do you or your firm make angel impact investments?"
        >
          {getFieldDecorator('questionone', {
            rules: [
              { type: 'array', required: false, message: 'Please answer!' }
            ]
          })(
            <Select
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              initialValue="1"
            >
              <Option value="1">Not yet</Option>
              <Option value="2">
                Less than 1 investment in the last 12 months
              </Option>
              <Option value="3">
                1 to 3 investments in the last 12 months
              </Option>
              <Option value="4">4-5 investments in the last 12 months</Option>
              <Option value="5">
                More than 5 investments in the last 12 months
              </Option>
              <Option value="6">
                I currently only do philanthropy eg: donate to charitable causes
                online & offline
              </Option>
              <Option value="7">Other</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <TextArea placeholder="Answer" rows={2} />
        </Form.Item>
        <Form.Item
          className="BlockQuestions"
          label="Are you currently an advocate/ volunteer or donor for a social cause? If yes, what are the top 3 impact areas you focus on? Please select up to 3 UN Sustainable Development Goals"
        >
          {getFieldDecorator('questiontwo', {
            rules: [
              { type: 'array', required: false, message: 'Please answer!' }
            ]
          })(
            <Select
              prefix={
                <Icon
                  type="question-circle"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={handleChange}
            >
              <Option value="1">No poverty</Option>
              <Option value="2">Zero Hunger</Option>
              <Option value="3">Good Health and Well-Being</Option>
              <Option value="4">Quality Education</Option>
              <Option value="5">Gender Equality</Option>
              <Option value="6">Clean Water and Sanitation</Option>
              <Option value="7">Affordable and Clean Energy</Option>
              <Option value="8">Decent Work and Economic Growth</Option>
              <Option value="9">
                {' '}
                Industry, Innovation and Infrastructure
              </Option>
              <Option value="10">Reduced Inequality</Option>
              <Option value="11">Sustainable Cities and Communities</Option>
              <Option value="12">Responsible Consumption and Production</Option>
              <Option value="13">Climate Action</Option>
              <Option value="14">Life Below Water</Option>
              <Option value="15">Life on Land</Option>
              <Option value="16">Peace and Justice Strong Institutions</Option>
              <Option value="17">Partnerships to Achieve the Goal</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <CustomButton
            theme="Primary"
            buttonText="Create your angels account"
            onClick={this.handleSubmit}
          />
        </Form.Item>
      </Form>
    );
  }
}

const FormRegister = Form.create({ name: 'AngelsForm' })(AngelsForm);

export default FormRegister;
