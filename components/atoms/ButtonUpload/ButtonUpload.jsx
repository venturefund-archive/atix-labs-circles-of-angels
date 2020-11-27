/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon } from 'antd';
import './_style.scss';

const ButtonUpload = ({
  change,
  name,
  typeAccepts,
  buttonText,
  showUploadList,
  defaultFileList,
  hideButton,
  onRemove,
  beforeUpload,
  fileList,
  listType
}) => {
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name,
    customRequest: dummyRequest,
    onChange: change,
    accept: typeAccepts,
    showUploadList,
    defaultFileList,
    onRemove,
    beforeUpload,
    listType
  };

  if (fileList && fileList.length > 0) {
    props.fileList = fileList;
  } else {
    props.fileList = defaultFileList;
  }

  return (
    <Upload {...props}>
      {!hideButton && (
        <Button>
          {buttonText} <Icon type="upload" />
        </Button>
      )}
    </Upload>
  );
};

export default ButtonUpload;

ButtonUpload.defaultProps = {
  typeAccepts: '',
  showUploadList: false,
  hideButton: false,
  beforeUpload: () => {},
  fileList: [],
  listType: []
};

ButtonUpload.propTypes = {
  change: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  typeAccepts: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  showUploadList: PropTypes.bool,
  defaultFileList: PropTypes.node.isRequired,
  hideButton: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  beforeUpload: PropTypes.func,
  fileList: PropTypes.node,
  listType: PropTypes.node
};
