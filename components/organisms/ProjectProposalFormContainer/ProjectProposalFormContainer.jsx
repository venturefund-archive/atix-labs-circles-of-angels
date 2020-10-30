/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import FooterButtons from '../FooterButtons/FooterButtons';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { proposalFromItems } from '../../../helpers/createProjectFormFields';
import './_style.scss';
import ProjectProposalForm from '../../molecules/ProjectProposalForm/ProjectProposalForm';
import { updateProjectProposal } from '../../../api/projectApi';

const formSteps = [
  {
    fields: Object.keys(proposalFromItems)
  }
];

const formFields = {
  ...proposalFromItems
};

// TODO: load project proposal saved as draft
const ProjectProposalFormContainer = ({
  goBack,
  project,
  onError,
  onSuccess
}) => {
  const [
    fields,
    setFields,
    ,
    ,
    currentStep,
    ,
    handleChange,
    getNextStepButton,
    getPrevStepButton,
    validateFields
  ] = useMultiStepForm(
    formFields,
    formSteps,
    0,
    values => onSubmit(values),
    true,
    goBack
  );

  useEffect(() => {
    if (!project || !project.id) return goBack();
    clearFields();
    const projectFields = { ...fields };
    const { proposal } = project;

    if (!proposal) {
      setFields({ ...projectFields });
    } else {
      projectFields.proposal.value = proposal;
      setFields({ ...projectFields });
      validateFields();
    }
  }, [setFields, project, goBack]);

  const onSubmit = async values => {
    if (!values.proposal) return;
    try {
      if (project && project.id) {
        const response = await updateProjectProposal(project.id, {
          proposal: values.proposal.value
        });
        clearFields();
        if (response.errors) {
          return onError();
        }
        onSuccess(response.data);
        goBack();
      }
    } catch (error) {
      message.error('An error occurred when trying to save the information');
    }
  };

  const clearFields = () => {
    Object.keys(fields).forEach(fieldName => {
      fields[fieldName].value = '';
    });
  };

  return (
    <Fragment>
      <div className="ProposalWrapper">
        <TitlePage textTitle="Complete Project's Proposal" />
        <ProjectProposalForm fields={fields} handleChange={handleChange} />
        <FooterButtons
          nextStepButton={getNextStepButton(currentStep)}
          prevStepButton={getPrevStepButton(currentStep)}
        />
      </div>
    </Fragment>
  );
};

ProjectProposalFormContainer.defaultProps = {
  project: undefined
};

ProjectProposalFormContainer.propTypes = {
  goBack: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    proposal: PropTypes.string
  }),
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ProjectProposalFormContainer;
