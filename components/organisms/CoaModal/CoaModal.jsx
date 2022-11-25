import { Modal } from 'antd';
import React from 'react';

export const CoaModal = ({ children, ...rest }) => {
  return <Modal {...rest}>{children}</Modal>;
};
