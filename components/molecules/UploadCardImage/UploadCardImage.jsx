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
import { Upload, Modal } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

class UploadCardImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: ''
  };

  dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ file }) => {
    const { onChange } = this.props;
    if (onChange) onChange(file);
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { fileList } = this.props;
    const uploadButton = (
      <CustomButton
        theme="Alternative"
        buttonText="Click to upload a Photo"
        icon="upload"
        classNameIcon="iconDisplay"
      />
    );
    return (
      <div className="clearfix">
        <Upload
          multiple
          customRequest={this.dummyRequest}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadCardImage;

UploadCardImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  fileList: PropTypes.element.isRequired
};
