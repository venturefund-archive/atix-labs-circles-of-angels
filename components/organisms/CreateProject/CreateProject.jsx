import React, { Fragment } from 'react';
import { Col, Breadcrumb, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import FooterButtons from '../FooterButtons/FooterButtons';
import ModalProjectCreated from '../ModalProjectCreated/ModalProjectCreated';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { PROJECT_FORM_NAMES, projectStatuses } from '../../../constants/constants';
import './_style.scss';

const Items = ({ title, subtitle, onClick, completed, disabled }) => (
  <Col className="Items flex" sm={24} md={24} lg={24}>
    <Col xs={3} sm={2} md={2} lg={1}>
      <img
        src={completed ? '/static/images/checked.svg' : '/static/images/unchecked.svg'}
        alt="unchecked"
      />
    </Col>
    <Col className="vertical" xs={15} sm={16} md={18} lg={21}>
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </Col>
    <Col className="BlockButton" xs={6} sm={6} md={4} lg={2}>
      <Button onClick={onClick} disabled={disabled} type="primary">
        Edit
      </Button>
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
  const { id, status, projectName } = project;

  const getContinueLaterButton = () => (
    <CustomButton
      buttonText={getContinueLaterLabel()}
      theme="Secondary"
      // TODO: show saved message? warn about losing non-saved changes?
      onClick={goToMyProjects}
    />
  );

  const getContinueLaterLabel = () => {
    if (anyStepCompleted()) {
      return status === projectStatuses.CONSENSUS ? 'Save changes' : 'Save & Continue later';
    }
    return 'Go back';
  };

  const anyStepCompleted = () => Object.values(completedSteps).some(completed => completed);

  const sendToReviewButton = () => {
    if (status === projectStatuses.CONSENSUS) return;
    const disabled = Object.values(completedSteps).some(completed => !completed);

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
        <TitlePage textTitle={projectName || 'My project'} />
        <Row
          // className="ProjectsCardsContainer"
          type="flex"
          justify="space-around"
          align="middle"
          gutter={16}
        >
          <Col className="ProjectsItems" sm={24} md={24} lg={24}>
            <Items
              title="Basic Information"
              subtitle="Here you can assign or create users to different roles"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
              disabled={status === projectStatuses.CONSENSUS}
              completed={completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            />
            <Items
              title="Project Detail"
              subtitle="Here you can complete the project information"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
              completed={completedSteps[PROJECT_FORM_NAMES.DETAILS]}
              disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            />
            <Items
              title="Project Users"
              subtitle="Here you can assign or create users to different roles"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
              disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
              completed={completedSteps[PROJECT_FORM_NAMES.PROPOSAL]}
            />
            <Items
              title="Project Milestones"
              subtitle="Here you can upload the required milestones for your project"
              onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
              disabled={!completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
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
  project: {},
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
