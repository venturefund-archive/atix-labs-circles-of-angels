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
import BackofficeProjects from '../../../pages/back-office-projects';
import CreateProject from '../../../pages/create-project';
import ExploreProjects from '../../../pages/explore-projects';
import MyProjects from '../../../pages/my-projects';
import FundAdministration from '../../../pages/fund-administration';
import BackOfficeUsers from '../../../pages/back-office-users';
import BackOfficeMilestones from '../../../pages/back-office-milestones';
import PasswordRecovery from '../../../pages/passwordRecovery';
import Landing from '../../../pages/landing/landing';
import Recovery from '../../../pages/recovery';
import RegisterSteps from '../../../pages/registerSteps/registersteps';
import ProjectDetail from '../../../pages/project-detail';

const routesConfig = [
  {
    path: '/',
    component: Landing,
    authentication: { required: false, redirect: '/explore-projects' },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/landing',
    component: Landing,
    authentication: { required: false, redirect: '/explore-projects' },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/recovery',
    component: Recovery,
    authentication: { required: false, redirect: '/explore-projects' },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/passwordRecovery',
    component: PasswordRecovery,
    authentication: { required: false, redirect: '/explore-projects' },
    withHeader: false,
    withSideBar: false
  },
  {
    path: '/register',
    component: RegisterSteps,
    authentication: { required: false, redirect: '/explore-projects' },
    withHeader: false,
    withSideBar: false
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
    path: '/project-detail',
    component: ProjectDetail,
    authentication: { required: true }
  },
  {
    path: '/back-office-projects',
    component: BackofficeProjects,
    authentication: { required: true }
  },
  {
    path: '/my-projects',
    component: MyProjects,
    authentication: { required: true }
  },
  {
    path: '/fund-administration',
    component: FundAdministration,
    authentication: { required: true }
  },
  {
    path: '/back-office-users',
    component: BackOfficeUsers,
    authentication: { required: true }
  },
  {
    path: '/back-office-milestones',
    component: BackOfficeMilestones,
    authentication: { required: true }
  }
];

const Router = () => {
  const routes = routesConfig.map(route => <PrivateRoute {...route} />);
  return (
    <BrowserRouter>
      <Switch>{routes}</Switch>
    </BrowserRouter>
  );
};

export default Router;
