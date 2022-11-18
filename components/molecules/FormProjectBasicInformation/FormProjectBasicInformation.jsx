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
import { Form, Input, Select, Tag, InputNumber, Divider, Icon } from 'antd';
import './form-project-basic-information.scss';
import { onlyAlphanumerics } from 'constants/Regex';
import { ERROR_TYPES, KB_FACTOR_CONVERTER, TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { getCountries } from 'api/countriesApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { toBase64 } from 'components/utils/FileUtils';
import { putBasicInformation } from 'api/projectApi';
import { formatCurrency } from 'helpers/formatter';
import {
  decimalCount,
  getErrorMessagesField,
  getErrorMessagesFields,
  getExtensionFromUrl
} from 'helpers/utils';
import _ from 'lodash';
import { CustomUpload } from 'components/atoms/CustomUpload/CustomUpload';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';

const { Option } = Select;

const TAG_COLORS = {
  'in execution': 'blue',
  draft: '#d2d2d2',
  'in revision': 'gold',
  canceled: 'red',
  completed: 'green'
};

const FormProjectBasicInformationContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldDecorator, getFieldsError, getFieldError, setFieldsValue } = form;
  const [countriesAvailable, setCountriesAvailable] = useState({});
  const [currentBasicInformation, setCurrentBasicInformation] = useState({
    ...project?.basicInformation,
    thumbnailPhoto:
      project?.basicInformation?.thumbnailPhoto &&
      `${process.env.NEXT_PUBLIC_URL_HOST}${project?.basicInformation?.thumbnailPhoto}`
  });

  const projectNameError = getFieldError('projectName');
  const thumbnailPhotoError = getFieldError('thumbnailPhoto');
  const timeframeError = getFieldError('timeframe');

  const projectName = currentBasicInformation?.projectName || 'Project Name';
  const timeframe = currentBasicInformation?.timeframe;
  const timeframeUnit = currentBasicInformation?.timeframeUnit || 'months';
  const location = currentBasicInformation?.location;
  const thumbnailPhoto = currentBasicInformation?.thumbnailPhoto;

  const status = project?.status;
  const beneficiaryFirstName = project?.beneficiary?.firstName;
  const beneficiaryLastName = project?.beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';
  const currency = project?.details?.currency || 'USD';
  const budget = project?.budget || 0;

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
  }, []);

  const submit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const { thumbnailPhoto: _thumbnailPhoto, ...restValues } = values;
        const valuesProcessed = { ...restValues };

        if (_thumbnailPhoto) valuesProcessed.thumbnailPhoto = _thumbnailPhoto;

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
    if (value?.status === 'removed') return callback();
    if (value) {
      const fileSize = value.size;
      if (fileSize / KB_FACTOR_CONVERTER > 500) return callback(ERROR_TYPES.IMAGE_INVALID);
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

  const validateCurrencyValue = (_rule, value, callback) => {
    if (value === 0) return callback(ERROR_TYPES.NO_ZERO);
    if (decimalCount(value) > 1) return callback(ERROR_TYPES.MORE_THAN_3_DECIMAL);
    return callback();
  };

  return (
    <>
      <div className="formProjectBasicInformation__content">
        <div className="formProjectBasicInformation__content__left">
          <TitlePage textTitle="Complete Basic Information" />
          <div className="formProjectBasicInformation__content__left__preview">
            <h3 className="formProjectBasicInformation__content__left__preview__title">
              This is the resume
            </h3>
            <img
              src={thumbnailPhoto || '/static/images/thumbnail-default.svg'}
              alt="thumbnail"
              className="formProjectBasicInformation__content__left__preview__thumbnailPhoto"
            />
            <div className="formProjectBasicInformation__content__left__preview__info">
              <div className="formProjectBasicInformation__content__left__preview__info__main">
                <h4 className="formProjectBasicInformation__content__left__preview__info__main__title">
                  {projectName || 'Project Name'}
                </h4>

                <Tag
                  color={TAG_COLORS[status?.toLowerCase()]}
                  className="formProjectBasicInformation__left__preview__tag"
                >
                  {status}
                </Tag>
              </div>
              <div className="formProjectBasicInformation__content__left__preview__info__description">
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {location || 'Country of impact'}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    Country
                  </h5>
                </div>
                <Divider
                  type="vertical"
                  className="formProjectBasicInformation__content__left__preview__info__divider"
                />
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {parseFloat(timeframe)?.toFixed(1)} {timeframeUnit}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    Time
                  </h5>
                </div>
                <Divider
                  type="vertical"
                  className="formProjectBasicInformation__content__left__preview__info__divider"
                />
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {formatCurrency(currency, budget)}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    Budget
                  </h5>
                </div>
                <Divider
                  type="vertical"
                  className="formProjectBasicInformation__content__left__preview__info__divider"
                />
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {beneficiaryCompleteName}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    Beneficiary name
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider type="vertical" className="formProjectBasicInformation__content__divider" />
        <Form onSubmit={submit} className="formProjectBasicInformation__content__right">
          <Form.Item
            className="formProjectBasicInformation__content__right__item"
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
                }
              ],
              initialValue: projectName,
              validateTrigger: 'onSubmit'
            })(
              <Input
                maxLength={50}
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
          <Form.Item
            label="Country of Impact"
            help={null}
            className="formProjectBasicInformation__content__right__item"
          >
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

          <div className="formProjectBasicInformation__content__right__timeframeContainer">
            <Form.Item
              className="formProjectBasicInformation__content__right__item"
              label="Timeframe"
              help={
                <div>
                  {getErrorMessagesField(timeframeError, [
                    ERROR_TYPES.MORE_THAN_3_DECIMAL,
                    ERROR_TYPES.NO_ZERO
                  ]).map(errorMessage => errorMessage)}
                </div>
              }
            >
              {getFieldDecorator('timeframe', {
                initialValue: timeframe && parseFloat?.(timeframe),
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY
                  },
                  {
                    validator: validateCurrencyValue
                  }
                ],
                validateTrigger: 'onSubmit'
              })(
                <InputNumber
                  step="0.1"
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

            <Form.Item
              label=""
              help={null}
              className="formProjectBasicInformation__content__right__item"
            >
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
          </div>

          <Form.Item
            className="formProjectBasicInformation__content__right__item"
            valuePropName="fileList"
            label="Thumbnail Image"
            help={
              <>
                {getErrorMessagesField(thumbnailPhotoError, [ERROR_TYPES.IMAGE_INVALID]).map(
                  errorMessage => errorMessage
                )}
              </>
            }
          >
            <div className="formProjectBasicInformation__content__right__uploadItemContainer">
              <p className="formProjectBasicInformation__content__right__uploadItemContainer__note">
                Recommended Image Size: 1400x720px. Format: PNG or JPG.
              </p>
              {getFieldDecorator('thumbnailPhoto', {
                rules: thumbnailRules(thumbnailPhoto),
                validateTrigger: 'onSubmit'
              })(
                <CustomUpload
                  uploadProps={uploadProps}
                  getErrorMessagesField={getErrorMessagesField}
                  onChange={handleThumbnailChange}
                  onRemove={handleThumbnailRemove}
                  currentError={thumbnailPhotoError}
                  setFieldValue={value => {
                    setFieldsValue({ thumbnailPhoto: value });
                  }}
                  initial={
                    thumbnailPhoto
                      ? [
                          {
                            uid: _.uniqueId(),
                            url: thumbnailPhoto,
                            name: `thumbnail-image.${getExtensionFromUrl(thumbnailPhoto)}`
                          }
                        ]
                      : []
                  }
                  buttonType="ghost"
                >
                  Click to upload <Icon type="upload" />
                </CustomUpload>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>

      <FooterButtons
        prevStepButton={(() => (
          <CoaButton onClick={goBack} type="secondary">
            <Icon type="arrow-left" /> Back
          </CoaButton>
        ))()}
        errors={getErrorMessagesFields(getFieldsError(), [ERROR_TYPES.EMPTY])}
        nextStepButton={(() => (
          <CoaButton
            onClick={submit}
            className="formProjectBasicInformation__footer"
            type="primary"
          >
            Save and continue
          </CoaButton>
        ))()}
      />
    </>
  );
};

export const FormProjectBasicInformation = Form.create({
  name: 'FormProjectBasicInformation'
})(FormProjectBasicInformationContent);

FormProjectBasicInformationContent.defaultProps = {
  form: () => undefined
};

FormProjectBasicInformationContent.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any),
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
