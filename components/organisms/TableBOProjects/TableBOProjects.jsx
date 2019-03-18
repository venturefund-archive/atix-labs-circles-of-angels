import React from "react";
import { Table, Tag } from "antd";
import Router from "next/router";

import "./_style.scss";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonDownload from "../../atoms/ButtonDownload/ButtonDownload";

const dataSource = [
  {
    key: "1",
    user: "Juan Perez",
    project: "Project 1",
    status: ["pending"],
    projectId: 5
  },
  {
    key: "2",
    user: "Mariana Moreno",
    project: "Project 2",
    status: ["confirmed"],
    projectId: 6
  }
];

const projectDetailPage = projectId => {
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
    dataIndex: "user",
    key: "user"
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project"
  },
  {
    title: "Milestones",
    dataIndex: "milestones",
    key: "milestones",
    render: () => <ButtonDownload text="Download Excel" />
  },
  {
    title: "Details",
    dataIndex: "projectId",
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
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "green" : "green";
          if (tag === "pending") {
            color = "";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
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

const TableBOProjects = () => (
  <Table
    dataSource={dataSource}
    columns={columns}
    size="middle"
    className="TableBOProjects"
  />
);

export default TableBOProjects;
