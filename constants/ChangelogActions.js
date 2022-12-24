import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';

const changelogActions = changelog => {
  const role = changelog?.user?.isAdmin ? 'Admin' : ROLES_IDS?.[changelog?.user?.roles?.[0]];
  const userName = `${changelog?.user?.firstName} ${changelog?.user?.lastName}`;

  return {
    create_project: {
      actionText: 'created a project',
      title: `${userName} created a project`,
      description: `${userName} - ${role} - create the project ${changelog?.project?.projectName}`
    },
    publish_project: {
      actionText: 'published the project',
      title: `${userName} ${changelog?.revision !== 1 ? 'published a new version' : 'published'} ${
        changelog?.project?.projectName
      } - Revision N° ${changelog?.revision}`,
      description: `${userName} - ${role} - edited the project users`
    },
    send_project_to_review: {
      actionText: 'sent project to review',
      title: `${userName} sent the project to review`,
      description: `${userName} - ${role} - sent the project ${changelog?.project?.projectName} to review`
    },
    edit_project_basic_information: {
      actionText: 'edited project basic information',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the project basic information`
    },
    edit_project_details: {
      actionText: 'edited project details',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the project details`
    },
    add_user_project: {
      actionText: 'added a user to project',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the project users`
    },
    remove_user_project: {
      actionText: 'removed user from project',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the project users`
    },
    add_milestone: {
      actionText: 'created a milestone',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the milestones`
    },
    remove_milestone: {
      actionText: 'removed milestone',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the milestones`
    },
    add_activity: {
      actionText: 'created an activity',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the activities`
    },
    remove_activity: {
      actionText: 'removed activity',
      title: `${userName} edited the project`,
      description: `${userName} - ${role} - edited the activities`
    },
    add_evidence: {
      actionText: 'uploaded a new evidence',
      title: `${userName} uploaded a new evidence`,
      description: `${userName} - ${role} - uploaded ${changelog?.evidence?.title} to ${changelog?.activity?.title} Activity of ${changelog?.milestone?.title} milestone`
    },
    reject_evidence: {
      actionText: 'rejected evidence',
      title: `${userName} rejected an evidence`,
      description: `${userName} - ${role} - approved ${changelog?.evidence?.title} evidence of ${changelog?.activity?.title} activity and comment ${changelog?.comment}`
    },
    approve_evidence: {
      actionText: 'approved evidence',
      title: `${userName} approved an evidence`,
      description: `${userName} - ${role} - approved ${changelog?.evidence?.title} evidence of ${changelog?.activity?.title} activity`
    },
    reject_activity: {
      actionText: 'rejected an activity',
      title: `${userName} rejected an activity`,
      description: `${changelog?.auditor} - ${role} - rejected the ${changelog?.activity?.title} activity of ${changelog?.milestone?.title} Milestone`
    },
    approve_activity: {
      actionText: 'approved an activity',
      title: `${userName} approved an activity`,
      description: `${changelog?.auditor} - ${role} - approved the ${changelog?.activity?.title} activity of ${changelog?.milestone?.title} Milestone`
    },
    activity_to_review: {
      actionText: 'sent activity to review',
      title: `${userName} sent activity to review`,
      description: `${userName} sent the ${changelog?.activity?.title} Activity of ${changelog?.milestone?.title} Milestone to be reviewed by ${changelog?.activity?.auditor?.firstName} ${changelog?.activity?.auditor?.lastName} auditor`
    }
  };
};

export default changelogActions;
