import React from 'react';
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
      handleChange
    } = props;
    
    return (
      <Form.Item
        label={label}
        validateStatus={valid || valid === undefined ? 'success' : 'error'}
        help={errorMessage}
      >
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          size="large"
          onChange={handleChange}
        />
      </Form.Item>
    );
  }