/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import { message, Popover, Avatar, Progress } from 'antd';
import { LeftOutlined, CopyFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { showModalError } from '../../components/utils/Modals';
import { useUserContext } from '../../components/utils/UserContext';
import ModalPasswordRequest from '../../components/organisms/ModalPasswordRequest/ModalPasswordRequest';
import { signTransaction } from '../../helpers/blockchain/wallet';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import useQuery from '../../hooks/useQuery';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import {
  getProposalsByDaoId,
  getAllUsers,
  uploadVoteGetTransaction,
  uploadVoteSendTransaction,
  uploadProcessGetTransaction,
  uploadProcessSendTransaction
} from '../../api/daoApi';
import { getUser } from '../../api/userApi';
import { parseDate } from '../../helpers/daoDates';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import { proposalTypeEnum, voteEnum } from '../../constants/constants';

function DaoProposalDetail() {
  const [currentProposal, setCurrentProposal] = useState({});
  const [newVote, setNewVote] = useState();
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [txData, setTxData] = useState();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [buttonsDisable, setButtonsDisable] = useState(false);
  const [isVotePeriod, setIsVotePeriod] = useState(false);
  const [alreadyVote, setAlreadyVote] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [daoUsers, setDaoUsers] = useState([]);
  const history = useHistory();
  const { daoId, proposalId } = useQuery();
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();

  useEffect(() => {
    fetchCurrentProposal();
  }, [voteSuccess, currentUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchDaoUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await getUser(user.id);
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the current user data');
        return [];
      }
      setCurrentUser(response.data);
    } catch (error) {
      message.error(error);
    }
  };

  const fetchCurrentProposal = async () => {
    try {
      const response = await getProposalsByDaoId(daoId);
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Proposals');
        return [];
      }

      const found = response.data.find(proposal => proposal.id === proposalId);
      const voted = found.voters.find(voter => voter === currentUser.address);
      if (!found) {
        message.error('The proposal does not exist on this DAO');
        return;
      }
      setCurrentProposal(found);
      setIsVotePeriod(
        !found.votingPeriodExpired &&
          found.currentPeriod >= found.startingPeriod
      );
      setButtonsDisable(found.processed);
      setAlreadyVote(voted && voted.length);
    } catch (error) {
      message.error(error);
    }
  };

  const fetchDaoUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the dao users');
        return [];
      }
      setDaoUsers(response.data.users);
    } catch (error) {
      message.error(error);
    }
  };

  const onNewVote = async vote => {
    try {
      setNewVote(vote);
      const voteData = { vote };
      const tx = await getVoteTx(voteData);
      if (tx) showPasswordModal(tx);
    } catch (error) {
      message.error(error.message);
    }
  };

  const getVoteTx = async data => {
    const response = await uploadVoteGetTransaction(daoId, proposalId, data);
    if (response.errors) {
      const title = 'Error!';
      const content = response.errors
        ? response.errors
        : 'There was an error submitting the vote.';
      showModalError(title, content);
    }
    return response.data;
  };

  const inputPasswordHandler = async data => {
    // TODO: add support for mnemonic
    const password = data.get('password');
    try {
      await signAndSendTransaction(password);
    } catch (error) {
      message.error(error.message);
      return;
    } finally {
      if (isVotePeriod) setVoteSuccess(true);
      hideModalPassword();
      disableButtons();
    }
    if (isVotePeriod) message.success('Vote submitted successfully!');
    else {
      message.success('Processed successfully!');
    }
  };

  const signAndSendTransaction = useCallback(
    async userPassword => {
      const signedTransaction = await signProposalTx(txData, userPassword);
      await sendProposalTx(signedTransaction);
    },
    [txData]
  );

  const signProposalTx = async (tx, password) => {
    const { tx: unsignedTx, encryptedWallet } = tx;
    const signedTransaction = await signTransaction(
      encryptedWallet,
      unsignedTx,
      password
    );
    return { signedTransaction };
  };

  const sendProposalTx = async signedTransaction => {
    let response;
    if (isVotePeriod) {
      const data = {
        vote: newVote,
        ...signedTransaction
      };
      
      response = await uploadVoteSendTransaction(
        daoId,
        proposalId,
        data
      );
    } else {
      response = await uploadProcessSendTransaction(
        daoId,
        proposalId,
        signedTransaction
      );
    }

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const showPasswordModal = tx => {
    setTxData(tx);
    setModalPasswordVisible(true);
  };

  const hideModalPassword = () => {
    setTxData(undefined);
    setModalPasswordVisible(false);
  };

  const disableButtons = () => {
    setButtonsDisable(true);
  };

  const onProcess = async () => {
    try {
      const tx = await getProcessTx();
      if (tx) showPasswordModal(tx);
    } catch (error) {
      message.error(error.message);
    }
  };

  const getProcessTx = async () => {
    const response = await uploadProcessGetTransaction(daoId, proposalId);
    if (response.errors) {
      const title = 'Error!';
      const content = response.errors
        ? response.errors
        : 'There was an error processing the proposal.';
      showModalError(title, content);
    }
    return response.data;
  };

  const hideExecuteButton = () => {
    const { currentPeriod, startingPeriod, proposer, votingPeriodLength } = currentProposal;
    const beforeVotingPeriod = currentPeriod < startingPeriod;
    const gracePeriod = currentPeriod >= startingPeriod + votingPeriodLength 
      && currentPeriod <= startingPeriod + votingPeriodLength + votingPeriodLength;
    const isProposer = currentUser.address === proposer;
    const hideButton = beforeVotingPeriod || isVotePeriod || gracePeriod || !isProposer;
    return hideButton;
  };

  const votesPercentage = votes => {
    const { yesVotes, noVotes } = currentProposal;
    const totalVotes = yesVotes + noVotes;
    if (totalVotes <= 0) return 0;
    const percentage = (votes / totalVotes) * 100;
    return percentage;
  };

  const parseAddress = address => {
    const addressLength = 12;
    if (!address) return;
    return address.substring(0, addressLength);
  };

  const parseType = type => {
    const proposalTypes = [
      proposalTypeEnum.NEW_MEMBER,
      proposalTypeEnum.NEW_DAO,
      proposalTypeEnum.ASSIGN_BANK,
      proposalTypeEnum.ASSIGN_CURATOR
    ];
    return proposalTypes[type];
  };

  const userFullname = address => {
    const daoUser = daoUsers.find(current => current.address === address);
    if (!daoUser) return;
    const fullname = `${daoUser.firstName} ${daoUser.lastName}`;
    return fullname;
  };

  const copyToClipboard = memberAddress => {
    if (currentProposal) {
      const proposerAddress = memberAddress;
      navigator.clipboard.writeText(proposerAddress);
    }
  };

  const renderRemainingTimeLabel = () => {
    if (!currentProposal.processed) {
      return (
        <div className="flex">
          <img
            className="marginRight"
            src="../static/images/icon-time.png"
            alt="img"
          />
          <p className="text">{parseDate(currentProposal)}</p>
        </div>
      );
    }
  };

  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection borderBottom marginBottom">
        <div className="column marginBottom">
          <p className="LabelSteps">
            <LeftOutlined />
            <a onClick={() => history.goBack()}>Back to proposal</a>
          </p>
          <TitlePage
            textTitle={
              history.location.state
                ? history.location.state.daoName
                : `Name of Dao ${daoId}`
            }
          />
        </div>
      </div>
      <div className="ProposalContainer flex space-between">
        {/* First Column */}
        <div className="column col">
          {renderRemainingTimeLabel()}
          <h2 className="proposalTitle">
            {parseType(currentProposal.proposalType)}
          </h2>
          <p className="text">{currentProposal.description}</p>
          <div className="flex ProposerBox">
            <div className="ProposerSubBox">
              <div className="flex">
                <h2>Proposer</h2>
              </div>
              <div className="flex maragin">
                <div>
                  <p className="bold">
                    {userFullname(currentProposal.proposer)}
                  </p>
                  <p>
                    {parseAddress(currentProposal.proposer)} ...{' '}
                    <Popover content="Copied" trigger="click">
                      <CopyFilled
                        onClick={() =>
                          copyToClipboard(currentProposal.proposer)
                        }
                      />
                    </Popover>
                  </p>
                </div>
              </div>
            </div>
            <div className="ProposerSubBox">
              <div className="flex">
                <h2>Applicant</h2>
              </div>
              <div className="flex maragin">
                <div>
                  <p className="bold">
                    {userFullname(currentProposal.applicant)}
                  </p>
                  <p>
                    {parseAddress(currentProposal.applicant)} ...{' '}
                    <Popover content="Copied" trigger="click">
                      <CopyFilled
                        onClick={() =>
                          copyToClipboard(currentProposal.applicant)
                        }
                      />
                    </Popover>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column col">
          <div className="columnn VoteProgressBox">
            <div className="flex space-between">
              <div className="flex voteBox">
                <div className="imgVote">
                  <img alt="img" src="../static/images/yes.svg" />
                </div>
                <div className="column">
                  <p className="voteBold">
                    {currentProposal.yesVotes} -{' '}
                    {votesPercentage(currentProposal.yesVotes)}%
                  </p>
                  <p className="text">YES VOTES</p>
                </div>
              </div>
              <div className="flex voteBox">
                <div className="imgVote">
                  <img alt="img" src="../static/images/no.svg" />
                </div>
                <div className="column">
                  <p className="voteBold">
                    {currentProposal.noVotes} -{' '}
                    {votesPercentage(currentProposal.noVotes)}%
                  </p>
                  <p className="text">NO VOTES</p>
                </div>
              </div>
            </div>
            <Progress percent={votesPercentage(currentProposal.yesVotes)} />
            <div className="subBox">
              <h3>Participants</h3>
              <div className="detail flex">
                <div className="avatarBox flex">
                  <Avatar className="avatar">U</Avatar>
                  <Avatar className="avatar">A</Avatar>
                  <Avatar className="avatar">R</Avatar>
                  <Avatar className="avatar">S</Avatar>
                  <Avatar className="avatar">P</Avatar>
                </div>
                <div className="plusSign flex-start">
                <h2>... {currentProposal.yesVotes + currentProposal.noVotes}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex VoteButton">
          {isVotePeriod && !alreadyVote && (
            <CustomButton
              onClick={() => onNewVote(voteEnum.YES)}
              theme={buttonsDisable ? 'disabled' : 'VoteYes'}
              buttonText="Vote Yes"
              disabled={buttonsDisable}
            />
          )}

          {isVotePeriod && !alreadyVote && (
            <CustomButton
              onClick={() => onNewVote(voteEnum.NO)}
              theme={buttonsDisable ? 'disabled' : 'VoteNo'}
              buttonText="Vote No"
              disabled={buttonsDisable}
            />
          )}

          {!hideExecuteButton() && (
            <CustomButton
              onClick={() => onProcess()}
              theme={buttonsDisable ? 'disabled' : 'Primary'}
              buttonText="Execute"
              disabled={buttonsDisable && alreadyVote}
            />
          )}

        </div>
      </div>
      <ModalPasswordRequest
        visible={modalPasswordVisible}
        onConfirm={inputPasswordHandler}
        onClose={hideModalPassword}
      />
    </div>
  );
}

export default DaoProposalDetail;
