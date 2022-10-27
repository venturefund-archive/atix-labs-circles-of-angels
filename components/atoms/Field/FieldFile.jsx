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
  fileType,
  valid,
  errorMessage,
  multiple,
  clean,
  extraInformation,
  uploadButtonText = 'Click to upload',
  changeButtonText = 'Click to change',
  style
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

  const isImage = fileType === 'image';

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

  const acceptedFormats = () => {
    switch (fileType) {
      case 'image':
        return '.jpg,.jpeg,.png';
      case 'excel':
        return '.xls,.xlsx';
      case 'document':
        return '.doc,.pdf,.docx,';
      default:
        return undefined;
    }
  };

  return (
    <Form.Item
      validateStatus={valid || valid === undefined ? 'success' : 'error'}
      help={errorMessage}
    >
      <Upload
        accept={acceptedFormats()}
        multiple={multiple}
        customRequest={fileChange}
        showUploadList={showUploadList}
        onRemove={removeFile}
        fileList={fileList}
      >
        <CustomButton
          buttonText={value ? changeButtonText : uploadButtonText}
          theme="Alternative"
          style={style}
        />
      </Upload>
      {extraInformation && <span>{extraInformation}</span>}
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
  fileType: undefined,
  valid: undefined,
  label: undefined,
  errorMessage: undefined,
  multiple: false,
  clean: false,
  value: undefined,
  extraInformation: undefined
};

FieldFile.propTypes = {
  showUploadList: PropTypes.bool,
  showPreviouslyUploadedList: PropTypes.bool,
  fileType: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  multiple: PropTypes.bool,
  clean: PropTypes.bool,
  extraInformation: PropTypes.string
};

export default FieldFile;
