import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Form, Button, Modal } from 'antd';
import CustomButton from '../CustomButton/CustomButton';
import './_FieldFileStyle.scss';
import GeneralItem from '../GeneralItem/GeneralItem';
import LinkButton from '../LinkButton/LinkButton';

const FieldFile = ({
  name,
  value,
  handleChange,
  showUploadList,
  showPreviouslyUploadedList,
  label,
  isImage,
  valid,
  errorMessage,
  multiple,
  clean
}) => {
  const [fileList, setFileList] = useState([]);
  const [showPrevious, setShowPrevious] = useState(showPreviouslyUploadedList);
  const [previewVisible, setPreviewVisible] = useState(false);

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
    setShowPrevious(false);
  };

  const cleanField = () => setFileList([]);

  useEffect(() => {
    cleanField();
  }, [clean]);

  const previouslyUploadedFile = className =>
    isImage ? (
      <img className={className} alt="Previously Uploaded File" src={value} />
    ) : (
      <GeneralItem
        className="FieldFileGeneralItem"
        type="link"
        url={value}
        value={<LinkButton text={label} className="link" />}
        hide={!value}
      />
    );

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
        <CustomButton
          buttonText={value ? 'Click to change' : 'Click to upload'}
          theme="Alternative"
        />
      </Upload>
      {showPrevious && value && (
        <>
          <Button
            type="link"
            onClick={() => isImage && setPreviewVisible(true)}
          >
            {previouslyUploadedFile('PreviouslyUploadedList')}
          </Button>
          {isImage && (
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              {previouslyUploadedFile('PreviouslyUploadedListModal')}
            </Modal>
          )}
        </>
      )}
    </Form.Item>
  );
};

FieldFile.defaultProps = {
  showUploadList: true,
  showPreviouslyUploadedList: false,
  isImage: false,
  valid: undefined,
  label: undefined,
  errorMessage: undefined,
  multiple: false,
  clean: false,
  value: undefined
};

FieldFile.propTypes = {
  showUploadList: PropTypes.bool,
  showPreviouslyUploadedList: PropTypes.bool,
  isImage: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  multiple: PropTypes.bool,
  clean: PropTypes.bool
};

export default FieldFile;
