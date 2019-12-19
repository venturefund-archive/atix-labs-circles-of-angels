/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../../utils/PrivateRoute';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';
import BackofficeProjects from '../../../pages/back-office-projects';
import CreateProject from '../../../pages/create-project';
import ExploreProjects from '../../../pages/explore-projects';
import PasswordRecovery from '../../../pages/passwordRecovery';
import Landing from '../../../pages/landing';
import RegisterSteps from '../../../pages/registerSteps/registersteps';
import ProjectDetail from '../../../pages/project-detail'
import { useUserContext } from '../../utils/UserContext';

const routesConfig = [
  {
    path: '/',
    component: Landing,
    authentication: { required: false, redirect: '/explore-projects' }
  },
  {
    path: '/landing',
    component: Landing,
    authentication: { required: false, redirect: '/explore-projects' }
  },
  {
    path: '/passwordRecovery',
    component: PasswordRecovery,
    authentication: { required: false, redirect: '/explore-projects' }
  },
  {
    path: '/register',
    component: RegisterSteps,
    authentication: { required: false, redirect: '/explore-projects' }
  },
  {
    path: '/explore-projects',
    component: ExploreProjects,
    authentication: { required: true }
  },
  {
    path: '/create-project',
    component: CreateProject,
    authentication: { required: true }
  },
  {
    path: '/back-office-projects',
    component: BackofficeProjects,
    authentication: { required: true }
  },
  {
    path: '/explore-projects',
    component: ExploreProjects,
    authentication: { required: true }
  },
  {
    path: '/project-detail',
    component: ProjectDetail,
    authentication: { required: true }
  }
];

function Router(props) {
  const { getLoggedUser } = useUserContext();
  const authenticated = getLoggedUser() !== undefined;
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
