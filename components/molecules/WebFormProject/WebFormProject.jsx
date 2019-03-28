import React from 'react';
import { Input, Icon, Form } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../../atoms/ButtonCancel/ButtonCancel';

import './_style.scss';

const { TextArea } = Input;

class WebFormProject extends React.Component {
  checkAmount = (rule, value, callback) => {
    const valid = /^[0-9]+(\.[0-9]*)?$/.test(value);
    if (!(value === '') && valid) {
      callback();
      return;
    }
    callback('Must be a numeric value');
  };

  handleSubmit = () => {
    const { form, onConfirm } = this.props;
    const project = {
      faqLink: form.getFieldValue('faqLink'),
      goalAmount: form.getFieldValue('goalAmount'),
      location: form.getFieldValue('location'),
      mission: form.getFieldValue('mission'),
      problemAddressed: form.getFieldValue('problemAddressed'),
      projectName: form.getFieldValue('projectName'),
      timeframe: form.getFieldValue('timeframe')
    };
    onConfirm(project);
  };

  render() {
    const { form, onConfirm, onCancel } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form className="WebFormProject" onSubmit={this.handleSubmit}>
        <div className="form-section">
          <Form.Item>
            {getFieldDecorator('projectName', {
              rules: [
                {
                  required: true,
                  message: 'Please input the project name!'
                }
              ]
            })(
              <Input
                placeholder="Project Name"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('location', {
              rules: [
                {
                  required: true,
                  message: 'Please input the enterprise location!'
                }
              ]
            })(
              <Input
                placeholder="Enterprise Location"
                prefix={
                  <Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('timeframe', {
              rules: [
                {
                  required: true,
                  message: 'Please input the timeframe!'
                }
              ]
            })(
              <Input
                placeholder="Timeframe"
                prefix={
                  <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('goalAmount', {
              rules: [
                {
                  required: true,
                  message: 'Please input the goal amount!'
                },
                { validator: this.checkAmount }
              ]
            })(
              <Input
                placeholder="Goal Amount"
                min={0}
                prefix={
                  <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
        </div>

        <div className="form-section">
          <Form.Item>
            {getFieldDecorator('mission', {
              rules: [
                {
                  required: true,
                  message: 'Please input the project mission!'
                }
              ]
            })(
              <TextArea
                placeholder="Project Mission"
                prefix={
                  <Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('problemAddressed', {
              rules: [
                {
                  required: true,
                  message: 'Please input the problem addressed!'
                }
              ]
            })(
              <TextArea
                placeholder="Problem Addressed"
                prefix={
                  <Icon type="alert" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
        </div>
        <Form.Item>
          {getFieldDecorator('faqLink', {
            rules: [
              {
                required: true,
                message: 'Please input the FAQ link!'
              }
            ]
          })(
            <Input
              placeholder="FAQ Google Doc Link"
              prefix={
                <Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
            />
          )}
        </Form.Item>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" onClick={onCancel} />
          <ButtonPrimary text="Continue" onClick={this.handleSubmit} />
        </div>
      </Form>
    );
  }
}
export default Form.create({ name: 'CreateProjectForm' })(WebFormProject);
