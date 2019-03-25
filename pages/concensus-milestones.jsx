import React from 'react';
import Link from 'next/link';
import { Tabs } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsIf from '../components/molecules/StepsIf/StepsIf';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import './_style.scss';
import './_concensus.scss';
import TableMilestones from '../components/organisms/TableMilestones/TableMilestones';
import { getProjectMilestones, downloadProposal } from '../api/projectApi';
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
                  Content of Tab Pane 2
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
