import React from 'react';
import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export default function FieldTextArea(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange,
    rows
  } = props;

  return (
    <Form.Item
      label={label}
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <TextArea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        size="large"
        onChange={handleChange}
      />
    </Form.Item>
  );
}
