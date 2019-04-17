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
    const { form, webform, project } = this.props;
    console.log(this.props)
    form.setFieldsValue({ ...project.data });
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
                    message: 'Please input the project name!'
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
              {getFieldDecorator(fieldsName.timeframe, {
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
            <Form.Item className="TextArea">
              {getFieldDecorator(fieldsName.mission, {
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
            <Form.Item className="TextArea">
              {getFieldDecorator(fieldsName.problemAddressed, {
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
            {getFieldDecorator(fieldsName.faqLink, {
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
        </div>
      </Form>
    );
  }
}
export default Form.create({ name: 'CreateProjectForm' })(WebFormProject);
