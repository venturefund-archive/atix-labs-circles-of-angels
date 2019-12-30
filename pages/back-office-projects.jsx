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
import { changeBudgetStatus } from '../api/milestonesApi';
import { useGetProjects } from '../api/projectApi';

const BackOfficeProjects = () => {
  const [data] = useGetProjects();
  const [projects, setProjects] = useState([]);

  const changeProjectStatus = async (milestoneId, budgetStatusId) => {
    try {
      const response = await changeBudgetStatus(milestoneId, budgetStatusId);

      message.success('Status changed successfully');
      return response;
    } catch (error) {
      message.error(error);
    }
  };

  const updateProject = (index, project) => {
    projects[index] = project;
    setProjects(projects);
  };

  useEffect(() => {
    setProjects(data);
  }, [data]);

  return (
    <div className="TableContainer">
      <h1>Projects Administration</h1>
      <TableBOProjects data={projects} onStateChange={updateProject} />
    </div>
  );
};

export default BackOfficeProjects;
