import React from "react";
import { Table, Tag } from "antd";
import Router from "next/router";

import "./_style.scss";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonDownload from "../../atoms/ButtonDownload/ButtonDownload";
import projectStatusMap from "../../../model/projectStatus";
import { confirmProject } from "../../../api/projectApi";

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
        <Tag color={projectStatusMap[status].color} key={status}>
          {projectStatusMap[status].name}
        </Tag>
      </span>
    )
  },
  {
    title: "Actions",
    dataIndex: "id",
    key: "action",
    render: (projectId, collection) => (
      <ButtonPrimary
        text="confirm"
        onClick={async () => handleConfirm(projectId, collection)}
      />
    )
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

const handleConfirm = async (projectId, collection) => {
  const confirmation = await confirmProject(projectId);
  collection.status = confirmation.data.status;
};

export default TableBOProjects;
