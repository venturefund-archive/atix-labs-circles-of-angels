import React from "react";
import { Avatar } from "antd";
import UserLabel from "../../atoms/UserLabel/UserLabel.jsx";
import SettingsMenu from "../../atoms/SettingsMenu/SettingsMenu.jsx";

import "./_style.scss";

const UserAvatar = () => (
  <div className="UserAvatar">
    <div className="UserData">
      <Avatar style={{ color: "#0083E3", backgroundColor: "#95d2ff" }}>
        JP
      </Avatar>
      <UserLabel userName="Mariano Maidana" userRole="Impact Funder" />
    </div>
    <SettingsMenu />
  </div>
);

export default UserAvatar;
