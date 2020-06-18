/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Modal, message } from 'antd';
import {
  createNewMemberProposal,
  uploadProposalGetTransaction,
  uploadProposalSendTransaction,
  getDaoUsers
} from '../../../api/daoApi';
import ModalPasswordRequest from '../../organisms/ModalPasswordRequest/ModalPasswordRequest';
import { signTransaction } from '../../../helpers/blockchain/wallet';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalMemberSelection from '../ModalMemberSelection/ModalMemberSelection';
import { showModalSuccess, showModalError } from '../../utils/Modals';
import './_style.scss';

const ProposalModal = ({ daoId, setCreationSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [applicant, setApplicant] = useState('');
  const [description, setDescription] = useState('');
  const [txData, setTxData] = useState();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getDaoUsers();
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Users list');
        return [];
      }
      setUsersData(response.data.users);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onNewProposal = async () => {
    try {
      if (!applicant || !description) {
        showModalError('Error!', 'Please complete both fields');
        return false;
      }

      const proposalData = { applicant, description };
      const tx = await getProposalTx(proposalData);
      if (tx) showPasswordModal(proposalData, tx);
    } catch (error) {
      message.error(error.message);
    }
  };

  const getProposalTx = async data => {
    const response = await uploadProposalGetTransaction(daoId, data);

    if (response.errors) {
      const title = 'Error!';
      const content = response.errors
        ? response.errors
        : 'There was an error submitting the proposal.';
      showModalError(title, content);
    }
    return response.data;
  };

  const hideModalProposal = () => {
    setVisible(false);
    setCreationSuccess(true);
  };

  const showPasswordModal = (proposalData, tx) => {
    setTxData(tx);
    setModalPasswordVisible(true);
  };

  const hideModalPassword = () => {
    setTxData(undefined);
    setModalPasswordVisible(false);
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
      hideModalPassword();
      hideModalProposal();
    }
    message.success('Proposal created successfully!');
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
    const response = await uploadProposalSendTransaction(
      daoId,
      signedTransaction
    );

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <div>
      <CustomButton
        theme="Primary"
        buttonText="+ New Proposal"
        onClick={showModal}
      />
      <Modal
        className="propModal"
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        {/* This should change dinamically */}
        {/* <h1>Create a New Proposal</h1> */}
        <h1>Create a New Member</h1>
        <p className="subtitle">
          Select the type of proposal form the following options
        </p>

        <div className="flex space-between margin-top">
          <div className="daoMemberContainer flex">
            <img alt="member-icon" src="../static/images/icon-modal-01.png" />
            <p>
              <strong>NEW MEMBER</strong>
            </p>
          </div>

          <div className="daoRoleContainer flex">
            <img alt="role-icon" src="../static/images/icon-modal-02.png" />
            <p>
              <strong>NEW ROLE</strong>
            </p>
          </div>

          <div className="daoRoleContainer flex">
            <img alt="dao-icon" src="../static/images/icon-modal-03.png" />
            <p>
              <strong>CREATE DAO</strong>
            </p>
          </div>
        </div>

        <ModalMemberSelection
          setApplicant={setApplicant}
          setDescription={setDescription}
          submitMemberProposal={onNewProposal}
          onCancel={handleCancel}
          usersData={usersData}
        />

        <ModalPasswordRequest
          visible={modalPasswordVisible}
          onConfirm={inputPasswordHandler}
          onClose={hideModalPassword}
        />
      </Modal>
    </div>
  );
};

export default ProposalModal;
