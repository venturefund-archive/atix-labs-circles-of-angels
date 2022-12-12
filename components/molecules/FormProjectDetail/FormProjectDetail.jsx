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
import { Form, Icon, Input } from 'antd';
import { onlyAlphanumerics } from 'constants/Regex';
import { CURRENCIES, ERROR_TYPES, MB_FACTOR_CONVERTER } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { updateProjectDetail } from 'api/projectApi';
import { toBase64 } from 'components/utils/FileUtils';
import _ from 'lodash';
import { getErrorMessagesFields, getExtensionFromUrl } from 'helpers/utils';
import './form-project-detail.module.scss';
import { CoaFormItemTextArea } from '../CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { CoaFormItemUpload } from '../CoaFormItems/CoaFormItemUpload/CoaFormItemUpload';

const FormProjectDetailContent = ({ form, project, Footer }) => {
  const { setFieldsValue, getFieldsError } = form;
  const [currentCurrencyType, setCurrentCurrencyType] = useState();
  const [currentFiles, setCurrentFiles] = useState();

  const {
    problemAddressed,
    mission,
    currencyType,
    currency,
    additionalCurrencyInformation,
    legalAgreementFile,
    projectProposalFile
  } = project?.details || {};

  const legalAgreementFileCompletePath =
    legalAgreementFile && `${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`;
  const projectProposalFileCompletePath =
    projectProposalFile && `${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`;

  useEffect(() => {
    if (currencyType) {
      setCurrentCurrencyType(currencyType.toLowerCase());
    }
  }, [currencyType]);

  const onSubmit = () =>
    new Promise((resolve, reject) => {
      form.validateFields(async (err, values) => {
        if (!err) {
          const {
            projectProposalFile: _projectProposalFile,
            legalAgreementFile: _legalAgreementFile,
            ...restValues
          } = values;
          const valuesProcessed = {
            ...restValues
          };

          if (_projectProposalFile) valuesProcessed.projectProposalFile = _projectProposalFile.file;
          if (_legalAgreementFile) valuesProcessed.legalAgreementFile = _legalAgreementFile.file;

          const formData = new FormData();

          Object.keys(valuesProcessed).forEach(key => {
            formData.append(key, valuesProcessed[key]);
          });

          const response = await updateProjectDetail(project?.id, formData);

          if (response.errors) {
            return reject(response.errors);
          }

          resolve();
        }
      });
    });

  const validateFileSize = (_rule, value, callback) => {
    if (value?.file.size === 'removed') return callback();
    if (value?.file.size / MB_FACTOR_CONVERTER > 20) return callback(ERROR_TYPES.INVALID_FILE);
    return callback();
  };

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    accept: '.pdf',
    multiple: false
  };

  const filesRules = initialValue =>
    initialValue
      ? [
          {
            validator: validateFileSize
          }
        ]
      : [
          {
            required: true,
            message: ERROR_TYPES.EMPTY_FILE
          },
          {
            validator: validateFileSize
          }
        ];

  const handleFileChange = async (value, field) => {
    if (value?.file?.status !== 'removed') {
      const b64Photo = await toBase64(value?.file);
      setCurrentFiles({ ...currentFiles, [field]: b64Photo });
    }
  };

  const handleFileRemove = field => {
    const { [field]: dynamicField, ...restCurrentFiles } = currentFiles;
    setCurrentFiles({ ...restCurrentFiles });
  };

  return (
    <>
      <div className="formProjectDetail__content">
        <TitlePage textTitle="Complete Project's Details" />
        <Form className="formProjectDetail__content__form">
          <div className="formProjectDetail__content__form__row">
            <CoaFormItemTextArea
              form={form}
              errorsToShow={[]}
              name="problemAddressed"
              formItemProps={{
                label: 'About the project',
                showCount: true
              }}
              Note={
                <p className="formProjectDetail__content__form__row__note">
                  Share your information about the entrepreneurs and the project
                </p>
              }
              fieldDecoratorOptions={{
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                initialValue: problemAddressed
              }}
              inputTextAreaProps={{
                placeholder: '',
                maxLength: 500
              }}
            />
            <CoaFormItemTextArea
              form={form}
              errorsToShow={[]}
              name="mission"
              formItemProps={{
                label: 'Our mission and vision',
                showCount: true
              }}
              Note={
                <p className="formProjectDetail__content__form__row__note">
                  Share your Project Mission, the impact you have made so far and what your project
                  is about
                </p>
              }
              fieldDecoratorOptions={{
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                initialValue: mission
              }}
              inputTextAreaProps={{
                placeholder: '',
                maxLength: 500
              }}
            />
          </div>
          <div className="formProjectDetail__content__form__row">
            <CoaFormItemSelect
              form={form}
              errorsToShow={[]}
              name="currencyType"
              formItemProps={{ label: 'Currency Type' }}
              fieldDecoratorOptions={{
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                initialValue: currencyType
              }}
              selectProps={{
                placeholder: 'Select currency type',
                onChange: value => {
                  setCurrentCurrencyType(value?.toLowerCase());
                  if (value !== currentCurrencyType)
                    setFieldsValue({
                      currency: null,
                      additionalCurrencyInformation: ''
                    });
                }
              }}
              options={[{ label: 'FIAT', value: 'Fiat' }, { label: 'CRYPTO', value: 'Crypto' }]}
            />
            <CoaFormItemSelect
              form={form}
              errorsToShow={[]}
              name="currency"
              formItemProps={{ label: 'Currency' }}
              fieldDecoratorOptions={{
                rules: [
                  {
                    required: true,
                    message: ERROR_TYPES.EMPTY,
                    whitespace: true
                  }
                ],
                initialValue: currency
              }}
              selectProps={{
                placeholder: 'Select currency'
              }}
              options={CURRENCIES[currentCurrencyType]}
            />
          </div>
          <div className="formProjectDetail__content__form__row">
            <div>
              {!currentCurrencyType && (
                <>
                  <p className="formProjectDetail__content__form__row__label">
                    Account Information
                  </p>
                  <p className="formProjectDetail__content__form__row__note">
                    First you must select the type of currency to complete this option
                  </p>
                </>
              )}
              {currentCurrencyType === 'fiat' && (
                <CoaFormItemTextArea
                  form={form}
                  errorsToShow={[]}
                  name="additionalCurrencyInformation"
                  formItemProps={{
                    label: 'Account Information'
                  }}
                  Note={
                    <p className="formProjectDetail__content__form__row__note">
                      Fill in your bank account information
                    </p>
                  }
                  fieldDecoratorOptions={{
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY,
                        whitespace: true
                      },
                      {
                        pattern: onlyAlphanumerics,
                        message: 'Please input an alphanumeric value for this field.'
                      }
                    ],
                    initialValue: additionalCurrencyInformation
                  }}
                  inputTextAreaProps={{
                    placeholder: '',
                    maxLength: 50
                  }}
                />
              )}
              {currentCurrencyType === 'crypto' && (
                <CoaFormItemTextArea
                  form={form}
                  errorsToShow={[]}
                  name="additionalCurrencyInformation"
                  formItemProps={{
                    label: 'Address'
                  }}
                  Note={
                    <p className="formProjectDetail__content__form__row__note">
                      Enter your wallet address here
                    </p>
                  }
                  fieldDecoratorOptions={{
                    rules: [
                      {
                        required: true,
                        message: ERROR_TYPES.EMPTY,
                        whitespace: true
                      },
                      {
                        pattern: onlyAlphanumerics,
                        message: 'Please input an alphanumeric value for this field.'
                      }
                    ],
                    initialValue: additionalCurrencyInformation
                  }}
                  inputTextAreaProps={{
                    placeholder: 'New Password',
                    maxLength: 50
                  }}
                />
              )}
            </div>
            <Form.Item label="Budget">
              <p className="formProjectDetail__content__form__row__note">
                Here the sum recorded in the milestones and activities will be displayed
              </p>
              <Input placeholder="0.00" disabled />
            </Form.Item>
          </div>
          <div className="formProjectDetail__content__form__row">
            <CoaFormItemUpload
              buttonContent={
                <div className="formProjectDetail__content__form__row__uploadContainer__buttonContent">
                  <Icon type="upload" />
                  Upload Legal Agreement
                </div>
              }
              contentContainerClassName="formProjectDetail__content__form__row__uploadContainer"
              form={form}
              name="legalAgreementFile"
              formItemProps={{
                label: ''
              }}
              errorsToShow={[ERROR_TYPES.EMPTY_FILE, ERROR_TYPES.INVALID_FILE]}
              fieldDecoratorOptions={{
                rules: filesRules(legalAgreementFile),
                validateTrigger: 'onSubmit'
              }}
              initialValue={
                legalAgreementFileCompletePath
                  ? [
                      {
                        uid: _.uniqueId(),
                        url: legalAgreementFileCompletePath,
                        name: `legal-agreement.${getExtensionFromUrl(
                          legalAgreementFileCompletePath
                        )}`
                      }
                    ]
                  : []
              }
              buttonType="primary"
              onChange={value => handleFileChange(value, 'legalAgreementFile')}
              onRemove={() => handleFileRemove('legalAgreementFile')}
              uploadProps={uploadProps}
              Note={<span>Recommended document files. Format: PDF, up to 20 MB.</span>}
            />

            <CoaFormItemUpload
              buttonContent={
                <div className="formProjectDetail__content__form__row__uploadContainer__buttonContent">
                  <Icon type="upload" />
                  Upload Project Proposal
                </div>
              }
              contentContainerClassName="formProjectDetail__content__form__row__uploadContainer"
              form={form}
              name="projectProposalFile"
              formItemProps={{
                label: ''
              }}
              errorsToShow={[ERROR_TYPES.EMPTY_FILE, ERROR_TYPES.INVALID_FILE]}
              fieldDecoratorOptions={{
                rules: filesRules(projectProposalFile),
                validateTrigger: 'onSubmit'
              }}
              initialValue={
                projectProposalFileCompletePath
                  ? [
                      {
                        uid: _.uniqueId(),
                        url: projectProposalFileCompletePath,
                        name: `project-proposal.${getExtensionFromUrl(
                          projectProposalFileCompletePath
                        )}`
                      }
                    ]
                  : []
              }
              buttonType="primary"
              onChange={value => handleFileChange(value, 'projectProposalFile')}
              onRemove={() => handleFileRemove('projectProposalFile')}
              uploadProps={uploadProps}
              Note={<span>Recommended document files. Format: PDF, up to 20 MB.</span>}
            />
          </div>
        </Form>
      </div>
      {Footer({ errors: getErrorMessagesFields(getFieldsError(), [ERROR_TYPES.EMPTY]), onSubmit })}
    </>
  );
};

export const FormProjectDetail = Form.create({ name: 'FormProjectDetail' })(
  FormProjectDetailContent
);

FormProjectDetailContent.defaultProps = {
  form: () => undefined,
  Footer: undefined
};

FormProjectDetailContent.propTypes = {
  project: PropTypes.shape({
    details: PropTypes.shape({
      problemAddressed: PropTypes.string,
      mission: PropTypes.string,
      currencyType: PropTypes.string,
      currency: PropTypes.string,
      additionalCurrencyInformation: PropTypes.string
    })
  }).isRequired,
  form: PropTypes.objectOf(PropTypes.any),
  Footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
