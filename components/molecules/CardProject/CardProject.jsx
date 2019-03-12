import React from "react";
import InfoItem from "../../atoms/InfoItem/InfoItem.jsx";

import "./_style.scss";

const CardProject = ({ enterpriceName, enterpriceMission, projectCardImage }) => (
  <div className="CardProject">
    <div className="ProjectDescription">
        <img src={projectCardImage} alt="projectCardImage" />
        <div className="GradientEfect">
            <div className="DescriptionData">
                <h1>{enterpriceName}</h1>
                <p>{enterpriceMission}</p>
            </div>
        </div>
    </div>
    <div className="ProjectSummery">
      <InfoItem
        subtitle="Enterprice Location"
        title="Cambodia"
        iconInfoItem="./static/images/icon-place.svg"
      />
      <InfoItem
        subtitle="Timeframe"
        title="12 Months"
        iconInfoItem="./static/images/icon-timeframe.svg"
      />
      <InfoItem
        subtitle="Amount"
        title="$100.000 USD"
        iconInfoItem="./static/images/icon-amount.svg"
      />
    </div>
  </div>
);

export default CardProject;
