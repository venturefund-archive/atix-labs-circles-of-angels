import { ACTIVITY_TYPES_ENUM } from 'model/activityTypes';
import { ROLES_IDS } from '../components/organisms/AssignProjectUsers/constants';

export const canAddEvidences = ({ user, projectId, activityType }) => {
  const userProject =
    user?.projects.find(project => parseInt(project.projectId, 10) === parseInt(projectId, 10)) ||
    false;

  if (!user) return false;

  if (activityType === ACTIVITY_TYPES_ENUM.FUNDING)
    return userProject?.roles?.includes(ROLES_IDS.investor);

  if ([ACTIVITY_TYPES_ENUM.PAYBACK, ACTIVITY_TYPES_ENUM.SPENDING].includes(activityType))
    return userProject?.roles?.includes(ROLES_IDS.beneficiary);
};
