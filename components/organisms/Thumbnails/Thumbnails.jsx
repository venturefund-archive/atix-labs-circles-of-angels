/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useCallback, useEffect } from 'react';
import { Tag, Row, Col, Divider, Form, Upload, message } from 'antd';
import PropTypes from 'prop-types';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import FooterButtons from '../FooterButtons/FooterButtons';
import Field from '../../atoms/Field/Field';
import { thumbnailsFormInputs } from '../../../helpers/createProjectFormFields';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import { getPreviewValue } from '../../../helpers/formatter';
import useForm from '../../../hooks/useForm';
import api, { getBaseURL } from '../../../api/api';

const formFields = {
  ...thumbnailsFormInputs,
  cardPhoto: {
    name: 'coverPhoto',
    label: 'Click to upload',
    type: 'file',
    rules: [
      // TODO : define at least one rule
    ]
  }
};

const Thumbnails = ({ project, goBack, submitForm }) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(formFields);
  useEffect(() => {
    // console.log('project', project);
    // formFields.countryOfImpact.value = project.country;
    if (project === undefined || project.id === undefined) return;
    fields.projectName.value = project.projectName;
    fields.timeframe.value = project.timeframe;
    fields.goalAmount.value = project.goalAmount;
    fields.cardPhoto.value = project.cardPhotoPath;
    fields.countryOfImpact.value = 'Argentina';
    setFields({
      ...fields
    });
  }, []);

  const onSubmit = async data => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    if (project !== undefined && project.id !== undefined) {
      const url = '/projects/' + project.id + '/description';
      // eslint-disable-next-line no-param-reassign
      console.log(data);
      data.projectId = project.id;
      return (await api.put(url, data, config)).data;
    }
    const url = '/projects/description';
    return (await api.post(url, data, config)).data;
  };

  const getNextStepButton = () => (
    <CustomButton
      theme="Primary"
      buttonText="Save & Continue"
      onClick={async () => {
        await handleSubmit(onSubmit);
        goBack();
      }}
      // disabled={!isFormValid}
    />
  );

  const getPrevStepButton = () => {
    return (
      <CustomButton
        theme="Secondary"
        buttonText="Back"
        onClick={() => goBack()}
      />
    );
  };

  return (
    <Fragment>
      <TitlePage textTitle="Complete Project´s Thumbnail" />
      <Row type="flex" justify="space-around" align="middle">
        <Col className="CardExample" sm={8} md={8} lg={8}>
          <h3>This is the preview!</h3>
          <Col className="BlockImage" sm={24} md={24} lg={24}>
            <img
              width="700"
              height="400"
              // This is beyond ugly but I can live with it... FOW NOW
              src={
                fields.cardPhoto.value === undefined
                  ? './static/images/thumbnail-example.png'
                  : fields.cardPhoto.value.replace(
                      '/home/atix/files/server',
                      ''
                    )
              }
              alt="thumbnail"
            />
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
              title={fields.timeframe.placeholder}
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
                  <Field {...fields.cardPhoto} handleChange={handleChange} />
                </Col>
              </Col>
            </Form>
          </Row>
        </Col>
      </Row>
      <FooterButtons
        nextStepButton={getNextStepButton()}
        prevStepButton={getPrevStepButton()}
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
