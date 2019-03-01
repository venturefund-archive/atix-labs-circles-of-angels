import React from "react";
import { Avatar } from "antd";
import UserLabel from "../../atoms/UserLabel/UserLabel.jsx";
import SignatureLabel from "../../atoms/SignatureLabel/SignatureLabel.jsx";
import "./_style.scss";

const SignatoryItem = ({tfStatusName, tfStatusIcon, tfStatusShow , username, nameInitials }) => (
  <div className="SignatoryItem">
    <p className="SignatoryLabel">signer</p>
    <div className="Signatory">
      <div className="SignatoryData">
        <Avatar style={{ color: "#0083E3", backgroundColor: "#95d2ff" }}>
          {nameInitials}
        </Avatar>
        <UserLabel text={username} />
      </div>
      <div className="SignatoryStatus">
        <SignatureLabel text={tfStatusShow} iconStatus={tfStatusIcon} theme={`theme-${tfStatusName}`} />
      </div>
    </div>
  </div>
);

export default SignatoryItem;
