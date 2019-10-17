import React from 'react';
import { Form, Select, Option } from 'antd';
import FieldInput from './FieldInput';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
// TODO : move this logic to components/atoms/
export default function FieldSelect(props) {
  // console.log(props);
  const {
    value,
    label,
    options,
    valid,
    errorMessage,
    mode,
    handleChange
  } = props;
  const children = options.map(o => <Option key={o}>{o}</Option>);
  return (
    <Form.Item
      label={label}
      validateStatus={valid ? 'success' : 'error'}
      help={errorMessage}
    >
      <Select
        defaultValue={value}
        size="large"
        mode={mode}
        onChange={handleChange}
      >
        {children}
      </Select>
    </Form.Item>
  );
}

// TODO : Add props validation
