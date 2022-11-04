import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function FieldPassword(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange,
    type,
  } = props;

  const validateStatus = () => {
    if (valid === undefined) {
      return '';
    }
    return valid ? 'success' : 'error';
  };

  return (
    <Form.Item
      label={label}
      validateStatus={validateStatus()}
      help={errorMessage}
    >
      <Input.Password
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        size="large"
        onChange={handleChange}
      />
    </Form.Item>
  );
}

FieldPassword.defaultProps = {
  name: undefined,
  label: undefined,
  valid: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  type: undefined
};

FieldPassword.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.element.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};
