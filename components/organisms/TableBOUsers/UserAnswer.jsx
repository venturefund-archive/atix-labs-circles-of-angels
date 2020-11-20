/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Table } from 'antd';

const UserAnswer = ({ user }) => {
  const userAnswers = JSON.parse(user.answers);
  const questions = Object.keys(userAnswers);
  const dataSource = questions.map(question => ({
    question,
    answer: userAnswers[question]
  }));
  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      render: answer => (Array.isArray(answer) ? answer.join(', ') : answer)
    }
  ];

  return (user.phoneNumber && user.company) || user.answers ? (
    <div>
      {user && user.phoneNumber && <p>Phone number: {user.phoneNumber}</p>}
      {user && user.company && <p>Company: {user.company}</p>}
      {user.answers && (
        <div>
          <p>Questionnaire: </p>
          <Table
            dataSource={dataSource}
            className="TableBOProjects"
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
};

export default UserAnswer;
