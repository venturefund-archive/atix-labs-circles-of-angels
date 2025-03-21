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
import { Upload, Icon } from 'antd';

import './_style.scss';

const { Dragger } = Upload;

const DragUploadFile = ({
  change,
  text,
  description,
  accept,
  remove,
  disabled,
  showUploadList,
  filelist,
  beforeUpload
}) => {
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,
    onChange: change,
    accept,
    onRemove: remove,
    disabled,
    showUploadList,
    beforeUpload
  };

  if (filelist) props.fileList = filelist;

  return (
    <div className="DraggerFile">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{text}</p>
        <p className="ant-upload-hint">{description}</p>
      </Dragger>
    </div>
  );
};
export default DragUploadFile;

DragUploadFile.propTypes = {
  change: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  accept: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  showUploadList: PropTypes.bool,
  filelist: PropTypes.element.isRequired,
  beforeUpload: PropTypes.func
};

DragUploadFile.defaultProps = {
  disabled: false,
  showUploadList: false,
  beforeUpload: () => {}
};
