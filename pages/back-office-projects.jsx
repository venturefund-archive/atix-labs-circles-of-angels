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
import { getProjects, publish } from '../api/projectApi';
import { projectStatuses } from '../constants/constants';

const BackOfficeProjects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response);
    } catch (error) {
      message.error(error);
    }
  };

  const handleReject = async projectId => {
    try {
      await updateProjectStatus(projectId, projectStatuses.REJECTED);
      fetchProjects();
      message.success('Project status changed correctly');
    } catch (error) {
      message.error(error);
    }
  };

  const handleConfirm = async projectId => {
    const response = await publish(projectId);
    if (response.errors) return message.error(response.errors);
    fetchProjects();
    message.success('Project status changed correctly');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="TableContainer">
      <h1>Projects Administration</h1>
      <TableBOProjects
        data={projects}
        onConfirm={projectId => handleConfirm(projectId)}
        onReject={projectId => handleReject(projectId)}
        fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default BackOfficeProjects;
