/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import TableTransfer from '../TableTransfer/TableTransfer';
import {
  getTransferListOfProject,
  createTransfer,
  getTransferBlockchainData
} from '../../../api/transferApi';
import { projectPropTypes } from '../../../helpers/proptypes';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newFundFormItems } from '../../../helpers/createProjectFormFields';

const Transfers = ({ project, allowNewFund }) => {
  const [transfers, setTransfers] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchTransfers = async () => {
    try {
      if (!project) return;
      const response = await getTransferListOfProject(project.id);
      setTransfers(response);
    } catch (error) {
      message.error(error);
    }
  };

  const fetchTransferBlockchainData = async transferId => {
    const response = await getTransferBlockchainData(transferId);
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const onNewFund = async fund => {
    const response = await createTransfer(project.id, fund);
    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Fund done successfully!');
    fetchTransfers();
  };

  const onShowModal = () => setVisible(true);

  useEffect(() => {
    fetchTransfers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <CustomButton
        theme="Primary"
        buttonText="New Fund"
        onClick={onShowModal}
        hidden={!allowNewFund}
      />
      <CustomFormModal
        title="Fund project"
        formItems={newFundFormItems}
        visible={visible}
        onConfirm={onNewFund}
        onClose={() => setVisible(false)}
      />
      <TableTransfer
        transfers={transfers}
        fetchBlockchainData={fetchTransferBlockchainData}
      />
    </Fragment>
  );
};

export default Transfers;

Transfers.defaultProps = {
  project: undefined,
  allowNewFund: false
};

Transfers.propTypes = {
  project: PropTypes.shape(projectPropTypes),
  allowNewFund: PropTypes.bool
};
