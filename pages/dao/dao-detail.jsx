/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message, Input, Icon, Select } from 'antd';
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import useQuery from '../../hooks/useQuery';
import { getProposalsByDaoId } from '../../api/daoApi';
import CardDaoDetail from '../../components/molecules/CardDaoDetail/CardDaoDetail';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function DaoDetail() {
  const [visibility, setVisibility] = useState(false);
  const [proposals, setProposals] = useState([]);
  const history = useHistory();

  const { id } = useQuery();
  const daoId = id;

  const fecthDaoProposals = async () => {
    try {
      const response = await getProposalsByDaoId(daoId);
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Proposals');
        return [];
      }
      setProposals(response.data);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fecthDaoProposals();
  }, []);

  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection daoDetail borderBottom">
        <div className="column">
          <p className="LabelSteps">
            <LeftOutlined /> Back to DAOS
          </p>
          <div className="flex flex-start detailDaoTitleContainer">
            <TitlePage textTitle="Name of Dao 1" />
            <a>Proposals (2)</a>
            <a>Members (36)</a>
          </div>
        </div>
        <CustomButton theme="Primary" buttonText="+ New Proposal" />
      </div>
      <div className="flex daoSearch">
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="status1"
          style={{ width: 200 }}
          onChange={handleChange}
        >
          <Option value="status1">Status 1</Option>
          <Option value="status2">Status 2</Option>
          <Option value="status3">Status 3</Option>
        </Select>
        <Select
          defaultValue="Category1"
          style={{ width: 200 }}
          onChange={handleChange}
        >
          <Option value="Category1">Category 1</Option>
          <Option value="Category2">Category 2</Option>
          <Option value="Category3">Category 3</Option>
        </Select>
      </div>
      <div className="flex alignItems linkSection">
        <div className="dot"></div>
        <p>Voting period (3)</p>
      </div>
      <div className="BoxContainer">
        {proposals.map(proposal => (
          <CardDaoDetail proposal={proposal} />
        ))}
      </div>
    </div>
  );
}

export default DaoDetail;

/*


          <h3 className="StepDescription">
            Transfer your pledged funds, help the world become a better place
            for everyone
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="TransferContent">
            <h2>Circles of Angels Bank Account Information</h2>
            <div className="TransferBankInfo">
              <h3>Singapore Bank</h3>
              <h4> Account #: 0012345678</h4>
              <h4> Account owner: CirclesOfAngels</h4>
            </div>
          </div>
          <div className="ControlSteps">
            <CustomButton theme="Cancel" buttonText="Cancel" />
          </div>

*/
