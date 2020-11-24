/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import {
  uploadMemberProposalGetTransaction,
  uploadDaoProposalGetTransaction,
  uploadRoleBankProposalGetTransaction,
  uploadRoleCuratorProposalGetTransaction,
  uploadProposalSendTransaction,
  getAllUsers
} from '../../../api/daoApi';
import ModalPasswordRequest from '../../organisms/ModalPasswordRequest/ModalPasswordRequest';
import { signTransaction } from '../../../helpers/blockchain/wallet';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalMemberSelection from '../ModalMemberSelection/ModalMemberSelection';
import ModalDaoSelection from '../ModalDaoSelection/ModalDaoSelection';
import ModalRoleSelection from '../ModalRoleSelection/ModalRoleSelection';
import ProposalOption from '../ProposalOption/ProposalOption';
import { showModalError } from '../../utils/Modals';
import { options } from './proposalOptions';
import { proposalTypes } from '../../../constants/constants';
import { useUserContext } from '../../utils/UserContext';
import './_style.scss';

const ProposalModal = ({
  daoId,
  setCreationSuccess,
  setProposalsVisibility
}) => {
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
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState(undefined);

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

  const getCurrentUser = useCallback(() => {
    const userFound = usersData.find(user => user.id === loggedUser.id);
    setCurrentUser(userFound);
  }, [loggedUser.id, usersData]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, usersData]);

  const validateInputs = () => !applicant || !description;

  const onNewProposal = async () => {
    try {
      if (validateInputs()) {
        showModalError('Error!', 'Please complete both fields');
        return false;
      }
      const proposalData = {
        applicant,
        description
      };
      const tx = await getProposalTx(proposalData);
      if (tx) showPasswordModal(proposalData, tx);
    } catch (error) {
      message.error(error.message);
    }
  };

  const getProposalTx = async data => {
    let response;
    if (selectedOption === proposalTypes.NEW_MEMBER)
      response = await uploadMemberProposalGetTransaction(daoId, data);
    if (selectedOption === proposalTypes.NEW_DAO)
      response = await uploadDaoProposalGetTransaction(daoId, data);
    if (selectedOption === proposalTypes.ASSIGN_BANK)
      response = await uploadRoleBankProposalGetTransaction(daoId, data);
    if (selectedOption === proposalTypes.ASSIGN_CURATOR)
      response = await uploadRoleCuratorProposalGetTransaction(daoId, data);

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
      setProposalsVisibility(true);
    }
    message.success('Proposal created successfully!');
  };

  const signAndSendTransaction = useCallback(
    async userPassword => {
      const signedTransaction = await signProposalTx(txData, userPassword);
      await sendProposalTx(signedTransaction);
    },
    [sendProposalTx, txData]
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

  const sendProposalTx = useCallback(
    async signedTransaction => {
      const data = {
        applicant,
        description,
        type: selectedOption,
        ...signedTransaction
      };
      const response = await uploadProposalSendTransaction(daoId, data);

      if (response.errors) {
        throw new Error(response.errors);
      }
      return response.data;
    },
    [applicant, daoId, description, selectedOption]
  );

  const cleanFields = () => {
    setApplicant('');
    setDescription('');
    setSelectedUser(undefined);
    setSelectedRole(undefined);
  };

  const showModal = () => {
    setVisible(true);
  };

  const onSelect = proposalType => {
    cleanFields();
    setSelectedOption(proposalType);
  };

  const handleCancel = () => {
    cleanFields();
    setVisible(false);
  };

  const getOptionTitle = () => {
    const currentOption = options.find(
      option => option.proposalType === selectedOption
    );
    if (!currentOption && selectedOption >= options.length)
      return options.find(option => option.name === 'newRole').title;
    return currentOption.title;
  };

  const filterOptions = () => {
    const superDaoId = 0;
    let filteredOptions = options;
    if (daoId !== superDaoId) {
      filteredOptions = options.filter(option => !option.onlySuperDAO);
    }
    return filteredOptions;
  };

  const renderSelectedComponent = () => (
    <div>
      {selectedOption === proposalTypes.NEW_MEMBER && (
        <ModalMemberSelection
          setApplicant={setApplicant}
          setDescription={setDescription}
          description={description}
          usersData={usersData}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      {(selectedOption === proposalTypes.ASSIGN_BANK ||
        selectedOption === proposalTypes.ASSIGN_CURATOR) && (
        <ModalRoleSelection
          setApplicant={setApplicant}
          setDescription={setDescription}
          description={description}
          usersData={usersData}
          setSelectedOption={setSelectedOption}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}

      {selectedOption === proposalTypes.NEW_DAO && (
        <ModalDaoSelection
          currentUser={currentUser}
          setApplicant={setApplicant}
          setDescription={setDescription}
          description={description}
          usersData={usersData}
        />
      )}
    </div>
  );

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
        onOk={onNewProposal}
        onCancel={handleCancel}
        width={700}
        okText="Create Proposal"
        cancelText="Cancel"
      >
        <h1>{getOptionTitle()}</h1>
        <p className="subtitle">
          Select the type of proposal form the following options
        </p>

        <div className="flex space-between margin-top">
          {filterOptions().map(option => (
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

ProposalModal.propTypes = {
  daoId: PropTypes.number.isRequired,
  setCreationSuccess: PropTypes.func.isRequired,
  setProposalsVisibility: PropTypes.func.isRequired
};

export default ProposalModal;
