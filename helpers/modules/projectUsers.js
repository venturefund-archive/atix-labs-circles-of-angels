import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';

export const getProjectUsersPerRol = users => {
  const beneficiaries = users?.find(user => user?.role === ROLES_IDS.beneficiary.toString())?.users;
  const investors = users?.find(user => user?.role === ROLES_IDS.investor.toString())?.users;
  const auditors = users?.find(user => user?.role === ROLES_IDS.auditor.toString())?.users;
  return { beneficiaries, investors, auditors };
};

export const checkProjectHasAllUsersRoles = ({ beneficiaries, investors, auditors }) =>
  beneficiaries?.length > 0 && investors?.length > 0 && auditors?.length > 0;

export const checkProjectHasAllUsersWithFirstLogin = ({ beneficiaries, investors, auditors }) => {
  const allBeneficiariesWithFirstLogin = beneficiaries?.every(beneficiary => !beneficiary?.first);
  const allInvestorsWithFirstLogin = investors?.every(investor => !investor?.first);
  const allAuditorsWithFirstLogin = auditors?.every(auditor => !auditor?.first);

  return allBeneficiariesWithFirstLogin && allInvestorsWithFirstLogin && allAuditorsWithFirstLogin;
};

export const checkProjectHasAnyUserWithoutFirstLogin = ({ beneficiaries, investors, auditors }) => {
  const allBeneficiariesWithFirstLogin = beneficiaries?.some(beneficiary => beneficiary?.first);
  const allInvestorsWithFirstLogin = investors?.some(investor => investor?.first);
  const allAuditorsWithFirstLogin = auditors?.some(auditor => auditor?.first);
  return allBeneficiariesWithFirstLogin || allInvestorsWithFirstLogin || allAuditorsWithFirstLogin;
};

export const getUsersByRole = (role, users) =>
  users?.filter(user => user?.role === role.toString())?.[0]?.users;
