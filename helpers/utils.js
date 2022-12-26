import { VALID_EMAIL_REGEX } from 'constants/Regex';
import RolesMap from '../constants/RolesMap';
import { ERROR_MESSAGES, publicProjectStatuses } from '../constants/constants';

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
    errorsToShow.includes(typeOfError);
    if (errorsToShow.includes(typeOfError)) return ERROR_MESSAGES[typeOfError];
    return undefined;
  });

  const cleanedErrors = errors.filter(error => error);

  return cleanedErrors;
};

export const generateQueryString = queries => {
  const result = `?${new URLSearchParams(queries).toString()}`;
  return result;
};

export const cleanObject = object => {
  const _object = { ...object };
  Object.entries(_object).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      cleanObject(v);
    }
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
      if (Array.isArray(_object)) {
        _object.splice(k, 1);
      } else {
        delete _object[k];
      }
    }
  });
  return _object;
};

export const checkValidEmail = input => VALID_EMAIL_REGEX.test(input);

export const getFileNameFromUrl = url => url?.split('/').pop();

export const getExtensionFromUrl = url => url?.split('.')?.at(-1);

export const decimalCount = num => {
  const numStr = String(num);
  if (numStr.includes('.')) {
    return numStr.split('.')[1].length;
  }
  return 0;
};

export const capitalizeFirstLetter = (string = '') =>
  string.charAt?.(0)?.toUpperCase() + string?.slice(1);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const nth = d => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getDateAndTime = (date, format) => {
  if (!date) return '';
  const newDate = new Date(date).toLocaleString('en-us', { hour12: false });

  const [_date, time] = newDate?.split(',');

  const localeDateParsed = new Date(_date);

  const [hours, minutes] = time?.split?.(' ')[1]?.split(':');

  const month = localeDateParsed.getMonth();
  const day = localeDateParsed.getDate();
  const year = localeDateParsed.getFullYear();

  if (format === 'minimal') return `${month}/${day}/${year} - ${hours}:${minutes}`;
  return `${months[month]}, ${day}${nth(day)} ${year} - ${hours}:${minutes}`;
};
