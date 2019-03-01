import React from "react";
import { Avatar } from "antd";
import UserLabel from "../../atoms/UserLabel/UserLabel.jsx";
import SignatureLabel from "../../atoms/SignatureLabel/SignatureLabel.jsx";
import "./_style.scss";

const SignatoryItem = () => (
  <div className="SignatoryItem">
    <p className="SignatoryLabel">signer</p>
    <div className="Signatory">
      <div className="SignatoryData">
        <Avatar style={{ color: "#0083E3", backgroundColor: "#95d2ff" }}>
          JP
        </Avatar>
        <UserLabel text="Mariano Maidana" />
      </div>
      <div className="SignatoryStatus">
        <SignatureLabel text="Funds Pending" iconStatus="./static/images/icon-clock.svg" theme="theme-pending" />
        <SignatureLabel text="Funds Received" iconStatus="./static/images/icon-check.svg" theme="theme-success" />
      </div>
    </div>
  </div>
);

export default SignatoryItem;
