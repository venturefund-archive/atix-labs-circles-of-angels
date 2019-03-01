import React from "react";
import "./_style.scss";

const TransferLabel = ({ theme, text }) => {
  const classname = "TransferLabel " + theme;

  return (
    <div className={classname}>
      <p>{text}</p>
    </div>
  );
};

export default TransferLabel;
