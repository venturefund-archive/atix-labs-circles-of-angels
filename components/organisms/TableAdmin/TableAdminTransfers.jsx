/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import transferStatusMap from '../../../model/transferStatus';

class TableAdminTransfers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transfers: []
    };
  }

  componentDidMount = () => this.fetchTransfers();

  fetchTransfers = async () => {
    const { projectId, getTransfers } = this.props;
    const data = await getTransfers(projectId);
    this.setState({ transfers: data || [] });
  };

  getColumns = () => [
    {
      title: 'Transfer Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'User Id',
      dataIndex: 'sender',
      key: 'name'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Receipt Number',
      dataIndex: 'transferId',
      key: 'transferId'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
      // TODO Disabled until functionality is defined
      // render: (text, record) => (
      //   <span>
      //     <select
      //       onChange={evnt => (record.status = evnt.currentTarget.value)}
      //       defaultValue={record.status}
      //     >
      //       {Object.keys(transferStatusMap).map(transferStatusKey => (
      //         <option key={transferStatusKey} value={transferStatusKey}>
      //           {transferStatusMap[transferStatusKey].show}
      //         </option>
      //       ))}
      //     </select>
      //   </span>
      // )
    }
    // TODO Disabled until functionality is defined
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span>
    //       <CustomButton
    //         theme="Primary"
    //         buttonText="Confirm"
    //         onClick={() => {
    //           console.log(record);
    //           this.props.saveStatus(record.id, record.state);
    //         }}
    //       />
    //     </span>
    //   )
    // }
  ];

  render() {
    const { transfers } = this.state;

    return (
      <Table
        columns={this.getColumns()}
        dataSource={transfers}
        size="middle"
        className="TableAdmin"
        pagination={false}
      />
    );
  }
}

export default TableAdminTransfers;

TableAdminTransfers.propTypes = {
  projectId: PropTypes.number.isRequired,
  saveStatus: PropTypes.func.isRequired,
  getTransfers: PropTypes.func.isRequired
};
