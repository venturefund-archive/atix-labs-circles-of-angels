import React from 'react';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function Field(props) {
  const { type } = props;

  if (props.type === 'select') {
    return <FieldSelect {...props} />;
  }
  return <FieldInput {...props} />;
}
