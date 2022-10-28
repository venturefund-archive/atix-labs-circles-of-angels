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
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Upload,
  Icon,
  Select
} from 'antd';
import './_style.scss';
import { onlyAlphanumerics } from 'constants/Regex';
import { CURRENCIES } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import LogoWrapper from '../../atoms/LogoWrapper';
import { updateProjectDetail } from '../../../api/projectApi';

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
  const [currentCurrencies, setCurrentCurrencies] = useState([]);

  useEffect(() => {
    setCurrentCurrencyType(project?.details?.currencyType);
    setFieldsValue({
      ...project?.details,
      projectProposalFile: [{ url: project?.proposalFilePath }]
    });
  }, [project]);

  const submit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const valuesProcessed = {
          ...values,
          projectProposalFile: values.projectProposalFile.file,
          legalAgreementFile: values.legalAgreementFile.file
        };

        const formData = new FormData();

        Object.keys(valuesProcessed).forEach(key => {
          formData.append(key, valuesProcessed[key]);
        });

        const response = await updateProjectDetail(project.id, formData);

        if (response.errors) {
          return onError(response.errors);
        }

        onSuccess(response.data);
        goBack();
      }
    });
  };

  const validAlphanumericField = (_rule, value, callback) => {
    const alphanumericRegex = new RegExp(onlyAlphanumerics);
    if (value && !alphanumericRegex.test(value)) {
      callback('Please input an alphanumeric value for this field.');
    } else {
      callback();
    }
  };

  const handleChangeCurrencyType = value => {
    setCurrentCurrencyType(value);
    const lowerCasedValue = value.toLowerCase();
    setCurrentCurrencies(CURRENCIES[lowerCasedValue]);
  };

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    accept: '.pdf'
  };

  return (
    <>
      <TitlePage textTitle="Complete Project´s Details" />
      <Form className="recovery-form changepassword-form" onSubmit={submit}>
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
                    validator: validAlphanumericField
                  }
                ]
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
                    validator: validAlphanumericField
                  }
                ]
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
                ]
              })(
                <Select
                  placeholder="Select currency type"
                  onChange={handleChangeCurrencyType}
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
                ]
              })(
                <Select placeholder="Select currency">
                  {currentCurrencies.map(({ label, value }) => (
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
            {currentCurrencyType?.toLowerCase() === 'fiat' && (
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
                      validator: validAlphanumericField
                    }
                  ]
                })(<Input.TextArea placeholder="" maxLength={50} />)}
              </Form.Item>
            )}
            {currentCurrencyType?.toLowerCase() === 'crypto' && (
              <Form.Item label="Address">
                <p>Enter your wallet address here</p>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your new password!',
                      whitespace: true
                    },
                    {
                      validator: validAlphanumericField
                    }
                  ]
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
                    rules: [
                      {
                        required: true,
                        message: 'Please upload a valid agreement file!'
                      }
                    ]
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
                  Recomended document files. Format: PDF, up to 20 MB.
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Form.Item label="">
                  {getFieldDecorator('projectProposalFile', {
                    rules: [
                      {
                        required: true,
                        message: 'Please upload a valid proposal file!'
                      }
                    ]
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
                  Recomended document files. Format: PDF, up to 20 MB.
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Button className="ant-btn ant-btn-primary" onClick={goBack}>
        Back
      </Button>
      <Button className="ant-btn ant-btn-primary" onClick={submit}>
        Save and continue
      </Button>
    </>
  );
};

export const FormProjectDetail = Form.create({ name: 'FormProjectDetail' })(
  FormProjectDetailContent
);

FormProjectDetailContent.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
};
