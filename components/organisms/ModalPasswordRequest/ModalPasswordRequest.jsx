/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import './_style.scss';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { walletPasswordFormItems } from '../../../helpers/walletPasswordFormFields';

const Title = () => (
  <div className="ModalPasswordRequest">
    <div className="flex Title">
      <img src="./static/images/password-lock.svg" alt="passwordlock" />
      <div>
        <h1>Password required</h1>
        <h3>Enter your password to authorize this operation</h3>
      </div>
    </div>
    <Divider />
  </div>
);

const ModalPasswordRequest = ({ visible, onConfirm, onClose }) => (
  <CustomFormModal
    body={<Title />}
    formItems={walletPasswordFormItems}
    visible={visible}
    onClose={onClose}
    onConfirm={onConfirm}
    width={520}
  />
);

ModalPasswordRequest.defaultProps = {
  visible: false
};

ModalPasswordRequest.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ModalPasswordRequest;
