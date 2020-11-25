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
import { Row, Col, Divider } from 'antd';
import { useHistory } from 'react-router';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const TopBar = ({ modalLogin }) => {
  const history = useHistory();

  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={16} sm={4} lg={4}>
        <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
      </Col>
      <Col
        className="gutter-row"
        xs={{ span: 24 }}
        sm={{ span: 7, offset: 10 }}
        lg={{ span: 7, offset: 10 }}
      >
        <CustomButton
          buttonText="Register"
          theme="Secondary"
          onClick={() => history.push('/register')}
        />
        <Divider type="vertical" />
        {modalLogin}
      </Col>
    </Row>
  );
};

export default TopBar;

TopBar.propTypes = {
  modalLogin: PropTypes.element.isRequired
};
