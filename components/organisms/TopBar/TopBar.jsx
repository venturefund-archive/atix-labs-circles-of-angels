/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider } from 'antd';
import { useHistory } from 'react-router';
import './_style.scss';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalMigration from '../ModalMigration/ModalMigration';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const TopBar = ({ setVisibility, visibility }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => setShowModal(false);

  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={11} sm={4} lg={4}>
        <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
      </Col>
      <Col
        className="gutter-row"
        xs={{ span: 13 }}
        sm={{ span: 7, offset: 10 }}
        lg={{ span: 4, offset: 13 }}
      >
        <ModalMigration
          visible={showModal}
          onSubmit={closeModal}
          onCancel={closeModal}
        />
        <Divider type="vertical" />

        <CustomButton
          buttonText="Register"
          theme="Secondary"
          onClick={() => history.push('/register')}
        />
        <Divider type="vertical" />
        <div className="WrapperModalLogin">
          <CustomButton
            data-testid="loginButton"
            buttonText="Login"
            theme="Secondary"
            onClick={() => setVisibility(true)}
          />
          <ModalLogin
            data-testid="modal"
            setVisibility={setVisibility}
            visibility={visibility}
          />
        </div>
      </Col>
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
