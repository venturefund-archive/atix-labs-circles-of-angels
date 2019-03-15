import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import CardProject from "../components/molecules/CardProject/CardProject.jsx";
import { getProjects } from "../api/projectApi";
import Link from "next/link";
import "./_style.scss";
import "./_explore-projects.scss";

class ExploreProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  async componentDidMount() {
    const projects = await getProjects();
    this.setState({ projects: projects });
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
              {this.state.projects.map((project, i) => (
                <Link href={`/project-detail?projectId=${project.id}`}>
                  <CardProject
                    enterpriceName={project.name}
                    enterpriceMission={project.mission}
                    projectCardImage={project.cardPhoto}
                    enterpriceLocation={project.location}
                    timeframe={project.timeframe}
                    amount={project.goalAmount}
                    key={i}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreProjects;
