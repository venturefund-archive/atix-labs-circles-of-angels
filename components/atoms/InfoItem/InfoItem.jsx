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
import { Col } from 'antd';
import './_style.scss';

const InfoItem = ({ subtitle, title, img, xs, sm, lg }) => (
  <Col xs={xs} sm={sm} lg={lg} className="InfoItem">
    <div className="InfoItemData">
      <p>{subtitle}</p>
      <h2>{title}</h2>
      {img}
    </div>
  </Col>
);

export default InfoItem;

InfoItem.defaultProps = {
  subtitle: '',
  title: '',
  img: '',
  xs: 24,
  sm: 24,
  lg: 24
};

InfoItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  lg: PropTypes.number
};
