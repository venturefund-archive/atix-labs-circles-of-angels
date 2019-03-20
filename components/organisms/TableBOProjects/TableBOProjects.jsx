import React from "react";
import { Table, Tag } from "antd";

import "./_style.scss";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonDownload from "../../atoms/ButtonDownload/ButtonDownload";

import { confirmProject } from "../../../api/projectApi";

const statusMap = {
  "-1": { name: "Cancelled", color: "red" },
  "0": { name: "Pending", color: "" },
  "1": { name: "Confirmed", color: "green" }
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
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <span>
        <Tag color={statusMap[status].color} key={status}>
          {statusMap[status].name}
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
