import React from "react";
import { Icon, Skeleton } from "antd";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsIf from "../components/molecules/StepsIf/StepsIf.jsx";
import TransferLabel from "../components/atoms/TransferLabel/TransferLabel.jsx";

import "./_style.scss";
import "./_transfer-funds-confirmation.scss";

const TransferFunds = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <StepsIf />
      <div className="TransferConfirmationContainer">
        <h1>Transfer Funds</h1>
        <div className="TransferConfirmationContent">
          <img src="./static/images/funds-pending.svg" alt="Clock" />
          <TransferLabel text="Pending Verification" theme="theme-pending" />
          <TransferLabel text="Verified" theme="theme-success" />
          <TransferLabel text="Cancelled" theme="theme-cancel" />
          <h2>Circles will be checking your funds transfer</h2>
          <div className="MoreInfo">
            <Icon type="exclamation-circle" />
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TransferFunds;
