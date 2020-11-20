import React from 'react';
import PropTypes from 'prop-types';
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
FieldTextArea.defaultProps = {
  name: '',
  label: '',
  valid: false,
  errorMessage: '',
  placeholder: ''
};

FieldTextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.element.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.node.isRequired
};
