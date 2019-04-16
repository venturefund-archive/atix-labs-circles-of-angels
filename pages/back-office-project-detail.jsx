import React from 'react';
import { Table } from 'antd';
import { getProject } from '../api/projectApi';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import Routing from '../components/utils/Routes';

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

const BackofficeProjectDetail = ({ projectDetail }) => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="TableContainer">
        <div className="HeaderProjectDetail">
          <img
            src="./static/images/button-arrow-back.svg"
            onClick={() => Routing.toBackOffice()}
          />
          <h1>Project Details</h1>
        </div>
        <Table columns={columns} dataSource={projectDetail} />
      </div>
    </div>
  </div>
);
BackofficeProjectDetail.getInitialProps = async ({ query }) => {
  const { projectId } = query;
  const project = (await getProject(projectId)).data;
  return { projectId, projectDetail: [project] };
};

export default BackofficeProjectDetail;
