/* eslint-disable func-names */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Divider, Icon } from 'antd';
import './form-project-basic-information.scss';
import { ERROR_TYPES, KB_FACTOR_CONVERTER, TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { getCountries } from 'api/countriesApi';
import { toBase64 } from 'components/utils/FileUtils';
import { putBasicInformation } from 'api/projectApi';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import { decimalCount, getErrorMessagesFields, getExtensionFromUrl } from 'helpers/utils';
import _ from 'lodash';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { PROJECT_STATUS_MAP } from 'model/projectStatus';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaFormItemInput } from '../CoaFormItems/CoaFormItemInput/CoaFormItemInput';
import { CoaFormItemUpload } from '../CoaFormItems/CoaFormItemUpload/CoaFormItemUpload';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { CoaFormItemInputNumber } from '../CoaFormItems/CoaFormItemInputNumber/CoaFormItemInputNumber';

const FormProjectBasicInformationContent = ({ form, project, Footer }) => {
  const { texts } = useContext(DictionaryContext);
  const { getFieldsError } = form;
  const [countriesAvailable, setCountriesAvailable] = useState({});
  const [currentBasicInformation, setCurrentBasicInformation] = useState({
    ...project?.basicInformation,
    thumbnailPhoto:
      project?.basicInformation?.thumbnailPhoto &&
      `${process.env.NEXT_PUBLIC_URL_HOST}${project?.basicInformation?.thumbnailPhoto}`
  });

  const projectName =
    currentBasicInformation?.projectName || (texts?.createProject?.projectName || 'Project Name');
  const timeframe = currentBasicInformation?.timeframe;
  const timeframeUnit =
    currentBasicInformation?.timeframeUnit || (texts?.general?.months || 'months');
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
      _countries.sort((a, b) => a.name.localeCompare(b.name));
      setCountriesAvailable({
        content: _countries,
        loading: false
      });
    };
    getAndSetCountriesAvailable();
  }, []);

  const onSubmit = () =>
    new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const { thumbnailPhoto: _thumbnailPhoto, ...restValues } = values;
          const valuesProcessed = { ...restValues };

          if (_thumbnailPhoto) valuesProcessed.thumbnailPhoto = _thumbnailPhoto?.file;

          const formData = new FormData();
          Object.keys(valuesProcessed).forEach(key => {
            formData.append(key, valuesProcessed[key]);
          });
          const response = await putBasicInformation(project?.id, formData);
          if (response.errors) {
            return reject(response.errors);
          }
          return resolve();
        }
      });
    });

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
              {texts?.createProject?.resume || 'This is the resume'}
            </h3>
            <img
              src={thumbnailPhoto || '/static/images/thumbnail-default.svg'}
              alt="thumbnail"
              className="formProjectBasicInformation__content__left__preview__thumbnailPhoto"
            />
            <div className="formProjectBasicInformation__content__left__preview__info">
              <div className="formProjectBasicInformation__content__left__preview__info__main">
                <h4 className="formProjectBasicInformation__content__left__preview__info__main__title">
                  {projectName || (texts?.createProject?.projectName || 'Project Name')}
                </h4>

                <CoaTag
                  predefinedColor={PROJECT_STATUS_MAP[status?.toLowerCase()]?.color}
                  className="formProjectBasicInformation__left__preview__tag"
                >
                  {PROJECT_STATUS_MAP?.[status]?.name}
                </CoaTag>
              </div>
              <div className="formProjectBasicInformation__content__left__preview__info__description">
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {location || (texts?.header?.impact || 'Country of Impact')}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    {texts?.general?.country || 'Country'}
                  </h5>
                </div>
                <Divider
                  type="vertical"
                  className="formProjectBasicInformation__content__left__preview__info__divider"
                />
                <div>
                  <p className="formProjectBasicInformation__content__left__preview__info__description__value">
                    {formatTimeframeValue({ timeframe, timeframeUnit, texts })}
                  </p>
                  <h5 className="formProjectBasicInformation__content__left__preview__info__description__title">
                    {texts?.general?.time || 'Time'}
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
                    {texts?.header?.budget || 'Budget'}
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
                    {texts?.header?.beneficiary || 'Beneficiary name'}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider type="vertical" className="formProjectBasicInformation__content__divider" />
        <Form className="formProjectBasicInformation__content__right">
          <CoaFormItemInput
            withErrorFeedback
            name="projectName"
            form={form}
            formItemProps={{
              label: texts?.createProject?.projectName || 'Project Name',
              className: 'formProjectBasicInformation__content__right__item'
            }}
            fieldDecoratorOptions={{
              rules: [
                {
                  required: true,
                  message: ERROR_TYPES.EMPTY,
                  whitespace: true
                }
              ],
              initialValue: projectName,
              validateTrigger: 'onSubmit'
            }}
            errorsToShow={[]}
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
              label: texts?.header?.impact || 'Country of Impact',
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
              placeholder:
                texts?.createProject?.selectCountryRegion || 'Select the country or region',
              loading: countriesAvailable?.loading,
              onChange: value =>
                setCurrentBasicInformation({
                  ...currentBasicInformation,
                  location: value
                }),
              showSearch: true
            }}
            options={countriesAvailable?.content?.map(country => ({
              label: country?.name,
              value: country?.name
            }))}
          />
          <div className="formProjectBasicInformation__content__right__timeframeContainer">
            <CoaFormItemInputNumber
              form={form}
              formItemProps={{
                className: 'formProjectBasicInformation__content__right__item',
                label: texts?.header?.timeframe || 'Timeframe'
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
                placeholder: texts?.general?.type || 'Type',
                onChange: value =>
                  setCurrentBasicInformation({
                    ...currentBasicInformation,
                    timeframeUnit: value
                  })
              }}
              options={TIMEFRAME_UNITS.map(item => ({
                label: texts?.general?.[item.value] || item.label,
                value: item.value
              }))}
            />
          </div>

          <CoaFormItemUpload
            buttonContent={
              <div className="formProjectBasicInformation__content__right__uploadItemContainer__buttonContent">
                <Icon type="upload" />
                {texts?.general?.uploadClick || 'Click to upload'}
              </div>
            }
            contentContainerClassName="formProjectBasicInformation__content__right__uploadItemContainer"
            form={form}
            formItemProps={{
              label: texts?.createProject?.thumbnailImage || 'Thumbnail Image',
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
              <ul className="formProjectBasicInformation__content__right__uploadItemContainer__note">
                <li>
                  {texts?.createProject?.recommendedDimension || 'Recommended image Dimensions'}:
                  1400x720px.{' '}
                </li>
                <li>
                  {texts?.general?.formats || 'Format'}: PNG {texts?.general?.or || 'or'} JPG.
                </li>
                <li>{texts?.general?.maxSize || 'Max size'}: 500kb.</li>
              </ul>
            }
          />
        </Form>
      </div>
      {Footer({
        onSubmit,
        errors: getErrorMessagesFields(getFieldsError(), [ERROR_TYPES.EMPTY])
      })}
    </>
  );
};

export const FormProjectBasicInformation = Form.create({
  name: 'FormProjectBasicInformation'
})(FormProjectBasicInformationContent);

FormProjectBasicInformationContent.defaultProps = {
  form: () => undefined,
  Footer: undefined
};

FormProjectBasicInformationContent.propTypes = {
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
  Footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
