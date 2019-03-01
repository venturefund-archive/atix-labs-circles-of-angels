import React from "react";
import { Icon, Skeleton } from "antd";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import TransferLabel from "../components/atoms/TransferLabel/TransferLabel.jsx";
import { getTransferStatus } from "../api/transferApi";

import "./_style.scss";
import "./_transfer-funds-confirmation.scss";

const statusMap = {
  "-1": "theme-cancel",
  "0": "theme-pending",
  "1": "theme-pending",
  "2": "theme-success"
};

//Temporal for sprint 2
const userId = 1;
const projectId = 1;

class TransferFundsConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null
    };
  }

  componentDidMount = async () => {
    const status = await getTransferStatus({ userId, projectId });
    this.setState({ status: status });
  };

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <StepsIf />
          <div className="TransferConfirmationContainer">
            <h1>Transfer Funds</h1>
            <div className="TransferConfirmationContent">
              <img src="./static/images/funds-pending.svg" alt="Clock" />
              {this.state.status ? (
                <TransferLabel
                  text={this.state.status.name}
                  theme={statusMap[this.state.status.status]}
                />
              ) : (
                ""
              )}
              <h2>Circles will be checking your funds transfer</h2>
              <div className="MoreInfo">
                <Icon type="exclamation-circle" />

                <div>
                <h3> Singapore Bank</h3>
                <div></div>
                <h4>  Account #: 0012345678</h4>
                <h4>  Account owner: CirclesOfAngels</h4>
                </div>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransferFundsConfirmation;
