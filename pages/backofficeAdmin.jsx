import React from "react";
import {
  getTransferListOfProject,
  updateStateOfTransference
} from "../api/transferApi";
import { Table } from "antd";
import "antd/dist/antd.css";

class BackofficeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferRequests: []
    };
    this.projectIdRef = React.createRef();
  }

  columns = [
    {
      title: "Transfer Id",
      key: "transferId",
      dataIndex: "transferId"
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount"
    },
    {
      title: "Currency",
      key: "currency",
      dataIndex: "currency"
    },
    {
      title: "Account destination",
      key: "destinationAccount",
      dataIndex: "destinationAccount"
    },
    {
      title: "Confirmation",
      key: "action",
      render: (text, record) => (
        <span>
          <select onChange={evnt => this.changeStatus(evnt, record)}>
            <option value="-1">Rejected</option>
            <option value="0">Pending</option>
            <option value="1">Reconciliation</option>
            <option value="2">Approved</option>
          </select>
          <button
            onClick={() => {
              this.saveStatus(record);
            }}
          >
            Save Status
          </button>
        </span>
      )
    }
  ];

  changeStatus = (evnt, record) => {
    evnt.preventDefault();
    var list = this.state.transferRequests;
    list[record.key].state = evnt.currentTarget.value;
    list[record.key].stateName = evnt.currentTarget.selectedOptions[0].label;
    this.setState({ transferRequests: list });
  };

  saveStatus = record => {
    updateStateOfTransference(
      record.transferId,
      this.state.transferRequests[record.key].state
    );
    alert(
      `Change status to : ${this.state.transferRequests[record.key].stateName}`
    );
  };

  loadTransfers = async evnt => {
    console.log("sefsdf");
    evnt.preventDefault();
    const transfers = await getTransferListOfProject(
      this.projectIdRef.current.value
    );
    if (!transfers) return;
    let key = 0;
    transfers.map(t => {
      t.key = key;
      key++;
    });
    this.setState({ transferRequests: transfers });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.loadTransfers}>
          <input type="text" placeholder="Project Id" ref={this.projectIdRef} />

          <p>Transference requests:</p>
          <Table
            columns={this.columns}
            dataSource={this.state.transferRequests}
          />
        </form>
      </div>
    );
  }
}

export default BackofficeAdmin;
