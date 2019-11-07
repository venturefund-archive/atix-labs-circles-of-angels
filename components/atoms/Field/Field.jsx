import React from 'react';
import FieldInput from './FieldInput';
import FieldSelect from './FieldSelect';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function Field(props) {
  const { type } = props;

  if (type === 'select') {
    return <FieldSelect {...props} />;
  }
  return <FieldInput {...props} />;
}
