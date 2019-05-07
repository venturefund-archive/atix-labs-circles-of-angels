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
    dataIndex: 'answer',
    key: 'answer',
    render: (answer, record) => {
      if (record.customAnswer) return <span>{record.customAnswer}</span>;
      return <span>{answer.answer}</span>;
    },
    width: '50%'
  }
];

const UserAnswer = ({ user }) =>
  user.detail || !isEmpty(user.answers) ? (
    <div>
      {user.detail && user.detail.phoneNumber && (
        <p>Phone number: {user.detail.phoneNumber}</p>
      )}
      {user.detail && user.detail.company && (
        <p>Company: {user.detail.company}</p>
      )}
      {!isEmpty(user.answers) && (
        <div>
          <p>Questionnaire: </p>
          <Table
            dataSource={user.answers}
            columns={columns}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </div>
  ) : (
    <div>This user has no additional information.</div>
  );

export default UserAnswer;
