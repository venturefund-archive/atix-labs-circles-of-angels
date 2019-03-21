import React from 'react';
import { Tabs, message } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import UploadFile from '../components/molecules/UploadFile/UploadFile';
import DownloadAgreement from '../components/molecules/DownloadAgreement/DownloadAgreement';
import './_style.scss';
import './_concensus.scss';
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import {
  getProjectMilestones,
  downloadAgreement,
  uploadAgreement
} from '../api/projectApi';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class ConcensusMilestones extends React.Component {
  static async getInitialProps(query) {
    const { projectJSON } = query.query;
    const project = JSON.parse(projectJSON);
    const response = await getProjectMilestones(project.id);
    return { milestones: response.data, project };
  }

  handleClick = async () => {
    const { project } = this.props;

    const response = await downloadAgreement(project.id);
    console.log(response);
  };

  changeProjectAgreement = async info => {
    const { project } = this.props;
    const { status } = info.file;
    const projectAgreement = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);

      const response = await uploadAgreement(
        project.id,
        projectAgreement.originFileObj
      );

      console.log(response);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { project, milestones } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf />
          <div className="SignatoriesContainer">
            <h1>Consensus</h1>
            <h3 className="StepDescription">
              Collaborate with the definition of milestones, share your
              experiences, talk to project owner and other funders, download the
              latest agreements
            </h3>
            <h2>{project.projectName}</h2>
            <div className="SignatoryList">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Milestones" key="1">
                  <TableMilestones dataSource={milestones} />
                </TabPane>
                <TabPane tab="Collaboration" key="2">
                  <div>
                    <DownloadAgreement
                      subtitle="Project's Agreement File"
                      text="Lorem ipsum text description"
                      click={this.handleClick}
                    />
                  </div>
                  <div>
                    <UploadFile
                      subtitle="Project's Agreement File"
                      text="Lorem ipsum text description"
                      name="projectAgreement"
                      change={this.changeProjectAgreement}
                      buttonText="Upload Project Agreement File"
                    />
                  </div>
                </TabPane>
                <TabPane tab="FAQ & Project Proposal" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
            <div className="ControlSteps">
              <Link
                href={{
                  pathname: '/signatories',
                  query: { projectId: project.id }
                }}
              >
                <ButtonPrimary text="Continue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcensusMilestones;
