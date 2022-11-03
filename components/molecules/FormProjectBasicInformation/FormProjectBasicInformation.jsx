/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col, Upload, Icon, Select, Tag, InputNumber } from 'antd';
import './form-project-basic-information.scss';
import { onlyAlphanumerics } from 'constants/Regex';
import { ERROR_MESSAGES, ERROR_TYPES, TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { getCountries } from 'api/countriesApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { toBase64 } from 'components/utils/FileUtils';
import { putBasicInformation } from 'api/projectApi';
import { formatCurrency } from 'helpers/formatter';
import { getErrorMessagesField, getErrorMessagesFields } from 'helpers/utils';

const { Option } = Select;

const TAG_COLORS = {
  'in execution': 'blue',
  draft: '#d2d2d2',
  'in revision': 'gold',
  canceled: 'red',
  completed: 'green'
};

const FormProjectBasicInformationContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldDecorator, getFieldsError, getFieldError } = form;
  const [countriesAvailable, setCountriesAvailable] = useState({});
  const [currentBasicInformation, setCurrentBasicInformation] = useState({});

  const projectNameError = getFieldError('projectName');
  const thumbnailPhotoError = getFieldError('thumbnailPhoto');

  const { projectName = 'Project Name', timeframe } = currentBasicInformation;
  let { timeframeUnit, location, thumbnailPhoto } = currentBasicInformation;

  timeframeUnit = timeframeUnit || 'months';
  location = location || undefined;
  thumbnailPhoto = thumbnailPhoto || undefined;

  const {
    status,
    beneficiary: { firstName: beneficiaryFirstName, lastName: beneficiaryLastName } = {
      firstName: undefined,
      lastName: undefined
    }
  } = project;

  let {
    details: { currency },
    budget
  } = project;

  currency = currency || 'USD';
  budget = budget || 0;

  useEffect(() => {
    const getAndSetCountriesAvailable = async () => {
      setCountriesAvailable({ loading: true });
      const _countries = await getCountries();
      setCountriesAvailable({
        content: _countries,
        loading: false
      });
    };
    getAndSetCountriesAvailable();

    setCurrentBasicInformation({
      ...project?.basicInformation,
      thumbnailPhoto: project?.basicInformation?.thumbnailPhoto
        ? `${process.env.NEXT_PUBLIC_URL_HOST}${project?.basicInformation?.thumbnailPhoto}`
        : undefined
    });
  }, []);

  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { thumbnailPhoto: _thumbnailPhoto, ...restValues } = values;
        const valuesProcessed = { ...restValues };

        if (_thumbnailPhoto?.file) valuesProcessed.thumbnailPhoto = _thumbnailPhoto.file;
        const formData = new FormData();
        Object.keys(valuesProcessed).forEach(key => {
          formData.append(key, valuesProcessed[key]);
        });
        updateProjectProcess(project.id, formData);
      }
    });
  };

  const updateProjectProcess = async (projectId, formData) => {
    const response = await putBasicInformation(projectId, formData);

    if (response.errors) {
      return onError(response.errors);
    }

    onSuccess(response.data);
    goBack();
  };

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    accept: '.jpg,.png',
    multiple: false
  };

  const handleThumbnailChange = async value => {
    if (value?.file?.status !== 'removed') {
      const b64Photo = await toBase64(value?.file);
      setCurrentBasicInformation({ ...currentBasicInformation, thumbnailPhoto: b64Photo });
    }
  };

  const handleThumbnailRemove = () => {
    const {
      thumbnailPhoto: _thumbnailPhoto,
      ...restCurrentBasicInformation
    } = currentBasicInformation;
    setCurrentBasicInformation({ ...restCurrentBasicInformation });
  };

  const validateImageSize = async (_rule, value, callback) => {
    if (value?.file?.status === 'removed') return callback();
    if (value?.file) {
      const fileSize = value?.file.size;
      if (fileSize / 1000 > 500) return callback(ERROR_MESSAGES.IMAGE);
      return callback();
    }
    return callback();
  };

  const thumbnailRules = initialValue =>
    initialValue
      ? [
          {
            validator: validateImageSize
          }
        ]
      : [
          {
            required: true,
            message: ERROR_TYPES.EMPTY
          },
          {
            validator: validateImageSize
          }
        ];

  return (
    <>
      <Form onSubmit={submit}>
        <Row gutter={22}>
          <Col span={8}>
            <TitlePage textTitle="Complete Basic Information" />
            <h3>This is the resume</h3>
            <img
              src={thumbnailPhoto || '/static/images/thumbnail-default.svg'}
              alt="thumbnail"
              className="formProjectBasicInformation__thumbnailPhoto"
            />
            <Row type="flex" justify="space-between">
              <Col>
                <p>{projectName || 'Project Name'}</p>
              </Col>
              <Col>
                <Tag
                  color={TAG_COLORS[status?.toLowerCase()]}
                  className="formProjectBasicInformation__tag"
                >
                  {status}
                </Tag>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>Country</p>
                <p>{location || 'Country of impact'}</p>
              </Col>
              <Col span={6}>
                <p>Time</p>
                <p>
                  {timeframe} {timeframeUnit}
                </p>
              </Col>
              <Col span={6}>
                <p>{formatCurrency(currency, budget)}</p>
                <p>Budget</p>
              </Col>
              <Col span={6}>
                <p>Name</p>
                <p>
                  {beneficiaryFirstName} {beneficiaryLastName}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Project Name"
              help={
                <>
                  {getErrorMessagesField(projectNameError, [ERROR_TYPES.ALPHANUMERIC]).map(
                    errorMessage => errorMessage
                  )}
                </>
              }
            >
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  },
                  {
                    pattern: onlyAlphanumerics,
                    message: ERROR_TYPES.ALPHANUMERIC
                  },
                  {
                    pattern: onlyAlphanumerics,
                    message: 'ERROR_TYPES.ALPHANUMERIC'
                  }
                ],
                initialValue: projectName,
                maxLength: 50,
                validateTrigger: 'onSubmit'
              })(
                <Input
                  placeholder="Input Text Example"
                  onChange={({ currentTarget: { value } }) => {
                    setCurrentBasicInformation({
                      ...currentBasicInformation,
                      projectName: value
                    });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item label="Country of Impact" help={null}>
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                initialValue: location,
                validateTrigger: 'onSubmit'
              })(
                <Select
                  placeholder="Select the country or region"
                  loading={countriesAvailable?.loading}
                  onChange={value =>
                    setCurrentBasicInformation({
                      ...currentBasicInformation,
                      location: value
                    })
                  }
                >
                  {countriesAvailable?.content?.map(({ id, name }) => (
                    <Option value={name} key={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Row type="flex" align="bottom" gutter={18}>
              <Col>
                <Form.Item label="Timeframe" help={null}>
                  {getFieldDecorator('timeframe', {
                    initialValue: timeframe && parseInt?.(timeframe, 10),
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY
                      }
                    ],
                    validateTrigger: 'onSubmit'
                  })(
                    <InputNumber
                      min={0}
                      placeholder={0}
                      onChange={value =>
                        setCurrentBasicInformation({
                          ...currentBasicInformation,
                          timeframe: value
                        })
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="" help={null}>
                  {getFieldDecorator('timeframeUnit', {
                    initialValue: timeframeUnit,
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY,
                        whitespace: true
                      }
                    ],
                    validateTrigger: 'onSubmit'
                  })(
                    <Select
                      placeholder="Type"
                      onChange={value =>
                        setCurrentBasicInformation({
                          ...currentBasicInformation,
                          timeframeUnit: value
                        })
                      }
                    >
                      {TIMEFRAME_UNITS.map(({ value, label }) => (
                        <Option value={value} key={value}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Thumbnail Image"
              help={
                <>
                  {getErrorMessagesField(thumbnailPhotoError, [ERROR_TYPES.IMAGE_INVALID]).map(
                    errorMessage => errorMessage
                  )}
                </>
              }
            >
              {getFieldDecorator('thumbnailPhoto', {
                initialValue: thumbnailPhoto && [{ url: thumbnailPhoto }],
                rules: thumbnailRules(thumbnailPhoto),
                validateTrigger: 'onSubmit'
              })(
                <Upload
                  {...uploadProps}
                  onChange={handleThumbnailChange}
                  onRemove={handleThumbnailRemove}
                >
                  <Button
                    disabled={currentBasicInformation?.thumbnailPhoto}
                    className={`formProjectBasicInformation__uploadThumbnail__button ${getErrorMessagesField(
                      thumbnailPhotoError,
                      [ERROR_TYPES.IMAGE_INVALID, ERROR_TYPES.EMPTY]
                    ).length > 0 && '--withError'}`}
                  >
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <FooterButtons
        prevStepButton={(() => (
          <Button onClick={goBack}>Back</Button>
        ))()}
        nextStepButton={(() => (
          <div>
            {getErrorMessagesFields(getFieldsError(), [ERROR_TYPES.EMPTY]).map(error => error)}
            <Button type="primary" onClick={submit} className="formProjectBasicInformation__footer">
              Save and continue
            </Button>
          </div>
        ))()}
      />
    </>
  );
};

export const FormProjectBasicInformation = Form.create({
  name: 'FormProjectBasicInformation'
})(FormProjectBasicInformationContent);

FormProjectBasicInformationContent.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  project: PropTypes.shape({
    details: PropTypes.shape({
      problemAddressed: PropTypes.string,
      mission: PropTypes.string,
      currencyType: PropTypes.string,
      currency: PropTypes.string,
      additionalCurrencyInformation: PropTypes.string
    })
  }).isRequired,
  onError: PropTypes.func.isRequired
};
