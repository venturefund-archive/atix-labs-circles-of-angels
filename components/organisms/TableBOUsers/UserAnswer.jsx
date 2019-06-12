/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

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
