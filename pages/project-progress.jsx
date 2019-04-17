import React from 'react';
import { Icon, Breadcrumb } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableProjectProgress from '../components/organisms/TableProjectProgress/TableProjectProgress';
import Routing from '../components/utils/Routes';
import {
  getProjectMilestones,
  getActualProjectAmount,
  getProject
} from '../api/projectApi';
import { getUsers } from '../api/userProjectApi';
import { getTransferListOfProject } from '../api/transferApi';
import { getOracles } from '../api/userApi';
import { withUser } from '../components/utils/UserContext';
class ProjectProgress extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const project = (await getProject(projectId)).data;
    const milestonesResponse = await getProjectMilestones(projectId);
    const users = await getUsers(projectId);
    const transfers = await getTransferListOfProject(projectId);
    const oracles = await getOracles();
    const actualAmount = (await getActualProjectAmount(projectId)).data;
    const milestonesAndActivities = [];

    milestonesResponse.data.forEach(milestone => {
      milestonesAndActivities.push(milestone);
      milestone.activities.forEach((activity, j) => {
        const activityWithId = {
          ...activity,
          type: `Activity ${j + 1}`
        };
        milestonesAndActivities.push(activityWithId);
      });
    });

    return {
      milestones: milestonesAndActivities,
      projectName: project.projectName,
      userProjects: users.data,
      projectId,
      transfers,
      oracles,
      actualAmount
    };
  }

  render() {
    const {
      projectName,
      milestones,
      projectId,
      isBackofficeAdmin
    } = this.props;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="Content">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    if (isBackofficeAdmin) Routing.goBack();
                    else Routing.toProjectDetail({ projectId });
                  }}
                >
                  <Icon type="arrow-left" />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Project Progress</Breadcrumb.Item>
            </Breadcrumb>
            <div className="ProjectInfoHeader">
              <div className="space-between">
                <div>
                  <p className="LabelSteps">Project Name</p>
                  <h1>{projectName}</h1>
                </div>
              </div>
            </div>
            <TableProjectProgress
              dataSource={milestones}
              projectName={projectName}
              projectId={projectId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectProgress);
