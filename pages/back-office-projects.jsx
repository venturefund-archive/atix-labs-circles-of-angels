import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects';

import { getProjects } from '../api/projectApi';

import './_style.scss';
import './_back-office-projects.scss';

class BackOfficeProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects
    };
  }

  static async getInitialProps(query) {
    const response = await getProjects();
    return { projects: response.data };
  }

  updateProject = (index, project) => {
    const { projects } = this.state;
    projects[index] = project;
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Projects Administration</h1>
            <TableBOProjects
              dataSource={projects}
              onStateChange={this.updateProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeProjects;
