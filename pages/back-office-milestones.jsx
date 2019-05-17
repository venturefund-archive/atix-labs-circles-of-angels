import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import Routing from '../components/utils/Routes';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
} from '../api/milestonesApi';
import { withUser } from '../components/utils/UserContext';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';

import './_style.scss';
import './_back-office-projects.scss';

class BackOfficeMilestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      budgetStatus: []
    };
  }

  componentDidMount = async () => {
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
    this.setState({ milestones: sortedMilestones, budgetStatus });
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

    Routing.toBackofficeMilestones();
    return response;
  };

  render() {
    const { milestones, budgetStatus } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
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

export default withUser(BackOfficeMilestones);
