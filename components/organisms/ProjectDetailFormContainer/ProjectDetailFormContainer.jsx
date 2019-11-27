/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import { Row, Col, Skeleton, Divider, Form, Upload, message } from 'antd';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import FooterButtons from '../FooterButtons/FooterButtons';
import Field from '../../atoms/Field/Field';
import { detailsFormInputs } from '../../../helpers/createProjectFormFields';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import { getPreviewValue } from '../../../helpers/formatter';
import './_style.scss';

const mockPropsUpload = {
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
    fields: Object.keys(detailsFormInputs)
  }
];

const formFields = {
  ...detailsFormInputs
};

const ProjectDetailFormContainer = ({
  setCurrentWizard,
  submitForm,
  thumbnailsData
}) => {
  const showMainPage = () => setCurrentWizard(PROJECT_FORM_NAMES.MAIN);

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
    values => submitForm(PROJECT_FORM_NAMES.DETAILS, values),
    true,
    showMainPage
  );

  return (
    <Fragment>
       <div className="DetailWrapper">
      <TitlePage textTitle="Complete Project´s Details" />
      <Row type="flex" justify="space-around" align="top" className="centered">
        <Col className="CardExample" sm={8} md={8} lg={8}>
          <Col className="BlockImage" sm={24} md={24} lg={24}>
            <h5>Organization Name</h5>
            <h1>{getPreviewValue(thumbnailsData.projectName.value)}</h1>
            <Col className="flex" sm={24} md={24} lg={24}>
              <InfoItem
                img={
                  <img
                    src="./static/images/world.svg"
                    alt="Circles of Angels"
                  />
                }
                subtitle="Country of Impact"
                title={getPreviewValue(thumbnailsData.countryOfImpact.value)}
                iconInfoItem="dollar"
              />
              <InfoItem
                img={
                  <img
                    src="./static/images/calendar.svg"
                    alt="Circles of Angels"
                  />
                }
                subtitle="Timeframe"
                title={getPreviewValue(thumbnailsData.timeframe.value)}
                iconInfoItem="dollar"
              />
              <InfoItem
                img={
                  <img
                    src="./static/images/amount.svg"
                    alt="Circles of Angels"
                  />
                }
                subtitle="Goal Amount"
                title={`$ ${getPreviewValue(thumbnailsData.goalAmount.value)}`}
                iconInfoItem="dollar"
              />
            </Col>
          </Col>
          <Col className="spacedivider Details" sm={24} md={24} lg={24}>
            <Col sm={24} md={24} lg={24}>
              <h4>Project Mission </h4>
            </Col>
            <Col className="Mission" sm={24} md={24} lg={24}>
              {fields.mission.value || <Skeleton title={false} />}
            </Col>
            <Col sm={24} md={24} lg={24}>
              <h4>The Problem </h4>
            </Col>
            <Col className="Problem" sm={24} md={24} lg={24}>
              {fields.problem.value || (
                <Skeleton paragraph={{ rows: 3 }} title={false} />
              )}
            </Col>
          </Col>
        </Col>
        <Divider type="vertical" />
        <Col sm={24} md={24} lg={12}>
          <Row gutter={22}>
            <Form className="login-form">
              <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                <Field {...fields.mission} handleChange={handleChange} />
              </Col>
              <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                <Field {...fields.problem} handleChange={handleChange} />
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Col sm={24} md={24} lg={18}>
                  <h3>Background Image</h3>
                  <span>
                    Recomended Image Size: 1400x400px. Format: PNG or JPG.
                  </span>
                </Col>
                <Col sm={24} md={24} lg={6}>
                  <Upload {...mockPropsUpload}>
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
      </div>
    </Fragment>
  );
};

ProjectDetailFormContainer.defaultProps = {
  thumbnailsData: {
    countryOfImpact: {},
    goalAmount: {},
    timeframe: {},
    projectName: {}
  }
};

export default ProjectDetailFormContainer;
