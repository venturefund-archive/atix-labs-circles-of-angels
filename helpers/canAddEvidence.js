import { ACTIVITY_TYPES_ENUM } from 'model/activityTypes';
import { checkIsBeneficiaryByProject, checkIsInvestorByProject } from './roles';

export const canAddEvidences = ({ user, project, activityType }) => {
  if (!user) return false;

  if (activityType === ACTIVITY_TYPES_ENUM.FUNDING)
    return checkIsInvestorByProject({ user, project });

  if ([ACTIVITY_TYPES_ENUM.PAYBACK, ACTIVITY_TYPES_ENUM.SPENDING].includes(activityType))
    return checkIsBeneficiaryByProject({ user, project });
};
