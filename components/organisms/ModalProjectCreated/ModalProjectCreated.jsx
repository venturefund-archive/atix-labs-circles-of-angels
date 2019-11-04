/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Divider, Modal } from 'antd';
import './_style.scss';
import Routing from '../../utils/Routes';
import { withUser } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';

class ModalProjectCreated extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="ModalProjectCreated">
        <CustomButton
          buttonText="Create Project"
          theme="Primary"
          classNameIcon="iconDisplay"
          icon="arrow-right"
          onClick={this.showModal}
        />
        <Modal
          closable={false}
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="ModalProjectCreated"
          width="400"
          footer={null}
        >
          <img
            src="./static/images/icon-project-created.svg"
            alt="ProjectCreated"
          />

          <h1>Project Created Successfully!</h1>
          <p>Lorem ipsum dolor sit amet concerquetcut</p>
          <CustomButton
            theme="Primary"
            buttonText="Go to my dashboard"
            classNameIcon="none"
          />
        </Modal>
      </div>
    );
  }
}

export default ModalProjectCreated;
