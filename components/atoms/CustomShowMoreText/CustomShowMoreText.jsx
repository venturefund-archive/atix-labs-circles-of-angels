/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import './_style.scss';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';

export default function CustomShowMoreText(props) {
  const { text, lines } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function executeOnClick() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="CustomShowMoreText">
      <ShowMoreText
        lines={lines}
        more="Read more"
        less="Read less"
        anchorClass="TextMore"
        onClick={executeOnClick}
        expanded={isExpanded}
      >
        {text}
      </ShowMoreText>
    </div>
  );
}
