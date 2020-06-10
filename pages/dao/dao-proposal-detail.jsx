/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import { message, Progress, Avatar } from 'antd';
import { LeftOutlined, CopyFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import {
  showModalError,
  showModalSuccess
} from '../../components/utils/Modals';
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
  getDaoUsers,
  uploadVoteGetTransaction,
  uploadVoteSendTransaction
} from '../../api/daoApi';
import { getUser } from '../../api/userApi';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import { proposalTypeEnum, voteEnum } from '../../constants/constants';

function DaoProposalDetail() {
  const [visibility, setVisibility] = useState(false);
  const [currentProposal, setCurrentProposal] = useState({});
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [txData, setTxData] = useState();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [buttonsDisable, setButtonsDisable] = useState(false);
  const [isVotePeriod, setIsVotePeriod] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const { daoId, proposalId } = useQuery();
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();

  useEffect(() => {
    fetchCurrentProposal();
  }, [voteSuccess]);

  useEffect(() => {
    fetchCurrentUser();
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
      // FIXME: This page may be refactored to a single page
      // with the dao-detail one making a conditional rendering
      const found = response.data.find(proposal => proposal.id === proposalId);
      if (!found) {
        message.error('The proposal does not exist on this DAO');
        return;
      }
      setCurrentProposal(found);
    } catch (error) {
      message.error(error);
    }
  };

  const onNewVote = async vote => {
    try {
      const voteData = { vote };
      const tx = await getVoteTx(voteData);
      console.log(tx);
      if (tx) showPasswordModal(voteData, tx);
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
      setVoteSuccess(true);
      hideModalPassword();
      disableButtons();
    }
    message.success('Vote submitted successfully!');
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
    const response = await uploadVoteSendTransaction(
      daoId,
      proposalId,
      signedTransaction
    );

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const showPasswordModal = (voteData, tx) => {
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

  const hideExecuteButton = () => {
    const isProposer = currentUser.address === currentProposal.proposer;
    const majorityPositive = currentProposal.yesVotes > currentProposal.noVotes;
    const hideButton = isVotePeriod || !isProposer || !majorityPositive;
    return hideButton;
  };

  const votesPercentage = votes => {
    const totalVotes = currentProposal.yesVotes + currentProposal.noVotes;
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
          <div className="flex marginBottom">
            <div className="flex marginRight">
              <img
                className="marginRight"
                src="../static/images/icon-date.svg"
                alt="img"
              />
              <p className="text">01 d : 21 h :09 m</p>
            </div>
            <div className="flex">
              <img
                className="marginRight"
                src="../static/images/icon-time.png"
                alt="img"
              />
              <p className="text">Due date: 13 days</p>
            </div>
          </div>
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
                  <p className="bold">Matt Grindor</p>
                  <p>
                    {parseAddress(currentProposal.proposer)} ... <CopyFilled />
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
                  <p className="bold">Eric Conner</p>
                  <p>
                    {parseAddress(currentProposal.applicant)} ... <CopyFilled />
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
            {/* <div className="subBox">
              <h3>Participants</h3>
              <div className="detail flex">
                <div className="avatarBox flex">
                  <Avatar className="avatar-overlap">U</Avatar>
                  <Avatar className="avatar">A</Avatar>
                  <Avatar className="avatar">R</Avatar>
                  <Avatar className="avatar">S</Avatar>
                  <Avatar className="avatar">P</Avatar>
                </div>
                <div className="plusSign flex-start">
                  <h2>+</h2>
                  <p>334</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex VoteButton">
          <CustomButton
            onClick={() => onNewVote(voteEnum.YES)}
            theme={buttonsDisable ? 'disabled' : 'VoteYes'}
            buttonText="Vote Yes"
            disabled={buttonsDisable}
            hidden={!isVotePeriod}
          />
          <CustomButton
            onClick={() => onNewVote(voteEnum.NO)}
            theme={buttonsDisable ? 'disabled' : 'VoteNo'}
            buttonText="Vote No"
            disabled={buttonsDisable}
            hidden={!isVotePeriod}
          />
          <CustomButton
            theme="Primary"
            buttonText="Execute"
            // onClick={}
            hidden={hideExecuteButton()}
          />
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
