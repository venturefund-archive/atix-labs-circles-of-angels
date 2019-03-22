import React from "react";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import FormTransfer from "../components/molecules/FormTransfer/FormTransfer.jsx";
import { sendTransferInformation } from "../api/transferApi";
import Router from "next/router";

import "./_style.scss";
import "./_transfer-funds.scss";

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferNumber: "",
      amount: ""
    };

    this.userId = this.props.url.query.userId;
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
      senderId: this.userId ? this.userId : 1,
      projectId: 1,
      destinationAccount: "asdf1234qwer5678"
    };
    const result = await sendTransferInformation(toSubmit);
    console.log(result);
    if (result.error) alert(`Error: ${result.error}`);
    else {
      Router.push(`/tranfer-funds-confirmation?userId=${this.userId}`);
      alert(`Success: Transfer submited correctly!`);
      
    }
  };

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf stepNumber={2} />
          <div className="TransferContainer">
            <h1>Transfer Funds</h1>
            <div className="TransferContent">
              <h2>Circles of Angels Bank Account Information</h2>
              <div>
                <h3> Singapore Bank</h3>
                <div />
                <h4> Account #: 0012345678</h4>
                <h4> Account owner: CirclesOfAngels</h4>
              </div>
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
