import React from 'react';
import { Table } from 'antd';
import { isEmpty } from 'lodash';

const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    render: question => <span>{question.question}</span>,
    width: '50%'
  },
  {
    title: 'Answer',
    dataIndex: 'customAnswer',
    render: (answer, record) => {
      if (record.customAnswer) return <span>{record.customAnswer}</span>;
      return <span>{answer.answer}</span>;
    },
    key: 'answer',
    width: '50%'
  }
];

const UserAnswer = ({ user }) => (
  <div>
    {user.detail ? (
      <span>Phone number : {user.detail.phoneNumber}</span>
    ) : (
      ''
    )}
    {!isEmpty(user.answers) ? (
      <div>
        <span>Questionnaire: </span>
        <Table
          dataSource={user.answers}
          columns={columns}
          pagination={false}
          size="small"
        />
      </div>
    ) : (
      ''
    )}
  </div>
);

export default UserAnswer;
