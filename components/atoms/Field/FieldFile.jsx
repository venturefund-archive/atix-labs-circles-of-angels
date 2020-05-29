import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Form } from 'antd';
import CustomButton from '../CustomButton/CustomButton';

const FieldFile = ({
  name,
  handleChange,
  showUploadList,
  valid,
  errorMessage,
  multiple,
  clean
}) => {
  const [fileList, setFileList] = useState([]);

  const fileChange = ({ file, onSuccess }) => {
    setTimeout(() => {
      changeFile({ file });
      onSuccess('ok');
    }, 0);
  };

  const removeFile = fileToRemove => {
    const newFileList = [...fileList];
    newFileList.splice(newFileList.indexOf(fileToRemove), 1);

    handleChange(undefined, name, newFileList);
    setFileList(newFileList);
  };

  const changeFile = ({ file }) => {
    const newFileList = multiple ? [...fileList, file] : [file];
    handleChange(undefined, name, newFileList);
    setFileList(newFileList);
  };

  const cleanField = () => setFileList([]);

  useEffect(() => {
    cleanField();
  }, [clean]);

  return (
    <Form.Item
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Upload
        multiple={multiple}
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
  errorMessage: undefined,
  multiple: false,
  clean: false
};

FieldFile.propTypes = {
  showUploadList: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  multiple: PropTypes.bool,
  clean: PropTypes.bool
};

export default FieldFile;
