/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const GeneralItem = ({ value, label, img, type }) => (
  <div className="GeneralItem flex">
    {img && <img src={img} alt="imgItems" />}
    <div className="HeaderData vertical">
      {type === 'info' && <p className="Label">{value}</p>}
      {type === 'link' && (
        <a
          className="Label"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      )}
      <h2 className="Info">{label}</h2>
    </div>
  </div>
);

GeneralItem.defaultProps = {
  img: undefined,
  type: 'info'
};

GeneralItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  img: PropTypes.string,
  type: PropTypes.oneOf(['info', 'link'])
};

export default GeneralItem;
