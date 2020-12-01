/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './_style.scss';
import { evidencePropTypes } from '../../../helpers/proptypes';
import EvidenceItem from './EvidenceItem';

const ModalEvidences = ({ visible, onClose, evidences }) => (
  <div className="blueLink">
    <Modal
      title="Evidences"
      centered
      className="ModalEvidences"
      footer={null}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      {evidences.map(evidence => (
        <EvidenceItem {...evidence} key={evidence.id} />
      ))}
    </Modal>
  </div>
);

ModalEvidences.defaultProps = {
  visible: false,
  evidences: []
};

ModalEvidences.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  evidences: PropTypes.arrayOf(PropTypes.shape(evidencePropTypes))
};

export default ModalEvidences;
