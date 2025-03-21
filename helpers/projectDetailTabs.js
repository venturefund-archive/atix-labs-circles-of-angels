import React, { Fragment } from 'react';
import { Badge } from 'antd';
import ProjectDetailsTab from '../components/molecules/ProjectDetailsTab/ProjectDetailsTab';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import BlockDiscussion from '../components/molecules/BlockDiscussion/BlockDiscussion';
import BlockChat from '../components/molecules/BlockChat/BlockChat';
import SeccionExperience from '../components/organisms/SeccionExperiences/SeccionExperiences';
import Transfers from '../components/organisms/Transfers/Transfers';
import Faq from '../components/organisms/Faq/Faq';
import {
  projectStatuses,
  SHOW_EXPERIENCES_STATUSES,
  SHOW_FUNDS_STATUSES,
  SHOW_CLAIM_STATUS,
  SHOW_MILESTONE_STATUS_ACTIONS,
  SHOW_TASK_EVIDENCE_ACTIONS
} from '../constants/constants';
import { isFunder, isOwner, isOracle } from './utils';

const showExperienceTab = projectStatus =>
  SHOW_EXPERIENCES_STATUSES.includes(projectStatus);

const showMilestoneClaimStatus = projectStatus =>
  SHOW_CLAIM_STATUS.includes(projectStatus);

const allowNewExperience = (project, user, funders) => {
  if (
    [
      projectStatuses.CONSENSUS,
      projectStatuses.FUNDING,
      projectStatuses.FINISHED,
      projectStatuses.EXECUTING
    ].includes(project.status)
  ) {
    return isOwner(project, user) || isFunder(user, funders);
  }
  return false;
};

const allowNewEvidence = (task, project, user) =>
  project.status === projectStatuses.EXECUTING && isOracle(task, user);

const showFundsTab = projectStatus =>
  SHOW_FUNDS_STATUSES.includes(projectStatus);

const canAssignOracle = (project, user) =>
  project.status === projectStatuses.CONSENSUS && isOwner(project, user);

const getMilestoneActionType = projectStatus => {
  if (SHOW_MILESTONE_STATUS_ACTIONS.includes(projectStatus)) {
    return 'status';
  }
  return 'none';
};

const getTaskActionType = projectStatus => {
  if (SHOW_TASK_EVIDENCE_ACTIONS.includes(projectStatus)) {
    return 'evidence';
  }
  return 'none';
};

const experienceTabTitle = project => (
  <div>
    Experiences
    <Badge
      count={project.experiences ? project.experiences.length : 0}
      style={{
        backgroundColor: '#fff',
        color: '#BDBDBD',
        boxShadow: '0 0 0 1px #BDBDBD inset'
      }}
    />
  </div>
);

// TODO: discussion tab
export const tabsContent = ({
  project,
  funders,
  user,
  assignOracle,
  onCreateExperience,
  onClaimMilestone,
  allowNewFund,
  fetchEvidences,
  fetchMilestones
}) => ({
  details: {
    title: 'Details',
    content: (
      <ProjectDetailsTab
        proposal={project.proposal}
        mission={project.mission}
        problem={project.problemAddressed}
        progress={project.progress}
        hidden={
          project.status === projectStatuses.EXECUTING &&
          project.milestones &&
          project.milestones.length > 0
        }
      />
    ),
    key: '1'
  },
  milestones: {
    title: 'Milestones',
    content: (
      <RowMilestones
        {...project}
        canAssignOracle={canAssignOracle(project, user)}
        onOracleAssign={assignOracle}
        onClaimMilestone={onClaimMilestone}
        allowNewEvidence={task => allowNewEvidence(task, project, user)}
        oracles={project.oracles}
        taskActionType={getTaskActionType(project.status)}
        milestoneActionType={getMilestoneActionType(project.status)}
        showClaimStatus={showMilestoneClaimStatus(project && project.status)}
        allowClaimMilestone={isOwner(project, user)}
        fetchEvidences={fetchEvidences}
        fetchMilestones={fetchMilestones}
      />
    ),
    key: '2'
  },
  discussions: {
    title: 'Discussions',
    content: (
      <Fragment>
        <BlockDiscussion />
        <BlockChat />
      </Fragment>
    ),
    key: '3',
    hidden: true
  },
  experiences: {
    title: experienceTabTitle(project),
    content: (
      <SeccionExperience
        experiences={project.experiences}
        onCreate={onCreateExperience}
        showCreateExperience={allowNewExperience(project, user, funders)}
      />
    ),
    key: '4',
    hidden: !showExperienceTab(project.status)
  },
  funds: {
    title: 'Funds',
    content: <Transfers project={project} allowNewFund={allowNewFund} />,
    key: '5',
    hidden: !showFundsTab(project.status)
  },
  faq: {
    title: 'FAQ',
    content: <Faq project={project} />,
    key: '6',
    hidden: true
  }
});
