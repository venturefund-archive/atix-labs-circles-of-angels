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
import { Modal, Col, Row } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const ModalMigration = ({ visible, onClose, onRedirect }) => (
  <div>
    <Modal
      centered
      className="WrapperModalMigration"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="Container">
        <div className="Body">
          <div>
            <h1>Hello!</h1>
            <h2>Are you looking for any of these projects?</h2>
            <h3>
              We are migrating to a new platform and some projects have not been
              added yet! <br /> If your project is on this list, enter to the
              old platform from the blue button to access them. <br /> Otherwise
              continue to the landing page
            </h3>
          </div>
          <Row className="BlockContainer" gutter={22}>
            <Col lg={8} md={8} xs={24} className="Card">
              <div span={24} className="ImageCard">
                <img src="images/wedu.jpg" alt="img" />
              </div>
              <h1>Wedu Global Fisa</h1>
            </Col>
            <Col lg={8} md={8} xs={24} className="Card">
              <div span={24} className="ImageCard">
                <img src="images/hammock.jpg" alt="img" />
              </div>
              <h1>Yellow Leaf Hammock</h1>
            </Col>
          </Row>
        </div>
        <div className="Footer flex">
          <CustomButton
            theme="Alternative"
            buttonText="No, I want to stay"
            onClick={onClose}
          />
          <CustomButton
            theme="Primary"
            buttonText="Yes, go to the old platform!"
            onClick={onRedirect}
          />
        </div>
      </div>
    </Modal>
  </div>
);

export default ModalMigration;

ModalMigration.defaultProps = {
  visible: false
};

ModalMigration.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired
};
