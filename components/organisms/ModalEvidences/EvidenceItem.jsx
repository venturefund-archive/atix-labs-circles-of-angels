import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag, Icon } from 'antd';
import './_style.scss';

const getApprovedTag = approved =>
  approved ? (
    <Tag color="#4C7FF7">Approved</Tag>
  ) : (
    <Tag color="#DF5BD2">Not Approved</Tag>
  );

const EvidenceItem = ({ approved, createdAt, description, proof, txLink }) => (
  <div className="EvidenceItem">
    <div className="space-between">
      {getApprovedTag(approved)}
      <div>
        <Icon type="link" style={{ fontSize: '16px', color: '#4C7FF7' }} />{' '}
        {txLink && <a href={txLink}>Go to blockchain explorer!</a>}
      </div>
    </div>
    <p>{description}</p>
    <span>{moment(createdAt).format('MMMM, Do YYYY - HH:mm')}</span>
    <div className="BlockImages">
      <div className="ImageContainer">
        <img src={proof} alt="evidences" />
      </div>
    </div>
  </div>
);

EvidenceItem.defaultProps = {
  approved: false,
  txLink: undefined
};

EvidenceItem.propTypes = {
  approved: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  proof: PropTypes.string.isRequired,
  txLink: PropTypes.string
};

export default EvidenceItem;
