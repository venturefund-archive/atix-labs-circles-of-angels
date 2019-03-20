import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import CardProject from "../components/molecules/CardProject/CardProject.jsx";
import { getProjects } from "../api/projectApi";
import Router from "next/router";
import "./_style.scss";
import "./_explore-projects.scss";

class ExploreProjects extends React.Component {
  static async getInitialProps(req) {
    const response = await getProjects();
    return { projects: response.data };
  }

  goToProjectDetail(projectId) {
    Router.push(
      {
        pathname: "/project-detail",
        query: { projectId }
      },
      "/project-detail"
    );
  }

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="ProjectsContainer">
            <h1>Explore Projects</h1>
            <div className="ProjectsCardsContainer">
              {this.props.projects.map((project, i) => (
                <CardProject
                  enterpriceName={project.name}
                  enterpriceMission={project.mission}
                  projectCardImage={project.cardPhoto}
                  enterpriceLocation={project.location}
                  timeframe={project.timeframe}
                  amount={project.goalAmount}
                  key={i}
                  onClick={() => this.goToProjectDetail(project.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreProjects;
