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
import Login from './login';
import PrivateRoute from '../components/utils/PrivateRoute';
import SideBar from '../components/organisms/SideBar/SideBar';
import Header from '../components/molecules/Header/Header';
import MyProjects from './my-projects';
import BackOfficeEditProject from './back-office-edit-project';
import BackofficeMilestones from './back-office-milestones';
import BackofficeProjectDetail from './back-office-project-detail';
import BackofficeProjects from './back-office-projects';
import BackofficeUsers from './back-office-users';
import { withUser } from '../components/utils/UserContext';
import ConcensusMilestones from './concensus-milestones';
import CreateProject from './create-project';
import Experiences from './experiences';
import ExploreProjects from './explore-projects';
import FundAdministration from './fund-administration';
import NewExperiences from './new-experiences';
import PasswordRecovery from './passwordRecovery';
import ProjectDetail from './project-detail';
import ProjectEvidence from './project-evidence';
import ProjectProgress from './project-progress';
import Register from './register';
import RegisterSteps from './registersteps';
import TransferFundsConfirmation from './tranfer-funds-confirmation';
import TransferFunds from './tranfer-funds';

function Main({ getLoggedUser }) {
  const authenticated = !!getLoggedUser();
  return (
    <div className="AppContainer">
      {authenticated && <SideBar />}
      <div className="MainContent">
        {authenticated && <Header />}
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/register-wizard" component={RegisterSteps} />
              <Route path="/password-recovery" component={PasswordRecovery} />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/explore-projects"
                component={ExploreProjects}
              />

              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/experiences"
                component={Experiences}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/create-project"
                component={CreateProject}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/concensus-milestones"
                component={ConcensusMilestones}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/my-projects"
                component={MyProjects}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/edit-project"
                component={BackOfficeEditProject}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/milestones"
                component={BackofficeMilestones}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/project-detail-administration"
                component={BackofficeProjectDetail}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/projects-dashboard"
                component={BackofficeProjects}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/users"
                component={BackofficeUsers}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/fund-administration"
                component={FundAdministration}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/new-experiences"
                component={NewExperiences}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/project-detail"
                component={ProjectDetail}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/project-evidence"
                component={ProjectEvidence}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/project-progress"
                component={ProjectProgress}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/transfer-funds"
                component={TransferFunds}
              />
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/transfer-funds-confirmation"
                component={TransferFundsConfirmation}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  getLoggedUser: PropTypes.func.isRequired
};

export default withUser(Main);
