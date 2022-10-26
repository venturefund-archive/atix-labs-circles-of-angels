/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import TableAdminProjects from '../components/organisms/TableAdmin/TableAdminProjects';
import { getTransferListOfProject } from '../api/transferApi';
import { getFundingProjects } from '../api/projectApi';

const FundAdministration = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await getFundingProjects();
    if (response.errors) {
      setProjects([]);
      message.error(response.errors);
      return;
    }
    setProjects(response.data);
  };

  const fetchTransfers = async projectId => {
    try {
      const transfers = await getTransferListOfProject(parseInt(projectId, 10));
      return transfers || [];
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="FundAdminContainer">
      <h1>Funds Administration</h1>
      <TableAdminProjects data={projects} fetchTransfers={fetchTransfers} />
    </div>
  );
};

export default FundAdministration;
