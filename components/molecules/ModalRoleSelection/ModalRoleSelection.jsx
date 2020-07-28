/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Input, Select, Form } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import { proposalTypes, proposalTypeEnum, newRolesEnum } from '../../../constants/constants';
import './_style.scss';

const { Option } = Select;
const { TextArea } = Input;

const ModalRoleSelection = ({
  usersData,
  setSelectedOption,
  setApplicant,
  setDescription,
  description,
  submitRoleProposal,
  onCancel
}) => {
  function onChange(value) {
    if (!value) return;
    const address = value.key;
    setApplicant(address);
  }

  function onRoleChange(value) {
    if (!value) return;
    const proposalType = value.key;
    console.log(proposalType);
    setSelectedOption(proposalType);
  }

  const userFullname = user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName;
  };

  const options = usersData.map(user => (
    <Option value={user.address}>{userFullname(user)}</Option>
  ));

  const roleOptions = () => {
    const PATTERN = 'ASSIGN';
    const filtered = Object.keys(proposalTypes).filter(type => type.includes(PATTERN));
    const options = filtered.map(option => (
      <Option value={proposalTypes[option]}>{newRolesEnum[option]}</Option>
    ));
    return options;
  }

  return (
    <Form onSubmit={submitRoleProposal}>
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
          >
            {options}
          </Select>
        </Form.Item>
        <p>Role</p>
        <Form.Item name="role">
          <Select
            showSearch
            allowClear
            labelInValue
            style={{ width: '100%' }}
            placeholder="Select the role"
            defaultActiveFirstOption={false}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            onChange={onRoleChange}
          >
            {roleOptions()}
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
      <div className="flex space-between border-top margin-top padding-top">
        <CustomButton
          theme="Alternative"
          buttonText="Cancel"
          onClick={onCancel}
        />
        <CustomButton
          theme="Primary"
          buttonText="Create Proposal"
          onClick={submitRoleProposal}
        />
      </div>
    </Form>
  );
}

export default ModalRoleSelection;
