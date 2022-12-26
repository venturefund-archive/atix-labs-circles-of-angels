import React from 'react';
import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';

const changelogActions = changelog => {
  const role = changelog?.user?.isAdmin ? 'Admin' : ROLES_IDS?.[changelog?.user?.roles?.[0]];
  const user = changelog?.user;
  const userName = `${user?.firstName} ${user?.lastName}`;
  const auditor = changelog?.activity?.auditor;
  const auditorName = `${auditor?.firstName} ${auditor?.lastName}`;
  const projectName = changelog?.project?.projectName;
  const revision = changelog?.revision;
  const milestoneTitle = changelog?.milestone?.title;
  const activityTitle = changelog?.activity?.title;
  const evidenceTitle = changelog?.evidence?.title;

  return {
    create_project: {
      actionText: 'created a project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> created a project
        </>
      ),
      titleText: `${userName} created a project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created the project{' '}
          <span className="coaChangelogItem__title --highlighted">{projectName}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - created the project ${projectName}`
    },
    publish_project: {
      actionText: 'published the project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>
          {revision !== 1 ? 'published a new version of the project' : 'published the project'}
        </>
      ),
      titleText: `${userName} ${
        revision !== 1 ? 'published a new version of the project' : 'published the project'
      }`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          published <span className="coaChangelogItem__title --highlighted">{projectName}</span>{' '}
          Project - Revision {revision}
        </>
      ),
      descriptionText: `${userName} - ${role} - published ${projectName} Project - Revision ${revision}`
    },
    send_project_to_review: {
      actionText: 'sent project to review',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> sent the project to
          review
        </>
      ),
      titleText: `${userName} sent the project to review`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - sent
          the project <span className="coaChangelogItem__title --highlighted">{projectName}</span>{' '}
          to review
        </>
      ),
      descriptionText: `${userName} - ${role} - sent the project ${projectName} to review`
    },
    edit_project_basic_information: {
      actionText: 'edited project basic information',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          edited the project basic information
        </>
      )
    },
    edit_project_details: {
      actionText: 'edited project details',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          edited the project details
        </>
      ),
      descriptionText: `${userName} - ${role} - edited the project details`
    },
    add_user_project: {
      actionText: 'added a user to project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - added
          an user to the project
        </>
      ),
      descriptionText: `${userName} - ${role} - added an user to the project`
    },
    remove_user_project: {
      actionText: 'removed user from project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed an user of the project
        </>
      ),
      descriptionText: `${userName} - ${role} - removed an user of the project`
    },
    add_milestone: {
      actionText: 'created a milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created a milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - created a milestone`
    },
    remove_milestone: {
      actionText: 'removed milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed a milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - removed a milestone`
    },
    add_activity: {
      actionText: 'created an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created an activity
        </>
      ),
      descriptionText: `${userName} - ${role} - created an activity`
    },
    remove_activity: {
      actionText: 'removed activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      titleText: `${userName} edited the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed an activity
        </>
      ),
      descriptionText: `${userName} - ${role} - removed an activity`
    },
    add_evidence: {
      actionText: 'uploaded a new evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> uploaded a new evidence
        </>
      ),
      titleText: `${userName} uploaded a new evidence`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          uploaded <span className="coaChangelogItem__title --highlighted">{evidenceTitle}</span>{' '}
          evidence to <span className="coaChangelogItem__title --highlighted">{activityTitle}</span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - uploaded ${evidenceTitle} evidence to ${activityTitle} Activity of ${milestoneTitle} Milestone`
    },
    reject_evidence: {
      actionText: 'rejected evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> rejected an evidence
        </>
      ),
      titleText: `${userName} rejected an evidence`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          rejected <span className="coaChangelogItem__title --highlighted">{evidenceTitle}</span>{' '}
          evidence of <span className="coaChangelogItem__title --highlighted">{activityTitle}</span>{' '}
          Activity and commented {changelog?.description}
        </>
      ),
      descriptionText: `${userName} - ${role} - rejected ${evidenceTitle} evidence of ${activityTitle} Activity and commented ${changelog?.description}`
    },
    approve_evidence: {
      actionText: 'approved evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> approved an evidence
        </>
      ),
      titleText: `${userName} approved an evidence`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          approved <span className="coaChangelogItem__title --highlighted">{evidenceTitle}</span>{' '}
          evidence of <span className="coaChangelogItem__title --highlighted">{activityTitle}</span>{' '}
          Activity
        </>
      ),
      descriptionText: `${userName} - ${role} - approved ${evidenceTitle} evidence of ${activityTitle} Activity`
    },
    reject_activity: {
      actionText: 'rejected an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> rejected an activity
        </>
      ),
      titleText: `${userName} rejected an activity`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          rejected the{' '}
          <span className="coaChangelogItem__title --highlighted">{activityTitle}</span> Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - rejected the ${activityTitle} Activity of ${milestoneTitle} Milestone`
    },
    approve_activity: {
      actionText: 'approved an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> approved an activity
        </>
      ),
      titleText: `${userName} approved an activity`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          approved the{' '}
          <span className="coaChangelogItem__title --highlighted">{activityTitle}</span> Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - approved the ${activityTitle} Activity of ${milestoneTitle} Milestone`
    },
    activity_to_review: {
      actionText: 'sent activity to review',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> sent an activity to
          review
        </>
      ),
      titleText: `${userName} sent an activity to review`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - sent
          the <span className="coaChangelogItem__title --highlighted">{activityTitle}</span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
          to be reviewed by{' '}
          <span className="coaChangelogItem__title --highlighted">{auditorName}</span> auditor
        </>
      ),
      descriptionText: `${userName} - ${role} - sent the ${activityTitle} Activity of ${milestoneTitle} Milestone to be reviewed by ${auditorName} auditor`
    }
  };
};

export default changelogActions;
