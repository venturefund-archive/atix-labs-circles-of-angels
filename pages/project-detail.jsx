import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";

import "./_style.scss";
import "./_project-detail.scss";

import ProjectMission from "../components/molecules/ProjectMission/ProjectMission.jsx";
import GeneralItem from "../components/atoms/GeneralItem/GeneralItem.jsx";
import ButtonSuccess from "../components/atoms/ButtonSuccess/ButtonSuccess.jsx";

import { getProject } from "../api/projectApi";

const projectId = 5; //delete when integrate with explore-projects page
const imageBaseUrl = "./static/images";

class ProjectDetail extends React.Component {
  static async getInitialProps(req) {
    const response = await getProject(projectId);
    return { projectDetail: response.data };
  }

  render() {
    const itemsData = this.props.projectDetail
      ? [
          {
            subtitle: "Enterprice Location",
            title: this.props.projectDetail.location,
            iconItem: `${imageBaseUrl}/icon-place.svg`
          },
          {
            subtitle: "Timeframe",
            title: this.props.projectDetail.timeframe,
            iconItem: `.${imageBaseUrl}/icon-timeframe.svg`
          },
          {
            subtitle: "Amount",
            title: this.props.projectDetail.goalAmount,
            iconItem: `${imageBaseUrl}/icon-amount.svg`
          },
          {
            subtitle: "Name of Lead",
            title: this.props.projectDetail.leadName,
            iconItem: `${imageBaseUrl}/icon-lead.svg`
          },
          {
            subtitle: "Mail of Lead",
            title: this.props.projectDetail.leadMail,
            iconItem: `${imageBaseUrl}/icon-mail.svg`
          }
        ]
      : [];
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="ProjectContainer">
            <div className="ProjectHeader">
              <img
                src={
                  this.props.projectDetail
                    ? this.props.projectDetail.coverPhoto
                    : ""
                }
                alt="projectCoverImage"
              />
              <div className="ProjectEnterprice">
                <p>Entreprice</p>
                <h1>
                  {this.props.projectDetail
                    ? this.props.projectDetail.entrepriceName
                    : ""}
                </h1>
              </div>
            </div>
            <div className="ProjectContent">
              <ProjectMission
                mission={
                  this.props.projectDetail
                    ? this.props.projectDetail.mission
                    : ""
                }
                terms={
                  this.props.projectDetail ? this.props.projectDetail.terms : ""
                }
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
