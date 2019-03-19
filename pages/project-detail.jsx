import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";

import "./_style.scss";
import "./_project-detail.scss";

import ProjectMission from "../components/molecules/ProjectMission/ProjectMission.jsx";
import GeneralItem from "../components/atoms/GeneralItem/GeneralItem.jsx";
import ButtonSuccess from "../components/atoms/ButtonSuccess/ButtonSuccess.jsx";

import {getProject} from '../api/projectApi';

const projectId = 1; //delete when integrate with explore-projects page

class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectDetail : null
    }
  }

  async componentDidMount() {
    const projectDetail = await getProject(this.props.projectId);
    if (projectDetail) this.setState({projectDetail : projectDetail});
  }

  static async getInitialProps({ query }) {
    const { projectId } = query;
    return { projectId };
  }

  render() {
    const itemsData = this.state.projectDetail ? [
      {
        subtitle: "Enterprice Location",
        title: this.state.projectDetail.location,
        iconItem: "./static/images/icon-place.svg"
      },
      {
        subtitle: "Timeframe",
        title: this.state.projectDetail.timeframe,
        iconItem: "./static/images/icon-timeframe.svg"
      },
      {
        subtitle: "Amount",
        title: this.state.projectDetail.goalAmount,
        iconItem: "./static/images/icon-amount.svg"
      },
      {
        subtitle: "Name of Lead",
        title: this.state.projectDetail.ownerName,
        iconItem: "./static/images/icon-lead.svg"
      },
      {
        subtitle: "Mail of Lead",
        title: this.state.projectDetail.ownerEmail,
        iconItem: "./static/images/icon-mail.svg"
      }
    ] : [];
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="ProjectContainer">
            <div className="ProjectHeader">
              <img
                src={this.state.projectDetail ? this.state.projectDetail.coverPhoto : ''}
                alt="projectCoverImage"
              />
              <div className="ProjectEnterprice">
                <p>Entreprice</p>
                <h1>{this.state.projectDetail ? this.state.projectDetail.entrepriceName : '' }</h1>
              </div>
            </div>
            <div className="ProjectContent">
              <ProjectMission
                mission={this.state.projectDetail ? this.state.projectDetail.mission : ''}
                terms={this.state.projectDetail ? this.state.projectDetail.terms : ''}
              />
              <div className="ProjectGeneralData">
                <h1>Generals</h1>
                {itemsData.map((item, i) => (
                  <GeneralItem
                    subtitle={item.subtitle}
                    title={item.title}
                    iconItem={item.iconItem}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="SubmitProject">
            <ButtonSuccess text="Go to project" />
          </div>
        </div>
      </div>
    );
  }
}


export default ProjectDetail;
