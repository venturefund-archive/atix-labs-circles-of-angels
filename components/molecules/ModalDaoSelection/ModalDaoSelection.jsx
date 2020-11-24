/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Form } from 'antd';
import './_style.scss';

const { TextArea } = Input;

const ModalDaoSelection = ({
  currentUser,
  setApplicant,
  setDescription,
  description
}) => {
  useEffect(() => {
    setApplicant(currentUser.address);
  });

  const userFullname = user => {
    if (!user) return;
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName;
  };

  return (
    <Form>
      <div className="daoSelection column">
        <p>Applicant</p>
        <Form.Item name="applicant">
          <Select
            defaultValue={userFullname(currentUser)}
            style={{ width: '100%' }}
            disabled
          />
        </Form.Item>
        <p>DAO Name</p>
        <Form.Item name="description">
          <TextArea
            rows={1}
            placeholder="Type Dao Name"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </Form.Item>
      </div>
      <div className="flex space-between border-top margin-top padding-top" />
    </Form>
  );
};

export default ModalDaoSelection;

ModalDaoSelection.propTypes = {
  currentUser: PropTypes.element.isRequired,
  setApplicant: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  description: PropTypes.string
};

ModalDaoSelection.defaultProps = {
  description: ''
};
