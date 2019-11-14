/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../../../pages/login';
import PrivateRoute from '../../utils/PrivateRoute';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';
import MyProjects from '../../../pages/my-projects';
import BackOfficeEditProject from '../../../pages/back-office-edit-project';
import BackofficeMilestones from '../../../pages/back-office-milestones';
import BackofficeProjectDetail from '../../../pages/back-office-project-detail';
import BackofficeProjects from '../../../pages/back-office-projects';
import BackofficeUsers from '../../../pages/back-office-users';
import { withUser } from '../../utils/UserContext';
import ConcensusMilestones from '../../../pages/concensus-milestones';
import CreateProject from '../../../pages/create-project';
import Experiences from '../../../pages/experiences';
import ExploreProjects from '../../../pages/explore-projects';
import FundAdministration from '../../../pages/fund-administration';
import NewExperiences from '../../../pages/new-experiences';
import PasswordRecovery from '../../../pages/passwordRecovery';
import ProjectDetail from '../../../pages/project-detail';
import ProjectEvidence from '../../../pages/project-evidence';
import ProjectProgress from '../../../pages/project-progress';
import Landing from '../../../pages/landing';
import Recovery from '../../../pages/recovery';
import RegisterSteps from '../../../pages/registersteps';
import TransferFundsConfirmation from '../../../pages/tranfer-funds-confirmation';
import TransferFunds from '../../../pages/tranfer-funds';

const routesConfig = [
  { path: '/', component: Landing, requireAuthentication: false },
  { path: '/landing', component: Landing, requireAuthentication: false },
  { path: '/login', component: Login, requireAuthentication: false },
  { path: '/recovery', component: Recovery, requireAuthentication: false },
  {
    path: '/passwordRecovery',
    component: PasswordRecovery,
    requireAuthentication: false
  },
  { path: '/register', component: RegisterSteps, requireAuthentication: false },
  {
    path: '/explore-projects',
    component: ExploreProjects,
    requireAuthentication: true
  },
  {
    path: '/create-project',
    component: CreateProject,
    requireAuthentication: true
  },
  {
    path: '/back-office-projects',
    component: BackofficeProjects,
    requireAuthentication: true
  },
  {
    path: '/explore-projects',
    component: ExploreProjects,
    requireAuthentication: true
  },
  
];

function Router(props) {
  const authenticated = false;
  const routes = routesConfig.map(route => <PrivateRoute {...route} />);
  return (
    <div className="AppContainer">
      {authenticated && <SideBar />}
      <div className="MainContent">
        {authenticated && <Header />}
        <div>
          <BrowserRouter>
            <Switch>{routes}</Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default Router;
