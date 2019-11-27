import React from 'react';
import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import HtmlEditor from '../../organisms/HtmlEditor/HtmlEditor';

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
      <HtmlEditor name={name} value={value} onChange={handleChange} />
    </Form.Item>
  );
}
