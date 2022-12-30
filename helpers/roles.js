const { ROLES_IDS } = require('components/organisms/AssignProjectUsers/constants');

export const checkIsBeneficiaryOrInvestor = (user, projectId) => {
  const userProject =
    user?.projects.find(project => parseInt(project.projectId, 10) === parseInt(projectId, 10)) ||
    false;

  return (
    user &&
    (userProject?.roles?.includes(ROLES_IDS.beneficiary) ||
      userProject?.roles?.includes(ROLES_IDS.investor))
  );
};

export const checkIsProjectAuditor = (user, projectId) => {
  const userProject =
    user?.projects.find(project => parseInt(project.projectId, 10) === parseInt(projectId, 10)) ||
    false;

  return user && userProject?.roles?.includes(ROLES_IDS.auditor);
};

export const checkIsActivityAuditor = ({ user, activity }) => user?.id === activity?.auditor;

export const checkIsBeneficiaryByProject = ({ user, project }) => {
  const userId = user?.id;
  const projectUsers = project?.users;
  const beneficiary = projectUsers?.find(
    projectUser => parseInt(projectUser?.role, 10) === ROLES_IDS.beneficiary
  )?.users?.[0];
  return beneficiary?.id === userId;
};

export const checkIsInvestorByProject = ({ user, project }) => {
  const userId = user?.id;
  const projectUsers = project?.users;
  const investor = projectUsers?.find(
    projectUser => parseInt(projectUser?.role, 10) === ROLES_IDS.investor
  )?.users?.[0];
  return investor?.id === userId;
};

export const checkIsAuditorByProject = ({ user, project }) => {
  const userId = user?.id;
  const projectUsers = project?.users;
  const auditors = projectUsers?.find(
    projectUser => parseInt(projectUser?.role, 10) === ROLES_IDS.auditor
  )?.users;
  return auditors?.some(auditor => auditor?.id === userId);
};

export const checkIsBeneficiaryOrInvestorByProject = ({ user, project }) =>
  checkIsBeneficiaryByProject({ user, project }) || checkIsInvestorByProject({ user, project });

export const checkRoleByProject = ({ user, project }) => {
  if (user?.isAdmin) return { name: 'Administrator' };
  if (checkIsBeneficiaryByProject({ user, project }))
    return { id: ROLES_IDS.beneficiary, name: 'Beneficiary' };
  if (checkIsInvestorByProject({ user, project }))
    return { id: ROLES_IDS.investor, name: 'Investor' };
  if (checkIsAuditorByProject({ user, project })) return { id: ROLES_IDS.auditor, name: 'Auditor' };
};
