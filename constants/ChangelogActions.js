import React from 'react';

import { Link } from 'react-router-dom';

export const CHANGELOG_ACTIONS_ENUM = {
  CREATE_PROJECT: 'create_project',
  PUBLISH_PROJECT: 'publish_project',
  SEND_PROJECT_TO_REVIEW: 'send_project_to_review',
  EDIT_PROJECT_BASIC_INFO: 'edit_project_basic_information',
  EDIT_PROJECT_DETAILS: 'edit_project_details',
  ADD_USER_PROJECT: 'add_user_project',
  REMOVE_USER_PROJECT: 'remove_user_project',
  ADD_MILESTONE: 'add_milestone',
  REMOVE_MILESTONE: 'remove_milestone',
  ADD_ACTIVITY: 'add_activity',
  REMOVE_ACTIVITY: 'remove_activity',
  ADD_EVIDENCE: 'add_evidence',
  REJECT_EVIDENCE: 'reject_evidence',
  APPROVE_EVIDENCE: 'approve_evidence',
  REJECT_ACTIVITY: 'reject_activity',
  APPROVE_ACTIVITY: 'approve_activity',
  ACTIVITY_TO_REVIEW: 'activity_to_review',
  CANCEL_REVIEW: 'cancel_review',
  APPROVE_REVIEW: 'approve_review'
};

const changelogActions = (changelog, texts) => {
  const role = changelog?.user?.isAdmin ? 'Admin' : changelog?.user?.roles?.[0]?.description;
  const user = changelog?.user;
  const userName = `${user?.firstName} ${user?.lastName}`;
  const auditor = changelog?.activity?.auditor;
  const auditorName = `${auditor?.firstName} ${auditor?.lastName}`;
  const projectName = changelog?.project?.projectName;
  const revision = changelog?.revision;
  const milestoneTitle = changelog?.milestone?.title;
  const activityTitle = changelog?.activity?.title;
  const evidenceTitle = changelog?.evidence?.title;
  const extraData = changelog?.extraData;
  const projectId = changelog?.project?.id;
  const activityId = changelog?.activity?.id;
  const evidenceId = changelog?.evidence?.id;
  const reasonComment = changelog?.extraData?.reason
    ? ` and commented ${changelog?.extraData?.reason}`
    : '';

  const BASIC_INFORMATION_ACTIONS = {
    location: texts?.changelogAction?.location || 'set a new location',
    thumbnailPhotoFile:
      texts?.changelogAction?.thumbnailPhotoFile || 'uploaded a new thumbnail photo',
    timeframe: texts?.changelogAction?.timeframe || 'set a new timeframe',
    timeframeUnit: texts?.changelogAction?.timeframeUnit || 'set a new timeframe unit',
    projectName: texts?.changelogAction?.projectName || 'set a new project name',
    dataComplete: texts?.changelogAction?.dataComplete || 'completed all the fields'
  };

  const PROJECT_DETAILS_ACTIONS = {
    legalAgreementFile:
      texts?.changelogAction?.legalAgreementFile || 'uploaded a new legal agreement file',
    projectProposalFile:
      texts?.changelogAction?.projectProposalFile || 'uploaded a new project proposal file',
    currency: texts?.changelogAction?.currency || 'set a new currency',
    problemAddressed: texts?.changelogAction?.problemAddressed || 'set a new about the project',
    currencyType: texts?.changelogAction?.currencyType || 'set a new currency type',
    additionalCurrencyInformation:
      texts?.changelogAction?.additionalCurrencyInformation ||
      'set additional currency information',
    mission: texts?.changelogAction?.mission || 'set a new mission and vision of the project'
  };

  return {
    create_project: {
      actionText: texts?.changelogAction?.createdAProject || 'created a project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.createdAProject || 'created a project'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.createdAProject || 'created a project'}`,
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
          {revision !== 1 ? ' published a new version of the project' : ' published the project'}
        </>
      ),
      titleText: `${userName} ${
        revision !== 1 ? 'published a new version of the project' : 'published the project'
      }`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          published <span className="coaChangelogItem__title --highlighted">{projectName}</span>{' '}
          Project - Revision{' '}
          <span className="coaChangelogItem__title --highlighted">N° {revision}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - published ${projectName} Project - Revision N° ${revision}`
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
          basic information
        </>
      ),
      titleText: `${userName} edited the project basic information`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {BASIC_INFORMATION_ACTIONS[(extraData?.fieldName)]}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${
        BASIC_INFORMATION_ACTIONS[(extraData?.fieldName)]
      }`
    },
    edit_project_details: {
      actionText: 'edited project details',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited the project
          details
        </>
      ),
      titleText: `${userName} edited the project details`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {PROJECT_DETAILS_ACTIONS[(extraData?.fieldName)]}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${PROJECT_DETAILS_ACTIONS[(extraData?.fieldName)]}`
    },
    add_user_project: {
      actionText: 'added a user to project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> add an user to the
          project
        </>
      ),
      titleText: `${userName} add an user to the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} - added
          to{' '}
          <span className="coaChangelogItem__title --highlighted">
            {extraData?.user?.firstName} {extraData?.user?.lastName}
          </span>{' '}
          as{' '}
          <span className="coaChangelogItem__title --highlighted">
            {extraData?.role?.description}
          </span>{' '}
          of the project
        </>
      ),
      descriptionText: `${userName} - ${role} - added to ${extraData?.user?.firstName} ${extraData?.user?.lastName} as ${extraData?.role?.description} of the project`
    },
    remove_user_project: {
      actionText: 'removed user from project',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> removed an user of the
          project
        </>
      ),
      titleText: `${userName} removed an user of the project`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed {extraData?.user?.firstName} {extraData?.user?.lastName} as{' '}
          {extraData?.role?.description} of the project
        </>
      ),
      descriptionText: `${userName} - ${role} - removed ${extraData?.user?.firstName} ${extraData?.user?.lastName} as ${extraData?.role?.description} of the project`
    },
    add_milestone: {
      actionText: 'created a milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> created a milestone
        </>
      ),
      titleText: `${userName} created a milestone`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created the milestone{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - created the milestone ${milestoneTitle}`
    },
    remove_milestone: {
      actionText: 'removed milestone',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> removed a milestone
        </>
      ),
      titleText: `${userName} removed a milestone`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed the milestone{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - removed the milestone ${milestoneTitle}`
    },
    add_activity: {
      actionText: 'created an activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> add an activity
        </>
      ),
      titleText: `${userName} add an activity`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          created the activity{' '}
          <Link
            to={`/${projectId}/activity/${activityId}/evidences`}
            className="coaChangelogItem__title --highlighted"
          >
            {activityTitle}
          </Link>{' '}
          in the <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>{' '}
          Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - created the activity ${activityTitle} in the ${milestoneTitle} Milestone`
    },
    remove_activity: {
      actionText: 'removed activity',
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> removed an activity
        </>
      ),
      titleText: `${userName} removed an activity`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          removed the activity{' '}
          <span className="coaChangelogItem__title --highlighted">{activityTitle}</span> of the{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - removed the activity ${activityTitle} of the ${milestoneTitle} Milestone`
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
          uploaded{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          evidence to{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
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
          rejected{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          evidence of{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          Activity
          {reasonComment}
        </>
      ),
      descriptionText: `${userName} - ${role} - rejected ${evidenceTitle} evidence of ${activityTitle} Activity ${reasonComment}`
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
          approved{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          evidence of{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
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
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          Activity of{' '}
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
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          Activity of{' '}
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
          the{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          Activity of{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
          to be reviewed by{' '}
          <span className="coaChangelogItem__title --highlighted">{auditorName}</span> auditor
        </>
      ),
      descriptionText: `${userName} - ${role} - sent the ${activityTitle} Activity of ${milestoneTitle} Milestone to be reviewed by ${auditorName} auditor`
    },
    cancel_review: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> canceled a revision
        </>
      ),
      titleText: `${userName} canceled a revision`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          canceled the revision{' '}
          <span className="coaChangelogItem__title --highlighted">N° {revision}</span>
          {reasonComment}
        </>
      ),
      descriptionText: `${userName} - ${role} - canceled the revision N° ${revision}${reasonComment}`
    },
    approve_review: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> approved the revision{' '}
          {revision}
        </>
      ),
      titleText: `${userName} approved the revision ${revision}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -
          approved the revision{' '}
          <span className="coaChangelogItem__title --highlighted">{revision}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - approved the revision ${revision}`
    }
  };
};

export default changelogActions;
