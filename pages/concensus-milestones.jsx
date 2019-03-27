import React from 'react';
import Link from 'next/link';
import { Tabs, message } from 'antd';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import UploadFile from '../components/molecules/UploadFile/UploadFile';
import DownloadAgreement from '../components/molecules/DownloadAgreement/DownloadAgreement';
import FileUploadStatus from '../constants/FileUploadStatus';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import {
  getProjectMilestones,
  downloadAgreement,
  downloadProposal,
  uploadAgreement
} from '../api/projectApi';
import DownloadFile from '../components/molecules/DownloadFile/DownloadFile';

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
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      const response = await uploadAgreement(
        project.id,
        projectAgreement.originFileObj
      );

      console.log(response);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  clickDownloadProposal = async () => {
    const { project } = this.props;
    const res = await downloadProposal(project.id);
    console.log(res);
  };

  render() {
    const { project, milestones } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf stepNumber={0} />
          <div className="ProjectStepsContainer">
            <p className="LabelSteps">Consensus Step</p>
            <h3 className="StepDescription">
              Collaborate with the definition of milestones, share your
              experiences, talk to project owner and other funders, download the
              latest agreements
            </h3>
            <p className="LabelSteps">Project Name</p>
            <h1>{project.projectName}</h1>
            <div className="SignatoryList">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Milestones" key="1">
                  <TableMilestones dataSource={milestones} />
                </TabPane>
                <TabPane tab="Collaboration" key="2">
                  <div className="TabCollaboration">
                    <h2>Project's Agreement File</h2>
                    <DownloadAgreement click={this.handleClick} />
                    <UploadFile
                      name="projectAgreement"
                      change={this.changeProjectAgreement}
                      buttonText="Upload Project Agreement File"
                    />
                  </div>
                </TabPane>
                <TabPane tab="FAQ & Project Proposal" key="3">
                  <div>
                    <h2>FAQ Document</h2>
                    <a href={project.faqLink}>{project.faqLink}</a>
                    <br /> <br />
                    <DownloadFile
                      subtitle="Project's Pitch Proposal"
                      text="Lorem ipsum text description"
                      buttonText="Download Pitch Proposal"
                      click={this.clickDownloadProposal}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="ControlSteps StepOne">
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
    );
  }
}

export default ConcensusMilestones;
