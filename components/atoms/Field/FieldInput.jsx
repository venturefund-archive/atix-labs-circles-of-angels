import React from 'react';
import { Form, Input } from 'antd';
import { max } from 'lodash';

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
