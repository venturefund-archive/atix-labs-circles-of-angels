import Router from 'next/router';

const backOffice = '/back-office-project';
const login = '/login';
const home = '/';
const exploreProjects = '/explore-projects';
const createProject = '/create-project-step1';
const transferFunds = '/tranfer-funds';
const transferFundsConfirmation = '/tranfer-funds-confirmation';

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
  }
};

const goToRoute = (route, query) => {
  Router.push({ pathname: route, query });
};

export default Routing;
