import React from 'react';
import { Input } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CardProject from '../components/molecules/CardProject/CardProject';
import { getActiveProjects, getProjectsAsOracle } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import { withUser } from '../components/utils/UserContext';
import Routing from '../components/utils/Routes';
import './_style.scss';
import './_explore-projects.scss';
import Roles from '../constants/RolesMap';
import projectStatus from '../constants/ProjectStatus';

const { Search } = Input;

class ExploreProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOracleProjects: []
    };
  }

  static async getInitialProps(req) {
    const response = await getActiveProjects();
    const projectsWithoutPhoto = response.data;
    const projects = await Promise.all(
      projectsWithoutPhoto.map(async project => {
        const projectCardPhoto = await getPhoto(project.cardPhoto);
        return { ...project, cardPhoto: projectCardPhoto.data };
      })
    );
    return { projects };
  }

  async componentDidMount() {
    const { user, projects } = this.props;
    const { activeOracleProjects } = this.state;
    if (user.role.id === Roles.Oracle) {
      const response = await getProjectsAsOracle(user.id);
      const oracleProjects = response.data.projects;
      const activeProjects = await projects.map(project => project.id);

      const oracleProjectsActive = oracleProjects.filter(
        project => activeProjects.indexOf(project) !== -1
      );

      this.setState({ activeOracleProjects: oracleProjectsActive });
    }
  }

  goToProjectDetail(projectId) {
    Routing.toProjectDetail({ projectId });
  }

  goToProjectProgress(projectId) {
    Routing.toProjectProgress({ projectId });
  }

  render() {
    const { projects } = this.props;
    const { activeOracleProjects } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />

          <div className="Content">
            <div className="titlepage">
              <h1>My Projects</h1>
            </div>
            <Search
              placeholder="Search in my projects"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
            <div className="ProjectsCardsContainer">
              {projects.map(project => {
                const showTag =
                  project.status === projectStatus.IN_PROGRESS &&
                  activeOracleProjects.indexOf(project.id) !== -1;
                return (
                  <CardProject
                    enterpriseName={project.projectName}
                    projectCardImage={project.cardPhoto}
                    enterpriseLocation={project.location}
                    timeframe={project.timeframe}
                    amount={project.goalAmount}
                    showTag={showTag}
                    tagClick={() => this.goToProjectProgress(project.id)}
                    key={project.id}
                    onClick={() => this.goToProjectDetail(project.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ExploreProjects);
