/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Button } from 'antd';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import './_style.scss';

export const step2Inputs = {
  // TODO : should allow custom keys?
  role: {
    name: 'role',
    options: [
      {
        name: 'entrepreneur',
        usertype: 'Social Entrepreneur',
        title: 'Create a project'
      },
      {
        name: 'funder',
        usertype: 'Impact Funder',
        title: 'Create a project'
      },
      {
        name: 'oracle',
        usertype: 'Oracle',
        title: 'Monitor a project'
      }
    ],
    rules: []
  }
};

const RoleOption = props => {
  const { title, usertype, name, value, selected, handleChange } = props;
  return (
    <Col sm={24} md={8} lg={8}>
      {/* <div custom={name} selected={selected === name} className="OptionsUsers">
        <img src="./static/images/icon-users-small.svg" alt="platformusers" />
        <h1>{title}</h1>
        <p>{usertype}</p>
      </div> */}
      <Button name={name} selected={selected === name} className="OptionsUsers">
        {title}-{usertype}
      </Button>
    </Col>
  );
};

export default function RegisterStep2(props) {
  const { inputs, handleChange } = props;
console.log(props);
  const roleOptions = inputs.role.options.map(option => (
    <RoleOption key={option.name} {...option} />
  ));

  return (
    <div>
      <div className="InfoStep">
        <img src="./static/images/icon-users.svg" alt="platformusers" />
        <h2>Platform User</h2>
        <h4>
          Lorem ipsum dolor sit amet, concectetur adipiscing elit. Duis sit
          amet..
        </h4>
      </div>
      <div className="StepPersonalInformation">
        <TitlePage textTitle="What do you want to do?" />

        <Row
          className="FormRegister"
          onClick={e => handleChange(e, 'role')}
          gutter={26}
        >
          {roleOptions}
        </Row>
      </div>
    </div>
  );
}
