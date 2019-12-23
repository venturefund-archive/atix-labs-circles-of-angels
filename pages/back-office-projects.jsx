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
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import { changeBudgetStatus } from '../api/milestonesApi';
import { useGetProjects } from '../api/projectApi';

const BackOfficeProjects = () => {
  const [data] = useGetProjects();
  const [projects, setProjects] = useState([]);

  const changeProjectStatus = async (milestoneId, budgetStatusId) => {
    try {
      const response = await changeBudgetStatus(milestoneId, budgetStatusId);

      showModalSuccess('Success!', response.data.success);
      return response;
    } catch (error) {
      // TODO check this
      const title = error.response
        ? 'Error Changing Transfer Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
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
