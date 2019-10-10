/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Form, Input, Icon } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const FormTransfer = ({ onTransferChange, onAmountChange, submitTransfer }) => (
  <div className="FormTrasnfer">
    <Form onSubmit={submitTransfer}>
      <Form.Item label="Transfer Receipt Number">
        <Input
          placeholder="Ej. 123456789"
          prefix={
            <Icon type="file-protect" style={{ color: 'rgba(0,0,0,.25)' }} />
          }
          onChange={onTransferChange}
        />
      </Form.Item>
      <Form.Item label="Amount">
        <Input
          placeholder="Ej. $10.000 USD"
          prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onAmountChange}
        />
      </Form.Item>
      <Form.Item>
        <CustomButton
          theme="Primary"
          buttonText="Confirm"
          onClick={submitTransfer}
        />
      </Form.Item>
    </Form>
  </div>
);

export default FormTransfer;
