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
import { getTransferListOfProject } from '../../../api/transferApi';
import { projectPropTypes } from '../../../helpers/proptypes';

const Transfers = ({ project }) => {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    try {
      if (!project) return;
      const response = await getTransferListOfProject(project.id);
      setTransfers(response);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <Fragment>
      <TableTransfer transfers={transfers} />
    </Fragment>
  );
};

export default Transfers;

Transfers.defaultProps = {
  project: undefined
};

Transfers.propTypes = {
  project: PropTypes.shape(projectPropTypes)
};
