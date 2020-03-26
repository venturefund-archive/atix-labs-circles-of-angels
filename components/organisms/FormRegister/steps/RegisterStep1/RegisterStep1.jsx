/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import TitlePage from '../../../../atoms/TitlePage/TitlePage';
import '../_style2.scss';
import RoleOption from './RoleOption';
import RegisterStep3, { questionsByRole } from '../RegisterStep3/RegisterStep3';

const RegisterStep1 = ({ fields, setFields, setNextStep, handleChange }) => {
  const getNextStep = role => ({
    fields: Object.keys(questionsByRole[role]),
    component: RegisterStep3
  });

  const onSelectRole = role => {
    handleChange(undefined, 'role', role);
    setNextStep(2, getNextStep(role));
  };

  useEffect(() => {
    if (fields.role && fields.role.valid) {
      const questions = questionsByRole[fields.role.value];
      setFields({ ...fields, ...questions });
    }
  }, [fields.role.value]);

  return (
    <div className=" h100">
      <div className="InfoStep">
        <img src="./static/images/select-user.svg" alt="platformusers" />
        <h2>Platform User</h2>
        <h4>Please select a role</h4>
      </div>
      <div className="StepPersonalInformation h100">
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
