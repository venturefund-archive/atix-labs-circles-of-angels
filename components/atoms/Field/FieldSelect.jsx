import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const { Option } = Select;

const FieldSelect = props => {
  const {
    name,
    defaultValue,
    value,
    label,
    placeholder,
    options,
    valid,
    errorMessage,
    mode,
    handleChange,
    showSearch,
    filterOption,
    loading,
    style
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
        value={value}
        placeholder={placeholder}
        size="large"
        mode={mode}
        onChange={handleOptionChange}
        showSearch={showSearch}
        filterOption={filterOption}
        loading={loading}
        style={style}
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

FieldSelect.defaultProps = {
  name: undefined,
  label: undefined,
  valid: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  mode: 'default',
  showSearch: false,
  filterOption: undefined,
  loading: false,
  style: {}
};

FieldSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.element.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.element.isRequired,
  options: PropTypes.element.isRequired,
  mode: PropTypes.string,
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  loading: PropTypes.bool,
  style: PropTypes.shape
};
