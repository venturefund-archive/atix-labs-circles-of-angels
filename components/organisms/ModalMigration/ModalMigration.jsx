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
import { useHistory } from 'react-router';
import { useUserContext } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';
import { loginUser } from '../../../api/userApi';
import { defaultRouteByRole } from '../../../constants/DefaultRouteByRole';

class ModalMigration extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <CustomButton theme="Primary" buttonText="hello" onClick={this.showModal} />
        <Modal
          centered
          className="WrapperModalMigration"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer= {null}
        >
        <div className="Container">
          <div className="Body">
                    <div>
                      <h1>Hello!</h1>
                      <h2>Are you looking for any of these projects?</h2>
                      <h3>We are migrating to a new platform and some projects have not been added yet!
                      If your project is on this list, enter to the previous platform from the button to access them
                      Otherwise continue to the landing page
                      </h3>
                     </div>
                    <Row className="BlockContainer" gutter={16}>
                      <Col span={6} className="Card">
                        <div className="ImageCard">
                         <img src="/static/images/sehatkahani.jpg" />
                        </div>
                          <h1>Sehat Kahani</h1>
                      </Col>
                      <Col span={6} className="Card">
                        <div span={24} className="ImageCard">
                        <img src="/static/images/dengue.jpg" />
                        </div>
                          <h1>Dengue Prognostic Test</h1>
                      </Col>
                      <Col span={6} className="Card">
                        <div span={24} className="ImageCard">
                        <img src="/static/images/wedu.jpg" />
                        </div>
                          <h1>Wedu Global Fisa</h1>
                      </Col>
                      <Col span={6} className="Card">
                        <div span={24} className="ImageCard">
                        <img src="/static/images/hammock.jpg" />
                        </div>
                          <h1>Yellow Leaf Hammock</h1>
                      </Col>
                    </Row>
          </div>
          <div className="Footer">
            <CustomButton theme="Primary" buttonText="Yes, go to the old platform!"/>
          </div>
        </div>
        </Modal>
      </div>
    );
  }
}

export default ModalMigration;
