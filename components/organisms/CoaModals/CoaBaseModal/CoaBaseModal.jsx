import { Modal } from 'antd';
import React from 'react';

export const CoaBaseModal = ({ children, ...rest }) => {
  return <Modal {...rest}>{children}</Modal>;
};
