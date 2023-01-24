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
import classNames from 'classnames';

const InfoItem = ({ subtitle, title, className }) => {
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

  const valueText = () => <p ref={titleRef}>{title}</p>;

  return (
    <div className={classNames('InfoItem', className)}>
      <h3>{subtitle}</h3>
      {overflowTooltip ? (
        <Tooltip placement="bottom" title={title}>
          {valueText()}
        </Tooltip>
      ) : (
        valueText()
      )}
    </div>
  );
};

export default InfoItem;

InfoItem.defaultProps = {
  subtitle: '',
  title: '',
  className: ''
};

InfoItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
};
