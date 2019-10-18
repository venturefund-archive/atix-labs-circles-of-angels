import React from 'react';
import { Form, Checkbox } from 'antd';

export default function FieldCheckbox(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange
  } = props;

  return (
    <Form.Item
      label={label}
      validateStatus={valid ? 'success' : 'error'}
      help={errorMessage}
    >
      <Checkbox value={value} onChange={handleChange} />
    </Form.Item>
  );
}
