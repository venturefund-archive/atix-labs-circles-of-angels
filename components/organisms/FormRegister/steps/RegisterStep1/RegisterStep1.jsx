/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import TitlePage from '../../../../atoms/TitlePage/TitlePage';
import '../_style2.scss';
import RoleOption from './RoleOption';
import RegisterStep3, { questionsByRole } from '../RegisterStep3/RegisterStep3';
import RegisterStep4 from '../RegisterStep4/RegisterStep4';
import {
  ENTREPRENEUR,
  FUNDER,
  ORACLE
} from '../../../../../constants/constants';

const RegisterStep1 = ({ fields, setFields, setNextStep, handleChange }) => {
  const getNextStep = role => {
    if (role === ENTREPRENEUR || role === FUNDER)
      return {
        fields: Object.keys(questionsByRole[role]),
        component: RegisterStep3
      };

    if (role === ORACLE)
      // TODO : this should delete the step 3
      return {
        fields: {},
        component: RegisterStep4
      };
  };

  const onSelectRole = role => {
    const questions = questionsByRole[role];

    handleChange(undefined, 'role', role);
    setFields({ ...fields, ...questions });
    setNextStep(2, getNextStep(role));
  };

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

        <Row className="FormRegister" gutter={26}>
          {fields.role &&
            fields.role.options.map(option => (
              <RoleOption
                onSelect={onSelectRole}
                selected={fields.role.value === option.name}
                {...option}
              />
            ))}
        </Row>
      </div>
    </div>
  );
};

export default RegisterStep1;

RegisterStep1.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  setFields: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
