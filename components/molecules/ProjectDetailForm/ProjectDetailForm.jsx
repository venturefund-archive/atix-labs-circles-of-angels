/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton, Divider, message } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import { getPreviewValue } from '../../../helpers/formatter';
import Field from '../../atoms/Field/Field';
import { toBase64 } from '../../utils/FileUtils';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectDetailForm = ({ thumbnailsData, fields, handleChange }) => {
  return (
    <Row>
      <Col span={12}>
        <Col span={24} className="BlockForm">
          <Row gutter={22}>
            <Col className="InputTwoLabel" span={24}>
              <Field {...fields.about} handleChange={handleChange} />
            </Col>
            <Col className="InputTwoLabel" span={24}>
              <Field
                {...fields.currencyType}
                style={{ width: '100%' }}
                handleChange={handleChange}
              />
            </Col>
            <Col className="InputTwoLabel" span={24}>
              <Field {...fields.problemAddressed} handleChange={handleChange} />
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Background Image</h3>
                <span>
                  Recommended Image Size: 1400x400px.Format: PNG or JPG.
                </span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.coverPhotoPath}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  fileType="image"
                />
              </div>
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Legal Agreement</h3>
                <span>Format: PDF, DOC or DOCX</span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.agreementFile}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  label="Legal Agreement"
                  fileType="document"
                />
              </div>
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Project Proposal</h3>
                <span>Format: PDF, DOC or DOCX</span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.proposalFile}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  label="Project Proposal"
                  fileType="document"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Col>

      <Col span={12}>
        <Col span={24} className="BlockForm">
          <Row gutter={22}>
            <Col className="InputTwoLabel" span={24}>
              <Field {...fields.mission} handleChange={handleChange} />
            </Col>
            <Col className="InputTwoLabel" span={24}>
              <Field {...fields.problemAddressed} handleChange={handleChange} />
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Background Image</h3>
                <span>
                  Recommended Image Size: 1400x400px.Format: PNG or JPG.
                </span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.coverPhotoPath}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  fileType="image"
                />
              </div>
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Legal Agreement</h3>
                <span>Format: PDF, DOC or DOCX</span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.agreementFile}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  label="Legal Agreement"
                  fileType="document"
                />
              </div>
            </Col>
            <Col className="space-between">
              <div className="upload-info">
                <h3>Project Proposal</h3>
                <span>Format: PDF, DOC or DOCX</span>
              </div>
              <div className="upload-button-field">
                <Field
                  {...fields.proposalFile}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  label="Project Proposal"
                  fileType="document"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

ProjectDetailForm.defaultProps = {
  thumbnailsData: {
    location: '',
    goalAmount: '',
    timeframe: '',
    projectName: ''
  }
};

ProjectDetailForm.propTypes = {
  thumbnailsData: PropTypes.shape({
    location: PropTypes.string,
    goalAmount: PropTypes.string,
    timeframe: PropTypes.string,
    projectName: PropTypes.string
  }),
  fields: PropTypes.shape({
    mission: fieldPropType,
    problemAddressed: fieldPropType,
    coverPhotoPath: fieldPropType,
    proposalFile: fieldPropType,
    agreementFile: fieldPropType
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ProjectDetailForm;
