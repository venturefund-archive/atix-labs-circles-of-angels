/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Modal, Input, Collapse, Popconfirm, message } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalMemberSelection from '../../molecules/ModalMemberSelection/ModalMemberSelection';
import './_style.scss';

function callback(key) {
  console.log(key);
}

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

  const { Panel } = Collapse;

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
        <Input className="inputPriary" placeholder="Add a description" />
        <TextArea rows={4} />
        <Collapse onChange={callback}>
          <Panel
            header={
              <div className="flex categoryCollapseHeader">
                <p>Category</p>
                <p className="categorySelected">-None</p>{' '}
                <CustomButton theme="Category" buttonText="Select Type" />
              </div>
            }
            key="1"
          >
            <p className="CollapseInnerTitle">New Member</p>
            <div className="daoRoleContainer flex">
              <img src="../static/images/icon-modal-01.png" />
              <div className="column">
                <p>
                  <strong>NEW MEMBER</strong>
                </p>
                <p>Lorem ipsum.</p>
              </div>
            </div>

            {/* <ModalMemberSelection /> */}

            <p className="CollapseInnerTitle">New Rol</p>
            <div className="daoRoleContainer flex">
              <img src="../static/images/icon-modal-02.png" />
              <div className="column">
                <p>
                  <strong>NEW ROL</strong>
                </p>
                <p>Lorem ipsum.</p>
              </div>
            </div>
            <p className="CollapseInnerTitle">Create DAO</p>
            <div className="daoRoleContainer flex">
              <img src="../static/images/icon-modal-03.png" />
              <div className="column">
                <p>
                  <strong>CREATE DAO</strong>
                </p>
                <p>Lorem ipsum.</p>
              </div>
            </div>
          </Panel>
        </Collapse>
        <div className="flex space-between">
          <div className="column">
            <p>
              <strong>Set deadline</strong>
            </p>
            <p>How soon are you looking for responses?</p>
          </div>
          <div className="space-between">
            <Popconfirm
              title={
                <div className="column">
                  <p>Today (2 hours)</p>
                  <p>Tomorroy (24 hours)</p>
                  <p>This Week (7 days)</p>
                </div>
              }
            >
              <div className="flex date">
                <img src="../static/images/icon-time-orange.png" />
                <p>Due date: 7 days</p>
              </div>
            </Popconfirm>
            ,
            <img src="../static/images/icon-pencil.png" />
          </div>
        </div>
        <div className="flex space-between border-top margin-top padding-top">
        <CustomButton theme="Alternative" buttonText="Cancel" />
          <CustomButton theme="Primary" buttonText="Create Proposal" />
        </div>
      </Modal>
    </div>
  );
}

export default ProposalModal;
