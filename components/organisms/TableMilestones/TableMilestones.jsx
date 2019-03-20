import React from "react";
import { Table } from "antd";

import "./_style.scss";

const dataSource = [{
  key: '1',
  timeline: 'Quarter 1',
  milestone: 'Milestone 1',
  tasks: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
  targets: 'Increased capacity of outreach to students and process contracts',
  ReviewOne: 'Contract signed and person start working with us',
  success: 'New team member joins the team',
  ReviewTwo: 'Contract signed with new team member',
  Expediture:'Salary',
  Responsible: 'COO, CEO, Investment in Education (IE) Manager',
  Budget: ''
}, {
  key: '2',
  timeline: 'Quarter 1',
  milestone: 'Milestone 1',
  tasks: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
  targets: 'Increased capacity of outreach to students and process contracts',
  ReviewOne: 'Contract signed and person start working with us',
  success: 'New team member joins the team',
  ReviewTwo: 'Contract signed with new team member',
  Expediture:'Salary',
  Responsible: 'COO, CEO, Investment in Education (IE) Manager',
  Budget: ''
}];

const TableMilestones = () => {
  const columns = [
    {
      title: "Timeline",
      dataIndex: "timeline",
      key: "timeline"
    },
    {
      title: "Milestone",
      dataIndex: "milestone",
      key: "milestone"
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks"
    },
    {
      title: "Expected Changes/ Social Impact Targets",
      dataIndex: "targets",
      key: "targets"
    },
    {
      title: "Review Criterion",
      dataIndex: "ReviewOne",
      key: "ReviewOne"
    },
    {
      title: "Signs of Success",
      key: "success",
      dataIndex: "success"
    },
    {
      title: "Review Criterion ",
      key: "ReviewTwo",
      dataIndex: "ReviewTwo"
    },
    {
      title: "Expenditure Category",
      key: "action",
      dataIndex: "Expediture"
    },
    {
      title: "Key Personnel Responsible",
      key: "action",
      dataIndex: "Responsible"
    },
    {
      title: "Budget needed",
      key: "action",
      dataIndex: "Budget"
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
