import React from 'react';
import { Form, Input, Icon, Select } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const { Option } = Select;

const { TextArea } = Input;

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
    const { form, seQuestionnaire, funderQuestionnaire } = this.props;
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

    const questionnaireBuilder = questionnaire =>
      questionnaire.questions.map(question => (
        <span>
          <Form.Item
            className="BlockQuestions"
            label={question.question}
            key={question.id}
          >
            {getFieldDecorator(`question${question.id}`, {
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Please select at least one answer'
                },
                {
                  validator: (rule, value, callback) => {
                    if (value) {
                      if (value.length > question.answerLimit) {
                        callback(`No more than ${question.answerLimit}`);
                      } else if (value.length <= question.answerLimit) {
                        callback();
                      }
                    }
                  }
                }
              ]
            })(
              <Select
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                mode={question.answerLimit > 1 ? 'multiple' : 'default'}
                initialValue="1"
              >
                {question.answers.map(answer => (
                  <Option value={answer.id} key={answer.id}>
                    {answer.answer}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {form.getFieldValue(`question${question.id}`) === 7 && (
            <Form.Item>
              <TextArea placeholder="Answer" rows={2} />
            </Form.Item>
          )}
        </span>
      ));

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

        {form.getFieldValue('role') === '3' &&
          funderInformation &&
          questionnaireBuilder(funderQuestionnaire)}
        {form.getFieldValue('role') === '2' &&
          seInformation &&
          questionnaireBuilder(seQuestionnaire)}
      </Form>
    );
  }
}

const FormRegister = Form.create({ name: 'AngelsForm' })(AngelsForm);

export default FormRegister;
