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

export const checkIsActivityAuditor = (user, activity) => user?.id === activity?.auditor;
