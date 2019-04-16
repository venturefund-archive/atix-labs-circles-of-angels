import React from 'react';
import { Table } from 'antd';
import { getProject } from '../api/projectApi';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import Routing from '../components/utils/Routes';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import ProjectStatus from '../constants/ProjectStatus';

import './_style.scss';
import './_back-office-projec-detail.scss';

const columns = [
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    key: 'projectName'
  },
  {
    title: 'Mission',
    dataIndex: 'mission',
    key: 'mission'
  },
  {
    title: 'Problem Addressed',
    dataIndex: 'problemAddressed',
    key: 'problemAddressed'
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: 'Timeframe',
    dataIndex: 'timeframe',
    key: 'timeframe'
  },
  {
    title: 'Goal Amount',
    dataIndex: 'goalAmount',
    key: 'goalAmount'
  },
  {
    title: 'FAQ Link',
    dataIndex: 'faqLink',
    key: 'faqLink'
  }
];

class BackofficeProjectDetail extends React.Component {
  static async getInitialProps({ query }) {
    const { projectId } = query;
    const project = (await getProject(projectId)).data;
    return { projectId, project };
  }

  render() {
    const { project } = this.props;
    console.log(project);
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <div className="HeaderProjectDetail">
              <img
                src="./static/images/button-arrow-back.svg"
                onClick={Routing.goBack}
              />
              <h1>Project Details</h1>
            </div>
            <Table columns={columns} dataSource={[project]} />
            {ProjectStatus.IN_PROGRESS === project.status ? (
              <CustomButton
                theme="Primary"
                buttonText="View Progress"
                onClick={() =>
                  Routing.toProjectProgress({
                    projectId: project.id
                  })
                }
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BackofficeProjectDetail;
