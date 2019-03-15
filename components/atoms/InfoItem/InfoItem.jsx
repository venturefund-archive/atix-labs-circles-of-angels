import React from "react";
import "./_style.scss";

const InfoItem = ({ subtitle, title, iconInfoItem }) => (
  <div className="InfoItem">
    <img src={iconInfoItem} alt="iconInfoItem" />
    <div className="InfoItemData">
        <p>{subtitle}</p>
        <h2>{title}</h2>
    </div>
  </div>
);

export default InfoItem;