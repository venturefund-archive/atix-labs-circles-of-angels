import RolesMap from '../constants/RolesMap';
import { ERROR_MESSAGES, ERROR_TYPES, publicProjectStatuses } from '../constants/constants';

export const isOwner = (project, user) => project.owner === user.id;

export const isOracle = (task, user) => task.oracle === user.id;

export const isFunder = (user, funders) => funders.find(funder => funder.id === user.id);

export const isSupporter = user => user && user.role === RolesMap.PROJECT_SUPPORTER;

export const isEntrepreneur = user => user && user.role === RolesMap.ENTREPRENEUR;

export const isCurator = user => user && user.role === RolesMap.PROJECT_CURATOR;

export const filterAbortedProjects = milestones =>
  milestones.filter(({ project: { status } }) => status !== publicProjectStatuses.ABORTED);

export const getErrorTypes = (errors = []) => {
  const typeOfErrors = [];

  Object.entries(errors).forEach(([, value]) => {
    if (value) typeOfErrors.push(...value);
  });
  const uniqueErrors = [...new Set(typeOfErrors)];
  return uniqueErrors;
};

export const getErrorMessagesFields = (currentErrors, errorsToShow = []) => {
  const typesOfErrors = getErrorTypes(currentErrors);

  const errors = typesOfErrors.map(typeOfError => {
    errorsToShow.includes(typeOfError); //
    if (errorsToShow.includes(typeOfError)) return ERROR_MESSAGES[typeOfError];
    return undefined;
  });

  const cleanedErrors = errors.filter(error => error);

  return cleanedErrors;
};

export const getErrorMessagesField = (currentErrorState = [], errorsToShow = []) => {
  const errors = currentErrorState.map(typeOfError => {
    errorsToShow.includes(typeOfError); //
    if (errorsToShow.includes(typeOfError)) return ERROR_MESSAGES[typeOfError];
    return undefined;
  });

  const cleanedErrors = errors.filter(error => error);

  return cleanedErrors;
};
