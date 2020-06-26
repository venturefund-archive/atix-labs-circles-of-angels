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
import './_style.scss';

const { Option } = Select;
const { TextArea } = Input;

const ModalDaoSelection = ({
  setNewDaoName,
  setApplicant,
  setDescription,
  submitDaoProposal,
  onCancel
}) => {
  function onChange(value) {
    const address = value.key;
    setApplicant(address);
  }

  const userFullname = user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName;
  };

  // const options = usersData.map(user => (
  //   <Option value={user.address}>{userFullname(user)}</Option>
  // ));

  return (
    <Form onSubmit={submitDaoProposal}>
      <div className="daoSelection column">
        <p>DAO Name</p>
        <Form.Item name="description">
          <TextArea
            rows={1}
            placeholder="Type Dao Name"
            onChange={e => setNewDaoName(e.target.value)}
          />
        </Form.Item>
        <p>Applicant</p>
        <Form.Item name="applicant">
          <Select
            showSearch
            labelInValue
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            onChange={onChange}
          >
            {/* {options} */}
          </Select>
        </Form.Item>
        <p>Description</p>
        <Form.Item name="description">
          <TextArea
            rows={4}
            placeholder="Type description"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Item>

        {/* <p>Role</p>
          <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
          </Select> */}
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
          onClick={submitDaoProposal}
        />
      </div>
    </Form>
  );
}

export default ModalDaoSelection;
