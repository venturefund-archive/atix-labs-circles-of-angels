/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import './_style2.scss';
import RegisterStep3, { questionsByRole } from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';

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
  const { title, usertype, name, value, selected } = props;
  const selectedClass = selected ? 'selectedOption' : '';
  return (
    <Col sm={24} md={8} lg={8}>
      {/* <div custom={name} selected={selected === name} className="OptionsUsers">
        <img src="./static/images/icon-users-small.svg" alt="platformusers" />
        <h1>{title}</h1>
        <p>{usertype}</p>
      </div> */}
      <a
        name={name}
        value={usertype}
        className={`OptionsUsers ` + selectedClass}
        selected={selected}
      >
        <img src="./static/images/icon-users-small.svg" alt="platformusers" />
        <h1>{title}</h1>
        <p>{usertype}</p>
      </a>
    </Col>
  );
};

export default function RegisterStep2(props) {
  const { fields, setFields, setNextStep, handleChange } = props;

  const getNextStep = role => {
    switch (role) {
      case 'entrepreneur':
      case 'funder':
        return {
          fields: Object.keys(questionsByRole[role]),
          component: RegisterStep3
        };

      // TODO : this should delete the step 3
      case 'oracle':
        return {
          fields: {},
          component: RegisterStep4
        };
    }

    return step;
  };

  const onSelectRole = event => {
    const role = event.target.name;
    const questions = questionsByRole[role];
    // TODO : get rid of this
    Object.entries(questions).forEach(([_, field]) => {
      field.valid = true;
    });
    console.log('onSelectRole event', event);
    handleChange(event, 'role');
    setFields({ ...fields, ...questions });
    setNextStep(2, getNextStep(role));
  };

  const roleOptions = fields.role.options.map(option => (
    // TODO : not sure about this.
    <RoleOption selected={fields.role.value === option.name} {...option} />
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

        <Row className="FormRegister" onClick={onSelectRole} gutter={26}>
          {roleOptions}
        </Row>
      </div>
    </div>
  );
}
