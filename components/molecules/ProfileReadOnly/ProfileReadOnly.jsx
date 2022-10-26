/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import CustomButton from '../../atoms/CustomButton/CustomButton';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const ProfileReadOnly = () => (
  <div className="profileContainerReadOnly">
    <TitlePage textTitle="Profile" />
    <div className="flex">
      <h3>Personal Information</h3>
      <div className="flex edit">
        <EditOutlined />
        <p>Edit</p>
      </div>
    </div>
    <Form {...layout} name="basic">
      <Form.Item
        className="halph"
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter your First Name!' }]}
      >
        <p>First Name</p>
      </Form.Item>

      <Form.Item
        className="halph"
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter your Last Name!' }]}
      >
        <p>Last Name</p>
      </Form.Item>

      <Form.Item
        className="full"
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <p>example@gmail.com</p>
      </Form.Item>
      <Form.Item
        className="halph"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your Password!' }]}
      >
        <p>*********</p>
      </Form.Item>

      <Form.Item
        className="halph"
        label="Repeat your Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your Password!' }]}
      >
        <p>*********</p>
      </Form.Item>
    </Form>
    <div className="buttonSection">
      <CustomButton buttonText="Save and Continue" />
    </div>
  </div>
);

export default ProfileReadOnly;
