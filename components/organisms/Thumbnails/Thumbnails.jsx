/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import { Tag, Row, Col, Divider, Form, Upload, message } from 'antd';
import PropTypes from 'prop-types';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import FooterButtons from '../FooterButtons/FooterButtons';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import Field from '../../atoms/Field/Field';
import { thumbnailsFormInputs } from '../../../helpers/createProjectFormFields';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import { getPreviewValue } from '../../../helpers/formatter';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const formSteps = [
  {
    fields: Object.keys(thumbnailsFormInputs)
  }
];

const formFields = {
  ...thumbnailsFormInputs
};

const Thumbnails = ({ setCurrentWizard, submitForm, updateFormValues }) => {
  const showMainPage = values => {
    updateFormValues(values, PROJECT_FORM_NAMES.THUMBNAILS);
    setCurrentWizard(PROJECT_FORM_NAMES.MAIN);
  };

  const [
    fields,
    ,
    ,
    ,
    currentStep,
    handleChange,
    getNextStepButton,
    getPrevStepButton
  ] = useMultiStepForm(
    formFields,
    formSteps,
    0,
    values => submitForm(PROJECT_FORM_NAMES.THUMBNAILS, values),
    true,
    showMainPage
  );

  return (
    <Fragment>
      <TitlePage textTitle="Complete Project´s Thumbnail" />
      <Row type="flex" justify="space-around" align="middle">
        <Col className="CardExample" sm={8} md={8} lg={8}>
          <h3>This is the preview!</h3>
          <Col className="BlockImage" sm={24} md={24} lg={24}>
            <img src="./static/images/thumbnail-example.png" alt="thumbnail" />
          </Col>
          <Col className="spacedivider" sm={24} md={24} lg={24}>
            <Col sm={24} md={24} lg={16}>
              <h1>{getPreviewValue(fields.projectName.value)}</h1>
            </Col>
            <Col sm={24} md={24} lg={8}>
              <Tag color="orange">Pending for approval</Tag>
            </Col>
          </Col>
          <Col className="flex" sm={24} md={24} lg={24}>
            <InfoItem
              subtitle="Country of Impact"
              title={getPreviewValue(fields.countryOfImpact.value)}
              iconInfoItem="dollar"
            />
            <Divider type="vertical" />
            <InfoItem
              subtitle="Timeframe"
              title={getPreviewValue(fields.timeframe.value)}
              iconInfoItem="dollar"
            />
            <Divider type="vertical" />
            <InfoItem
              subtitle="Goal Amount"
              title={`$ ${getPreviewValue(fields.goalAmount.value)}`}
              iconInfoItem="dollar"
            />
          </Col>
        </Col>
        <Divider type="vertical" />
        <Col sm={24} md={24} lg={12}>
          <Row gutter={22}>
            <Form className="login-form">
              <Col sm={24} md={24} lg={24}>
                <Field {...fields.projectName} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Field
                  {...fields.countryOfImpact}
                  handleChange={handleChange}
                />
              </Col>
              <Col sm={24} md={24} lg={12}>
                <Field {...fields.timeframe} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={12}>
                <Field {...fields.goalAmount} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Col sm={24} md={24} lg={18}>
                  <h3>Thumbnail Image</h3>
                  <span>
                    Recomended Image Size: 1400x400px. Format: PNG or JPG.
                  </span>
                </Col>
                <Col sm={24} md={24} lg={6}>
                  {/* TODO add this to multistepfrom hook */}
                  <Upload {...props}>
                    <CustomButton
                      buttonText="Click to upload"
                      theme="Alternative"
                    />
                  </Upload>
                </Col>
              </Col>
            </Form>
          </Row>
        </Col>
      </Row>
      <FooterButtons
        nextStepButton={getNextStepButton(currentStep)}
        prevStepButton={getPrevStepButton(currentStep)}
      />
    </Fragment>
  );
};

Thumbnails.propTypes = {
  setCurrentWizard: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  updateFormValues: PropTypes.func.isRequired
};

export default Thumbnails;
