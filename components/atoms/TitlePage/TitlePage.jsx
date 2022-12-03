/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import classNames from 'classnames';

const TitlePage = ({
  textTitle,
  underlinePosition,
  className,
  textClassName,
  textColor,
  orderNumber,
  ...props
}) => (
  <div
    className={classNames(
      'TitlePage',
      {
        [`--${underlinePosition}`]: Boolean(underlinePosition)
      },
      className
    )}
    style={{ '--textColor': textColor, '--orderNumber': orderNumber }}
  >
    <h1
      className={classNames(textClassName, { '--withOrderNumber': Boolean(orderNumber) })}
      {...props}
    >
      {textTitle}
    </h1>
  </div>
);
export default TitlePage;

TitlePage.defaultProps = {
  underlinePosition: 'left',
  className: '',
  textClassName: undefined
};

TitlePage.propTypes = {
  textTitle: PropTypes.string.isRequired,
  underlinePosition: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  textClassName: PropTypes.string
};
