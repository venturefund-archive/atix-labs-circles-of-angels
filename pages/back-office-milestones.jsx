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
import { message } from 'antd';
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import {
  getAllMilestones,
  getAllBudgetStatus,
  changeBudgetStatus
} from '../api/milestonesApi';
import MilestoneBudgetStatus from '../constants/MilestoneBudgetStatus';
import formatError from '../helpers/errorFormatter';

const BackOfficeMilestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState([]);

  const fetchMilestones = async () => {
    try {
      const milestonesFound = await getAllMilestones();
      setMilestones(milestonesFound);

      // const { budgetStatus } = (await getAllBudgetStatus()).data;
      // setBudgetStatus(budgetStatus);
    } catch (error) {
      message.error(error);
    }
  };

  // TODO this funtionality is not defined yet
  const onFundsTransferred = async milestoneId => {
    try {
      await changeBudgetStatus(milestoneId, MilestoneBudgetStatus.FUNDED);

      const milestonesFound = await fetchMilestones();
      setMilestones(milestonesFound);
    } catch (error) {
      message.error(formatError(error));
    }
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
