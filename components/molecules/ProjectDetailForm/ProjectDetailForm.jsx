/* eslint-disable react/jsx-wrap-multilines */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton, Divider, Form, message } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import { getPreviewValue } from '../../../helpers/formatter';
import Field from '../../atoms/Field/Field';
import { toBase64 } from '../../utils/FileUtils';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectDetailForm = ({ thumbnailsData, fields, handleChange }) => {
  const [photoPreview, setPhotoPreview] = useState();

  useEffect(() => {
    const loadPhotoPreview = async () => {
      if (fields.coverPhotoPath.value) {
        if (fields.coverPhotoPath.value.file) {
          try {
            const b64Photo = await toBase64(fields.coverPhotoPath.value.file);
            setPhotoPreview(b64Photo);
          } catch (err) {
            message.error(
              'An error occurred while loading the preview, please try again!'
            );
            setPhotoPreview();
          }
        } else if (fields.coverPhotoPath.value !== '') {
          setPhotoPreview(fields.coverPhotoPath.value);
        }
      }
    };
    loadPhotoPreview();
  }, [fields.coverPhotoPath.value]);

  return (
    <Fragment>
      <Row type="flex" justify="space-around" className="centered">
        <Col className="AlignCenter" sm={8} md={8} lg={8}>
          <Col className="CardExample" sm={24} md={24} lg={24}>
            <Col className="BlockImage" sm={24} md={24} lg={24}>
              <h5>Organization Name</h5>
              <h1>{getPreviewValue(thumbnailsData.projectName)}</h1>

              <img
                className="BackgroundImage"
                width="700"
                height="400"
                src={photoPreview || './static/images/thumbnail-example.png'}
                alt="background"
              />

              <Col className="flex" sm={24} md={24} lg={24}>
                <InfoItem
                  img={
                    <img
                      src="./static/images/world.svg"
                      alt="Circles of Angels"
                    />
                  }
                  subtitle="Country of Impact"
                  title={getPreviewValue(thumbnailsData.location)}
                  iconInfoItem="dollar"
                />
                <InfoItem
                  img={
                    <img
                      src="./static/images/calendar.svg"
                      alt="Circles of Angels"
                    />
                  }
                  subtitle="Timeframe"
                  title={getPreviewValue(thumbnailsData.timeframe)}
                  iconInfoItem="dollar"
                />
                <InfoItem
                  img={
                    <img
                      src="./static/images/amount.svg"
                      alt="Circles of Angels"
                    />
                  }
                  subtitle="Goal Amount"
                  title={`$ ${getPreviewValue(thumbnailsData.goalAmount)}`}
                  iconInfoItem="dollar"
                />
              </Col>
            </Col>
            <Col className="spacedivider Details" sm={24} md={24} lg={24}>
              <Col sm={24} md={24} lg={24}>
                <h4>Project Mission </h4>
              </Col>
              <Col className="Mission" sm={24} md={24} lg={24}>
                {fields.mission.value || <Skeleton title={false} />}
              </Col>
              <Col sm={24} md={24} lg={24}>
                <h4>The Problem </h4>
              </Col>
              <Col className="Problem" sm={24} md={24} lg={24}>
                {fields.problemAddressed.value || (
                  <Skeleton paragraph={{ rows: 2 }} title={false} />
                )}
              </Col>
            </Col>
          </Col>
        </Col>
        <Divider type="vertical" />
        <Col className="AlignCenter" sm={12} md={12} lg={12}>
          <Col sm={24} md={24} lg={24} className="BlockForm">
            <Row gutter={22}>
              <Form>
                <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                  <Field {...fields.mission} handleChange={handleChange} />
                </Col>
                <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                  <Field
                    {...fields.problemAddressed}
                    handleChange={handleChange}
                  />
                </Col>
                <Col sm={24} md={24} lg={24} className="space-between">
                  <div className="upload-info">
                    <h3>Background Image</h3>
                    <span>
                      Recomended Image Size: 1400x400px. Format: PNG or JPG.
                    </span>
                  </div>
                  <div className="upload-button-field">
                    <Field
                      {...fields.coverPhotoPath}
                      handleChange={handleChange}
                      showPreviouslyUploadedList
                      isImage
                    />
                  </div>
                </Col>
                <Col sm={24} md={24} lg={24} className="space-between">
                  <div className="upload-info">
                    <h3>Legal Agreement</h3>
                    <span>Format: PDF, DOC or DOCX</span>
                  </div>
                  <div className="upload-button">
                    <Field
                      {...fields.agreementFile}
                      handleChange={handleChange}
                      showPreviouslyUploadedList
                      label="Legal Agreement"
                    />
                  </div>
                </Col>
                <Col sm={24} md={24} lg={24} className="space-between">
                  <div className="upload-info">
                    <h3>Project Proposal</h3>
                    <span>Format: PDF, DOC or DOCX</span>
                  </div>
                  <div className="upload-button">
                    <Field
                      {...fields.proposalFile}
                      handleChange={handleChange}
                      showPreviouslyUploadedList
                      label="Project Proposal"
                    />
                  </div>
                </Col>
              </Form>
            </Row>
          </Col>
        </Col>
      </Row>
    </Fragment>
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
