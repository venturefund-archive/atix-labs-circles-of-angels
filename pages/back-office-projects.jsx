import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects';
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import Routing from '../components/utils/Routes';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { getProjects } from '../api/projectApi';
import {
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
} from '../api/milestonesApi';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';

import './_style.scss';
import './_back-office-projects.scss';

class BackOfficeProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects
    };
  }

  static async getInitialProps(query) {
    const projects = (await getProjects()).data;
    const { milestones } = (await getAllMilestones()).data;
    const filterMilestones = milestones.filter(
      milestone => milestone.status.status === MilestoneActivityStatus.COMPLETED
    );

    const sortedMilestones = filterMilestones.sort((a, b) => {
      // Order by budgetStatus:Pending>Completed first
      if (b.budgetStatus.id < a.budgetStatus.id) {
        return 1;
      }
      if (b.budgetStatus.id > a.budgetStatus.id) {
        return -1;
      }

      // Order by higher id (newer) second
      if (b.id > a.id) {
        return 1;
      }
      return -1;
    });
    const { budgetStatus } = (await getAllBudgetStatus()).data;
    return { projects, milestones: sortedMilestones, budgetStatus };
  }

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
    const { milestones, budgetStatus } = this.props;
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
          <div className="TableContainer">
            <h1>Milestones Administration</h1>
            <TableBOMilestones
              dataSource={milestones}
              budgetStatusOptions={budgetStatus}
              onBudgetStatusChange={this.changeBudgetStatus}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeProjects;
