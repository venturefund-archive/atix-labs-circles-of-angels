import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import HtmlEditor from '../../organisms/HtmlEditor/HtmlEditor';

export default function FieldTextArea(props) {
  const { name, label, value, valid, errorMessage, handleChange } = props;

  return (
    <Form.Item
      label={label}
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <HtmlEditor name={name} value={value} onChange={handleChange} />
    </Form.Item>
  );
}

FieldTextArea.defaultProps = {
  name: undefined,
  label: undefined,
  valid: undefined,
  errorMessage: undefined
};

FieldTextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.element.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};
