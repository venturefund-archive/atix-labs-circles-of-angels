import React from 'react';
import { Table, Divider, Tag } from 'antd';
import './_style.scss';

const columns = [
  {
    title: 'Timeline',
    width: 100,
    dataIndex: 'timeline',
    key: 'timeline',
    fixed: 'left'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  { title: 'Tasks', dataIndex: 'task', key: '1' },
  { title: 'Social Impact Targets', dataIndex: 'impact', key: '2' },
  { title: 'Review Criterion', dataIndex: 'criteria', key: '3' },
  { title: 'Founds', dataIndex: 'founds', key: '4' },
  { title: 'Expenditure Category', dataIndex: 'category', key: '5' },
  { title: 'Key Personnel Responsible', dataIndex: 'responsible', key: '6' },
  { title: 'Budget needed', dataIndex: 'budget', key: '7' },

  {
    title: 'Oracle',
    dataIndex: 'oracle',
    key: 'oracle',
    fixed: 'right'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    fixed: 'right',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 7 ? 'green' : 'orange';
          if (tag === 'Cancel') {
            color = 'volcano';
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
    title: 'Action',
    key: 'action',
    fixed: 'right',
    render: (text, record) => (
      <span>
        <a href="www.google.com">Evidence</a>
      </span>
    )
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    type: 'Milestone',
    impact:'Increased capacity of outreach to students and process contracts',
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1',
    founds: '1542',
    criterio: 'criteria 1',
    category: 'Salary',
    responsible: 'Newly hired IE team member',
    budget: '1000',
    task: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
    timeline: 'Quarter 1'
  },
  {
    key: '2',
    name: 'John Brown',
    type: 'Milestone',
    impact:'Increased capacity of outreach to students and process contracts',
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1',
    founds: '1542',
    criterio: 'criteria 1',
    category: 'Salary',
    responsible: 'Newly hired IE team member',
    budget: '1000',
    task: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
    timeline: 'Quarter 1'
  },
  {
    key: '3',
    name: 'John Brown',
    type: 'Milestone',
    impact:'Increased capacity of outreach to students and process contracts',
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1',
    founds: '1542',
    criterio: 'criteria 1',
    category: 'Salary',
    responsible: 'Newly hired IE team member',
    budget: '1000',
    task: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
    timeline: 'Quarter 1'
  },  {
    key: '4',
    name: 'John Brown',
    type: 'Milestone',
    impact:'Increased capacity of outreach to students and process contracts',
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1',
    founds: '1542',
    criterio: 'criteria 1',
    category: 'Salary',
    responsible: 'Newly hired IE team member',
    budget: '1000',
    task: 'Operations: Expand marketing capacity in Cambodia (or Thailand)',
    timeline: 'Quarter 1'
  }
];

const TableProjectProgress = () => (
  <Table
    title={() => 'Milestones'}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1300 }}
  />
);
export default TableProjectProgress;
