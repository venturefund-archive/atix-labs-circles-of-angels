/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects';
import Routing from '../components/utils/Routes';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { getProjects } from '../api/projectApi';
import { changeBudgetStatus } from '../api/milestonesApi';
import { withUser } from '../components/utils/UserContext';

import './_style.scss';
import './_back-office-projects.scss';

class BackOfficeProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount = async () => {
    const projects = (await getProjects()).data;
    this.setState({ projects });
  };

  changeBudgetStatus = async (milestoneId, budgetStatusId, index) => {
    const response = await changeBudgetStatus(milestoneId, budgetStatusId);
    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Changing Transfer Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', response.data.success);
    }

    Routing.toBackOffice();
    return response;
  };

  updateProject = (index, project) => {
    const { projects } = this.state;
    projects[index] = project;
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Projects Administration</h1>
            <TableBOProjects
              dataSource={projects}
              onStateChange={this.updateProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(BackOfficeProjects);
