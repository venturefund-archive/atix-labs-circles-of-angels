import React, { Fragment } from 'react';
import { Badge } from 'antd';
import ProjectDetailsTab from '../components/molecules/ProjectDetailsTab/ProjectDetailsTab';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import BlockDiscussion from '../components/molecules/BlockDiscussion/BlockDiscussion';
import BlockChat from '../components/molecules/BlockChat/BlockChat';
import SeccionExperience from '../pages/experiences';
import TableTransfer from '../components/organisms/TableTransfer/TableTransfer';

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
export const tabsContent = project => ({
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
        onCreate={() => {}}
      />
    ),
    key: '4',
    hidden: true
  },
  funds: {
    title: 'Funds',
    content: <TableTransfer />,
    key: '5',
    hidden: true
  }
});
