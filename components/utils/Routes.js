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
const projectEvidence = '/project-evidence';
const backOfficeUsers = '/back-office-users';
const backOfficeMilestones = '/back-office-milestones';
const register = '/register';
const recovery = '/recovery';
const myProjects = '/my-projects';
const editProject = '/back-office-edit-project';

const goToRoute = (route, query) => {
  Router.push({ pathname: route, query });
};

const Routing = {
  toBackOffice: query => {
    goToRoute(backOffice, query);
  },
  toProjectProgress: query => {
    goToRoute(projectProgress, query);
  },
  toProjectEvidence: query => {
    goToRoute(projectEvidence, query);
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
  toBackOfficeUsers: query => {
    goToRoute(backOfficeUsers, query);
  },
  goBack: () => {
    Router.back();
  },
  toBackofficeMilestones: query => {
    goToRoute(backOfficeMilestones, query);
  },
  toRegister: query => {
    goToRoute(register, query);
  },
  toRecoveryPassword: query => {
    goToRoute(recovery, query);
  },
  toMyProjects: query => {
    goToRoute(myProjects, query);
  },
  toEditProject: query => {
    goToRoute(editProject, query);
  }
};

export default Routing;
