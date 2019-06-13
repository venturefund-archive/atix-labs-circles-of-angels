/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableAdminProjects from '../components/organisms/TableAdmin/TableAdminProjects';
import './_style.scss';
import './_fund-administration.scss';
import {
  getTransferListOfProject,
  updateStateOfTransference
} from '../api/transferApi';
import { withUser } from '../components/utils/UserContext';
import { getProjects } from '../api/projectApi';

class FundAdministration extends React.Component {
  static async getInitialProps(query) {
    const response = await getProjects();
    return { projects: response.data || [] };
  }

  saveStatus = (transferId, state) => {
    updateStateOfTransference(transferId, state);
    alert(`Status changed successfuly!`);
  };

  getTransfersOfProjects = async projectId => {
    const transfers = await getTransferListOfProject(parseInt(projectId, 10));
    console.log(transfers);
    return transfers || [];
  };

  render() {
    const { projects } = this.props;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="FundAdminContainer">
            <h1>Funds Administration</h1>
            <TableAdminProjects
              data={projects}
              saveStatus={this.saveStatus}
              getTransfersOfProjects={this.getTransfersOfProjects}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(FundAdministration);
