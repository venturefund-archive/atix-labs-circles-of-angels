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
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function DaoDetail() {
  const [visibility, setVisibility] = useState(false);
  const [currentProposals, setCurrentProposals] = useState([]);
  const [completedProposals, setCompletedProposals] = useState([]);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const history = useHistory();
  const { id: daoId } = useQuery();

  const fetchDaoProposals = async () => {
    try {
      const response = await getProposalsByDaoId(daoId);
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Proposals');
        return [];
      }
      const current = response.data.filter(proposal => !proposal.processed);
      const completed = response.data.filter(proposal => proposal.processed);
      setCurrentProposals(current);
      setCompletedProposals(completed);
    } catch (error) {
      message.error(error);
    }
  };

  const goToProposalDetail = proposalId => {
    const daoName = history.location.state
      ? history.location.state.daoName
      : `Name of Dao ${daoId}`;
    const state = { daoId, proposalId, daoName };
    history.push(
      `/dao-proposal-detail?daoId=${daoId}&proposalId=${proposalId}`,
      state
    );
  };

  const proposalsLength = () => {
    const total = currentProposals.length + completedProposals.length;
    return total;
  };

  useEffect(() => {
    fetchDaoProposals();
  }, [creationSuccess]);

  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection daoDetail borderBottom marginBottom">
        <div className="column">
          <p className="LabelSteps">
            <LeftOutlined />
            <a onClick={() => history.goBack()}>Back to DAOS</a>
          </p>
          <div className="flex flex-start detailDaoTitleContainer">
            <TitlePage
              textTitle={
                history.location.state
                  ? history.location.state.daoName
                  : `Name of Dao ${daoId}`
              }
            />
            {/* <a>Proposals ({currentProposals.length})</a> */}
            <a>Proposals ({proposalsLength()})</a>
          </div>
        </div>
        <ProposalModal daoId={daoId} setCreationSuccess={setCreationSuccess} />
      </div>

      <div className="column marginBottom">
        <div className="flex alignItems linkSection">
          <div className="dot" />
          <p>Voting period ({currentProposals.length})</p>
        </div>
        <div className="BoxContainer">
          {currentProposals.map(proposal => (
            <CardDaoDetail
              proposal={proposal}
              showStatus={false}
              onClick={() => goToProposalDetail(proposal.id)}
            />
          ))}
        </div>
      </div>
      <div className="column">
        <div className="flex alignItems linkSection">
          <div className="dot-completed" />
          <p>Completed ({completedProposals.length})</p>
        </div>
        <div className="BoxContainer">
          {completedProposals.map(proposal => (
            <CardDaoDetail
              proposal={proposal}
              showStatus
              onClick={() => goToProposalDetail(proposal.id)}
            />
          ))}
        </div>
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
