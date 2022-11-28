import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export const CoaBaseModal = ({ children, ...rest }) => <Modal {...rest}>{children}</Modal>;

CoaBaseModal.defaultProps = {
  children: undefined
};

CoaBaseModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
