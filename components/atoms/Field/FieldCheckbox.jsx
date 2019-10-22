import React, { useState } from 'react';
import { Form, Checkbox } from 'antd';

export default function FieldCheckbox(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange
  } = props;

  const [checked, setChecked] = useState(false);

  return (
    <Form.Item validateStatus={valid ? 'success' : 'error'} help={errorMessage}>
      <Checkbox
        name={name}
        value={checked}
        checked={checked}
        onChange={event =>
          setChecked(!checked) || handleChange(event, name, !value)
        }
      >
        {label}
      </Checkbox>
    </Form.Item>
  );
}
