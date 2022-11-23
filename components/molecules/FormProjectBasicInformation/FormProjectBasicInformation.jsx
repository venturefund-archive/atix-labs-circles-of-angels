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
import { Form, Divider, Icon } from 'antd';
import './form-project-basic-information.scss';
import { onlyAlphanumerics } from 'constants/Regex';
import { ERROR_TYPES, KB_FACTOR_CONVERTER, TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { getCountries } from 'api/countriesApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { toBase64 } from 'components/utils/FileUtils';
import { putBasicInformation } from 'api/projectApi';
import { formatCurrency } from 'helpers/formatter';
import { decimalCount, getErrorMessagesFields, getExtensionFromUrl } from 'helpers/utils';
import _ from 'lodash';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import projectStatusMap from 'model/projectStatus';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';
import { CoaFormItemInput } from '../CoaFormItems/CoaFormItemInput/CoaFormItemInput';
import { CoaFormItemUpload } from '../CoaFormItems/CoaFormItemUpload/CoaFormItemUpload';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { CoaFormItemInputNumber } from '../CoaFormItems/CoaFormItemInputNumber/CoaFormItemInputNumber';

const FormProjectBasicInformationContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldsError } = form;
  const [countriesAvailable, setCountriesAvailable] = useState({});
  const [currentBasicInformation, setCurrentBasicInformation] = useState({
    ...project?.basicInformation,
    thumbnailPhoto:
      project?.basicInformation?.thumbnailPhoto &&
      `${process.env.NEXT_PUBLIC_URL_HOST}${project?.basicInformation?.thumbnailPhoto}`
  });

  const projectName = currentBasicInformation?.projectName || 'Project Name';
  const timeframe = currentBasicInformation?.timeframe;
  const timeframeUnit = currentBasicInformation?.timeframeUnit || 'months';
  const location = currentBasicInformation?.location;
  const thumbnailPhoto = currentBasicInformation?.thumbnailPhoto;

  const status = project?.status;
  const beneficiary = getUsersByRole(ROLES_IDS.beneficiary, project?.users)?.[0];
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
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

        if (_thumbnailPhoto) valuesProcessed.thumbnailPhoto = _thumbnailPhoto?.file;

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
    if (decimalCount(value) > 1) return callback(ERROR_TYPES.MORE_THAN_1_DECIMAL);
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

                <CoaTag
                  predefinedColor={projectStatusMap[status?.toLowerCase()]?.color}
                  className="formProjectBasicInformation__left__preview__tag"
                >
                  {projectStatusMap[status].name}
                </CoaTag>
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
          <CoaFormItemInput
            withErrorFeedback
            name="projectName"
            form={form}
            formItemProps={{
              label: 'Project Name',
              className: 'formProjectBasicInformation__content__right__item'
            }}
            fieldDecoratorOptions={{
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
            }}
            errorsToShow={[ERROR_TYPES.ALPHANUMERIC]}
            inputProps={{
              maxLength: 50,
              placeholder: 'Input Text Example',
              onChange: ({ currentTarget: { value } }) => {
                setCurrentBasicInformation({
                  ...currentBasicInformation,
                  projectName: value
                });
              }
            }}
          />
          <CoaFormItemSelect
            withErrorFeedback
            form={form}
            name="location"
            formItemProps={{
              label: 'Country of Impact',
              className: 'formProjectBasicInformation__content__right__item'
            }}
            errorsToShow={[]}
            fieldDecoratorOptions={{
              rules: [
                {
                  required: true,
                  message: ERROR_TYPES.EMPTY,
                  whitespace: true
                }
              ],
              initialValue: location,
              validateTrigger: 'onSubmit'
            }}
            selectProps={{
              placeholder: 'Select the country or region',
              loading: countriesAvailable?.loading,
              onChange: value =>
                setCurrentBasicInformation({
                  ...currentBasicInformation,
                  location: value
                })
            }}
            options={countriesAvailable?.content}
          />
          <div className="formProjectBasicInformation__content__right__timeframeContainer">
            <CoaFormItemInputNumber
              form={form}
              formItemProps={{
                className: 'formProjectBasicInformation__content__right__item',
                label: 'Timeframe'
              }}
              errorsToShow={[ERROR_TYPES.MORE_THAN_1_DECIMAL, ERROR_TYPES.NO_ZERO]}
              name="timeframe"
              fieldDecoratorOptions={{
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY
                  },
                  {
                    validator: validateCurrencyValue
                  }
                ],
                validateTrigger: 'onSubmit',
                initialValue: timeframe && parseFloat?.(timeframe)
              }}
              inputNumberProps={{
                step: '0.1',
                placeholder: 0,
                onChange: value =>
                  setCurrentBasicInformation({
                    ...currentBasicInformation,
                    timeframe: value
                  })
              }}
            />

            <CoaFormItemSelect
              name="timeframeUnit"
              form={form}
              formItemProps={{
                className: 'formProjectBasicInformation__content__right__item',
                label: ''
              }}
              fieldDecoratorOptions={{
                initialValue: timeframeUnit,
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                validateTrigger: 'onSubmit'
              }}
              selectProps={{
                placeholder: 'Type',
                onChange: value =>
                  setCurrentBasicInformation({
                    ...currentBasicInformation,
                    timeframeUnit: value
                  })
              }}
              options={TIMEFRAME_UNITS}
            />
          </div>

          <CoaFormItemUpload
            buttonContent={
              <div className="formProjectBasicInformation__content__right__uploadItemContainer__buttonContent">
                Click to upload
                <Icon type="upload" />
              </div>
            }
            contentContainerClassName="formProjectBasicInformation__content__right__uploadItemContainer"
            form={form}
            formItemProps={{
              label: 'Thumbnail Image',
              className: 'formProjectBasicInformation__content__right__item'
            }}
            fieldDecoratorOptions={{
              rules: thumbnailRules(thumbnailPhoto),
              validateTrigger: 'onSubmit'
            }}
            name="thumbnailPhoto"
            errorsToShow={[ERROR_TYPES.IMAGE_INVALID]}
            initialValue={
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
            onChange={handleThumbnailChange}
            onRemove={handleThumbnailRemove}
            uploadProps={uploadProps}
            Note={
              <div className="formProjectBasicInformation__content__right__uploadItemContainer__note">
                <p>Recommended Image Size: 1400x720px. Format: PNG or JPG.</p>
                <p>Max size: 500kb</p>
              </div>
            }
          />
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
