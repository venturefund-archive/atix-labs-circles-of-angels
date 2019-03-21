import React, { Component } from 'react';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import './_style.scss';
import './_concensus.scss';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem';
import { getUsers } from '../api/userProjectApi';
import signStatusMap from '../model/signStatusMap';

class SignatoriesIf extends Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getUsers(projectId);
    return { userProjects: response.data, projectId };
  }

  render() {
    const { userProjects, projectId } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf />
          <div className="SignatoriesContainer">
            <h1>Signatories</h1>
            <p>
              Sign your agreement and pledge to help this project come to true
            </p>
            <div className="SignatoryList">
              {userProjects.map(userProject => (
                <SignatoryItem
                  key={userProject.id}
                  userId={userProject.user.id}
                  username={userProject.user.username}
                  tfStatusShow={signStatusMap[userProject.status].show}
                  tfStatusIcon={signStatusMap[userProject.status].icon}
                  tfStatusName={signStatusMap[userProject.status].name}
                  nameInitials={userProject.user.username
                    .charAt(0)
                    .toUpperCase()}
                  signStatus={userProject.status}
                  projectId={projectId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignatoriesIf;
