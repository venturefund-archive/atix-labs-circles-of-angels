const { ROLES_IDS } = require('components/organisms/AssignProjectUsers/constants');

export const isBeneficiaryOrInvestor = (user, projectId) => {
  const userProject =
    user?.projects.find(project => parseInt(project.projectId, 10) === parseInt(projectId, 10)) ||
    false;

  return (
    user &&
    (userProject?.roles?.includes(ROLES_IDS.beneficiary) ||
      userProject?.roles?.includes(ROLES_IDS.investor))
  );
};

export const isProjectAuditor = (user, projectId) => {
  const userProject =
    user?.projects.find(project => parseInt(project.projectId, 10) === parseInt(projectId, 10)) ||
    false;

  return user && userProject?.roles?.includes(ROLES_IDS.auditor);
};
