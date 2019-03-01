import React from "react";
import {
  sendTransferInformation,
  getTransferDestinationInfo
} from "../api/transferApi";
import "./_transferSubmitStyle.scss";

class TransferSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferDestination: ""
    };
    this.senderIdRef = React.createRef();
    this.transferIdRef = React.createRef();
    this.amountRef = React.createRef();
    this.currencyRef = React.createRef();
    this.projectIdRef = React.createRef();
    this.destinationRef = React.createRef();
  }

  componentDidMount = async () => {
    this.setState({ transferDestination: await getTransferDestinationInfo() });
  };

  handleSubmit = evnt => {
    evnt.preventDefault();
    const toSubmit = {
      transferId: this.transferIdRef.current.value,
      amount: this.amountRef.current.value,
      currency: this.currencyRef.current.value,
      senderId: this.senderIdRef.current.value,
      projectId: this.projectIdRef.current.value,
      destinationAccount: this.destinationRef.current.value
    };
    const result = sendTransferInformation(toSubmit);
  };

  render() {
    return (
      <>
        <form className="transferForm" onSubmit={this.handleSubmit}>
        <div>
          <p>Account destination: {this.state.transferDestination}</p>
        </div>
          <input ref={this.senderIdRef} placeholder="Sender Id" type="number" />
          <input ref={this.transferIdRef} placeholder="Transference Id" />
          <input ref={this.amountRef} placeholder="Amount" type="number" />
          <select ref={this.currencyRef} placeholder="Currency">
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="ar">PESO ARGENTINO</option>
          </select>
          <input
            ref={this.projectIdRef}
            placeholder="Project Id"
            type="number"
          />
          <input ref={this.destinationRef} placeholder="Destination Account" />
          <button>Send</button>
        </form>
      </>
    );
  }
}

export default TransferSubmit;
