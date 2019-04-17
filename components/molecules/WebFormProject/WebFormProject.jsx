import React from 'react';
import { Input, Icon, Form } from 'antd';

import './_style.scss';

const { TextArea } = Input;

const fieldsName = {
  projectName: 'projectName',
  location: 'location',
  timeframe: 'timeframe',
  goalAmount: 'goalAmount',
  mission: 'mission',
  problemAddressed: 'problemAddressed',
  faqLink: 'faqLink'
};

class WebFormProject extends React.Component {
  componentDidMount() {
    const { form, webform } = this.props;
    webform.form = form;
  }

  checkAmount = (rule, value, callback) => {
    const valid = /^[0-9]+(\.[0-9]*)?$/.test(value);
    if (!(value === '') && valid) {
      callback();
      return;
    }
    callback('Must be a numeric value');
  };

  getField = field => {
    const { form } = this.props;
    return form.isFieldTouched(field) && !form.getFieldError(field)
      ? form.getFieldValue(field)
      : '';
  };

  handleSubmit = () => {
    const { project } = this.props;
    project.data.faqLink = this.getField(fieldsName.faqLink);
    project.data.goalAmount = this.getField(fieldsName.goalAmount);
    project.data.problemAddressed = this.getField(fieldsName.problemAddressed);
    project.data.mission = this.getField(fieldsName.mission);
    project.data.location = this.getField(fieldsName.location);
    project.data.projectName = this.getField(fieldsName.projectName);
    project.data.timeframe = this.getField(fieldsName.timeframe);
  };

  updateField = field => {
    const { form, project } = this.props;
    project[field] = form.getFieldValue(fieldsName[field]);
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form className="WebFormProject" onChange={this.handleSubmit}>
        <div className="WebFormProjectContainer">
          <div className="form-section">
            <Form.Item>
              {getFieldDecorator(fieldsName.projectName, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
                  },
                  {
                    max: 50,
                    message: 'Project name is too long! (max. 50)'
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
              {getFieldDecorator(fieldsName.location, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
                  }
                ]
              })(
                <Input
                  placeholder="Country of Impact"
                  prefix={
                    <Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(fieldsName.timeframe, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
                  }
                ]
              })(
                <Input
                  placeholder="Project Duration"
                  prefix={
                                        <Icon
  type="calendar"
  style={{ color: 'rgba(0,0,0,.25)' }}
/>
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(fieldsName.goalAmount, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
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
            <Form.Item className="TextArea">
              {getFieldDecorator(fieldsName.mission, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
                  }
                ]
              })(
                <TextArea
                  placeholder="Share your Project mission, the impact you have made so far and what your project is about"
                  prefix={
                    <Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item className="TextArea">
              {getFieldDecorator(fieldsName.problemAddressed, {
                rules: [
                  {
                    required: true,
                    message: 'This fill is required'
                  }
                ]
              })(
                <TextArea
                  placeholder="Share with us the problem that you are tackling, what you are trying to solve and how the funds will help support your goal"
                  prefix={
                    <Icon type="alert" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </Form.Item>
          </div>
          <Form.Item>
            {getFieldDecorator(fieldsName.faqLink, {
              rules: [
                {
                  required: true,
                  message: 'This fill is required'
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
        </div>
      </Form>
    );
  }
}
export default Form.create({ name: 'CreateProjectForm' })(WebFormProject);
