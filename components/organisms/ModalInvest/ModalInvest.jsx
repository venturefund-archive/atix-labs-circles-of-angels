/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Modal, Row, Col, Divider, Form, Input } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import DragUploadFile from '../../molecules/DragUploadFile/DragUploadFile';
import './_style.scss';

class ModalInvest extends React.Component {
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
        <CustomButton
          theme="Primary"
          buttonText="Follow Project"
          onClick={this.showModal}
        />
        <Modal
          title="Fund Project"
          className="ModalFund"
          width="700px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Row className="Data" justify="center">
            <Col className="flex" span={12}>
              <b>Alias:</b>
              <p>COA Alias</p>
            </Col>
            <Col className="flex" span={12}>
              <b>ID ACCOUNT: </b>
              <p>0170347240000030652220</p>
            </Col>
          </Row>
          <Form.Item label="Amount Transfer">
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item label="Your ID Account">
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <DragUploadFile
            text="Upload your receipt"
            description="from the account you make the transfer"
          />
          <CustomButton
            theme="Primary"
            buttonText="Fund!"
            classNameIcon="none"
          />
        </Modal>
      </div>
    );
  }
}

export default ModalInvest;
