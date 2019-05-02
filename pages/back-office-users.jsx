import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOUsers from '../components/organisms/TableBOUsers/TableBOUsers';
import Routing from '../components/utils/Routes';
import { showModalError, showModalSuccess } from '../components/utils/Modals';
import {
  getUsers,
  changeUserRegistrationStatus,
  getAllUserRegistrationStatus,
  getAllRoles
} from '../api/userApi';

import './_style.scss';
import './_back-office-users.scss';

class BackOfficeUsers extends React.Component {
  static async getInitialProps(query) {
    const roleFilters = [];
    const { users } = (await getUsers()).data;
    const sortedUsers = users.sort((a, b) => b.id - a.id);
    const { roles } = (await getAllRoles()).data;
    roles.forEach(role => {
      roleFilters.push({
        text: role.name,
        value: role.name
      });
    });
    const { registrationStatus } = (await getAllUserRegistrationStatus()).data;
    return {
      users: sortedUsers,
      registrationStatusList: registrationStatus,
      filters: { roles: roleFilters }
    };
  }

  changeRegistrationStatus = async (userId, registrationStatusId) => {
    const response = await changeUserRegistrationStatus(
      userId,
      registrationStatusId
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
    }

    Routing.toBackOfficeUsers();
    return response;
  };

  render() {
    const { registrationStatusList, filters, users } = this.props;
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

export default BackOfficeUsers;
