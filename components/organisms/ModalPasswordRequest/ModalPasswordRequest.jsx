/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, message, Form, Input, Divider, Icon  } from 'antd';
import { useHistory } from 'react-router';
import { useUserContext } from '../../utils/UserContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import DynamicForm from '../FormLogin/FormLogin';
import ModalRecovery from '../ModalRecovery/ModalRecovery';
import { loginUser } from '../../../api/userApi';
import { defaultRouteByRole } from '../../../constants/DefaultRouteByRole';
import './_style.scss';

const { TextArea } = Input;

class ModalPasswordRequest extends React.Component {
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
        <CustomButton theme="Primary" buttonText="Pass request" onClick={this.showModal}/>
        <Modal
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className="ModalPasswordRequest"
        >          
          <div className="flex Title">
            <img src='./static/images/password-lock.svg' alt="passwordlock" />
            <div>
              <h1>Password required</h1>
              <h3>Enter your password and your 12 words to authorize this operation</h3>
            </div>
          </div>
            <Divider />
           <div className="Body">
            <Form className="login-form">
              <Form.Item label="Write your password" name="Password">
                <Input.Password size="large" placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item label="Write the 12 words in the order that they were sent to you" name="seed">
                <TextArea rows={6} />
              </Form.Item>
              <Form.Item>
                <CustomButton theme="Primary" buttonText="Submit" />
              </Form.Item>
            </Form>
           </div>
        </Modal>
      </div>
    );
  }
}

export default ModalPasswordRequest;
