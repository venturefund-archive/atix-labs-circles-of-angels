import React from "react";
import { Tabs } from "antd";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import "./_style.scss";
import "./_concensus.scss";
import TableMilestones from "../components/organisms/TableMilestones/TableMilestones.jsx";
import { getProjectMilestones } from "../api/projectApi";

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class ConcensusMilestones extends React.Component {
  static async getInitialProps(query) {
    const { project } = query.query;
    const response = await getProjectMilestones(project.id);
    console.log(response);
    return { milestones: response.data, project: project };
  }
  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf />
          <div className="SignatoriesContainer">
            <h1>Concensus</h1>
            <h3 className="StepDescription">
              Collaborate with the definition of milestones, share your
              experiences, talk to project owner and other funders, download the
              latest agreements
            </h3>
            <h2>{this.props.project.projectName}</h2>
            <div className="SignatoryList">
              
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Milestones" key="1">
                  <TableMilestones dataSource={this.props.milestones} />
                </TabPane>
                <TabPane tab="Collaboration" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="FAQ & Project Proposal" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcensusMilestones;
