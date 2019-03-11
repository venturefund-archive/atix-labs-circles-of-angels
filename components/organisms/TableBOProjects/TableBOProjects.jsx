import React from "react";
import { Table, Tag } from "antd";

import "./_style.scss";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonDownload from "../../atoms/ButtonDownload/ButtonDownload";

const dataSource = [
  {
    key: "1",
    user: "Juan Perez",
    project: "Project 1",
    status: ["pending"]
  },
  {
    key: "2",
    user: "Mariana Moreno",
    project: "Project 2",
    status: ["confirmed"]
  }
];

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
