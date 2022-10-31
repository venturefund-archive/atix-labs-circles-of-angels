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
import { Button, Form, Input, Row, Col, Upload, Icon, Select, Divider } from 'antd';
import { onlyAlphanumerics } from 'constants/Regex';
import { TIMEFRAME_UNITS } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { getCountries } from 'api/countriesApi';
import FooterButtons from 'components/organisms/FooterButtons/FooterButtons';
import { putBasicInformation } from 'api/projectApi';
import Styles from './form-project-basic-information.module.scss';

const { Option } = Select;

const FormProjectBasicInformationContent = ({ form, onSuccess, goBack, project, onError }) => {
  const { getFieldDecorator } = form;
  const [countriesAvailable, setCountriesAvailable] = useState({});
  const [currentBasicInformation, setCurrentBasicInformation] = useState({});
  const {
    projectName = 'Project Name',
    timeframe = 'Time',
    timeframeUnit = 'unit',
    thumbnailPhoto = '/static/images/thumbnail-default.svg',
    country
  } = currentBasicInformation;

  const { problemAddressed } = project?.details;

  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const valuesProcessed = { ...values, thumbnailPhoto: values.thumbnailPhoto?.file };
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

  const getAndSetCountriesAvailable = async () => {
    setCountriesAvailable({ ...countriesAvailable, loading: true });
    const _countries = await getCountries();
    setCountriesAvailable({
      content: _countries,
      loading: false
    });
  };

  useEffect(() => {
    getAndSetCountriesAvailable();
  }, []);

  return (
    <>
      <TitlePage textTitle="Complete Basic Information" />
      <Form onSubmit={submit}>
        <Row>
          <Col span={12}>
            <h3>This is the resume</h3>
            <img width="700" src={thumbnailPhoto} alt="thumbnail" />
            <p>{projectName || 'Project Name'}</p>
            <Row>
              <Col span={6}>
                <p>Country</p>
                <p>{country || 'Country of impact'}</p>
              </Col>
              <Col span={6}>
                <p>Time</p>
                <p>
                  {timeframe} {timeframeUnit}
                </p>
              </Col>
              <Col span={6}>
                <p>$ 0.00</p>
                <p>Budget</p>
              </Col>
              <Col span={6}>
                <p>Name</p>
                <p>Beneficiary Name</p>
              </Col>
            </Row>
          </Col>
          <Divider type="vertical" />
          <Col span={12}>
            <Form.Item label="Project Name">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the about of this project!',
                    whitespace: true
                  },
                  {
                    pattern: onlyAlphanumerics,
                    message: 'Please input an alphanumeric value for this field.'
                  }
                ]
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
            <Form.Item label="Country of Impact">
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a country',
                    whitespace: true
                  }
                ],
                initialValue: problemAddressed
              })(
                <Select
                  placeholder="Select the country or region"
                  loading={countriesAvailable?.loading}
                  onChange={value =>
                    setCurrentBasicInformation({
                      ...currentBasicInformation,
                      country: value
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
            <div>
              <Form.Item label="Timeframe">
                {getFieldDecorator('timeframe', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the about of this project!',
                      whitespace: true
                    },
                    {
                      pattern: onlyAlphanumerics,
                      message: 'Please input an alphanumeric value for this field.'
                    }
                  ],
                  initialValue: problemAddressed
                })(
                  <Input
                    placeholder="Input Text Example"
                    onChange={({ currentTarget: { value } }) =>
                      setCurrentBasicInformation({
                        ...currentBasicInformation,
                        timeframe: value
                      })
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label="">
                {getFieldDecorator('timeframeUnit', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the about of this project!',
                      whitespace: true
                    }
                  ],
                  initialValue: problemAddressed
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
              label="Thumbnail Image"
              help={
                <>
                  <h3>Recommended Image Size:</h3>
                  <span>1400x720px. Format: PNG or JPG.</span>
                </>
              }
            >
              {getFieldDecorator('thumbnailPhoto')(
                <Upload {...uploadProps}>
                  <Button>
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
          <Button type="primary" onClick={submit} className={Styles.form__footer}>
            Save and continue
          </Button>
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
