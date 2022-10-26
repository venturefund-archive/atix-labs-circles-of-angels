/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import TableBOMilestones from '../components/organisms/TableBOMilestones/TableBOMilestones';
import { getMilestones, transferredMilestone } from '../api/milestonesApi';
import { claimMilestoneStatus } from '../constants/constants';
import CustomFormModal from '../components/organisms/CustomFormModal/CustomFormModal';
import { transferMilestoneFormItems } from '../helpers/milestoneTransferFormFields';
import { filterAbortedProjects } from '../helpers/utils';

const BackOfficeMilestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(undefined);

  const closeReceiptModal = () => {
    setModalVisible(false);
    setSelectedMilestone(undefined);
  };

  const fetchMilestones = async () => {
    // TODO filters should be defined and added
    const response = await getMilestones({
      claimStatus: [
        claimMilestoneStatus.CLAIMED,
        claimMilestoneStatus.TRANSFERRED
      ]
    });

    if (response.errors) {
      message.error(response.errors);
      return;
    }

    const filteredMilestones = filterAbortedProjects(
      response ? response.data : []
    );

    setMilestones(filteredMilestones);
  };

  const onFundsTransferred = async formData => {
    if (!selectedMilestone) return;
    const response = await transferredMilestone(selectedMilestone, formData);
    if (response.errors) {
      message.error(response.errors);
    } else {
      setSelectedMilestone(undefined);
      message.success('Funds transferred successfully!');
      fetchMilestones();
    }
    return response;
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  useEffect(() => {
    if (selectedMilestone) setModalVisible(true);
  }, [selectedMilestone]);

  return (
    <div className="TableContainer">
      <h1>Milestones Administration</h1>
      <TableBOMilestones
        data={milestones}
        onFundsTransferred={setSelectedMilestone}
      />
      <CustomFormModal
        title="Upload Transfer Receipt"
        onConfirm={onFundsTransferred}
        onClose={closeReceiptModal}
        visible={modalVisible}
        formItems={transferMilestoneFormItems}
      />
    </div>
  );
};

export default BackOfficeMilestones;
