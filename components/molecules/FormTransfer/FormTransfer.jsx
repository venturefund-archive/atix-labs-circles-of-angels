import React from "react";
import { Form, Input, Icon } from "antd";
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary.jsx';

import './_style.scss';

const FormTransfer = () => (
  <div className="FormTrasnfer">
    <Form>
      <Form.Item label="Transfer Receipt Number">
        <Input
          placeholder="Ej. 123456789"
          prefix={<Icon type="file-protect" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </Form.Item>
      <Form.Item label="Amount">
        <Input
        placeholder="Ej. $10.000 USD"
        prefix={<Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />}
         />
      </Form.Item>
      <Form.Item>
        <ButtonPrimary text="CONFIRM" />
      </Form.Item>
    </Form>
  </div>
);

export default FormTransfer;
