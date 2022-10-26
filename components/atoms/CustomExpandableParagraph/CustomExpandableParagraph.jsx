/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'antd';

const { Paragraph } = Typography;

const CustomExpandableParagraph = ({ text, lines }) => {
  const [expanded, setExpanded] = useState(false);
  const [counter, setCounter] = useState(0);

  const basedOnExpanded = !expanded ? counter + 0 : counter + 1;

  const expand = () => {
    setExpanded(true);
    setCounter(basedOnExpanded);
  };

  const collapse = () => {
    setExpanded(false);
    setCounter(basedOnExpanded);
  };

  return (
    <div key={counter} className="expandableParagraph">
      <Paragraph
        ellipsis={{
          rows: lines,
          expandable: true,
          onExpand: expand
        }}
      >
        {text}
      </Paragraph>
      {expanded && (
        <Button
          type="link"
          size="small"
          onClick={collapse}
          className="collapseButton"
        >
          Collapse
        </Button>
      )}
    </div>
  );
};

CustomExpandableParagraph.propTypes = {
  text: PropTypes.string.isRequired,
  lines: PropTypes.number
};

CustomExpandableParagraph.defaultProps = {
  lines: 3
};

export default CustomExpandableParagraph;
