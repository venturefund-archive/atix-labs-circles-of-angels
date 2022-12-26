import React from 'react';
import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';

const changelogActions = changelog => {
  const role = changelog?.user?.isAdmin ? 'Admin' : ROLES_IDS?.[changelog?.user?.roles?.[0]];
  const user = changelog?.user;
  const userName = `${user?.firstName} ${user?.lastName}`;
  const auditor = changelog?.activity?.auditor;
  const auditorName = `${auditor?.firstName} ${auditor?.lastName}`;

  return {
    create_project: {
      actionText: 'created a project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> created a project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created the project{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.project?.projectName}
          </span>
        </>
      )
    },
    publish_project: {
      actionText: 'published the project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>
          {` ${changelog?.revision !== 1 ? 'published a new version' : 'published'} ${
            changelog?.project?.projectName
          } - Revision N° ${changelog?.revision}`}
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          edited the project users
        </>
      )
    },
    send_project_to_review: {
      actionText: 'sent project to review',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> sent the project to
          review
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - sent
          the project{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.project?.projectName}
          </span>{' '}
          to review
        </>
      )
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
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          edited the project details
        </>
      )
    },
    add_user_project: {
      actionText: 'added a user to project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - added
          an user to the project
        </>
      )
    },
    remove_user_project: {
      actionText: 'removed user from project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed an user of the project
        </>
      )
    },
    add_milestone: {
      actionText: 'created a milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created a milestone
        </>
      )
    },
    remove_milestone: {
      actionText: 'removed milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed a milestone
        </>
      )
    },
    add_activity: {
      actionText: 'created an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created an activity
        </>
      )
    },
    remove_activity: {
      actionText: 'removed activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed an activity
        </>
      )
    },
    add_evidence: {
      actionText: 'uploaded a new evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> uploaded a new evidence
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          uploaded{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.evidence?.title}
          </span>{' '}
          evidence to{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.milestone?.title}
          </span>{' '}
          milestone
        </>
      )
    },
    reject_evidence: {
      actionText: 'rejected evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> rejected an evidence
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          rejected{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.evidence?.title}
          </span>{' '}
          evidence of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity and commented {changelog?.description}
        </>
      )
    },
    approve_evidence: {
      actionText: 'approved evidence',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> approved an evidence
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          approved{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.evidence?.title}
          </span>{' '}
          evidence of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity
        </>
      )
    },
    reject_activity: {
      actionText: 'rejected an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> rejected an activity
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          rejected the{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.milestone?.title}
          </span>{' '}
          Milestone
        </>
      )
    },
    approve_activity: {
      actionText: 'approved an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> approved an activity
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          approved the{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.milestone?.title}
          </span>{' '}
          Milestone
        </>
      )
    },
    activity_to_review: {
      actionText: 'sent activity to review',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> sent activity to review
        </>
      ),
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - sent
          the{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.activity?.title}
          </span>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">
            {changelog?.milestone?.title}
          </span>{' '}
          Milestone to be reviewed by{' '}
          <span className="coaChangelogItem__title --highlighted">{auditorName}</span> auditor
        </>
      )
    }
  };
};

export default changelogActions;
