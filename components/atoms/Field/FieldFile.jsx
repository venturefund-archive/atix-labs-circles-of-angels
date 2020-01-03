import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Form } from 'antd';
import CustomButton from '../CustomButton/CustomButton';

// TODO : allow to pass another kind of elements, no just use the Form.Item harcoded.
const FieldFile = ({
  name,
  handleChange,
  showUploadList,
  valid,
  errorMessage
}) => {
  const [fileList, setFileList] = useState([]);

  const fileChange = ({ filename, file, onSuccess }) => {
    setTimeout(() => {
      changeFile({ filename, file });
      onSuccess('ok');
    }, 0);
  };

  const removeFile = () => {
    handleChange(undefined, name, undefined);
    setFileList([]);
  };

  const changeFile = ({ filename, file }) => {
    handleChange(undefined, name, { [filename]: file });
    setFileList([file]);
  };

  return (
    <Form.Item
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Upload
        customRequest={fileChange}
        showUploadList={showUploadList}
        onRemove={removeFile}
        fileList={fileList}
      >
        <CustomButton buttonText="Click to upload" theme="Alternative" />
      </Upload>
    </Form.Item>
  );
};

FieldFile.defaultProps = {
  showUploadList: true,
  valid: undefined,
  errorMessage: undefined
};

FieldFile.propTypes = {
  showUploadList: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default FieldFile;
