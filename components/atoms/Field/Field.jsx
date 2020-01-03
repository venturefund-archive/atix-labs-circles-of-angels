import React from 'react';
import FieldInput from './FieldInput';
import FieldSelect from './FieldSelect';
import FieldTextArea from './FieldTextArea';
import FieldHtmlEditor from './FieldHtmlEditor';
import FieldFile from './FieldFile';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function Field(props) {
  const { type } = props;
  if (type === 'select') {
    return <FieldSelect {...props} />;
  }

  if (type === 'textArea') {
    return <FieldTextArea {...props} />;
  }

  if (type === 'htmlEditor') {
    return <FieldHtmlEditor {...props} />;
  }

  if (type === 'file') {
    return <FieldFile {...props} />;
  }

  return <FieldInput {...props} />;
}
