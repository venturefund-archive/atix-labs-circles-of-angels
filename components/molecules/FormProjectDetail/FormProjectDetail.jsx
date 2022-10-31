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
import { Button, Form, Input, Row, Col, Upload, Icon, Select } from 'antd';
import { onlyAlphanumerics } from 'constants/Regex';
import { CURRENCIES } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { updateProjectDetail } from 'api/projectApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import Styles from './form-project-detail.module.scss';

const { Option } = Select;

const FormProjectDetailContent = ({
  form,
  onSuccess,
  goBack,
  project,
  onError
}) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const [currentCurrencyType, setCurrentCurrencyType] = useState();

  const {
    problemAddressed,
    mission,
    currencyType,
    currency,
    additionalCurrencyInformation,
    legalAgreementFile,
    projectProposalFile
  } = project?.details;

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

        if (_projectProposalFile)
          valuesProcessed.projectProposalFile = _projectProposalFile.file;
        if (_legalAgreementFile)
          valuesProcessed.legalAgreementFile = _legalAgreementFile.file;

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

  const validFileSize = (_rule, value, callback) => {
    if (value?.file.size / 1000000 > 20)
      return callback(
        '* The file is invalid. Review the recommendations and try again'
      );
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
            validator: validFileSize
          }
        ]
      : [
          {
            required: true,
            message: 'Please upload a valid agreement file!'
          },
          {
            validator: validFileSize
          }
        ];

  return (
    <>
      <TitlePage textTitle="Complete Project's Details" />
      <Form onSubmit={submit}>
        <Row gutter={22}>
          <Col span={12}>
            <Form.Item label="About the project">
              <p>
                Share your information about the entrepreneurs and the project
              </p>
              {getFieldDecorator('problemAddressed', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the about of this project!',
                    whitespace: true
                  },
                  {
                    pattern: onlyAlphanumerics,
                    message:
                      'Please input an alphanumeric value for this field.'
                  }
                ],
                initialValue: problemAddressed
              })(<Input.TextArea placeholder="" maxLength={500} />)}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Our mission and vision">
              <p>
                Share your Project Mission, the impact you have made so far and
                what your project is about
              </p>
              {getFieldDecorator('mission', {
                rules: [
                  {
                    required: true,
                    message:
                      'Please input the account information of this project!',
                    whitespace: true
                  },
                  {
                    pattern: onlyAlphanumerics,
                    message:
                      'Please input an alphanumeric value for this field.'
                  }
                ],
                initialValue: mission
              })(<Input.TextArea placeholder="" maxLength={500} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={22}>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row gutter={22}>
          <Col span={12}>
            {currentCurrencyType === 'fiat' && (
              <Form.Item label="Account Information">
                <p>Fill in your bank account information</p>
                {getFieldDecorator('additionalCurrencyInformation', {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input the account information of this project!',
                      whitespace: true
                    },
                    {
                      pattern: onlyAlphanumerics,
                      message:
                        'Please input an alphanumeric value for this field.'
                    }
                  ],
                  initialValue: additionalCurrencyInformation
                })(<Input.TextArea placeholder="" maxLength={50} />)}
              </Form.Item>
            )}
            {currentCurrencyType === 'crypto' && (
              <Form.Item label="Address">
                <p>Enter your wallet address here</p>
                {getFieldDecorator('additionalCurrencyInformation', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your new password!',
                      whitespace: true
                    },
                    {
                      pattern: onlyAlphanumerics,
                      message:
                        'Please input an alphanumeric value for this field.'
                    }
                  ],
                  initialValue: additionalCurrencyInformation
                })(<Input placeholder="New Password" maxLength={50} />)}
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="Budget">
              <p>
                Here the sum recorded in the milestones and activities will be
                displayed
              </p>
              <Input placeholder="0.00" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={22}>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Form.Item label="">
                  {getFieldDecorator('legalAgreementFile', {
                    rules: filesRules(legalAgreementFile)
                  })(
                    <Upload {...uploadProps}>
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <h3>Legal Agreement</h3>
                <span>
                  Recommended document files. Format: PDF, up to 20 MB.
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Form.Item label="">
                  {getFieldDecorator('projectProposalFile', {
                    rules: filesRules(projectProposalFile)
                  })(
                    <Upload {...uploadProps}>
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <h3>Project Proposal</h3>
                <span>
                  Recommended document files. Format: PDF, up to 20 MB.
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <FooterButtons
        prevStepButton={(() => (
          <Button onClick={goBack}>Back</Button>
        ))()}
        nextStepButton={(() => (
          <Button
            type="primary"
            onClick={submit}
            className={Styles.form__footer}
          >
            Save and continue
          </Button>
        ))()}
      />
    </>
  );
};

export const FormProjectDetail = Form.create({ name: 'FormProjectDetail' })(
  FormProjectDetailContent
);

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
  onError: PropTypes.func.isRequired
};
