import { ROLES_IDS_NAMES } from 'components/organisms/AssignProjectUsers/constants';
import { formatLeadWithZero } from 'helpers/formatter';
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
  APPROVE_REVIEW: 'approve_review',
  PROJECT_CLONE: 'project_clone',
  UPDATE_MILESTONE: 'update_milestone',
  UPDATE_ACTIVITY: 'update_activity'
};

const roleTranslation = (texts, role) => {
  if (!texts) return role;
  if (role === ROLES_IDS_NAMES[1]) return texts?.roles?.beneficiary || 'Beneficiary';
  if (role === ROLES_IDS_NAMES[2]) return texts?.roles?.investor || 'Investor';
  if (role === ROLES_IDS_NAMES[3]) return texts?.roles?.auditor || 'Auditor';
  return role;
};

const changelogActions = (changelog, texts) => {
  const _role = changelog?.user?.isAdmin
    ? 'Admin'
    : ROLES_IDS_NAMES[(changelog?.user?.roles?.[0]?.id)];
  const role = roleTranslation(texts, _role);
  const user = changelog?.user;
  const userName = `${user?.firstName} ${user?.lastName}`;
  const auditor = changelog?.activity?.auditor;
  const auditorName = `${auditor?.firstName} ${auditor?.lastName}`;
  const projectName = changelog?.project?.projectName;
  const revision = formatLeadWithZero(changelog?.revision);
  const milestoneTitle = changelog?.milestone?.title;
  const activityTitle = changelog?.activity?.title;
  const evidenceTitle = changelog?.evidence?.title;
  const extraData = changelog?.extraData;
  const projectId = changelog?.project?.id;
  const activityId = changelog?.activity?.id;
  const evidenceId = changelog?.evidence?.id;
  const reasonComment = changelog?.extraData?.reason
    ? ` ${texts?.changelogAction?.andCommented || 'and commented'} ${changelog?.extraData?.reason}`
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
    [CHANGELOG_ACTIONS_ENUM.CREATE_PROJECT]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.createdAProject || 'created a project'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.createdAProject || 'created a project'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.createdTheProject || 'created the project'}{' '}
          <span className="coaChangelogItem__title --highlighted">{projectName}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.createdTheProject ||
        'created the project'} ${projectName}`
    },
    [CHANGELOG_ACTIONS_ENUM.PUBLISH_PROJECT]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>
          {revision !== 1
            ? ` ${texts?.changelogAction?.publishedNewVersion ||
                'published a new version of the project'}`
            : ` ${texts?.changelogAction?.publishedTheProject || 'published the project'}`}
        </>
      ),
      titleText: `${userName} ${
        revision !== 1
          ? ` ${texts?.changelogAction?.publishedNewVersion ||
              'published a new version of the project'}`
          : ` ${texts?.changelogAction?.publishedTheProject || 'published the project'}`
      }
      }`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.published || 'published'}{' '}
          <span className="coaChangelogItem__title --highlighted">{projectName}</span>{' '}
          {texts?.changelogAction?.projectRevision || 'Project - Revision'}{' '}
          <span className="coaChangelogItem__title --highlighted">REV-{revision}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.published ||
        'published'} ${projectName} ${texts?.changelogAction?.projectRevision ||
        'Project - Revision'} REV-${revision}`
    },
    [CHANGELOG_ACTIONS_ENUM.SEND_PROJECT_TO_REVIEW]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.sentProjectToReview || 'sent the project to review'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.sentProjectToReview ||
        'sent the project to review'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.sentTheProject || 'sent the project'}
          <span className="coaChangelogItem__title --highlighted">{projectName}</span>{' '}
          {texts?.changelogAction?.toReview || 'to review'}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.sentTheProject ||
        'sent the project'} ${projectName} ${texts?.changelogAction?.toReview || 'to review'}`
    },
    [CHANGELOG_ACTIONS_ENUM.EDIT_PROJECT_BASIC_INFO]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.editedTheProjectBasicInfo ||
            'edited the project basic information'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.editedTheProjectBasicInfo ||
        'edited the project basic information'}`,
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
    [CHANGELOG_ACTIONS_ENUM.EDIT_PROJECT_DETAILS]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.editedTheProjectDetails || 'edited the project details'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.editedTheProjectDetails ||
        'edited the project details'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {PROJECT_DETAILS_ACTIONS[(extraData?.fieldName)]}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${PROJECT_DETAILS_ACTIONS[(extraData?.fieldName)]}`
    },
    [CHANGELOG_ACTIONS_ENUM.ADD_USER_PROJECT]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.addedAUserToTheProject || 'added an user to the project'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.addedAUserToTheProject ||
        'added an user to the project'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.addedTo || 'added to'}{' '}
          <span className="coaChangelogItem__title --highlighted">
            {extraData?.user?.firstName} {extraData?.user?.lastName}
          </span>{' '}
          {texts?.changelogAction?.as || 'as'}{' '}
          <span className="coaChangelogItem__title --highlighted">
            {ROLES_IDS_NAMES[(extraData?.role?.id)]}
          </span>{' '}
          {texts?.changelogAction?.ofTheProject || 'of the project'}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.addedTo || 'added to'} ${
        extraData?.user?.firstName
      } ${extraData?.user?.lastName} ${texts?.changelogAction?.as || 'as'} ${
        extraData?.role?.description
      } ${texts?.changelogAction?.ofTheProject || 'of the project'}`
    },
    [CHANGELOG_ACTIONS_ENUM.REMOVE_USER_PROJECT]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.removedAnUserOfTheProject || 'removed an user of the project'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.removedAnUserOfTheProject ||
        'removed an user of the project'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.removed || 'removed'} {extraData?.user?.firstName}{' '}
          {extraData?.user?.lastName} {texts?.changelogAction?.as || 'as'}{' '}
          {extraData?.role?.description} {texts?.changelogAction?.ofTheProject || 'of the project'}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.removed || 'removed'} ${
        extraData?.user?.firstName
      } ${extraData?.user?.lastName} ${texts?.changelogAction?.as || 'as'} ${
        extraData?.role?.description
      } ${texts?.changelogAction?.ofTheProject || 'of the project'}`
    },
    [CHANGELOG_ACTIONS_ENUM.ADD_MILESTONE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.createdAMilestone || 'created a milestone'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.createdAMilestone ||
        'created a milestone'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.createdTheMilestone || 'created the milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.createdTheMilestone ||
        'created the milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.REMOVE_MILESTONE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.removedAMilestone || 'removed a milestone'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.removedAMilestone ||
        'removed a milestone'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.removedTheMilestone || 'removed the milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.removedTheMilestone ||
        'removed the milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.ADD_ACTIVITY]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.addedAnActivity || 'added an activity'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.addedAnActivity || 'added an activity'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.createdTheActivity || 'created the activity'}{' '}
          <Link
            to={`/${projectId}/activity/${activityId}/evidences`}
            className="coaChangelogItem__title --highlighted"
          >
            {activityTitle}
          </Link>{' '}
          {texts?.changelogAction?.inTheMilestone || 'in the milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.createdTheActivity ||
        'created the activity'} ${activityTitle} ${texts?.changelogAction?.inTheMilestone ||
        'in the milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.REMOVE_ACTIVITY]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.changelogAction?.removedAnActivity || 'removed an activity'}
        </>
      ),
      titleText: `${userName} ${texts?.changelogAction?.removedAnActivity ||
        'removed an activity'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.changelogAction?.removedTheActivity || 'removed the activity'}{' '}
          <span className="coaChangelogItem__title --highlighted">{activityTitle}</span> of the{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span> Milestone
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.changelogAction?.removedTheActivity ||
        'removed the activity'} ${activityTitle} ${texts?.changelogAction?.inTheMilestone ||
        'in the milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.ADD_EVIDENCE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.uploaded || 'uploaded'}{' '}
          {texts?.changelogAction?.aNewEvidence || 'a new evidence'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.uploaded || 'uploaded'} ${texts?.changelogAction
        ?.aNewEvidence || 'a new evidence'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.uploaded || 'uploaded'}{' '}
          {texts?.changelogAction?.theEvidence || 'the evidence'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          {texts?.general?.to || 'to'} {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          {texts?.general?.ofThe || 'of the'} {texts?.general?.milestone || 'milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.uploaded || 'uploaded'} ${texts
        ?.changelogAction?.theEvidence || 'the evidence'} ${evidenceTitle} ${texts?.general?.to ||
        'to'} ${texts?.changelogAction?.theActivity || 'the activity'} ${activityTitle} ${texts
        ?.general?.ofThe || 'of the'} ${texts?.general?.milestone || 'milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.REJECT_EVIDENCE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.rejected || 'rejected'}{' '}
          {texts?.changelogAction?.anEvidence || 'an evidence'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.rejected || 'rejected'} ${texts?.changelogAction
        ?.anEvidence || 'an evidence'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.rejected || 'rejected'}{' '}
          {texts?.changelogAction?.theEvidence || 'the evidence'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          {texts?.general?.of || 'of'} {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>
          {reasonComment}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.rejected || 'rejected'} ${texts
        ?.changelogAction?.theEvidence || 'the evidence'} ${evidenceTitle} ${texts?.general?.of ||
        'of'} ${texts?.changelogAction?.theActivity ||
        'the activity'} ${activityTitle} ${reasonComment}`
    },
    [CHANGELOG_ACTIONS_ENUM.APPROVE_EVIDENCE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.anEvidence || 'an evidence'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.approved || 'approved'} ${texts?.changelogAction
        ?.anEvidence || 'an evidence'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.theEvidence || 'the evidence'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences/${evidenceId}`}
          >
            {evidenceTitle}
          </Link>{' '}
          {texts?.general?.of || 'of'} {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.approved || 'approved'} ${texts
        ?.changelogAction?.theEvidence || 'the evidence'} ${evidenceTitle} ${texts?.general?.of ||
        'of'} ${texts?.changelogAction?.theActivity || 'the activity'} ${activityTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.REJECT_ACTIVITY]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.rejected || 'rejected'}{' '}
          {texts?.changelogAction?.anActivity || 'an activity'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.rejected || 'rejected'} ${texts?.changelogAction
        ?.anActivity || 'an activity'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.rejected || 'rejected'}{' '}
          {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          {texts?.general?.ofThe || 'of the'} {texts?.general?.milestone || 'milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.rejected || 'rejected'} ${texts
        ?.changelogAction?.theActivity || 'the activity'} ${activityTitle} ${texts?.general
        ?.ofThe || 'of the'} ${texts?.general?.milestone || 'milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.APPROVE_ACTIVITY]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.anActivity || 'an activity'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.approved || 'approved'} ${texts?.changelogAction
        ?.anActivity || 'an activity'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          {texts?.general?.ofThe || 'of the'} {texts?.general?.milestone || 'milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.approved || 'approved'} ${texts
        ?.changelogAction?.theActivity || 'the activity'} ${activityTitle} ${texts?.general
        ?.ofThe || 'of the'} ${texts?.general?.milestone || 'milestone'} ${milestoneTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.ACTIVITY_TO_REVIEW]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.sent || 'sent'} {texts?.changelogAction?.anActivity || 'an activity'}{' '}
          {texts?.changelogAction?.toReview || 'to review'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.sent || 'sent'} ${texts?.changelogAction
        ?.anActivity || 'an activity'} ${texts?.changelogAction?.toReview || 'to review'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.sent || 'sent'} {texts?.changelogAction?.theActivity || 'the activity'}{' '}
          <Link
            className="coaChangelogItem__title --highlighted"
            to={`/${projectId}/activity/${activityId}/evidences`}
          >
            {activityTitle}
          </Link>{' '}
          {texts?.general?.ofThe || 'of the'} {texts?.general?.milestone || 'milestone'}{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>{' '}
          {texts?.changelogAction?.toBeReviewedBy || 'to be reviewed by'}{' '}
          <span className="coaChangelogItem__title --highlighted">{auditorName}</span> auditor
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.sent || 'sent'} ${texts
        ?.changelogAction?.theActivity || 'the activity'} ${activityTitle} ${texts?.general
        ?.ofThe || 'of the'} ${texts?.general?.milestone || 'milestone'} ${milestoneTitle} ${texts
        ?.changelogAction?.toBeReviewedBy || 'to be reviewed by'} ${auditorName} auditor`
    },
    [CHANGELOG_ACTIONS_ENUM.CANCEL_REVIEW]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.canceled || 'canceled'}{' '}
          {texts?.changelogAction?.aRevision || 'a revision'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.canceled || 'canceled'} ${texts?.changelogAction
        ?.aRevision || 'a revision'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.canceled || 'canceled'} $
          {texts?.changelogAction?.theRevision || 'the revision'}{' '}
          <span className="coaChangelogItem__title --highlighted">REV-{revision}</span>
          {reasonComment}
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.canceled || 'canceled'} ${texts
        ?.changelogAction?.theRevision || 'the revision'} REV-${revision}${reasonComment}`
    },
    [CHANGELOG_ACTIONS_ENUM.APPROVE_REVIEW]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.aRevision || 'a revision'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.approved || 'approved'} ${texts?.changelogAction
        ?.aRevision || 'a revision'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.approved || 'approved'}{' '}
          {texts?.changelogAction?.theRevision || 'the revision'}{' '}
          <span className="coaChangelogItem__title --highlighted">REV-{revision}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.approved || 'approved'} ${texts
        ?.changelogAction?.theRevision || 'the revision'} REV-${revision}`
    },
    [CHANGELOG_ACTIONS_ENUM.PROJECT_CLONE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span>{' '}
          {texts?.general?.created || 'created'}{' '}
          {texts?.changelogAction?.aNewRevision || 'a new revision'}
        </>
      ),
      titleText: `${userName} ${texts?.general?.created || 'created'} ${texts?.changelogAction
        ?.aNewRevision || 'a new revision'}`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          {texts?.general?.created || 'created'}{' '}
          {texts?.changelogAction?.theRevision || 'the revision'}{' '}
          <span className="coaChangelogItem__title --highlighted">REV-{revision}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - ${texts?.general?.created || 'created'} ${texts
        ?.changelogAction?.theRevision || 'the revision'} REV-${revision}`
    },
    [CHANGELOG_ACTIONS_ENUM.UPDATE_ACTIVITY]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited an activity
        </>
      ),
      titleText: `${userName} edited an activity`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          edited the activity{' '}
          <span className="coaChangelogItem__title --highlighted">{activityTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - edited the activity ${activityTitle}`
    },
    [CHANGELOG_ACTIONS_ENUM.UPDATE_MILESTONE]: {
      title: () => (
        <>
          <span className="coaChangelogItem__title --bold">{userName}</span> edited a milestone
        </>
      ),
      titleText: `${userName} edited a milestone`,
      description: () => (
        <>
          <span className="coaChangelogItem__title --highlighted">{userName}</span> - {role} -{' '}
          edited the milestone{' '}
          <span className="coaChangelogItem__title --highlighted">{milestoneTitle}</span>
        </>
      ),
      descriptionText: `${userName} - ${role} - edited the milestone ${milestoneTitle}`
    }
  };
};

export default changelogActions;
