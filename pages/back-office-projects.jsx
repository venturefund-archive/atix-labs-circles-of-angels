import React from "react";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import TableBOProjects from "../components/organisms/TableBOProjects/TableBOProjects.jsx";

import { getProjects } from "../api/projectApi";

import "./_style.scss";
import "./_back-office-projects.scss";

class BackOfficeProjects extends React.Component {
  static async getInitialProps() {
    const response = await getProjects();
    console.log(response)
    return { projects: response.data };
  }

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Projects Administration</h1>
            <TableBOProjects dataSource={this.props.projects} />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeProjects;
