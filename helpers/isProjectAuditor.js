import { ROLES_IDS } from '../components/organisms/AssignProjectUsers/constants';

export const isProjectAuditor = (user, projectId) => {
  const userProject = user?.projects.find(
    (project) => parseInt(project.projectId, 10) === parseInt(projectId, 10)) || false;

  return user && userProject.roles.includes(ROLES_IDS.auditor);
}
