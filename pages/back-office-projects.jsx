import React from "react";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import TableBOProjects from "../components/organisms/TableBOProjects/TableBOProjects.jsx";

import "./_style.scss";
import "./_back-office-projects.scss";

class BackOfficeProjects extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <h1>Projects Administration</h1>
            <TableBOProjects />
          </div>
        </div>
      </div>
    );
  }
}

export default BackOfficeProjects;
