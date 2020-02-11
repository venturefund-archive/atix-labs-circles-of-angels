import React, { Fragment } from 'react';
import { Col, Breadcrumb, Row } from 'antd';
import PropTypes from 'prop-types';
import FooterButtons from '../FooterButtons/FooterButtons';
import ModalProjectCreated from '../ModalProjectCreated/ModalProjectCreated';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import {
  PROJECT_FORM_NAMES,
  projectStatuses
} from '../../../constants/constants';
import './_style.scss';

const ALLOW_DELETE_STATUSES = [projectStatuses.REJECTED, projectStatuses.NEW];

const Items = ({ title, subtitle, onClick, completed, disabled }) => (
  <Col className="Items flex" sm={24} md={24} lg={24}>
    <Col sm={1} md={1} lg={1}>
      <img
        src={
          completed
            ? './static/images/checked.svg'
            : './static/images/unchecked.svg'
        }
        alt="unchecked"
      />
    </Col>
    <Col className="vertical" sm={24} md={21} lg={21}>
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </Col>
    <Col className="BlockButton" sm={24} md={4} lg={2}>
      <CustomButton
        buttonText={completed ? 'Edit' : 'Upload'}
        theme={
          (disabled ? 'disabled' : 'Alternative',
          completed ? 'Primary' : 'Alternative')
        }
        onClick={onClick}
        disabled={disabled}
      />
    </Col>
  </Col>
);

const CreateProject = ({
  project,
  setCurrentWizard,
  goToMyProjects,
  sendToReview,
  completedSteps,
  deleteProject
}) => {
  const getContinueLaterButton = () => (
    <CustomButton
      buttonText="Save & Continue later"
      theme="Secondary"
      // TODO: show saved message? warn about losing non-saved changes?
      onClick={goToMyProjects}
    />
  );

  const sendToReviewButton = () => {
    const disabled = Object.values(completedSteps).some(
      completed => !completed
    );
    return (
      <CustomButton
        buttonText="Send to Review"
        theme={disabled ? 'disabled' : 'Primary'}
        classNameIcon="iconDisplay"
        icon="arrow-right"
        onClick={sendToReview}
        disabled={disabled}
      />
    );
  };

  const deleteProjectButton = () => {
    // TODO: the user shouldn't be able to actually enter this page at all
    //       if the project is not NEW or REJECTED
    if (!project || !ALLOW_DELETE_STATUSES.includes(project.status)) return;
    return (
      <CustomButton
        buttonText="Delete Project"
        theme="Alternative"
        classNameIcon="iconDisplay"
        icon="delete"
        onClick={deleteProject}
      />
    );
  };

  return (
    <Fragment>
      <div className="CreateWrapper">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Create Project</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <TitlePage
          textTitle={
            project && project.projectName ? project.projectName : 'My project'
          }
        />
        <Row
          // className="ProjectsCardsContainer"
          type="flex"
          justify="space-around"
          align="middle"
          gutter={16}
        >
          <Col className="ProjectsItems" sm={24} md={24} lg={24}>
            <Items
              title="Thumbnails"
              subtitle="Here you can upload the thumbnails of your project"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
              completed={completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            />
            <Items
              title="Project Detail"
              subtitle="Here you can upload your project detail"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
              disabled={!project || !project.id}
              completed={completedSteps[PROJECT_FORM_NAMES.DETAILS]}
            />
            <Items
              title="Project Proposal"
              subtitle="Here you can upload your project proposal"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
              disabled={!project || !project.id}
              completed={completedSteps[PROJECT_FORM_NAMES.PROPOSAL]}
            />
            <Items
              title="Project Milestones"
              subtitle="Upload milestones and edit them"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
              disabled={!project || !project.id}
              completed={completedSteps[PROJECT_FORM_NAMES.MILESTONES]}
            />
          </Col>
        </Row>
        <FooterButtons
          finishButton={sendToReviewButton()}
          nextStepButton={getContinueLaterButton()}
          prevStepButton={deleteProjectButton()}
        >
          <ModalProjectCreated />
        </FooterButtons>
      </div>
    </Fragment>
  );
};

CreateProject.defaultProps = {
  project: undefined,
  completedSteps: {
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  }
};

CreateProject.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  sendToReview: PropTypes.func.isRequired,
  setCurrentWizard: PropTypes.func.isRequired,
  goToMyProjects: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired
  }),
  completedSteps: PropTypes.shape({
    thumnails: PropTypes.bool,
    details: PropTypes.bool,
    proposal: PropTypes.bool,
    milestones: PropTypes.bool
  })
};

Items.defaultProps = {
  disabled: false,
  completed: false
};

Items.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  completed: PropTypes.bool
};

export default CreateProject;
