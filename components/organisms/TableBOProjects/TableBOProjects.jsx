import React from "react";
import { Table, Tag } from "antd";
import Router from "next/router";

import "./_style.scss";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonDownload from "../../atoms/ButtonDownload/ButtonDownload";

const statusMap = {
  "-1": { name: "Cancelled", color: "red" },
  "0": { name: "Pending", color: "" },
  "1": { name: "Confirmed", color: "green" }
};

const projectDetailPage = projectId => {
  console.log(projectId)
  Router.push(
    {
      pathname: "/back-office-project-detail",
      query: { projectId }
    },
    "/back-office-project-detail"
  );
};

const columns = [
  {
    title: "User",
    dataIndex: "ownerName",
    key: "ownerName"
  },
  {
    title: "Project",
    dataIndex: "projectName",
    key: "projectName"
  },
  {
    title: "Milestones",
    dataIndex: "milestones",
    key: "milestones",
    render: () => <ButtonDownload text="Download Excel" />
  },
  {
    title: "Details",
    dataIndex: "id",
    key: "details",
    render: projectId => {
      return (
        <img
          src="./static/images/icon-info.svg"
          onClick={() => projectDetailPage(projectId)}
        />
      );
    }
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: status => (
      <span>
        <Tag color={statusMap[status].color} key={status}>
          {statusMap[status].name}
        </Tag>
      </span>
    )
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: () => <ButtonPrimary text="confirm" />
  }
];

const TableBOProjects = ({ dataSource }) => (
  <Table
    dataSource={dataSource}
    columns={columns}
    size="middle"
    className="TableBOProjects"
  />
);

export default TableBOProjects;
