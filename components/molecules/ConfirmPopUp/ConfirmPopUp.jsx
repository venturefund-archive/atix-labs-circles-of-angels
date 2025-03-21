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
import { Modal } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';

import './_style.scss';

class ConfirmPopUp extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    const { handleOk } = this.props;
    await handleOk();

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
      <div>
        <CustomButton
          theme="Primary"
          buttonText="Sign"
          onClick={this.showModal}
        />
        <Modal
          title="Confirmation"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="accept"
          cancelText="cancel"
          className="ConfirmModal"
        >
          <img src="/static/images/icon-modal.svg" alt="EvidenceModal Icon" />
          <h1> Sign Agreement</h1>
          <h2>Are you sure you want to sign this agreement?</h2>
        </Modal>
      </div>
    );
  }
}

export default ConfirmPopUp;

ConfirmPopUp.propTypes = {
  handleOk: PropTypes.func.isRequired
};
