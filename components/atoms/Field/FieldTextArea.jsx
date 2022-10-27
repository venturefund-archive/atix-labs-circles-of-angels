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
    rows,
    ...rest
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
        {...rest}
      />
    </Form.Item>
  );
}
FieldTextArea.defaultProps = {
  name: undefined,
  label: undefined,
  valid: undefined,
  errorMessage: undefined,
  placeholder: undefined
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
