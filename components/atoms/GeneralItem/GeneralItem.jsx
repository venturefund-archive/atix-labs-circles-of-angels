import React from "react";
import "./_style.scss";

const GeneralItem = ({ subtitle, title, iconItem }) => (
  <div className="GeneralItem">
    <div className="HeaderData">
      <img src={iconItem} alt="iconItem" />
      <p>{subtitle}</p>
    </div>
    <h2>{title}</h2>
  </div>
);

export default GeneralItem;