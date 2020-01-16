/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Form, Input } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import DragUploadFile from '../../molecules/DragUploadFile/DragUploadFile';
import './_style.scss';

// TODO: add functionality
const ModalInvest = ({ visibility, setVisibility, onOk, onCancel }) => {
  // TODO: useForm and separate component

  const handleOk = e => {
    console.log(e);
    onOk(e);
    setVisibility(false);
  };

  const handleCancel = e => {
    console.log(e);
    onCancel(e);
    setVisibility(false);
  };

  return (
    <div>
      <Modal
        title="Fund Project"
        className="ModalFund"
        width="700px"
        visible={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
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
        <CustomButton theme="Primary" buttonText="Fund!" classNameIcon="none" />
      </Modal>
    </div>
  );
};

ModalInvest.defaultProps = {
  visibility: false,
  onOk: undefined,
  onCancel: undefined
};

ModalInvest.propTypes = {
  visibility: PropTypes.bool,
  setVisibility: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalInvest;
