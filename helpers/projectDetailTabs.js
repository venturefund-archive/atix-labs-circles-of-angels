import React, { Fragment } from 'react';
import { Badge } from 'antd';
import ProjectDetailsTab from '../components/molecules/ProjectDetailsTab/ProjectDetailsTab';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import BlockDiscussion from '../components/molecules/BlockDiscussion/BlockDiscussion';
import BlockChat from '../components/molecules/BlockChat/BlockChat';
import SeccionExperience from '../components/organisms/SeccionExperiences/SeccionExperiences';
import TableTransfer from '../components/organisms/TableTransfer/TableTransfer';
import { projectStatuses } from '../constants/constants';

const SHOW_EXPERIENCES_STATUS = [
  projectStatuses.CONSENSUS,
  projectStatuses.EXECUTING,
  projectStatuses.FUNDING,
  projectStatuses.FINISHED,
  projectStatuses.CHANGING_SCOPE,
  projectStatuses.ABORTED
];

const isOwner = (project, user) => project.owner === user.id;

const showExperienceTab = projectStatus =>
  SHOW_EXPERIENCES_STATUS.includes(projectStatus);

const allowNewExperience = (project, user) =>
  project.status === projectStatuses.CONSENSUS && isOwner(project, user);

const canAssignOracle = (project, user) =>
  project.status === projectStatuses.CONSENSUS && isOwner(project, user);

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

// TODO: discussion tab, funds tab
// TODO: check project status and hide accordingly
export const tabsContent = ({
  project,
  user,
  assignOracle,
  onCreateExperience
}) => ({
  details: {
    title: 'Details',
    content: (
      <ProjectDetailsTab
        mission={project.mission}
        problem={project.problemAddressed}
        progress={project.progress}
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
        oracles={project.oracles}
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
        showCreateExperience={allowNewExperience(project, user)}
      />
    ),
    key: '4',
    hidden: !showExperienceTab(project.status)
  },
  funds: {
    title: 'Funds',
    content: <TableTransfer />,
    key: '5',
    hidden: true
  }
});
