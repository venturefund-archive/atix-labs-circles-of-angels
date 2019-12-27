/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import TableAdminProjects from '../components/organisms/TableAdmin/TableAdminProjects';
import './_style.scss';
import './_fund-administration.scss';
import {
  getTransferListOfProject,
  updateStateOfTransference
} from '../api/transferApi';
import { useGetProjects } from '../api/projectApi';

const FundAdministration = () => {
  const [data] = useGetProjects();
  const [projects, setProjects] = useState([]);

  const saveStatus = (transferId, state) => {
    updateStateOfTransference(transferId, state);
    message.success('Status changed successfuly!');
  };

  const getTransfers = async projectId => {
    const transfers = await getTransferListOfProject(parseInt(projectId, 10));
    return transfers || [];
  };

  useEffect(() => {
    setProjects(data);
  }, [data]);

  return (
    <div className="FundAdminContainer">
      <h1>Funds Administration</h1>
      <TableAdminProjects
        data={projects}
        saveStatus={saveStatus}
        getTransfers={getTransfers}
      />
    </div>
  );
};

export default FundAdministration;
