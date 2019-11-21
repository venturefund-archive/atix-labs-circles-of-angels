/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FooterButtons from '../FooterButtons/FooterButtons';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { proposalFromItems } from '../../../helpers/createProjectFormFields';
import Field from '../../atoms/Field/Field';

const formSteps = [
  {
    fields: Object.keys(proposalFromItems)
  }
];

const formFields = {
  ...proposalFromItems
};

const ProjectProposalFormContainer = ({ setCurrentWizard, submitForm }) => {
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
      <TitlePage textTitle="Complete Project´s Details" />
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={24} lg={24}>
          <p>Complete Project Proposal lorem ipsum dolor</p>
        </Col>
        <Col className="HtmlEditor" sm={24} md={24} lg={24}>
          <Field {...fields.proposal} handleChange={handleChange} />
        </Col>
      </Row>
      <FooterButtons
        nextStepButton={getNextStepButton(currentStep)}
        prevStepButton={getPrevStepButton(currentStep)}
      />
    </Fragment>
  );
};
export default ProjectProposalFormContainer;
