import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag } from 'antd';
import './_style.scss';
import {
  buildOracleBlockchainData,
  buildEvidenceBlockchainData
} from '../../../helpers/blockchainData';
import EvidenceBlockchainInfo from './EvidenceBlockchainInfo';

const getApprovedTag = approved =>
  approved ? (
    <Tag color="#4C7FF7">Approved</Tag>
  ) : (
    <Tag color="#DF5BD2">Not Approved</Tag>
  );

const EvidenceItem = ({ approved, createdAt, description, proof, txLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="EvidenceItem">
      <div className="Description">
        <div className="space-between Data">
          <div className="flex Title">
            <h1>Name of the evidence</h1>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? 'IconOpen' : 'IconClosed'}
              type="button"
            >
              <img
                className="BlockGray"
                src="/static/images/block-gray.svg"
                alt="blockchainicon"
              />
              <img
                className="BlockBlue"
                src="/static/images/block-blue.svg"
                alt="blockchainicon"
              />
            </button>
          </div>
          <span>{moment(createdAt).format('MMMM, Do YYYY - HH:mm')}</span>
        </div>
        <p>{description}</p>
      </div>
      <div className="BlockImages">
        <div className="ImageContainer">
          <img src={proof} alt="evidences" />
        </div>
      </div>
      <div className={isOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
        {/* TODO: get blockchain info from API */}
        <EvidenceBlockchainInfo
          oracleInfo={buildOracleBlockchainData({})}
          evidenceInfo={buildEvidenceBlockchainData({
            status: getApprovedTag(approved)
          })}
        />
      </div>
    </div>
  );
};

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
