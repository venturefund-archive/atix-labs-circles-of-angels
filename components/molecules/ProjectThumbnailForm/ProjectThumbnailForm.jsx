import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tag, Row, Col, Divider, Form, message, Skeleton } from 'antd';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import Field from '../../atoms/Field/Field';
import { toBase64 } from '../../utils/FileUtils';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectThumbnailForm = ({ fields, handleChange, loading }) => {
  const [photoPreview, setPhotoPreview] = useState();

  const amount =
    fields.goalAmount.value === undefined
      ? '--'
      : `$${fields.goalAmount.value}`;

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
          const file = fields.cardPhotoPath.value[0];
          if (file.name && !file.name.match(/\.(jpg|jpeg|png)$/)) {
            fields.cardPhotoPath.value.pop();
            message.error('The image file type is not a valid one');
            return;
          }
          try {
            const b64Photo = await toBase64(file);
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

  const locationsNames = () => {
    let locationName;
    if (fields.location.value && fields.location.options) {
      if (fields.location.value.length !== 0) {
        const countries = fields.location.options.filter(
          // eslint-disable-next-line radix
          country => fields.location.value.includes(String(country.value))
        );
        locationName = countries.map(country => country.name).join(', ');
      }
    }
    return locationName;
  };

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
              src={photoPreview || 'images/thumbnail-example.png'}
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
              <Tag color="cyan">New</Tag>
            </Col>
          </Col>
          <Col className="flex" sm={24} md={24} lg={24}>
            <InfoItem
              subtitle="Country of Impact"
              title={
                locationsNames() || (
                  <Skeleton paragraph={{ rows: 1 }} title={false} />
                )
              }
              iconInfoItem="dollar"
            />
            <Divider type="vertical" />
            <InfoItem
              subtitle="Timeframe"
              title={
                fields.timeframe.value ? (
                  `${fields.timeframe.value} month/s`
                ) : (
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
                <Field
                  loading={loading}
                  {...fields.location}
                  handleChange={handleChange}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Col>
              <Col sm={24} md={24} lg={12}>
                <Field {...fields.timeframe} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={12} className="InputAlert">
                <Col sm={24} md={24} lg={24}>
                  {fields.goalAmount.value === undefined ? (
                    <>
                      <Col sm={24} md={24} lg={24}>
                        <h3>{fields.goalAmount.label}</h3>
                      </Col>
                      <div className="Alert">
                        <img src="images/alert.svg" alt="alertsign" />
                        <span>
                          The goal amount will be calculated from the{' '}
                          <b>milestones budget</b>
                        </span>
                      </div>
                    </>
                  ) : (
                    <Field
                      {...fields.goalAmount}
                      value={`$${fields.goalAmount.value}`}
                      disabled
                    />
                  )}
                </Col>
              </Col>
              <Col sm={24} md={24} lg={18} className="upload-info">
                <h3>Thumbnail Image</h3>
                <span>
                  Recomended Image Size: 1400x400px. Format: PNG or JPG.
                </span>
              </Col>
              <Col sm={24} md={24} lg={6}>
                <Field
                  {...fields.cardPhotoPath}
                  handleChange={handleChange}
                  showPreviouslyUploadedList
                  fileType="image"
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
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ProjectThumbnailForm;
