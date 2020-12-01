/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Modal } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

class ModalProjectCreated extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;

    return (
      <div className="ModalProjectCreated">
        <Modal
          closable={false}
          centered
          visible={visible}
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
