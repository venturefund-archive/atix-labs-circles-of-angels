import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tag, Row, Col, Divider, Form, message, Skeleton } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import Field from '../../atoms/Field/Field';
import { toBase64 } from '../../utils/FileUtils';
import { fieldPropType } from '../../../helpers/proptypes';
import './_style.scss';

const ProjectThumbnailForm = ({ fields, handleChange }) => {
  const [photoPreview, setPhotoPreview] = useState();

  const amount =
    fields.goalAmount.value === undefined ? (
      "--"
    ) : (
      `$${fields.goalAmount.value}`
    );

  useEffect(() => {
    const loadPhotoPreview = async () => {
      if (fields.cardPhotoPath.value) {
        if (
          typeof fields.cardPhotoPath.value === 'string' &&
          fields.cardPhotoPath.value !== ''
        ) {
          setPhotoPreview(fields.cardPhotoPath.value);
        } else if (
          Array.isArray(fields.cardPhotoPath.value) &&
          fields.cardPhotoPath.value.length > 0
        ) {
          try {
            const b64Photo = await toBase64(fields.cardPhotoPath.value[0]);
            setPhotoPreview(b64Photo);
          } catch (err) {
            message.error(
              'An error occurred while loading the preview, please try again!'
            );
            setPhotoPreview();
          }
        }
      }
    };
    loadPhotoPreview();
  }, [fields.cardPhotoPath.value]);

  return (
    <Fragment>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        className="centered"
      >
        <Col className="CardExample" sm={8} md={8} lg={8}>
          <h3>This is the preview!</h3>
          <Col className="BlockImage" sm={24} md={24} lg={24}>
            <img
              width="700"
              height="400"
              src={photoPreview || './static/images/thumbnail-example.png'}
              alt="thumbnail"
            />
          </Col>
          <Col className="spacedivider" sm={24} md={24} lg={24}>
            <Col sm={24} md={24} lg={16}>
              <h1>
                {fields.projectName.value || (
                  <Skeleton paragraph={{ rows: 1 }} title={false} />
                )}
              </h1>
            </Col>
            <Col sm={24} md={24} lg={8}>
              <Tag color="orange">Pending for approval</Tag>
            </Col>
          </Col>
          <Col className="flex" sm={24} md={24} lg={24}>
            <InfoItem
              subtitle="Country of Impact"
              title={
                fields.location.value || (
                  <Skeleton paragraph={{ rows: 1 }} title={false} />
                )
              }
              iconInfoItem="dollar"
            />
            <Divider type="vertical" />
            <InfoItem
              subtitle="Timeframe"
              title={
                fields.timeframe.value || (
                  <Skeleton paragraph={{ rows: 1 }} title={false} />
                )
              }
              iconInfoItem="dollar"
            />
            <Divider type="vertical" />
            <InfoItem
              subtitle="Goal Amount"
              title={amount}
              iconInfoItem="dollar"
            />
          </Col>
        </Col>
        <Divider type="vertical" />
        <Col sm={24} md={24} lg={12}>
          <Row gutter={22}>
            <Form className="login-form">
              <Col sm={24} md={24} lg={24}>
                <Field {...fields.projectName} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Field {...fields.location} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={12}>
                <Field {...fields.timeframe} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={12} className="InputAlert">
                <Col sm={24} md={24} lg={24}>
                  <h3>{fields.goalAmount.label}</h3>
                </Col>
                <Col sm={24} md={24} lg={24}>
                  {
                    <span>
                      {fields.goalAmount.value === undefined
                        ? 
                        <div className="Alert">
                         <img src="/static/images/alert.svg" alt="alertsign" />
                         <span>
                         The goal amount will be calculated from the <b>milestones budget</b>
                         </span>
                        </div>
                        : `$${fields.goalAmount.value}`}
                    </span>
                  }

                </Col>
              </Col>
                <Col sm={24} md={24} lg={18}>
                  <h3>Thumbnail Image</h3>
                  <span>
                    Recomended Image Size: 1400x400px. Format: PNG or JPG.
                  </span>
                </Col>
                <Col sm={24} md={24} lg={6}>
                  <Field
                    {...fields.cardPhotoPath}
                    handleChange={handleChange}
                    showUploadList={false}
                  />
                </Col>
            </Form>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

ProjectThumbnailForm.propTypes = {
  fields: PropTypes.shape({
    projectName: PropTypes.shape(fieldPropType),
    timeframe: PropTypes.shape(fieldPropType),
    goalAmount: PropTypes.shape(fieldPropType),
    cardPhotoPath: PropTypes.shape(fieldPropType),
    location: PropTypes.shape(fieldPropType)
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ProjectThumbnailForm;
