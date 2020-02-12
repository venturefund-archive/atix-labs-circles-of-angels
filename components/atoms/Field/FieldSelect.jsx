import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const FieldSelect = props => {
  const {
    name,
    defaultValue,
    label,
    placeholder,
    options,
    valid,
    errorMessage,
    mode,
    handleChange
  } = props;

  const handleOptionChange = selectedOption =>
    handleChange(undefined, name, selectedOption);

  return (
    <Form.Item
      label={label}
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        size="large"
        mode={mode}
        onChange={handleOptionChange}
      >
        {options &&
          options.map(option => (
            <Option key={option.value}>{option.name}</Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default FieldSelect;
