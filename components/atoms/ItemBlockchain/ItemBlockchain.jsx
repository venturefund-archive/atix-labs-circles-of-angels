/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Button } from 'antd';
import { linkPropTypes } from '../../../helpers/proptypes';

const ItemBlockchain = ({ image, label, info, link }) => (
  <div className="Items">
    {image && <img src={image} alt={label} />}
    <div className="Data">
      {label && <label>{label}</label>}
      {info && <p>{info}</p>}
      {link &&
        (link.url ? (
          <Button
            type="link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </Button>
        ) : (
          <p>{link.text}</p>
        ))}
    </div>
  </div>
);

ItemBlockchain.defaultProps = {
  image: undefined,
  label: undefined,
  info: undefined,
  link: undefined
};

ItemBlockchain.propTypes = {
  image: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  link: PropTypes.shape(linkPropTypes)
};

export default ItemBlockchain;
