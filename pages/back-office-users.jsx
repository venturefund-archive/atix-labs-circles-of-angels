/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import './_style.scss';
import './_back-office-users.scss';
import { message } from 'antd';
import TableBOUsers from '../components/organisms/TableBOUsers/TableBOUsers';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getUsers,
  changeUserRegistrationStatus,
  getAllRoles
} from '../api/userApi';
import formatError from '../helpers/errorFormatter';

const BackOfficeUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchUsers = async () => {
    try {
      const roleFilters = [];
      const usersFound = await getUsers();
      const roles = await getAllRoles();

      if (roles.length) {
        roles.forEach(role => {
          roleFilters.push({
            text: role.toUpperCase(),
            value: role
          });
        });
      }

      setUsers(usersFound || []);
      setFilters({ roles: roleFilters });
    } catch (error) {
      message.error(formatError(error));
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
  //     message.error(formatError(error));
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
