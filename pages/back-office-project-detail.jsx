import React from "react";
import { getProject } from "../api/projectApi";
import { Table } from "antd";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import Router from "next/router";

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName"
  },
  {
    title: "Mission",
    dataIndex: "mission",
    key: "mission"
  },
  {
    title: "Problem Addressed",
    dataIndex: "problemAddressed",
    key: "problemAddressed"
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location"
  },
  {
    title: "Timeframe",
    dataIndex: "timeframe",
    key: "timeframe"
  },
  {
    title: "Goal Amount",
    dataIndex: "goalAmount",
    key: "goalAmount"
  },
  {
    title: "FAQ Link",
    dataIndex: "faqLink",
    key: "faqLink"
  }
];

class BackofficeProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: [],
      projectId: null
    };
  }

  static async getInitialProps({ query }) {
    const { projectId } = query;
    return { projectId };
  }

  async componentDidMount() {
    if (!this.props.projectId) return;
    const projectDetail = await getProject(this.props.projectId);
    this.setState({
      projectDetail: [projectDetail],
      projectId: this.props.projectId
    });
  }

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="TableContainer">
            <img
              src="./static/images/button-arrow-back.svg"
              onClick={() =>
                Router.push(
                  {
                    pathname: "/back-office-projects"
                  },
                  "/back-office-projects"
                )
              }
            />
            <h1>Project Details</h1>
            <Table columns={columns} dataSource={this.state.projectDetail} />
          </div>
        </div>
      </div>
    );
  }
}

export default BackofficeProjectDetail;
