/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import './_style.scss';

const InfoItem = ({ subtitle, title, img }) => {
  const [overflowTooltip, setOverflowTooltip] = useState(false);

  const titleRef = useRef();

  const isTextOverflow = element => element && element.clientWidth < element.scrollWidth;

  const checkOverflow = () => {
    const element = titleRef.current;

    const overflow = isTextOverflow(element);
    if (overflow !== overflowTooltip) {
      setOverflowTooltip(overflow);
    }
  };

  useEffect(() => {
    checkOverflow();
  });

  const h2Title = () => <h2 ref={titleRef}>{title}</h2>;

  return (
    <div className="InfoItem">
      <div className="InfoItemData">
        <p>{subtitle}</p>
        {overflowTooltip ? (
          <Tooltip placement="bottom" title={title}>
            {h2Title()}
          </Tooltip>
        ) : (
          h2Title()
        )}
        {img}
      </div>
    </div>
  );
};

export default InfoItem;

InfoItem.defaultProps = {
  subtitle: '',
  title: '',
  img: ''
};

InfoItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.node
};
