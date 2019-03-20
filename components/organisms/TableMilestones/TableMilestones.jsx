import React from "react";
import { Table } from "antd";

import "./_style.scss";

const TableMilestones = ({ dataSource }) => {
  console.log(dataSource)
  const columns = [
    {
      title: "Timeline",
      dataIndex: "quarter",
      key: "timeline"
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks"
    },
    {
      title: "Expected Changes/ Social Impact Targets",
      dataIndex: "impact",
      key: "targets"
    },
    {
      title: "Review Criterion",
      dataIndex: "impactCriterion",
      key: "ReviewOne"
    },
    {
      title: "Signs of Success",
      key: "success",
      dataIndex: "signsOfSuccess"
    },
    {
      title: "Review Criterion ",
      key: "ReviewTwo",
      dataIndex: "signsOfSuccessCriterion"
    },
    {
      title: "Expenditure Category",
      key: "expenditureCategory",
      dataIndex: "category"
    },
    {
      title: "Key Personnel Responsible",
      key: "keyPersonnel",
      dataIndex: "keyPersonnel"
    },
    {
      title: "Budget needed",
      key: "budget",
      dataIndex: "budget"
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size="middle"
      className="TableMilestones"
    />
  );
};

export default TableMilestones;
