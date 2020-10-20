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
import { Button } from 'antd';

const GeneralItem = ({ value, label, img, type, extra, url }) => (
  <div className="GeneralItem flex">
    {img && <img src={img} alt="imgItems" />}
    <div className="HeaderData vertical">
      {type === 'info' && (
        <p className="Label">
          {value} {extra}
        </p>
      )}
      {type === 'link' && (
        <Button
          type={`${type} Label`}
          href={url || value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </Button>
      )}
      {label && <h2 className="Info">{label}</h2>}
    </div>
  </div>
);

GeneralItem.defaultProps = {
  img: undefined,
  type: 'info',
  extra: '',
  url: undefined,
  label: undefined
};

GeneralItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  img: PropTypes.string,
  type: PropTypes.oneOf(['info', 'link']),
  extra: PropTypes.string,
  url: PropTypes.string
};

export default GeneralItem;
