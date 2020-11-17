/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { message, Col, Row } from 'antd';
import TableTransfer from '../TableTransfer/TableTransfer';
import {
  getTransferListOfProject,
  createTransfer
} from '../../../api/transferApi';
import { projectPropTypes } from '../../../helpers/proptypes';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newFundFormItems } from '../../../helpers/createProjectFormFields';

const blabla = (
  <Row className="Data">
    <Col span={12} className="flex">
      <b>Alias</b> <p>CIRCLES OF ANGELS ALIAS</p>
    </Col>
    <Col span={12} className="flex">
      <b>ID ACCOUNT</b> <p>0170347240000030652220</p>
    </Col>
  </Row>
);

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
        // body={blabla}
      />
      <TableTransfer transfers={transfers} />
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
