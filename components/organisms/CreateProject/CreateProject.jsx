import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Breadcrumb } from 'antd';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import PropTypes from 'prop-types';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { EDITOR_VARIANT, PROJECT_FORM_NAMES } from 'constants/constants';
import './_style.scss';
import { UserContext } from 'components/utils/UserContext';
import { checkIsBeneficiaryOrInvestorByProject } from 'helpers/roles';
import { CoaChangelogContainer } from '../CoaChangelogContainer/CoaChangelogContainer';

const EDITING_LOGIC = ({ status, completedSteps, isBeneficiaryOrInvestor }) => ({
  [EDITOR_VARIANT.FIRST_EDITING]: {
    basicInformationButtonDisabled:
      status !== PROJECT_STATUS_ENUM.DRAFT && status !== PROJECT_STATUS_ENUM.IN_REVIEW,
    projectDetailsButtonDisabled:
      !completedSteps[PROJECT_FORM_NAMES.THUMBNAILS] ||
      (status !== PROJECT_STATUS_ENUM.DRAFT && status !== PROJECT_STATUS_ENUM.IN_REVIEW),
    projectUsersButtonDisabled:
      !completedSteps[PROJECT_FORM_NAMES.THUMBNAILS] ||
      (status !== PROJECT_STATUS_ENUM.DRAFT && status !== PROJECT_STATUS_ENUM.IN_REVIEW),
    milestonesButtonDisabled:
      !completedSteps[PROJECT_FORM_NAMES.THUMBNAILS] ||
      (status !== PROJECT_STATUS_ENUM.DRAFT && status !== PROJECT_STATUS_ENUM.IN_REVIEW)
  },
  [EDITOR_VARIANT.EDITING_CLONE]: {
    basicInformationButtonDisabled:
      !isBeneficiaryOrInvestor || status !== PROJECT_STATUS_ENUM.OPEN_REVIEW,
    projectDetailsButtonDisabled:
      !isBeneficiaryOrInvestor || status !== PROJECT_STATUS_ENUM.OPEN_REVIEW,
    projectUsersButtonDisabled: true,
    milestonesButtonDisabled: !isBeneficiaryOrInvestor || status !== PROJECT_STATUS_ENUM.OPEN_REVIEW
  }
});

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

const CreateProject = ({ project, setCurrentWizard, completedSteps, Footer, editorVariant }) => {
  const history = useHistory();
  const { status, basicInformation } = project || {};
  const projectName = basicInformation?.projectName || 'My project';
  const areAllStepsCompleted =
    completedSteps[PROJECT_FORM_NAMES.THUMBNAILS] &&
    completedSteps[PROJECT_FORM_NAMES.PROPOSAL] &&
    completedSteps[PROJECT_FORM_NAMES.MILESTONES] &&
    completedSteps[PROJECT_FORM_NAMES.DETAILS];
  const { user } = useContext(UserContext);

  const isBeneficiaryOrInvestor =
    project?.users && checkIsBeneficiaryOrInvestorByProject({ user, project });

  return (
    <>
      <div className="createProject__content">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Create Project</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TitlePage textTitle={projectName} />
          <CoaButton
            type="primary"
            disabled={!areAllStepsCompleted}
            onClick={() =>
              [
                PROJECT_STATUS_ENUM.DRAFT,
                PROJECT_STATUS_ENUM.OPEN_REVIEW,
                PROJECT_STATUS_ENUM.IN_REVIEW
              ].includes(project?.status)
                ? history.push(`/${project?.parent || project?.id}?preview=true`)
                : history.push(`/${project?.parent || project?.id}`)
            }
          >
            See preview project
          </CoaButton>
        </div>

        <div className="createProject__content__steps">
          <Items
            title="Basic Information"
            subtitle="Here you can assign or create users to different roles"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
            completed={completedSteps[PROJECT_FORM_NAMES.THUMBNAILS]}
            disabled={
              EDITING_LOGIC({
                status,
                completedSteps,
                isBeneficiaryOrInvestor
              })?.[editorVariant]?.basicInformationButtonDisabled
            }
          />

          <Items
            title="Project Detail"
            subtitle="Here you can complete the project information"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
            completed={completedSteps[PROJECT_FORM_NAMES.DETAILS]}
            disabled={
              EDITING_LOGIC({
                status,
                completedSteps,
                isBeneficiaryOrInvestor
              })?.[editorVariant]?.projectDetailsButtonDisabled
            }
          />

          <Items
            title="Project Users"
            subtitle="Here you can assign or create users to different roles"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
            completed={completedSteps[PROJECT_FORM_NAMES.PROPOSAL]}
            disabled={
              EDITING_LOGIC({
                status,
                completedSteps,
                isBeneficiaryOrInvestor
              })?.[editorVariant]?.projectUsersButtonDisabled
            }
          />
          <Items
            title="Project Milestones"
            subtitle="Here you can upload the required milestones for your project"
            onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
            completed={completedSteps[PROJECT_FORM_NAMES.MILESTONES]}
            disabled={
              EDITING_LOGIC({
                status,
                completedSteps,
                isBeneficiaryOrInvestor
              })?.[editorVariant]?.milestonesButtonDisabled
            }
          />
        </div>
        {
          !!project.id && project?.editing &&
          <div className='createProject__content__changelog'>
            <TitlePage
              textTitle="Changelog"
              className="createProject__content__changelog__title"
              textColor="#4C7FF7"
            />
            <CoaChangelogContainer
              title="Project Changelog"
              projectId={project?.parent || project?.id}
              currency={project?.details?.currency}
              revisionId={project?.revision}
            />
          </div>
        }
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
