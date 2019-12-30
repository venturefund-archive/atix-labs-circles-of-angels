/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import './_style.scss';
import './_back-office-projects.scss';
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
} from '../api/milestonesApi';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';
import MilestoneBudgetStatus from '../constants/MilestoneBudgetStatus';

const BackOfficeMilestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState([]);

  const fetchMilestones = async () => {
    const milestonesFound = await getAllMilestones();
    // const { budgetStatus } = (await getAllBudgetStatus()).data;
    setMilestones(milestonesFound);
    // setBudgetStatus(budgetStatus);
  };

  // TODO this funtionality is not defined yet
  const onFundsTransferred = async milestoneId => {
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

  useEffect(() => {
    fetchMilestones();
  }, []);

  return (
    <div className="TableContainer">
      <h1>Milestones Administration</h1>
      <TableBOMilestones
        data={milestones}
        onFundsTransferred={onFundsTransferred}
      />
    </div>
  );
};

export default BackOfficeMilestones;
