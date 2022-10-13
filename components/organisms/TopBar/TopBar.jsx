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
import { MenuOutlined } from '@ant-design/icons';

const TopBar = ({ modalLogin }) => {

  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={24} sm={4} lg={4}>
        <MenuOutlined className="TopBarIcon" style={{ fontSize: '16px', color: '#4C7FF7' }}/>
        <picture>
          <source srcSet='./static/images/isologo.svg' media="(max-width: 576px)" />
          <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
        </picture>
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
