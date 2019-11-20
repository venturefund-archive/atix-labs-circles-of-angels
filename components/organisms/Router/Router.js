/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from '../../../pages/login';
import PrivateRoute from '../../utils/PrivateRoute';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';
import BackofficeProjects from '../../../pages/back-office-projects';
import CreateProject from '../../../pages/create-project';
import ExploreProjects from '../../../pages/explore-projects';
import PasswordRecovery from '../../../pages/passwordRecovery';
import Landing from '../../../pages/landing';
import Recovery from '../../../pages/recovery';
import RegisterSteps from '../../../pages/registersteps';

import { withUser, useUserContext } from '../../utils/UserContext';
import CreateMilestonesFormContainer from '../CreateMilestonesFormContainer/CreateMilestonesFormContainer';
import ProjectDetailFormContainer from '../ProjectDetailFormContainer/ProjectDetailFormContainer';

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
    {
    path: '/project-detail',
    component: ProjectDetailFormContainer,
    authenticated: false
  },
  {
    path: '/create-milestones',
    component: CreateMilestonesFormContainer,
    authenticated: true
  },
  { path: '/landing', component: Landing, requireAuthentication: false },
];

function Router(props) {
  const context = useUserContext();
  const authenticated = context.getLoggedUser() !== undefined;
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
