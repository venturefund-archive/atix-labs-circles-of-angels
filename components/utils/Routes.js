import Router from 'next/router';
import Roles from '../../constants/RolesMap';

const backOffice = '/back-office-projects';
const backOfficeProjectDetails = '/back-office-project-detail';
const login = '/login';
const home = '/';
const exploreProjects = '/explore-projects';
const createProject = '/create-project';
const transferFunds = '/tranfer-funds';
const transferFundsConfirmation = '/tranfer-funds-confirmation';
const projectDetail = '/project-detail';
const signatories = '/signatories';
const consensusMilestones = '/concensus-milestones';
const fundAdministration = '/fund-administration';
const projectProgress = '/project-progress';

const Routing = {
  toBackOffice: query => {
    goToRoute(backOffice, query);
  },
  toLogin: query => {
    goToRoute(login, query);
  },
  toHome: query => {
    goToRoute(home, query);
  },
  toExploreProjects: query => {
    goToRoute(exploreProjects, query);
  },
  toCreateProject: query => {
    goToRoute(createProject, query);
  },
  toTransferFunds: query => {
    goToRoute(transferFunds, query);
  },
  toTransferFundsConfirmation: query => {
    goToRoute(transferFundsConfirmation, query);
  },
  toProjectDetail: query => {
    goToRoute(projectDetail, query);
  },
  toSignatories: query => {
    goToRoute(signatories, query);
  },
  toBackofficeProjectDetails: query => {
    goToRoute(backOfficeProjectDetails, query);
  },
  toConsensusMilestones: query => {
    goToRoute(consensusMilestones, query);
  },
  toUserHome: user => {
    if (!user) {
      Routing.toLogin();
    } else if (user.role.id === Roles.BackofficeAdmin) {
      Routing.toBackOffice();
    } else Routing.toExploreProjects();
  },
  toFundAdministration: query => {
    goToRoute(fundAdministration, query);
  },
  toProjectProgress: query => {
    goToRoute(projectProgress, query);
  }
};

const goToRoute = (route, query) => {
  Router.push({ pathname: route, query });
};

export default Routing;
