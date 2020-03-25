/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Tag } from 'antd';
import ModalEvidences from '../../organisms/ModalEvidences/ModalEvidences';
import { tagPropTypes, evidencePropTypes } from '../../../helpers/proptypes';

// TODO: <a> elements should be replaced by buttons with link style

const EvidenceTaskActions = ({
  color,
  text,
  showAddEvidence,
  onNewEvidence,
  showModalEvidence,
  evidences,
  openModalEvidences,
  closeModalEvidences
}) => (
  <Col span={24}>
    <Tag color={color}>{text}</Tag>
    <a className="blueLink" onClick={openModalEvidences}>
      Evidences
    </a>
    {showModalEvidence && (
      <ModalEvidences
        visible={showModalEvidence}
        onClose={closeModalEvidences}
        evidences={evidences}
      />
    )}
    {showAddEvidence && (
      <a className="blueLink" onClick={onNewEvidence}>
        +Add Evidence
      </a>
    )}
  </Col>
);

EvidenceTaskActions.defaultProps = {
  text: undefined,
  color: undefined,
  showAddEvidence: false,
  showModalEvidence: false,
  evidences: []
};

EvidenceTaskActions.propTypes = {
  text: tagPropTypes.text,
  color: tagPropTypes.color,
  showAddEvidence: PropTypes.bool,
  onNewEvidence: PropTypes.func.isRequired,
  showModalEvidence: PropTypes.bool,
  evidences: PropTypes.arrayOf(PropTypes.shape(evidencePropTypes)),
  openModalEvidences: PropTypes.func.isRequired,
  closeModalEvidences: PropTypes.func.isRequired
};

export default EvidenceTaskActions;
