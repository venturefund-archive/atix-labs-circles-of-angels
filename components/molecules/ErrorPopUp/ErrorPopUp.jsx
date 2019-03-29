import React from 'react';
import { Modal } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';

import './_style.scss';

const errorPopUp = ({ errorMessage, errorTitle, visible, handleOk }) => (
  <div>
    <Modal
      visible={visible}
      className="ErrorModal"
      onCancel={handleOk}
      footer={<ButtonPrimary key="accept" onClick={handleOk} text="Accept" />}
    >
      <h1>{errorTitle}</h1>
      <h2>{errorMessage}</h2>
    </Modal>
  </div>
);

export default errorPopUp;
