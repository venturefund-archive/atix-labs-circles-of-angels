import React from "react";
import { Form, Input, Icon } from "antd";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary.jsx";

import "./_style.scss";

const FormTransfer = ({ onTransferChange, onAmountChange, submitTransfer }) => (
  <div className="FormTrasnfer">
    <Form onSubmit={submitTransfer}>
      <Form.Item label="Transfer Receipt Number">
        <Input
          placeholder="Ej. 123456789"
          prefix={
            <Icon type="file-protect" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          onChange={onTransferChange}
        />
      </Form.Item>
      <Form.Item label="Amount">
        <Input
          placeholder="Ej. $10.000 USD"
          prefix={<Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />}
          onChange={onAmountChange}
        />
      </Form.Item>
      <Form.Item>
        <ButtonPrimary text="CONFIRM" onClick={submitTransfer} />
      </Form.Item>
    </Form>
  </div>
);

export default FormTransfer;
