import React from "react";
import { Form, Icon, Input, Checkbox } from "antd";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary.jsx";

import "antd/dist/antd.css";
import "./_style.scss";

class FormLogin extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <div className="FormControls">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="#/">
              Forgot password
            </a>
          </div>
          <ButtonPrimary text="SIGN IN" />
          Don't have an Account? <a href="#/">Sign Up</a>
        </Form.Item>
      </Form>
    );
  }
}

const DynamicForm = Form.create({ name: "FormLogin" })(FormLogin);

export default DynamicForm;
