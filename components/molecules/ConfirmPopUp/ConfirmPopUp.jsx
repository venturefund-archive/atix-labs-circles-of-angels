import React from 'react';
import { Modal } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';
import { signAgreement } from '../../../api/userProjectApi';
import Routing from '../../utils/Routes';

import './_style.scss';

class ConfirmPopUp extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    const { userId, projectId, handleOk } = this.props;
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
    const { handleOk } = this.props;
    return (
      <div>
        <ButtonPrimary text="Sign" onClick={this.showModal} />
        <Modal
          title="Confirmation"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="accept"
          cancelText="cancel"
          className="ConfirmModal"
        >
          <img src="/static/images/icon-modal.svg" />
          <h1> Sign Agreement</h1>
          <h2>Are you sure you want to sign this agreement?</h2>
        </Modal>
      </div>
    );
  }
}

export default ConfirmPopUp;
