import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './coa-base-modal.scss';
import classNames from 'classnames';

export const CoaBaseModal = ({ children, className, ...rest }) => (
  <Modal {...rest} className={classNames('o-coaBaseModal', className)} closable={false}>
    {children}
  </Modal>
);

CoaBaseModal.defaultProps = {
  children: undefined,
  className: undefined
};

CoaBaseModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
};
