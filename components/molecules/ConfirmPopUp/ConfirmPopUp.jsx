import React from "react";
import { Modal } from "antd";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";

import "./_style.scss";

class ConfirmPopUp extends React.Component {
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
      <div>
        <ButtonPrimary text="Sign" onClick={this.showModal} />
        <Modal
          title="Confirmation"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="accept"
          cancelText="cancel"
          className="ConfirmModal"
        >
          <img src="/static/images/icon-modal.svg" />
          <h1> Sign Agreement</h1>
          <h2>Are you sure you want to sign this agreement?</h2>
          <p className="ProjectDetail">Project Name / Date / Time</p>
        </Modal>
      </div>
    );
  }
}

export default ConfirmPopUp;
