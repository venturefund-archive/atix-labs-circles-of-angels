/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Tag } from 'antd';
import ModalEvidences from '../../organisms/ModalEvidences/ModalEvidences';
import { tagPropTypes, evidencePropTypes } from '../../../helpers/proptypes';

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
    <Button type="link" className="blueLink" onClick={openModalEvidences}>
      Evidences
    </Button>
    {showModalEvidence && (
      <ModalEvidences
        visible={showModalEvidence}
        onClose={closeModalEvidences}
        evidences={evidences}
      />
    )}
    {showAddEvidence && (
      <Button type="link" className="blueLink" onClick={onNewEvidence}>
        +Add Evidence
      </Button>
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
