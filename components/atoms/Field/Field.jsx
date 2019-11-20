import React from 'react';
import FieldInput from './FieldInput';
import FieldSelect from './FieldSelect';
import FieldTextArea from './FieldTextArea';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function Field(props) {
  const { type } = props;
  if (type === 'select') {
    return <FieldSelect {...props} />;
  }

  if (type === 'textArea') {
    return <FieldTextArea {...props} />;
  }

  return <FieldInput {...props} />;
}
