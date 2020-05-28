/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Modal, Input, Popconfirm } from 'antd';
import { createNewMemberProposal } from '../../../api/daoApi';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalMemberSelection from '../ModalMemberSelection/ModalMemberSelection';
import {
  showModalSuccess,
  showModalError,
  showModalConfirm
} from '../../utils/Modals';
import './_style.scss';

function callback(key) {
  console.log(key);
}

const ProposalModal = ({ daoId, setCreationSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [applicant, setApplicant] = useState('');
  const [description, setDescription] = useState('');

  const submitMemberProposal = async () => {
    if (!applicant || !description) {
      showModalError('Error!', 'Please complete both fields');
      return false;
    }

    const proposal = {
      applicant,
      description
    };
    const response = await createNewMemberProposal(daoId, proposal);
    if (response.errors) {
      const title = 'Error!';
      const content = response.errors
        ? response.errors
        : 'There was an error submitting the proposal.';
      showModalError(title, content);
    } else {
      showModalSuccess('Success', 'Proposal created correctly!');
      setVisible(false);
      setCreationSuccess(true);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
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
            <img src="../static/images/icon-modal-01.png" />
            <p>
              <strong>NEW MEMBER</strong>
            </p>
          </div>

          <div className="daoRoleContainer flex">
            <img src="../static/images/icon-modal-02.png" />
            <p>
              <strong>NEW ROLE</strong>
            </p>
          </div>

          <div className="daoRoleContainer flex">
            <img src="../static/images/icon-modal-03.png" />
            <p>
              <strong>CREATE DAO</strong>
            </p>
          </div>
        </div>

        <ModalMemberSelection
          setApplicant={setApplicant}
          setDescription={setDescription}
          submitMemberProposal={submitMemberProposal}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default ProposalModal;
