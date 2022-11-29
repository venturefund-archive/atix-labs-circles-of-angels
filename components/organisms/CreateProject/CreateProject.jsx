import React from 'react';
import { Breadcrumb } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import PropTypes from 'prop-types';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { PROJECT_FORM_NAMES, projectStatuses } from '../../../constants/constants';
import './_style.scss';

const Items = ({ title, subtitle, onClick, completed, disabled }) => (
  <div className="createProject__content__steps__step">
    <div className="createProject__content__steps__step__left">
      <img
        src={completed ? '/static/images/checked.svg' : '/static/images/unchecked.svg'}
        alt="unchecked"
      />
      <div>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>

    <CoaButton
      type="ghost"
      className="createProject__content__steps__step__button"
      onClick={onClick}
      disabled={disabled}
    >
      Edit
    </CoaButton>
  </div>
);

const CreateProject = ({ project, setCurrentWizard, completedSteps, Footer }) => {
  const { status, basicInformation } = project || {};
  const projectName = basicInformation?.projectName || 'My project';

  return (
    <>
      <div className="createProject__content">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Create Project</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <TitlePage textTitle={projectName} />

        <div className="createProject__content__steps">
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
        </div>
      </div>
      {Footer()}
    </>
  );
};

CreateProject.defaultProps = {
  project: {},
  completedSteps: {
    thumbnails: false,
    details: false,
    proposal: false,
    milestones: false
  },
  Footer: undefined
};

CreateProject.propTypes = {
  setCurrentWizard: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired
  }),
  completedSteps: PropTypes.shape({
    thumnails: PropTypes.bool,
    details: PropTypes.bool,
    proposal: PropTypes.bool,
    milestones: PropTypes.bool
  }),
  Footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
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
