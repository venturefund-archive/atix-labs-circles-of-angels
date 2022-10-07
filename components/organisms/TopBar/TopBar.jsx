/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './_style.scss';

const TopBar = ({ modalLogin }) => {

  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={16} sm={4} lg={4}>
        <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
      </Col>
        {modalLogin}
    </Row>
  );
};

export default TopBar;

TopBar.defaultProps = {
  visibility: false
};

TopBar.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};
