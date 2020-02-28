/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Col, Row } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const ModalMigration = ({ visible, onSubmit, onCancel }) => (
  <div>
    <Modal
      centered
      className="WrapperModalMigration"
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}
      footer={null}
    >
      <div className="Container">
        <div className="Body">
          <div>
            <h1>Hello!</h1>
            <h2>Are you looking for any of these projects?</h2>
            <h3>
              We are migrating to a new platform and some projects have not been
              added yet! If your project is on this list, enter to the previous
              platform from the button to access them Otherwise continue to the
              landing page
            </h3>
          </div>
          <Row className="BlockContainer" gutter={16}>
            <Col span={6} className="Card">
              <div className="ImageCard">
                <img src="/static/images/sehatkahani.jpg" alt="img" />
              </div>
              <h1>Sehat Kahani</h1>
            </Col>
            <Col span={6} className="Card">
              <div span={24} className="ImageCard">
                <img src="/static/images/dengue.jpg" alt="img" />
              </div>
              <h1>Dengue Prognostic Test</h1>
            </Col>
            <Col span={6} className="Card">
              <div span={24} className="ImageCard">
                <img src="/static/images/wedu.jpg" alt="img" />
              </div>
              <h1>Wedu Global Fisa</h1>
            </Col>
            <Col span={6} className="Card">
              <div span={24} className="ImageCard">
                <img src="/static/images/hammock.jpg" alt="img" />
              </div>
              <h1>Yellow Leaf Hammock</h1>
            </Col>
          </Row>
        </div>
        <div className="Footer">
          <CustomButton
            theme="Primary"
            buttonText="Yes, go to the old platform!"
            onClick={() => undefined} // TODO add redirection to old platform
          />
        </div>
      </div>
    </Modal>
  </div>
);

export default ModalMigration;

ModalMigration.defaultProps = {
  visible: false,
  onSubmit: () => undefined,
  onCancel: () => undefined
};

ModalMigration.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};
