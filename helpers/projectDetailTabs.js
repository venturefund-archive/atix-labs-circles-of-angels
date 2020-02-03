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

const allowNewExperience = (project, user) => {
  // TODO: do this when new experience modal fixed
  return false;
  if (project.status === projectStatuses.CONSENSUS && isOwner(project, user)) {
    return true;
  }
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

// TODO: discussion tab, experience tab, funds tab
// TODO: check project status and hide accordingly
export const tabsContent = (project, user) => ({
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
    content: <RowMilestones {...project} />,
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
        showCreateExperience={allowNewExperience(project, user)}
        // TODO: add onCreate prop when modal component fixed
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
