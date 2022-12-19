import { ROLES_IDS } from '../components/organisms/AssignProjectUsers/constants';

export const canAddEvidences = (user, projectId) => {
  const userProject = user?.projects.find(
    (project) => parseInt(project.projectId, 10) === parseInt(projectId, 10)) || false;

  return user &&
  (userProject?.roles?.includes(ROLES_IDS.beneficiary) ||
    userProject?.roles?.includes(ROLES_IDS.investor));
}
