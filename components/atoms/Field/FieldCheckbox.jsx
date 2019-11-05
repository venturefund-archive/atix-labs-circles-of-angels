import React, { useState } from 'react';
import { Form, Checkbox } from 'antd';
import PropTypes from 'prop-types';

export const CheckboxBare = ({ name, label, value, testid, handleChange }) => {
  const [checked, setChecked] = useState(value);
  return (
    <Checkbox
      name={name}
      value={checked}
      checked={checked}
      data-testid={testid}
      onChange={event => {
        setChecked(!checked);
        handleChange(event, name, !value);
      }}
    >
      {label}
    </Checkbox>
  );
};

const FieldCheckbox = props => {
  const { valid, errorMessage } = props;
  return (
    <Form.Item validateStatus={valid ? 'success' : 'error'} help={errorMessage}>
      <CheckboxBare {...props} />
    </Form.Item>
  );
};

FieldCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  testid: PropTypes.string,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string
};

FieldCheckbox.defaultProps = {
  value: false,
  testid: 'fieldcheckbox-testid',
  valid: true,
  errorMessage: ''
};

export default FieldCheckbox;
