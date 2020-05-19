/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

function ProposalModal() {
  const [visible, setVisible] = useState(false);

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

  const { TextArea } = Input;

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
      >
        <Input placeholder="Add a description" />
        <TextArea rows={4} />
      </Modal>
    </div>
  );
}

export default ProposalModal;
