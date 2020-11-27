import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function FieldInput(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange,
    type,
    maxLength,
    disabled
  } = props;

  return (
    <Form.Item
      label={label}
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        size="large"
        onChange={handleChange}
        disabled={disabled}
        maxLength={maxLength}
      />
    </Form.Item>
  );
}
FieldInput.defaultProps = {
  name: undefined,
  label: undefined,
  valid: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  type: undefined,
  maxLength: 25,
  disabled: false,
  value: undefined
};

FieldInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.element,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool
};
