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
import { withUser } from '../components/utils/UserContext';

// TODO hide header and sidebar in pages that shouldn't render them
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
              <PrivateRoute
                exact
                authenticated={authenticated}
                path="/my-projects"
                component={MyProjects}
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
