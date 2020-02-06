/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import './_style.scss';
import './_back-office-projects.scss';
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects';
import {
  useGetProjects,
  updateProjectStatus,
  publish
} from '../api/projectApi';
import { projectStatuses } from '../constants/constants';

const BackOfficeProjects = () => {
  const [data] = useGetProjects();
  const [projects, setProjects] = useState([]);

  const handleReject = async projectId => {
    try {
      await updateProjectStatus(projectId, projectStatuses.REJECTED);

      // TODO change useGetProjects hook for a normal apicall in order to fetch projects again here
      // changeProjectStatus(index, newCollection);

      message.success('Project status changed correctly');
    } catch (error) {
      message.error(error);
    }
  };

  const handleConfirm = async projectId => {
    const response = publish(projectId);
    if (response.errors) return message.error(response.errors);
    message.success('Project status changed correctly');
  };

  // TODO this is not valid at this moment. Analize if will do something similar
  // const changeProjectStatus = async (milestoneId, budgetStatusId) => {
  //   try {
  //     const response = await changeBudgetStatus(milestoneId, budgetStatusId);

  //     message.success('Status changed successfully');
  //     return response;
  //   } catch (error) {
  //     message.error(error);
  //   }
  // };

  useEffect(() => {
    setProjects(data);
  }, [data]);

  return (
    <div className="TableContainer">
      <h1>Projects Administration</h1>
      <TableBOProjects
        data={projects}
        onConfirm={projectId => handleConfirm(projectId)}
        onReject={projectId => handleReject(projectId)}
      />
    </div>
  );
};

export default BackOfficeProjects;
