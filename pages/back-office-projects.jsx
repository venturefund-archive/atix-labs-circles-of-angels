import React from 'react';

import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import TableBOProjects from '../components/organisms/TableBOProjects/TableBOProjects.jsx';

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
    const projects = this.state.projects;
    projects[index] = project;
    this.setState({ projects });
  }

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Projects Administration</h1>
            <TableBOProjects
              dataSource={this.state.projects}
              onStateChange={this.updateProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeProjects;
