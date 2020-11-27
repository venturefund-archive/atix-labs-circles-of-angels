/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import './_style.scss';
import './_back-office-users.scss';
import { message } from 'antd';
import TableBOUsers from '../components/organisms/TableBOUsers/TableBOUsers';
import { getUsers } from '../api/userApi';
import userRoles from '../constants/RolesMap';

const BackOfficeUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const usersFound = response && response.users;
      const roleFilters = Object.values(userRoles)
        .filter(role => role !== userRoles.COA_ADMIN)
        .map(role => ({
          text: role.toUpperCase(),
          value: role
        }));
      setUsers(usersFound || []);
      setFilters({ roles: roleFilters || [] });
    } catch (error) {
      message.error(error);
    }
  };

  // TODO user registration validation has changed, this will be handle in a future task
  // const changeRegistrationStatus = async (userId, registrationStatus) => {
  //   try {
  //     const response = await changeUserRegistrationStatus(
  //       userId,
  //       registrationStatus.id
  //     );
  //     const updatedUser = users.find(user => user.id === userId);
  //     updatedUser.registrationStatus = registrationStatus;
  //     message.success('User updated successfully!');
  //     return response;
  //   } catch (error) {
  //     message.error(error);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="TableContainer">
      <h1>Users Administration</h1>
      <TableBOUsers data={users} filters={filters} />
    </div>
  );
};

export default BackOfficeUsers;
