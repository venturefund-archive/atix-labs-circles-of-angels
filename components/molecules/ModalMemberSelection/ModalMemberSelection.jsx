/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Form } from 'antd';
import './_style.scss';

const { Option } = Select;
const { TextArea } = Input;

const ModalMemberSelection = ({
  usersData,
  setApplicant,
  setDescription,
  description,
  selectedUser,
  setSelectedUser
}) => {
  function onChange(value) {
    if (!value) return;
    const address = value.key;
    setApplicant(address);
    setSelectedUser(value);
  }

  const userFullname = user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName;
  };

  const options = usersData.map(user => (
    <Option value={user.address}>{userFullname(user)}</Option>
  ));

  return (
    <Form>
      <div className="memberSelection column">
        <p>Applicant</p>
        <Form.Item name="applicant">
          <Select
            showSearch
            allowClear
            labelInValue
            style={{ width: '100%' }}
            placeholder="Select an applicant"
            defaultActiveFirstOption={false}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            onChange={onChange}
            value={selectedUser}
          >
            {options}
          </Select>
        </Form.Item>
        <p>Description</p>
        <Form.Item name="description">
          <TextArea
            rows={4}
            placeholder="Type description"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

ModalMemberSelection.propTypes = {
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setApplicant: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  selectedUser: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired
};

export default ModalMemberSelection;
