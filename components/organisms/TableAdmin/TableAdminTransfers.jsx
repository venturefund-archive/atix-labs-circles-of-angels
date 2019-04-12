import React from 'react';
import { Table } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import transferStatusMap from '../../../model/transferStatus';
import './_style.scss';

const TableAdminTransfers = ({
  projectId,
  saveStatus,
  getTransfersOfProjects
}) => (
  <TransferTable
    projectId={projectId}
    saveStatus={saveStatus}
    getTransfersOfProjects={getTransfersOfProjects}
  />
);
class TransferTable extends React.Component {
  columns = [
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
      key: 'tags',
      dataIndex: 'tags',
      render: (text, record) => (
        <span>
          <select
            onChange={evnt => (record.state = evnt.currentTarget.value)}
            defaultValue={record.state}
          >
            {Object.keys(transferStatusMap).map(transferStatusKey => (
              <option key={transferStatusKey} value={transferStatusKey}>
                {transferStatusMap[transferStatusKey].show}
              </option>
            ))}
          </select>
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <CustomButton
            theme="Primary"
            buttonText="Confirm"
            onClick={() => {
              console.log(record);
              this.props.saveStatus(record.transferId, record.state);
            }}
          />
        </span>
      )
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = async () => {
    const { getTransfersOfProjects, projectId } = this.props;
    const data = await getTransfersOfProjects(projectId);
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <Table
        columns={this.columns}
        dataSource={data}
        size="middle"
        className="TableAdmin"
        pagination={false}
      />
    );
  }
}

export default TableAdminTransfers;
