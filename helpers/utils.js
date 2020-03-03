import RolesMap from '../constants/RolesMap';

export const isOwner = (project, user) => project.owner === user.id;

export const isOracle = (task, user) => task.oracle === user.id;

export const isFunder = (user, funders) =>
  funders.find(funder => funder.id === user.id);

export const isSupporter = user =>
  user && user.role === RolesMap.PROJECT_SUPPORTER;

export const isEntrepreneur = user =>
  user && user.role === RolesMap.ENTREPRENEUR;
