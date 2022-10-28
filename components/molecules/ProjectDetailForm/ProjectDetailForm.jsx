/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectDetailForm = ({ fields, handleChange }) => {
  return (
    <>
      <Row gutter={22}>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.about} handleChange={handleChange} />
        </Col>
        <Col className="InputTwoLabel" span={12}>
          <Field {...fields.mission} handleChange={handleChange} />
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
          {fields.currencyType.value?.toLowerCase() === 'fiat' && (
            <Field {...fields.accountInformation} handleChange={handleChange} />
          )}
          {fields.currencyType.value?.toLowerCase() === 'crypto' && (
            <Field {...fields.walletAddress} handleChange={handleChange} />
          )}
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
                {...fields.legalAgreementFile}
                handleChange={handleChange}
                showPreviouslyUploadedList
                label="Upload Legal Agreement"
                fileType="document"
              />
            </Col>
            <Col span={12}>
              <h3>Legal Agreement</h3>
              <span>Format: PDF, up to 20 MB.</span>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Field
                {...fields.projectProposalFile}
                handleChange={handleChange}
                showPreviouslyUploadedList
                label="Upload Project Proposal"
                fileType="document"
              />
            </Col>
            <Col span={12}>
              <h3>Project Proposal</h3>
              <span>Format: PDF, up to 20 MB.</span>
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
