/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton, Divider, message } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectDetailForm = ({ thumbnailsData, fields, handleChange }) => {
  return (
    <>
      <Row gutter={22}>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.about} handleChange={handleChange} />
        </Col>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.missionAndVision} handleChange={handleChange} />
        </Col>
      </Row>
      <Row gutter={22}>
        <Col className="InputTwoLabel" span={12}>
          <Field
            {...fields.currencyType}
            handleChange={handleChange}
            style={{ width: '100%' }}
          />
        </Col>
        <Col className="InputTwoLabel" span={12}>
          <Field
            {...fields.currency}
            handleChange={handleChange}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Row gutter={22}>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.accountInformation} handleChange={handleChange} />
        </Col>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.budget} handleChange={handleChange} />
        </Col>
      </Row>
      <Row gutter={22}>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Field
                {...fields.agreementFile}
                handleChange={handleChange}
                showPreviouslyUploadedList
                label="Upload Legal Agreement"
                fileType="document"
              />
            </Col>
            <Col span={12}>
              <h3>Legal Agreement</h3>
              <span>Format: PDF, DOC or DOCX</span>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Field
                {...fields.proposalFile}
                handleChange={handleChange}
                showPreviouslyUploadedList
                label="Upload Project Proposal"
                fileType="document"
              />
            </Col>
            <Col span={12}>
              <h3>Project Proposal</h3>
              <span>Format: PDF, DOC or DOCX</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
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
