/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOUsers from '../components/organisms/TableBOUsers/TableBOUsers';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getUsers,
  changeUserRegistrationStatus,
  getAllUserRegistrationStatus,
  getAllRoles
} from '../api/userApi';
import { withUser } from '../components/utils/UserContext';

import './_style.scss';
import './_back-office-users.scss';

class BackOfficeUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      registrationStatusList: [],
      filters: {}
    };
  }

  async componentDidMount() {
    const roleFilters = [];
    const users = await getUsers();
    const sortedUsers = users.sort((a, b) => b.id - a.id);
    const { roles } = (await getAllRoles()).data;
    roles.forEach(role => {
      roleFilters.push({
        text: role.name,
        value: role.name
      });
    });
    const { registrationStatus } = (await getAllUserRegistrationStatus()).data;
    this.setState({
      users: sortedUsers,
      registrationStatusList: registrationStatus,
      filters: { roles: roleFilters }
    });
  }

  changeRegistrationStatus = async (userId, registrationStatus) => {
    const { users } = this.state;
    const response = await changeUserRegistrationStatus(
      userId,
      registrationStatus.id
    );
    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Changing User Registration Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', response.data.success);
      const updatedUser = users.find(user => user.id === userId);
      updatedUser.registrationStatus = registrationStatus;
      this.setState({ users });
    }

    return response;
  };

  render() {
    const { registrationStatusList, filters, users } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Users Administration</h1>
            <TableBOUsers
              dataSource={users}
              onRegistrationStatusChange={this.changeRegistrationStatus}
              registrationStatusOptions={registrationStatusList}
              filters={filters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(BackOfficeUsers);
