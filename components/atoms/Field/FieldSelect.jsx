import React from 'react';
import { Form, Select, Option } from 'antd';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
// TODO : move this logic to components/atoms/
export default function FieldSelect(props) {
  // console.log(props);
  const {
    name,
    value,
    label,
    options,
    valid,
    errorMessage,
    mode,
    handleChange
  } = props;
  const children = options.map(o => <Select.Option key={o}>{o}</Select.Option>);
  const handleOptionChange = (selectedOption, options) =>
    handleChange(undefined, name, selectedOption);
  return (
    <Form.Item
      label={label}
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Select
        defaultValue={value}
        size="large"
        mode={mode}
        onChange={handleOptionChange}
      >
        {children}
      </Select>
    </Form.Item>
  );
}

// TODO : Add props validation
