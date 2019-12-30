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
import TableBOUsers from '../components/organisms/TableBOUsers/TableBOUsers';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getUsers,
  changeUserRegistrationStatus,
  getAllRoles
} from '../api/userApi';

const BackOfficeUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchUsers = async () => {
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
  };

  // TODO user registration validation has changed, this will be handle in a future task
  // const changeRegistrationStatus = async (userId, registrationStatus) => {
  //   const response = await changeUserRegistrationStatus(
  //     userId,
  //     registrationStatus.id
  //   );

  //   if (!response || response.error) {
  //     const { error } = response;
  //     const title = error.response
  //       ? 'Error Changing User Registration Status'
  //       : error.message;
  //     const content = error.response
  //       ? error.response.data.error
  //       : error.message;
  //     showModalError(title, content);
  //   } else {
  //     showModalSuccess('Success!', response.data.success);
  //     const updatedUser = users.find(user => user.id === userId);
  //     updatedUser.registrationStatus = registrationStatus;
  //   }

  //   return response;
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
