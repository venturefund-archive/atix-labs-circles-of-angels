import React from 'react';
import { Form, Input, Upload } from 'antd';
import CustomButton from '../CustomButton/CustomButton';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
export default function FieldFile(props) {
  const {
    name,
    label,
    placeholder,
    value,
    valid,
    errorMessage,
    handleChange,
    type
  } = props;
  const fileChange = (options) => {
    console.log('b', options);
    const { filename, file } = options;
    handleChange(undefined, name, { [filename]: file });
    // console.log(options);
  };
  // onChange={fileChange => console.log('aa', fileChange)}
  return (
    <Upload customRequest={fileChange}>
      <CustomButton buttonText="Click to upload" theme="Alternative" />
    </Upload>
  );
}
