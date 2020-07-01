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
  uploadProposalGetTransaction,
  uploadProposalSendTransaction,
  getAllUsers
} from '../../../api/daoApi';
import ModalPasswordRequest from '../../organisms/ModalPasswordRequest/ModalPasswordRequest';
import { signTransaction } from '../../../helpers/blockchain/wallet';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalMemberSelection from '../ModalMemberSelection/ModalMemberSelection';
import ModalDaoSelection from '../ModalDaoSelection/ModalDaoSelection';
import ProposalOption from '../ProposalOption/ProposalOption';
import { showModalSuccess, showModalError } from '../../utils/Modals';
import { options } from './proposalOptions';
import { proposalTypes } from '../../../constants/constants';
import { useUserContext } from '../../utils/UserContext';
import './_style.scss';

const ProposalModal = ({ daoId, setCreationSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [applicant, setApplicant] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    proposalTypes.NEW_MEMBER
  );
  const [txData, setTxData] = useState();
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const { getLoggedUser } = useUserContext();
  const loggedUser = getLoggedUser();

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Users list');
        return [];
      }
      setUsersData(response.data.users);
    } catch (error) {
      message.error(error);
    }
  };

  const getCurrentUser = () => {
    const userFound = usersData.find(user => user.id === loggedUser.id);
    setCurrentUser(userFound);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    getCurrentUser();
  });

  const validateInputs = () => !applicant || !description;

  const onNewProposal = async () => {
    try {
      if (validateInputs()) {
        showModalError('Error!', 'Please complete both fields');
        return false;
      }

      const proposalData = {
        applicant,
        description,
        proposalType: selectedOption
      };
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

  const cleanFields = () => {
    setApplicant('');
    setDescription('');
  };

  const showModal = () => {
    setVisible(true);
  };

  const onSelect = proposalType => {
    cleanFields();
    setSelectedOption(proposalType);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    cleanFields();
    setVisible(false);
  };

  const getOptionTitle = () => {
    const currentOption = options.find(
      option => option.proposalType === selectedOption
    );
    return currentOption.title;
  };

  const renderSelectedComponent = () => {
    return (
      <div>
        {selectedOption === proposalTypes.NEW_MEMBER && (
          <ModalMemberSelection
            setApplicant={setApplicant}
            setDescription={setDescription}
            submitMemberProposal={onNewProposal}
            onCancel={handleCancel}
            usersData={usersData}
          />
        )}

        {/* {selectedOption === 1 && (
          <ModalRoleSelection
            setNewDaoName={setNewDaoName}
            setApplicant={setApplicant}
            setDescription={setDescription}
            submitDaoProposal={onNewProposal}
            onCancel={handleCancel}
            usersData={usersData}
          />
        )} */}

        {selectedOption === proposalTypes.NEW_DAO && (
          <ModalDaoSelection
            currentUser={currentUser}
            setApplicant={setApplicant}
            setDescription={setDescription}
            submitDaoProposal={onNewProposal}
            onCancel={handleCancel}
            usersData={usersData}
          />
        )}
      </div>
    );
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
        <h1>{getOptionTitle()}</h1>
        <p className="subtitle">
          Select the type of proposal form the following options
        </p>

        <div className="flex space-between margin-top">
          {options.map(option => (
            <ProposalOption
              img={option.image}
              value={option.value}
              proposalType={option.proposalType}
              onSelect={onSelect}
              selectedOption={selectedOption}
            />
          ))}
        </div>

        {renderSelectedComponent()}

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
