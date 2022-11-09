/* eslint-disable func-names */
import { Button, Icon, Upload } from 'antd';
import { ERROR_TYPES } from 'constants/constants';
import { getErrorMessagesField } from 'helpers/utils';
import _ from 'lodash';
import React, { useState } from 'react';

export const CustomUpload = ({
  onChange,
  onRemove,
  currentError,
  uploadProps,
  initial,
  setFieldValue
}) => {
  const [fileList, setFileList] = useState(initial);
  const handleChange = e => {
    const _file = e.file;
    setFileList([_file]);

    onChange(e);
    setFieldValue(_file);
  };

  const handleRemove = e => {
    setFileList([]);
    onRemove();
  };

  return (
    <Upload {...uploadProps} onChange={handleChange} onRemove={handleRemove} fileList={fileList}>
      <Button
        className={`formProjectBasicInformation__uploadThumbnail__button ${
          getErrorMessagesField(currentError, [ERROR_TYPES.IMAGE_INVALID, ERROR_TYPES.EMPTY])
            .length > 0
            ? '--withError'
            : ''
        }`}
      >
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
  );
};
