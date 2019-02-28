import React from "react";
import { Skeleton } from "antd";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import FormTransfer from "../components/molecules/FormTransfer/FormTransfer.jsx";
import { sendTransferInformation } from "../api/transferApi";

import "./_style.scss";
import "./_transfer-funds.scss";

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferNumber: "",
      amount: ""
    };
  }

  updateState = (evnt, field, value) => {
    evnt.preventDefault();
    this.setState({ [field]: value });
  };

  submitTransfer = async evnt => {
    evnt.preventDefault();
    const toSubmit = {
      transferId: this.state.transferNumber,
      amount: this.state.amount,
      currency: "usd",
      senderId: this.props.userId ? this.props.userId : 1,
      projectId: 1,
      destinationAccount: "asdf1234qwer5678"
    };
    const result = await sendTransferInformation(toSubmit);
    console.log(result)
    if (result.error) alert(`Error: ${result.error}`);
    else alert(`Success: Transfer submited correctly!`)
  };

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf />
          <div className="TransferContainer">
            <h1>Transfer Funds</h1>
            <div className="TransferContent">
              <h2>Circles of Angels Bank Account Information</h2>
              <Skeleton />
              <FormTransfer
                onTransferChange={evnt =>
                  this.updateState(evnt, "transferNumber", evnt.target.value)
                }
                onAmountChange={evnt =>
                  this.updateState(evnt, "amount", evnt.target.value)
                }
                submitTransfer={this.submitTransfer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransferFunds;
