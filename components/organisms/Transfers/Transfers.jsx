/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import TableTransfer from '../TableTransfer/TableTransfer';
import {
  getTransferListOfProject,
  createTransfer
} from '../../../api/transferApi';
import { projectPropTypes } from '../../../helpers/proptypes';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalInvest from '../ModalInvest/ModalInvest';

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
  }, []);

  return (
    <Fragment>
      <TableTransfer transfers={transfers} />
      <CustomButton
        theme="Primary"
        buttonText="New Fund"
        onClick={onShowModal}
        hidden={!allowNewFund}
      />
      <ModalInvest
        visible={visible}
        onCreate={onNewFund}
        onClose={() => setVisible(false)}
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
