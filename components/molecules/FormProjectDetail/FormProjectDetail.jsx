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
import { Form, Icon, Input } from 'antd';
import {
  ETC_WALLET_ADDRESS,
  ETH_WALLET_ADDRESS,
  RBTC_WALLET_ADDRESS,
  USDT_WALLET_ADDRESS
} from 'constants/Regex';
import { CURRENCIES, ERROR_TYPES, MB_FACTOR_CONVERTER } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { updateProjectDetail } from 'api/projectApi';
import { toBase64 } from 'components/utils/FileUtils';
import _ from 'lodash';
import { getErrorMessagesFields, getExtensionFromUrl } from 'helpers/utils';
import './form-project-detail.module.scss';
import { formatCurrency } from 'helpers/formatter';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaFormItemTextArea } from '../CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormItemSelect } from '../CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { CoaFormItemUpload } from '../CoaFormItems/CoaFormItemUpload/CoaFormItemUpload';
import { CoaFormItemInput } from '../CoaFormItems/CoaFormItemInput/CoaFormItemInput';

const FormProjectDetailContent = ({ form, project, Footer, isACloneBeingEdited }) => {
  const { texts } = useContext(DictionaryContext);
  const { setFieldsValue, getFieldsError, getFieldValue } = form;
  const [currentCurrencyType, setCurrentCurrencyType] = useState();
  const [currentFiles, setCurrentFiles] = useState();
  const { budget } = project;

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

  const currentCurrency = getFieldValue('currency');

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

  const validateWalletAddress = (_rule, value, callback) => {
    const _currentCurrency = currentCurrency?.toLowerCase();
    if (_currentCurrency === 'rbtc' && !RBTC_WALLET_ADDRESS.exec(value))
      return callback(ERROR_TYPES.INVALID_WALLET_ADDRESS);
    if (_currentCurrency === 'eth' && !ETH_WALLET_ADDRESS.exec(value))
      return callback(ERROR_TYPES.INVALID_WALLET_ADDRESS);
    if (_currentCurrency === 'usdt' && !USDT_WALLET_ADDRESS.exec(value))
      return callback(ERROR_TYPES.INVALID_WALLET_ADDRESS);
    if (_currentCurrency === 'etc' && !ETC_WALLET_ADDRESS.exec(value))
      return callback(ERROR_TYPES.INVALID_WALLET_ADDRESS);

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
                label: texts?.createProject?.aboutTheProject || 'About the project'
              }}
              Note={
                <p className="formProjectDetail__content__form__row__note">
                  {texts?.createProject?.shareInfo || 'Share your information about the entrepreneurs and the project'}
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
                maxLength: 500,
                showCount: true,
                autosize: {
                  minRows: 8
                }
              }}
            />
            <CoaFormItemTextArea
              form={form}
              errorsToShow={[]}
              name="mission"
              formItemProps={{
                label: texts?.createProject?.missionVision || 'Our mission and vision'
              }}
              Note={
                <p className="formProjectDetail__content__form__row__note">
                  {texts?.createProject?.shareProjectMission || 'Share your Project Mission, the impact you have made so far and what your project is about'}
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
                maxLength: 500,
                showCount: true,
                autosize: {
                  minRows: 8
                }
              }}
            />
          </div>
          <div className="formProjectDetail__content__form__row">
            <CoaFormItemSelect
              form={form}
              errorsToShow={[]}
              name="currencyType"
              formItemProps={{ label: texts?.createProject?.currencyType || 'Currency Type' }}
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
                placeholder: texts?.createProject?.selectCurrencyType || 'Select currency type',
                onChange: value => {
                  setCurrentCurrencyType(value?.toLowerCase());
                  if (value !== currentCurrencyType)
                    setFieldsValue({
                      currency: null,
                      additionalCurrencyInformation: ''
                    });
                },
                disabled: isACloneBeingEdited
              }}
              options={[{ label: 'FIAT', value: 'Fiat' }, { label: 'CRYPTO', value: 'Crypto' }]}
            />
            <CoaFormItemSelect
              form={form}
              errorsToShow={[]}
              name="currency"
              formItemProps={{ label: texts?.general?.currency ||'Currency' }}
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
                placeholder: texts?.createProject?.selectCurrency || 'Select currency',
                disabled: isACloneBeingEdited
              }}
              options={CURRENCIES[currentCurrencyType]}
            />
          </div>
          <div className="formProjectDetail__content__form__row">
            <div>
              {!currentCurrencyType && (
                <>
                  <p className="formProjectDetail__content__form__row__label">
                    {texts?.createProject?.accountInfo || 'Account Information'}
                  </p>
                  <p className="formProjectDetail__content__form__row__note">
                    {texts?.createProject?.firstSelect || 'First you must select the type of currency to complete this option'}
                  </p>
                </>
              )}
              {currentCurrencyType === 'fiat' && (
                <CoaFormItemTextArea
                  form={form}
                  errorsToShow={[]}
                  name="additionalCurrencyInformation"
                  formItemProps={{
                    label: texts?.createProject?.accountInfo || 'Account Information'
                  }}
                  Note={
                    <p className="formProjectDetail__content__form__row__note">
                      {texts?.createProject?.fillAccountInfo || 'Fill in your bank account information'}
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
                    initialValue: additionalCurrencyInformation
                  }}
                  inputTextAreaProps={{
                    placeholder: '',
                    maxLength: 50,
                    disabled: isACloneBeingEdited
                  }}
                />
              )}
              {currentCurrencyType === 'crypto' && (
                <CoaFormItemInput
                  form={form}
                  errorsToShow={[ERROR_TYPES.INVALID_WALLET_ADDRESS]}
                  name="additionalCurrencyInformation"
                  formItemProps={{
                    label: texts?.general?.address || 'Address'
                  }}
                  Note={
                    <p className="formProjectDetail__content__form__row__note">
                      {texts?.createProject?.enterWallet || 'Enter your wallet address here'}
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
                        validator: validateWalletAddress
                      }
                    ],
                    initialValue: additionalCurrencyInformation,
                    validateTrigger: 'onSubmit'
                  }}
                  inputTextAreaProps={{
                    placeholder: texts?.general?.address || 'Address',
                    maxLength: 50,
                    disabled: isACloneBeingEdited
                  }}
                />
              )}
            </div>
            <Form.Item label="Budget">
              <p className="formProjectDetail__content__form__row__note">
                {texts?.createProject?.sumRecorded || 'Here the sum recorded in the milestones and activities will be display'}ed
              </p>
              <Input placeholder="0.00" disabled value={formatCurrency(currency, budget)} />
            </Form.Item>
          </div>
          <div className="formProjectDetail__content__form__row">
            <CoaFormItemUpload
              buttonContent={
                <div className="formProjectDetail__content__form__row__uploadContainer__buttonContent">
                  <Icon type="upload" />
                  {texts?.createProject?.uploadLegalAgreement || 'Upload Legal Agreement'}
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
              Note={<span>{texts?.createProject?.recommendedFiles || 'Recommended document files'}. {texts?.general?.format || 'Format'}: PDF, {texts?.general?.upTo || 'up to'} 20 MB.</span>}
            />

            <CoaFormItemUpload
              buttonContent={
                <div className="formProjectDetail__content__form__row__uploadContainer__buttonContent">
                  <Icon type="upload" />
                  {texts?.createProject?.uploadProposal || 'Upload Project Proposal'}
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
              Note={<span>{texts?.createProject?.recommendedFiles || 'Recommended document files'}. {texts?.general?.format || 'Format'}: PDF, {texts?.general?.upTo || 'up to'} 20 MB.</span>}
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
