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
import { getMilestones, transferredMilestone } from '../api/milestonesApi';
import { claimMilestoneStatus } from '../constants/constants';

const BackOfficeMilestones = () => {
  const [milestones, setMilestones] = useState([]);

  const fetchMilestones = async () => {
    // TODO filters should be defined and added
    const response = await getMilestones({
      claimStatus: [
        claimMilestoneStatus.CLAIMED,
        claimMilestoneStatus.TRANSFERRED
      ]
    });

    if (response.errors) {
      message.error(response.errors);
      return;
    }

    setMilestones(response.data);
  };

  const onFundsTransferred = async milestoneId => {
    const response = await transferredMilestone(milestoneId);

    if (response.errors) {
      message.error(response.errors);
      return;
    }

    fetchMilestones();
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
