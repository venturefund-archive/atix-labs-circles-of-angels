import React, { Component } from 'react';
import Link from 'next/link';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import './_style.scss';
import './_concensus.scss';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../components/atoms/ButtonCancel/ButtonCancel';
import { getUsers } from '../api/userProjectApi';
import { getTransferListOfProject } from '../api/transferApi';
import signStatusMap from '../model/signStatusMap';
import transferStatusMap from '../model/transferStatus';

class SignatoriesIf extends Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const users = await getUsers(projectId);
    const transfers = await getTransferListOfProject(projectId);
    return { userProjects: users.data, projectId, transfers };
  }

  render() {
    const { userProjects, projectId, transfers } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf stepNumber={1} />
          <div className="SignatoriesContainer">
            <h1>Signatories</h1>
            <p>
              Sign your agreement and pledge to help this project come to true
            </p>
            <div className="SignatoryList">
              {userProjects.map(userProject => {
                const userTransfer = transfers.filter(
                  transfer => transfer.sender === userProject.user.id
                )[0];
                return (
                  <SignatoryItem
                    key={userProject.id}
                    userId={userProject.user.id}
                    username={userProject.user.username}
                    tfStatusShow={transferStatusMap[userTransfer.state].show}
                    tfStatusIcon={transferStatusMap[userTransfer.state].icon}
                    tfStatusName={transferStatusMap[userTransfer.state].name}
                    sgStatusShow={signStatusMap[userProject.status].show}
                    sgStatusIcon={signStatusMap[userProject.status].icon}
                    sgStatusName={signStatusMap[userProject.status].name}
                    nameInitials={userProject.user.username
                      .charAt(0)
                      .toUpperCase()}
                    signStatus={userProject.status}
                    projectId={projectId}
                  />
                );
              })}
            </div>
            <div className="ControlSteps">
              <ButtonCancel text="Cancel" />
              <Link href="tranfer-funds">
                <ButtonPrimary text="Continue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignatoriesIf;
