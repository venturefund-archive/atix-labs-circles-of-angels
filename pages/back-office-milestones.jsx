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
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
} from '../api/milestonesApi';
import { withUser } from '../components/utils/UserContext';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';
import MilestoneBudgetStatus from '../constants/MilestoneBudgetStatus';

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

  getMilestones = async () => {
    const { milestones } = (await getAllMilestones()).data;
    const filterMilestones = milestones.filter(
      milestone =>
        milestone.budgetStatus.id === MilestoneBudgetStatus.CLAIMED ||
        milestone.budgetStatus.id === MilestoneBudgetStatus.FUNDED
    );

    const sortedMilestones = filterMilestones.sort((a, b) => {
      // Order by budgetStatus:Pending>Completed first
      if (b.budgetStatus.id === MilestoneBudgetStatus.CLAIMED) {
        return 1;
      }
      return -1;

      // Order by higher id (newer) second
      if (b.id > a.id) {
        return 1;
      }
      return -1;
    });
    return sortedMilestones;
  };

  componentDidMount = async () => {
    const milestones = await this.getMilestones();
    const { budgetStatus } = (await getAllBudgetStatus()).data;
    this.setState({ milestones, budgetStatus });
  };

  onFundsTransferred = async milestoneId => {
    const response = await changeBudgetStatus(
      milestoneId,
      MilestoneBudgetStatus.FUNDED
    );
    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Changing Transfer Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return;
    }
    showModalSuccess('Success!', response.data.success);

    const milestones = await this.getMilestones();
    this.setState({ milestones });
  };

  render() {
    const { milestones } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Milestones Administration</h1>
            <TableBOMilestones
              dataSource={milestones}
              onFundsTransferred={this.onFundsTransferred}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(BackOfficeMilestones);
