import React from "react";
import { Form, Input } from "antd";

import "./_style.scss";

class AngelsForm extends React.Component {
  state = {
    formLayout: 'vertical',
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { formLayout } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit} layout={formLayout}>

        <Form.Item label="Name">
          {getFieldDecorator("Name", {
            rules: [{ required: true, message: "Name is required!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Lastname">
          {getFieldDecorator("Lastname", {
            rules: [{ required: true, message: "Lastname is required!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Email">
          {getFieldDecorator("Email", {
            rules: [{ required: true, message: "Email is required!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Password">
          {getFieldDecorator("Password", {
            rules: [{ required: true, message: "Password is required!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Confirm Password">
          {getFieldDecorator("ConfirmPassword", {
            rules: [{ required: true, message: "Password is required!" }]
          })(<Input />)}
        </Form.Item>

      </Form>
    );
  }
}

const FormRegister = Form.create({ name: "AngelsForm" })(AngelsForm);

export default FormRegister;
