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
import { Form, Icon, Input, Select } from 'antd';
import { onlyAlphanumerics } from 'constants/Regex';
import { CURRENCIES } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { updateProjectDetail } from 'api/projectApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { toBase64 } from 'components/utils/FileUtils';
import { CustomUpload } from 'components/atoms/CustomUpload/CustomUpload';
import _ from 'lodash';
import { getExtensionFromUrl } from 'helpers/utils';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import Styles from './form-project-detail.module.scss';

const { Option } = Select;

const FormProjectDetailContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldDecorator, setFieldsValue, getFieldError } = form;
  const [currentCurrencyType, setCurrentCurrencyType] = useState();
  const [currentFiles, setCurrentFiles] = useState();

  const legalAgreementError = getFieldError('legalAgreementFile');
  const projectProposalError = getFieldError('projectProposalFile');

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

  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
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

        updateProjectProcess(project.id, formData);
      }
    });
  };

  const updateProjectProcess = async (projectId, formData) => {
    const response = await updateProjectDetail(projectId, formData);

    if (response.errors) {
      return onError(response.errors);
    }

    onSuccess(response.data);
    goBack();
  };

  const validateFileSize = (_rule, value, callback) => {
    if (value?.file.size === 'removed') return callback();
    if (value?.file.size / 1000000 > 20)
      return callback('* The file is invalid. Review the recommendations and try again');
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
            message: 'Please upload a valid agreement file!'
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
        <Form onSubmit={submit} className="formProjectDetail__content__form">
          <div className="formProjectDetail__content__form__row">
            <Form.Item label="About the project">
              <p className="formProjectDetail__content__form__row__note">
                Share your information about the entrepreneurs and the project
              </p>
              {getFieldDecorator('problemAddressed', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the about of this project!',
                    whitespace: true
                  }
                ],
                initialValue: problemAddressed
              })(<Input.TextArea placeholder="" maxLength={500} />)}
            </Form.Item>
            <Form.Item label="Our mission and vision">
              <p className="formProjectDetail__content__form__row__note">
                Share your Project Mission, the impact you have made so far and what your project is
                about
              </p>
              {getFieldDecorator('mission', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the account information of this project!',
                    whitespace: true
                  }
                ],
                initialValue: mission
              })(<Input.TextArea placeholder="" maxLength={500} />)}
            </Form.Item>
          </div>
          <div className="formProjectDetail__content__form__row">
            <Form.Item label="Currency Type">
              {getFieldDecorator('currencyType', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a currency type',
                    whitespace: true
                  }
                ],
                initialValue: currencyType
              })(
                <Select
                  placeholder="Select currency type"
                  onChange={value => {
                    setCurrentCurrencyType(value?.toLowerCase());
                    if (value !== currentCurrencyType)
                      setFieldsValue({
                        currency: null,
                        additionalCurrencyInformation: ''
                      });
                  }}
                >
                  <Option value="Fiat">FIAT</Option>
                  <Option value="Crypto">CRYPTO</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Currency">
              {getFieldDecorator('currency', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a currency',
                    whitespace: true
                  }
                ],
                initialValue: currency
              })(
                <Select placeholder="Select currency">
                  {CURRENCIES[currentCurrencyType]?.map(({ label, value }) => (
                    <Option value={value} key={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
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
                <Form.Item label="Account Information">
                  <p className="formProjectDetail__content__form__row__note">
                    Fill in your bank account information
                  </p>
                  {getFieldDecorator('additionalCurrencyInformation', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input the account information of this project!',
                        whitespace: true
                      },
                      {
                        pattern: onlyAlphanumerics,
                        message: 'Please input an alphanumeric value for this field.'
                      }
                    ],
                    initialValue: additionalCurrencyInformation
                  })(<Input.TextArea placeholder="" maxLength={50} />)}
                </Form.Item>
              )}
              {currentCurrencyType === 'crypto' && (
                <Form.Item label="Address">
                  <p className="formProjectDetail__content__form__row__note">
                    Enter your wallet address here
                  </p>
                  {getFieldDecorator('additionalCurrencyInformation', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your new password!',
                        whitespace: true
                      },
                      {
                        pattern: onlyAlphanumerics,
                        message: 'Please input an alphanumeric value for this field.'
                      }
                    ],
                    initialValue: additionalCurrencyInformation
                  })(<Input placeholder="New Password" maxLength={50} />)}
                </Form.Item>
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
            <div className="formProjectDetail__content__form__row__uploadContainer">
              <Form.Item label="">
                {getFieldDecorator('legalAgreementFile', {
                  rules: filesRules(legalAgreementFile)
                })(
                  <CustomUpload
                    uploadProps={uploadProps}
                    onChange={value => handleFileChange(value, 'legalAgreementFile')}
                    onRemove={() => handleFileRemove('legalAgreementFile')}
                    currentError={legalAgreementError}
                    setFieldValue={value => {
                      setFieldsValue({ thumbnailPhoto: value });
                    }}
                    initial={
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
                  >
                    <Icon type="upload" /> Upload Project Agreement
                  </CustomUpload>
                )}
              </Form.Item>
              <span>Recommended document files. Format: PDF, up to 20 MB.</span>
            </div>
            <div className="formProjectDetail__content__form__row__uploadContainer">
              <Form.Item label="">
                {getFieldDecorator('projectProposalFile', {
                  rules: filesRules(projectProposalFile),
                  validateTrigger: 'onSubmit'
                })(
                  <CustomUpload
                    uploadProps={uploadProps}
                    onChange={value => handleFileChange(value, 'projectProposalFile')}
                    onRemove={() => handleFileRemove('projectProposalFile')}
                    currentError={projectProposalError}
                    setFieldValue={value => {
                      setFieldsValue({ thumbnailPhoto: value });
                    }}
                    initial={
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
                  >
                    <Icon type="upload" /> Upload Project Proposal
                  </CustomUpload>
                )}
              </Form.Item>
              <span>Recommended document files. Format: PDF, up to 20 MB.</span>
            </div>
          </div>
        </Form>
      </div>
      <FooterButtons
        prevStepButton={(() => (
          <CoaButton onClick={goBack} type="secondary">
            <Icon type="arrow-left" /> Back
          </CoaButton>
        ))()}
        nextStepButton={(() => (
          <CoaButton type="primary" onClick={submit} className={Styles.form__footer}>
            Save and continue
          </CoaButton>
        ))()}
      />
    </>
  );
};

export const FormProjectDetail = Form.create({ name: 'FormProjectDetail' })(
  FormProjectDetailContent
);

FormProjectDetailContent.defaultProps = {
  form: () => undefined
};

FormProjectDetailContent.propTypes = {
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
  onError: PropTypes.func.isRequired,
  form: PropTypes.func
};
