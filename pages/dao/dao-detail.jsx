/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import useQuery from '../../hooks/useQuery';
import { getProposalsByDaoId, getDaoUsers } from '../../api/daoApi';
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';
import DaoMembers from '../../components/molecules/DaoMembers/Daomembers';
import DaoProposals from '../../components/molecules/DaoProposals/DaoProposals';

function DaoDetail() {
  const [proposalsVisibility, setProposalsVisibility] = useState(true);
  const [currentProposals, setCurrentProposals] = useState([]);
  const [completedProposals, setCompletedProposals] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [, setCreationSuccess] = useState(false);
  const history = useHistory();
  const { id: daoId } = useQuery();

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

  const renderCurrentTab = () => {
    if (proposalsVisibility) {
      return (
        <div>
          <DaoProposals
            proposals={currentProposals}
            completed={false}
            onClick={goToProposalDetail}
          />
          <DaoProposals
            proposals={completedProposals}
            completed
            onClick={goToProposalDetail}
          />
        </div>
      );
    }
    return <DaoMembers users={usersData} />;
  };

  useEffect(() => {
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

    fetchDaoProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getDaoUsers(daoId);
        if (response.errors || !response.data) {
          message.error('An error occurred while getting the Users list');
          return [];
        }
        setUsersData(response.data.users);
      } catch (error) {
        message.error(error);
      }
    };

    fetchUsers();
  }, [daoId]);

  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection daoDetail borderBottom marginBottom">
        <div className="column">
          <p className="LabelSteps">
            <LeftOutlined />
            <Button type="link" onClick={() => history.goBack()}>
              Back to DAOS
            </Button>
          </p>
          <div className="flex flex-start detailDaoTitleContainer">
            <TitlePage
              textTitle={
                history.location.state
                  ? history.location.state.daoName
                  : `Name of Dao ${daoId}`
              }
            />
            <Button type="link" onClick={() => setProposalsVisibility(true)}>
              Proposals ({proposalsLength()})
            </Button>
            <Button type="link" onClick={() => setProposalsVisibility(false)}>
              Members ({usersData.length})
            </Button>
          </div>
        </div>
        <ProposalModal
          daoId={daoId}
          setCreationSuccess={setCreationSuccess}
          setProposalsVisibility={setProposalsVisibility}
        />
      </div>
      {renderCurrentTab()}
    </div>
  );
}

export default DaoDetail;
